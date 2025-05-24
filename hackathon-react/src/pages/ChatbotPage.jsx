import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";
import BackButton from "../components/BackButton";
import ChatInterface from "@/components/chat/chatInterface";

function ChatbotPage({ onNavigate }) {
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
          <ChatInterface />
        </motion.div>
      </div>
    </PageLayout>
  );
}

export default ChatbotPage;
