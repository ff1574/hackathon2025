import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";
import { apiClient } from "../utils/api";

function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const result = await apiClient.healthCheck();
      setIsConnected(result.status === "online" || result.status === "ok");
    } catch (error) {
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Check connection on mount
    checkConnection();

    // Set up periodic health checks
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    if (isChecking) {
      return {
        variant: "secondary",
        icon: Wifi,
        text: "Checking...",
        color: "text-yellow-600",
      };
    }

    if (isConnected === null) {
      return {
        variant: "secondary",
        icon: Wifi,
        text: "Unknown",
        color: "text-gray-600",
      };
    }

    if (isConnected) {
      return {
        variant: "default",
        icon: Wifi,
        text: "Connected",
        color: "text-lime-600",
      };
    }

    return {
      variant: "destructive",
      icon: WifiOff,
      text: "Offline",
      color: "text-red-600",
    };
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed top-4 right-4 z-50"
      >
        <Badge
          variant={config.variant}
          className={`flex items-center gap-2 px-3 py-1 ${
            isConnected ? "bg-lime-100 text-lime-800 border-lime-300" : ""
          }`}
        >
          <Icon className={`w-3 h-3 ${config.color}`} />
          {config.text}
        </Badge>
      </motion.div>
    </AnimatePresence>
  );
}

export default ConnectionStatus;
