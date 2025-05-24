import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function BackButton({ onBack, label = "Back to Home" }) {
  const handleBack = () => {
    // TODO: Add navigation analytics
    console.log("Back button clicked");
    if (onBack) {
      onBack();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        onClick={handleBack}
        variant="outline"
        className="border-lime-500 text-lime-600 hover:bg-lime-50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {label}
      </Button>
    </motion.div>
  );
}

export default BackButton;
