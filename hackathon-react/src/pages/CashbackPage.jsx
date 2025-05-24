import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";
import BackButton from "../components/BackButton";
import CashbackDashboard from "../components/cashback/CashbackDashboard";
import OffersSection from "../components/cashback/OffersSection";
import RecentTransactions from "../components/cashback/RecentTransactions";
import AchievementsBadges from "../components/cashback/AchievementsBadges";
import SpendingCategories from "../components/cashback/SpendingCategories";
import QuickActions from "../components/cashback/QuickActions";
import { useApp } from "../context/AppContext";

function CashbackPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const {
    addNotification,
    refreshCashbackData,
    accountBalance,
    totalSavings,
    monthlyEarnings,
    totalEarned,
    availableBalance,
    pendingRewards,
    rank,
    totalUsers,
    streakDays,
    nextGoal,
  } = useApp();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      addNotification({
        type: "success",
        title: "Welcome back!",
        message: "Your cashback data has been updated.",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "offers", label: "Offers", icon: "🎯" },
    { id: "transactions", label: "Transactions", icon: "📋" },
    { id: "achievements", label: "Achievements", icon: "🏆" },
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <CashbackDashboard
              data={{
                accountBalance,
                totalSavings,
                monthlyEarnings,
                totalEarned,
                availableBalance,
                pendingRewards,
                rank,
                totalUsers,
                streakDays,
                nextGoal,
              }}
              onRefresh={refreshCashbackData}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SpendingCategories />
              <QuickActions onNavigate={onNavigate} />
            </div>
          </div>
        );
      case "offers":
        return <OffersSection />;
      case "transactions":
        return <RecentTransactions />;
      case "achievements":
        return (
          <AchievementsBadges
            data={{
              accountBalance,
              totalSavings,
              monthlyEarnings,
              totalEarned,
              availableBalance,
              pendingRewards,
              rank,
              totalUsers,
              streakDays,
              nextGoal,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-lime-50 to-white">
        <div className="p-4 max-w-7xl mx-auto">
          <BackButton onBack={() => onNavigate("home")} />

          <motion.div
            className="mt-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                <span className="text-lime-500">Cashback</span> Hub
              </h1>
              <p className="text-gray-600 text-lg">
                Track, earn, and maximize your rewards
              </p>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl p-2 shadow-lg border border-lime-100">
                <div className="flex space-x-1">
                  {tabs.map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                        activeTab === tab.id
                          ? "bg-lime-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-lime-50 hover:text-lime-600"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{tab.icon}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}

export default CashbackPage;
