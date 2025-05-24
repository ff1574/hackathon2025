import { useState } from "react";
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
import { useApp } from "../../context/AppContext";
import RedeemRewardsModal from "./RedeemRewardsModal";
import ReferFriendsModal from "./ReferFriendsModal";

function QuickActions({ onNavigate }) {
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showReferModal, setShowReferModal] = useState(false);
  const { addNotification } = useApp();

  const handleLinkCard = () => {
    // TODO: Implement card linking
    console.log("Link card clicked");
    addNotification({
      type: "info",
      title: "Card Linking",
      message: "Redirecting to secure card linking page...",
    });
  };

  const handleDownloadApp = () => {
    // TODO: Implement app download
    console.log("Download app clicked");
    addNotification({
      type: "success",
      title: "Download Started",
      message: "OTP Bank mobile app download has started.",
    });
  };

  const handleShareProfile = () => {
    // TODO: Implement profile sharing
    console.log("Share profile clicked");
    if (navigator.share) {
      navigator.share({
        title: "Check out my OTP Bank cashback progress!",
        text: "I'm earning amazing cashback rewards with OTP Bank. Join me!",
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      addNotification({
        type: "success",
        title: "Link Copied",
        message: "Profile link copied to clipboard!",
      });
    }
  };

  const handleSettings = () => {
    // TODO: Implement settings navigation
    console.log("Settings clicked");
    addNotification({
      type: "info",
      title: "Settings",
      message: "Opening account settings...",
    });
  };

  const actions = [
    {
      title: "Redeem Rewards",
      description: "Cash out your earnings",
      icon: Gift,
      color: "bg-lime-500 hover:bg-lime-600",
      action: () => setShowRedeemModal(true),
    },
    {
      title: "Link Card",
      description: "Add payment method",
      icon: CreditCard,
      color: "bg-blue-500 hover:bg-blue-600",
      action: handleLinkCard,
    },
    {
      title: "Refer Friends",
      description: "Earn bonus rewards",
      icon: Users,
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => setShowReferModal(true),
    },
    {
      title: "Download App",
      description: "Get mobile app",
      icon: Download,
      color: "bg-orange-500 hover:bg-orange-600",
      action: handleDownloadApp,
    },
    {
      title: "Share Profile",
      description: "Show your progress",
      icon: Share,
      color: "bg-pink-500 hover:bg-pink-600",
      action: handleShareProfile,
    },
    {
      title: "Settings",
      description: "Manage preferences",
      icon: Settings,
      color: "bg-gray-500 hover:bg-gray-600",
      action: handleSettings,
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
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={action.action}
                    className={`w-full h-auto p-4 flex flex-col items-center gap-2 text-white transition-all duration-200 shadow-lg hover:shadow-xl ${action.color}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <action.icon className="w-5 h-5" />
                    </motion.div>
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
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full border-lime-300 text-lime-600 hover:bg-lime-50 transition-all duration-200"
                  onClick={() => {
                    addNotification({
                      type: "info",
                      title: "Help Center",
                      message: "Opening help and support center...",
                    });
                    window.open(
                      "https://www.otpbanka.hr/en/otp-contacts",
                      "_blank"
                    );
                  }}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Need Help?
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modals */}
      <RedeemRewardsModal
        isOpen={showRedeemModal}
        onClose={() => setShowRedeemModal(false)}
      />
      <ReferFriendsModal
        isOpen={showReferModal}
        onClose={() => setShowReferModal(false)}
      />
    </>
  );
}

export default QuickActions;
