import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import ChatbotPage from "./pages/ChatbotPage";
import CashbackPage from "./pages/CashbackPage";
import { AppProvider } from "./context/AppContext";
import NotificationToast from "./components/NotificationToast";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3,
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={setCurrentPage} />;
      case "chatbot":
        return <ChatbotPage onNavigate={setCurrentPage} />;
      case "cashback":
        return <CashbackPage onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-white">
        <NotificationToast />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            // Remove min-h-screen from here - this was causing the stacking context issue
            className="w-full"
            style={{ position: "relative" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppProvider>
  );
}

export default App;
