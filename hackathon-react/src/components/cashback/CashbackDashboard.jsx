import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  DollarSign,
  Target,
  Award,
  RefreshCw,
  Zap,
  Trophy,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

function CashbackDashboard({ data, onRefresh }) {
  const { addNotification, completedGoals } = useApp();
  const progressToGoal = (data.totalEarned / data.nextGoal) * 100;
  const isGoalCompleted = progressToGoal >= 100;

  const stats = [
    {
      title: "Account Balance",
      value: `${data.accountBalance.toFixed(2)}€`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "+12.5%",
      changeType: "positive",
    },
    {
      title: "Total Savings",
      value: `${data.totalSavings.toFixed(2)}€`,
      icon: TrendingUp,
      color: "text-lime-600",
      bgColor: "bg-lime-100",
      change: "+8.3%",
      changeType: "positive",
    },
    {
      title: "Monthly Earnings",
      value: `${data.monthlyEarnings.toFixed(2)}€`,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+15.2%",
      changeType: "positive",
    },
    {
      title: "Available Rewards",
      value: `${data.availableBalance.toFixed(2)}€`,
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: "+5.7%",
      changeType: "positive",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="border-lime-200 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <Badge
                        variant="outline"
                        className="text-xs border-lime-300 text-lime-600"
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-full ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Progress and Ranking Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goal Progress */}
        <motion.div variants={itemVariants}>
          <Card
            className={`border-lime-200 ${
              isGoalCompleted
                ? "bg-gradient-to-br from-green-50 to-lime-50"
                : ""
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isGoalCompleted ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Target className="w-5 h-5 text-lime-600" />
                )}
                {isGoalCompleted ? "Goal Completed!" : "Goal Progress"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isGoalCompleted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-4"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                    className="text-4xl mb-2"
                  >
                    🎉
                  </motion.div>
                  <h3 className="text-lg font-bold text-green-600 mb-2">
                    Congratulations!
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    You've reached your goal of {data.nextGoal - 1000}€!
                  </p>
                  <Badge className="bg-green-100 text-green-800 px-4 py-2">
                    ✓ Goal Achieved
                  </Badge>
                  <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                    <p className="text-sm text-gray-600">
                      Next goal: {data.nextGoal.toFixed(2)}€
                    </p>
                    <Progress
                      value={(data.totalEarned / data.nextGoal) * 100}
                      className="h-2 mt-2"
                    />
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {data.totalEarned.toFixed(2)}€ of{" "}
                      {data.nextGoal.toFixed(2)}€
                    </span>
                    <Badge className="bg-lime-100 text-lime-800">
                      {progressToGoal.toFixed(1)}%
                    </Badge>
                  </div>
                  <Progress value={progressToGoal} className="h-3" />
                  <p className="text-xs text-gray-500">
                    {(data.nextGoal - data.totalEarned).toFixed(2)}€ left to
                    reach your goal
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Ranking Card */}
        <motion.div variants={itemVariants}>
          <Card className="border-lime-200 bg-gradient-to-br from-lime-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-lime-600" />
                Your Ranking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-lime-600">
                  #{data.rank}
                </div>
                <p className="text-sm text-gray-600">
                  out of {data.totalUsers.toLocaleString()} users
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium">
                  {data.streakDays} day streak!
                </span>
              </div>
              {completedGoals.length > 0 && (
                <div className="text-center">
                  <Badge
                    variant="outline"
                    className="border-gold text-yellow-700"
                  >
                    🏆 {completedGoals.length} Goals Completed
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CashbackDashboard;
