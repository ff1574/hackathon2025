import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "../context/AppContext";

function NotificationToast() {
  const { notifications, removeNotification } = useApp();

  useEffect(() => {
    // Auto-remove notifications after 5 seconds
    notifications.forEach((notification) => {
      if (notification.autoRemove !== false) {
        setTimeout(() => {
          removeNotification(notification.id);
        }, 5000);
      }
    });
  }, [notifications, removeNotification]);

  const getNotificationConfig = (type) => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          bgColor: "bg-lime-100",
          borderColor: "border-lime-300",
          textColor: "text-lime-800",
          iconColor: "text-lime-600",
        };
      case "error":
        return {
          icon: AlertCircle,
          bgColor: "bg-red-100",
          borderColor: "border-red-300",
          textColor: "text-red-800",
          iconColor: "text-red-600",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          bgColor: "bg-yellow-100",
          borderColor: "border-yellow-300",
          textColor: "text-yellow-800",
          iconColor: "text-yellow-600",
        };
      case "info":
      default:
        return {
          icon: Info,
          bgColor: "bg-blue-100",
          borderColor: "border-blue-300",
          textColor: "text-blue-800",
          iconColor: "text-blue-600",
        };
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => {
          const config = getNotificationConfig(notification.type);
          const Icon = config.icon;

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor} shadow-lg`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 mt-0.5 ${config.iconColor}`} />
                <div className="flex-1">
                  {notification.title && (
                    <h4 className={`font-medium ${config.textColor} mb-1`}>
                      {notification.title}
                    </h4>
                  )}
                  <p className={`text-sm ${config.textColor}`}>
                    {notification.message}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeNotification(notification.id)}
                  className={`p-1 h-auto ${config.textColor} hover:bg-white/50`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default NotificationToast;
