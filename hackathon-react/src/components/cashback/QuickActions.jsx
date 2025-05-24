import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Gift,
  CreditCard,
  Users,
  Settings,
  HelpCircle,
  Download,
  Share,
} from "lucide-react";

function QuickActions({ onNavigate }) {
  const actions = [
    {
      title: "Redeem Rewards",
      description: "Cash out your earnings",
      icon: Gift,
      color: "bg-lime-500 hover:bg-lime-600",
      action: () => console.log("Redeem rewards"),
    },
    {
      title: "Link Card",
      description: "Add payment method",
      icon: CreditCard,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => console.log("Link card"),
    },
    {
      title: "Refer Friends",
      description: "Earn bonus rewards",
      icon: Users,
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => console.log("Refer friends"),
    },
    {
      title: "Download App",
      description: "Get mobile app",
      icon: Download,
      color: "bg-orange-500 hover:bg-orange-600",
      action: () => console.log("Download app"),
    },
    {
      title: "Share Profile",
      description: "Show your progress",
      icon: Share,
      color: "bg-pink-500 hover:bg-pink-600",
      action: () => console.log("Share profile"),
    },
    {
      title: "Settings",
      description: "Manage preferences",
      icon: Settings,
      color: "bg-gray-500 hover:bg-gray-600",
      action: () => console.log("Open settings"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05,
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
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="border-lime-200 h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-lime-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {actions.map((action, index) => (
              <motion.div
                key={action.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={action.action}
                  className={`w-full h-auto p-4 flex flex-col items-center gap-2 text-white ${action.color}`}
                >
                  <action.icon className="w-5 h-5" />
                  <div className="text-center">
                    <div className="font-medium text-xs">{action.title}</div>
                    <div className="text-xs opacity-80">
                      {action.description}
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <Button
              variant="outline"
              className="w-full border-lime-300 text-lime-600 hover:bg-lime-50"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Need Help?
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default QuickActions;
