import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
} from "lucide-react";
import { useApp } from "../../context/AppContext";

function AchievementsBadges({ data }) {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const { storesVisited, totalRedemptions, activatedOffers, referralStats } =
    useApp();

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
      celebration: "👑 You're royalty in the spending kingdom!",
    },
    {
      id: 4,
      title: "Cashback King",
      description: "Earned 100€+ in cashback",
      icon: Trophy,
      earned: data.availableBalance >= 100,
      earnedDate: data.availableBalance >= 100 ? "2024-01-20" : null,
      progress: Math.min((data.availableBalance / 100) * 100, 100),
      target: 100,
      current: data.availableBalance,
      color: "text-lime-500",
      bgColor: "bg-lime-100",
      celebration: "🏆 You've mastered the art of cashback!",
    },
    {
      id: 5,
      title: "Explorer",
      description: "Shopped at 10+ different stores",
      icon: Target,
      earned: storesVisited >= 10,
      earnedDate: storesVisited >= 10 ? "2024-01-25" : null,
      progress: Math.min((storesVisited / 10) * 100, 100),
      target: 10,
      current: storesVisited,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      celebration: "🗺️ You're a true shopping explorer!",
    },
    {
      id: 6,
      title: "Referral Champion",
      description: "Referred 5 friends",
      icon: Gift,
      earned: referralStats.totalReferred >= 5,
      earnedDate: referralStats.totalReferred >= 5 ? "2024-01-30" : null,
      progress: Math.min((referralStats.totalReferred / 5) * 100, 100),
      target: 5,
      current: referralStats.totalReferred,
      color: "text-pink-500",
      bgColor: "bg-pink-100",
      celebration: "🎁 You're spreading the cashback love!",
    },
    {
      id: 7,
      title: "Offer Collector",
      description: "Activated 15+ offers",
      icon: CheckCircle,
      earned: activatedOffers.length >= 15,
      earnedDate: activatedOffers.length >= 15 ? "2024-02-01" : null,
      progress: Math.min((activatedOffers.length / 15) * 100, 100),
      target: 15,
      current: activatedOffers.length,
      color: "text-green-500",
      bgColor: "bg-green-100",
      celebration: "✅ You're an offer collecting master!",
    },
    {
      id: 8,
      title: "Redemption Pro",
      description: "Redeemed rewards 10+ times",
      icon: TrendingUp,
      earned: totalRedemptions >= 10,
      earnedDate: totalRedemptions >= 10 ? "2024-02-05" : null,
      progress: Math.min((totalRedemptions / 10) * 100, 100),
      target: 10,
      current: totalRedemptions,
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
      celebration: "💰 You know how to cash in on rewards!",
    },
  ];

  const milestones = [
    {
      title: "Total Earned",
      current: data.totalEarned,
      target: 3000,
      unit: "€",
      color: "lime",
    },
    {
      title: "Stores Visited",
      current: storesVisited,
      target: 15,
      unit: "",
      color: "blue",
    },
    {
      title: "Streak Days",
      current: data.streakDays,
      target: 30,
      unit: "",
      color: "orange",
    },
    {
      title: "Active Offers",
      current: activatedOffers.length,
      target: 20,
      unit: "",
      color: "green",
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

  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement);
  };

  const closeAchievementModal = () => {
    setSelectedAchievement(null);
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Milestones Progress */}
        <motion.div variants={itemVariants}>
          <Card className="border-lime-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-lime-600" />
                Progress Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {milestones.map((milestone, index) => {
                const progress = (milestone.current / milestone.target) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{milestone.title}</span>
                      <span className="text-sm text-gray-600">
                        {milestone.unit}
                        {milestone.current} / {milestone.unit}
                        {milestone.target}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-lime-500" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
                onClick={() => handleAchievementClick(achievement)}
              >
                <Card
                  className={`border-2 transition-all duration-300 ${
                    achievement.earned
                      ? "border-lime-300 bg-lime-50 shadow-md hover:shadow-lg"
                      : "border-gray-200 hover:border-lime-200 hover:shadow-md"
                  }`}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <motion.div
                      className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                        achievement.earned ? achievement.bgColor : "bg-gray-100"
                      } group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{
                        rotate: achievement.earned ? [0, -10, 10, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <achievement.icon
                        className={`w-8 h-8 ${
                          achievement.earned
                            ? achievement.color
                            : "text-gray-400"
                        }`}
                      />
                    </motion.div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                    </div>

                    {achievement.earned ? (
                      <div className="space-y-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Badge className="bg-lime-100 text-lime-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Earned
                          </Badge>
                        </motion.div>
                        <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {achievement.earnedDate}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          {achievement.current} / {achievement.target}
                        </div>
                        <Progress
                          value={achievement.progress}
                          className="h-2"
                        />
                        <Badge variant="outline" className="border-gray-300">
                          {achievement.progress.toFixed(0)}% Complete
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div variants={itemVariants}>
          <Card className="border-lime-200 bg-gradient-to-br from-lime-50 to-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-lime-600">
                    {achievements.filter((a) => a.earned).length}
                  </div>
                  <div className="text-sm text-gray-600">Earned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {achievements.filter((a) => !a.earned).length}
                  </div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(
                      (achievements.filter((a) => a.earned).length /
                        achievements.length) *
                        100
                    )}
                    %
                  </div>
                  <div className="text-sm text-gray-600">Completion</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeAchievementModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="border-lime-200 shadow-2xl overflow-hidden">
                <div
                  className={`h-2 bg-gradient-to-r ${
                    selectedAchievement.earned
                      ? "from-lime-400 to-green-500"
                      : "from-gray-300 to-gray-400"
                  }`}
                />

                <CardHeader className="relative text-center">
                  <button
                    onClick={closeAchievementModal}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <motion.div
                    className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                      selectedAchievement.earned
                        ? selectedAchievement.bgColor
                        : "bg-gray-100"
                    }`}
                    animate={
                      selectedAchievement.earned
                        ? {
                            scale: [1, 1.1, 1],
                            rotate: [0, -5, 5, 0],
                          }
                        : {}
                    }
                    transition={{ duration: 0.6, repeat: 2 }}
                  >
                    <selectedAchievement.icon
                      className={`w-10 h-10 ${
                        selectedAchievement.earned
                          ? selectedAchievement.color
                          : "text-gray-400"
                      }`}
                    />
                  </motion.div>

                  <CardTitle className="text-xl mb-2">
                    {selectedAchievement.title}
                  </CardTitle>
                  <p className="text-gray-600">
                    {selectedAchievement.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {selectedAchievement.earned ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <motion.div
                        className="text-4xl mb-3"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: 3 }}
                      >
                        🎉
                      </motion.div>
                      <h3 className="font-bold text-lg text-green-600 mb-2">
                        Achievement Unlocked!
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {selectedAchievement.celebration}
                      </p>
                      <Badge className="bg-green-100 text-green-800 px-4 py-2">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed on {selectedAchievement.earnedDate}
                      </Badge>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Progress
                        </h3>
                        <div className="text-2xl font-bold text-lime-600 mb-1">
                          {selectedAchievement.current} /{" "}
                          {selectedAchievement.target}
                        </div>
                        <Progress
                          value={selectedAchievement.progress}
                          className="h-3 mb-2"
                        />
                        <p className="text-sm text-gray-600">
                          {selectedAchievement.progress.toFixed(0)}% Complete
                        </p>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-700">
                          Keep going! You need{" "}
                          {selectedAchievement.target -
                            selectedAchievement.current}{" "}
                          more to unlock this achievement.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AchievementsBadges;
