import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";
import BackButton from "../components/BackButton";
import ChatInterface from "@/components/chat/chatInterface";

function ChatbotPage({ onNavigate }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    // TODO: Implement chatbot message sending logic
    console.log("Sending message:", inputValue);
    if (inputValue.trim()) {
      setMessages((prev) => [...prev, { text: inputValue, sender: "user" }]);
      setInputValue("");
      // TODO: Add AI response logic here
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const initializeChatbot = () => {
    // TODO: Implement chatbot initialization
    console.log("Initializing chatbot...");
  };

  const clearChat = () => {
    // TODO: Implement chat clearing logic
    console.log("Clearing chat...");
    setMessages([]);
  };

  return (
    <PageLayout>
      <div className="min-h-screen p-4">
        <BackButton onBack={() => onNavigate("home")} />

        <motion.div
          className="max-w-4xl mx-auto mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ChatInterface/>

          
        </motion.div>
      </div>
    </PageLayout>
  );
}

export default ChatbotPage;
