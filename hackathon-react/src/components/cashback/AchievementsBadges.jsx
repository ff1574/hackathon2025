import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Star,
  Zap,
  Target,
  Crown,
  Gift,
  TrendingUp,
  Calendar,
  CheckCircle,
  X,
  Lock,
  Users,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

function AchievementsBadges({ data }) {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const { storesVisited, totalRedemptions, activatedOffers, referralStats } =
    useApp();

  useEffect(() => {
    if (selectedAchievement) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedAchievement]);

  const achievements = [
    {
      id: 1,
      title: "First Purchase",
      description: "Made your first cashback purchase",
      icon: Star,
      earned: true,
      earnedDate: "2024-01-01",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
      celebration: "🌟 Welcome to the cashback world!",
      progress: 100,
      target: 1,
      current: 1,
    },
    {
      id: 2,
      title: "Streak Master",
      description: "20+ day spending streak",
      icon: Zap,
      earned: data.streakDays >= 20,
      earnedDate: data.streakDays >= 20 ? "2024-01-10" : null,
      progress: Math.min((data.streakDays / 20) * 100, 100),
      target: 20,
      current: data.streakDays,
      color: "text-orange-500",
      bgColor: "bg-orange-100",
      celebration: "⚡ You're on fire! Keep the streak alive!",
    },
    {
      id: 3,
      title: "Big Spender",
      description: "Spent over 1000€ in total",
      icon: Crown,
      earned: data.totalEarned >= 1000,
      earnedDate: data.totalEarned >= 1000 ? "2024-01-15" : null,
      progress: Math.min((data.totalEarned / 1000) * 100, 100),
      target: 1000,
      current: data.totalEarned,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      celebration: "👑 You're cashback royalty!",
    },
    {
      id: 4,
      title: "Store Explorer",
      description: "Shop at 10+ different stores",
      icon: Target,
      earned: storesVisited >= 10,
      earnedDate: storesVisited >= 10 ? "2024-01-20" : null,
      progress: Math.min((storesVisited / 10) * 100, 100),
      target: 10,
      current: storesVisited,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      celebration: "🎯 Master explorer of deals!",
    },
    {
      id: 5,
      title: "Referral Champion",
      description: "Refer 5+ friends",
      icon: Users,
      earned: referralStats.totalReferred >= 5,
      earnedDate: referralStats.totalReferred >= 5 ? "2024-01-25" : null,
      progress: Math.min((referralStats.totalReferred / 5) * 100, 100),
      target: 5,
      current: referralStats.totalReferred,
      color: "text-green-500",
      bgColor: "bg-green-100",
      celebration: "🤝 Sharing is caring champion!",
    },
    {
      id: 6,
      title: "Redemption Master",
      description: "Redeem rewards 10+ times",
      icon: Gift,
      earned: totalRedemptions >= 10,
      earnedDate: totalRedemptions >= 10 ? "2024-02-01" : null,
      progress: Math.min((totalRedemptions / 10) * 100, 100),
      target: 10,
      current: totalRedemptions,
      color: "text-pink-500",
      bgColor: "bg-pink-100",
      celebration: "🎁 Reward redemption expert!",
    },
  ];

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: { opacity: 0, scale: 0.8, y: 50 },
  };

  const modalContent = selectedAchievement && (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        onClick={() => setSelectedAchievement(null)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          margin: 0,
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md"
          style={{ maxHeight: "90vh", overflowY: "auto" }}
        >
          <Card className="border-lime-200 shadow-2xl overflow-hidden">
            <CardHeader className="relative text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-2 right-2 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>

              <div
                className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  selectedAchievement.earned
                    ? selectedAchievement.bgColor
                    : "bg-gray-200"
                }`}
              >
                {selectedAchievement.earned ? (
                  <selectedAchievement.icon
                    className={`w-10 h-10 ${selectedAchievement.color}`}
                  />
                ) : (
                  <Lock className="w-10 h-10 text-gray-400" />
                )}
              </div>

              <CardTitle className="text-xl mb-2">
                {selectedAchievement.title}
              </CardTitle>
              <p className="text-gray-600 text-sm">
                {selectedAchievement.description}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {selectedAchievement.earned ? (
                <div className="text-center">
                  <div className="bg-gradient-to-r from-lime-50 to-green-50 border border-lime-200 rounded-lg p-4 mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    </motion.div>
                    <p className="font-medium text-green-800 mb-1">
                      Achievement Unlocked!
                    </p>
                    <p className="text-sm text-green-700">
                      {selectedAchievement.celebration}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Earned on {selectedAchievement.earnedDate}
                  </Badge>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedAchievement.progress.toFixed(0)}% Complete
                    </div>
                    <Progress
                      value={selectedAchievement.progress}
                      className="h-3 w-full mb-2"
                    />
                    <p className="text-sm text-gray-600">
                      {selectedAchievement.current} of{" "}
                      {selectedAchievement.target} completed
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      Keep going! You need{" "}
                      {selectedAchievement.target - selectedAchievement.current}{" "}
                      more to unlock this achievement.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => setSelectedAchievement(achievement)}
          >
            <Card
              className={`relative overflow-hidden border-2 transition-all duration-300 ${
                achievement.earned
                  ? "border-lime-300 bg-gradient-to-br from-lime-50 to-green-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <CardContent className="p-4 text-center">
                <div
                  className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                    achievement.earned ? achievement.bgColor : "bg-gray-200"
                  }`}
                >
                  {achievement.earned ? (
                    <achievement.icon
                      className={`w-6 h-6 ${achievement.color}`}
                    />
                  ) : (
                    <Lock className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <h3 className="font-medium text-sm mb-1">
                  {achievement.title}
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  {achievement.description}
                </p>
                {achievement.earned ? (
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    ✓ Earned
                  </Badge>
                ) : (
                  <div className="space-y-1">
                    <Progress
                      value={achievement.progress}
                      className="h-2 w-full"
                    />
                    <div className="text-xs text-gray-500">
                      {achievement.current}/{achievement.target}
                    </div>
                  </div>
                )}
                {achievement.earned && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedAchievement && typeof document !== "undefined"
        ? createPortal(modalContent, document.body)
        : null}
    </>
  );
}

export default AchievementsBadges;
