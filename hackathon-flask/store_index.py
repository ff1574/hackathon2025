from src.helper import load_pdf, text_split, download_hugging_face_embeddings
from langchain_community.vectorstores import Pinecone
from pinecone import Pinecone as PineconeClient, ServerlessSpec  # ✅ Corrected import
from dotenv import load_dotenv
import os
import time

# Load environment variables
load_dotenv()

# ✅ FIXED: Corrected environment variable name
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
PINECONE_API_ENV = os.environ.get("PINECONE_API_ENV")

if not PINECONE_API_KEY:
    raise ValueError("Missing Pinecone API Key. Check your .env file!")

# extracted_data = load_pdf("data/")  # Matches the folder from ZIP
# text_chunks = text_split(extracted_data)

# print(f"Extracted {len(text_chunks)} text chunks.")

pc = PineconeClient(api_key=PINECONE_API_KEY)

index_name = "sheepai"

# #  Delete and recreate index to ensure clean data
# if index_name in pc.list_indexes().names():
#     pc.delete_index(index_name)
#     print(f"Deleted existing index: {index_name}")

# pc.create_index(
#     name=index_name,
#     dimension=384,  # Matches Hugging Face embedding model
#     metric="cosine",
#     spec=ServerlessSpec(cloud="aws", region="us-east-1")
# )

# # Wait for the index to be ready
# time.sleep(10)

# Initialize the newly created index
# docsearch = Pinecone.from_texts(
#     [t.page_content for t in text_chunks], 
#     download_hugging_face_embeddings(), 
#     index_name=index_name
# )

# print(f"✅ Successfully stored {len(text_chunks)} vectors in Pinecone!")
