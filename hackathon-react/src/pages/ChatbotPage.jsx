import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";
import BackButton from "../components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              <span className="text-lime-500">OTP</span> Chatbot
            </h1>
            <p className="text-gray-600">Chat with our intelligent assistant</p>
          </div>

          <Card className="h-96 mb-4 p-4 overflow-y-auto border-lime-200">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                Start a conversation...
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 rounded-lg max-w-xs ${
                      message.sender === "user"
                        ? "bg-lime-500 text-white ml-auto"
                        : "bg-gray-100 text-gray-900"
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {message.text}
                  </motion.div>
                ))}
              </div>
            )}
          </Card>

          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleInputKeyPress}
              placeholder="Type your message..."
              className="flex-1 border-lime-200 focus:border-lime-500"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-lime-500 hover:bg-lime-600 text-white"
            >
              Send
            </Button>
          </div>

          <div className="flex gap-2 mt-4 justify-center">
            <Button
              onClick={initializeChatbot}
              variant="outline"
              className="border-lime-500 text-lime-600 hover:bg-lime-50"
            >
              Initialize Bot
            </Button>
            <Button
              onClick={clearChat}
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Clear Chat
            </Button>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}

export default ChatbotPage;
