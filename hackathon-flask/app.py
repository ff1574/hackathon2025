from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import time

from langchain_community.vectorstores import Pinecone
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

from pinecone import Pinecone as PineconeClient, ServerlessSpec

from src.helper import load_pdf, text_split, download_hugging_face_embeddings
from src.prompt import prompt_template

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

# Set up Pinecone
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
PINECONE_API_ENV = os.environ.get("PINECONE_API_ENV")
index_name = "sheepai"
embedding_model = download_hugging_face_embeddings()

pc = PineconeClient(api_key=PINECONE_API_KEY)

# Load documents and split text
extracted_data = load_pdf("data/")
text_chunks = text_split(extracted_data)
print(f"Extracted {len(text_chunks)} text chunks.")

# Check if index exists
if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1")
    )
    time.sleep(10)

# Embed and store in Pinecone
docsearch = Pinecone.from_texts(
    [t.page_content for t in text_chunks],
    embedding_model,
    index_name=index_name
)

print(f"✅ Stored {len(text_chunks)} vectors in Pinecone.")

# Setup Prompt and QA Chain
PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
llm = ChatOpenAI(
    openai_api_key=OPENAI_API_KEY,
    temperature=0,
    model_name="gpt-3.5-turbo"
)

qa = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=docsearch.as_retriever(search_kwargs={'k': 2}),
    return_source_documents=True,
    chain_type_kwargs={"prompt": PROMPT}
)

@app.route("/")
def index():
    return render_template('chat.html')

@app.route("/get", methods=["GET", "POST"])
def chat():
    msg = request.form["msg"]
    input = msg
    print("User Input:", input)

    result = qa.invoke({"query": input})
    source_docs = result.get("source_documents", [])

    if not source_docs:
        return "Sorry, I couldn't find relevant information in the documents."

    print("Response:", result["result"])
    return str(result["result"])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8081, debug=True)
