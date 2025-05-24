import { motion } from "framer-motion";
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
} from "lucide-react";

function AchievementsBadges({ data }) {
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
    },
    {
      id: 2,
      title: "Streak Master",
      description: "20+ day spending streak",
      icon: Zap,
      earned: true,
      earnedDate: "2024-01-10",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
    {
      id: 3,
      title: "Big Spender",
      description: "Spent over $1000 in a month",
      icon: Crown,
      earned: true,
      earnedDate: "2024-01-15",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      id: 4,
      title: "Cashback King",
      description: "Earned $100+ in cashback",
      icon: Trophy,
      earned: false,
      progress: 87,
      target: 100,
      current: 87,
      color: "text-lime-500",
      bgColor: "bg-lime-100",
    },
    {
      id: 5,
      title: "Explorer",
      description: "Shopped at 10+ different stores",
      icon: Target,
      earned: false,
      progress: 60,
      target: 10,
      current: 6,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      id: 6,
      title: "Referral Champion",
      description: "Referred 5 friends",
      icon: Gift,
      earned: false,
      progress: 40,
      target: 5,
      current: 2,
      color: "text-pink-500",
      bgColor: "bg-pink-100",
    },
  ];

  const milestones = [
    {
      title: "Total Earned",
      current: data.totalEarned,
      target: 3000,
      unit: "$",
      color: "lime",
    },
    {
      title: "Stores Visited",
      current: 8,
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
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card
                className={`border-2 transition-all duration-300 ${
                  achievement.earned
                    ? "border-lime-300 bg-lime-50"
                    : "border-gray-200 hover:border-lime-200"
                }`}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div
                    className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                      achievement.earned ? achievement.bgColor : "bg-gray-100"
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    <achievement.icon
                      className={`w-8 h-8 ${
                        achievement.earned ? achievement.color : "text-gray-400"
                      }`}
                    />
                  </div>

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
                      <Badge className="bg-lime-100 text-lime-800">
                        ✓ Earned
                      </Badge>
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
                      <Progress value={achievement.progress} className="h-2" />
                      <Badge variant="outline" className="border-gray-300">
                        {achievement.progress}% Complete
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
  );
}

export default AchievementsBadges;
