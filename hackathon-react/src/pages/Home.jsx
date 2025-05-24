import { motion } from "framer-motion";
import NavigationButton from "../components/NavigationButton";
import PageLayout from "../components/PageLayout";
import { Bot, CreditCard } from "lucide-react";
import { useState } from "react";

function Home({ onNavigate }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleChatbotClick = async () => {
    setIsLoading(true);
    // TODO: Implement chatbot navigation logic
    console.log("Navigating to chatbot...");

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    onNavigate("chatbot");
    setIsLoading(false);
  };

  const handleCashbackClick = async () => {
    setIsLoading(true);
    // TODO: Implement cashback navigation logic
    console.log("Navigating to cashback...");

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    onNavigate("cashback");
    setIsLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <PageLayout>
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-lime-500">OTP Bank</span>
          </h1>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 w-full max-w-md"
          variants={itemVariants}
        >
          <NavigationButton
            icon={Bot}
            title="Chatbot"
            description="Our AI assistant"
            onClick={handleChatbotClick}
            variant="primary"
            disabled={isLoading}
          />

          <NavigationButton
            icon={CreditCard}
            title="Cashback"
            description="Manage your rewards"
            onClick={handleCashbackClick}
            variant="primary"
            disabled={isLoading}
          />
        </motion.div>

        <motion.div className="mt-16 text-center" variants={itemVariants}>
          <div className="w-16 h-1 bg-lime-500 mx-auto rounded-full"></div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
}

export default Home;
