import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";
import BackButton from "../components/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function CashbackPage({ onNavigate }) {
  const [cashbackData, setCashbackData] = useState({
    totalEarned: 0,
    availableBalance: 0,
    pendingRewards: 0,
  });

  const fetchCashbackData = () => {
    // TODO: Implement API call to fetch cashback data
    console.log("Fetching cashback data...");
    // Placeholder data
    setCashbackData({
      totalEarned: 125.5,
      availableBalance: 87.25,
      pendingRewards: 38.25,
    });
  };

  const redeemRewards = () => {
    // TODO: Implement reward redemption logic
    console.log("Redeeming rewards...");
  };

  const viewTransactionHistory = () => {
    // TODO: Implement transaction history view
    console.log("Viewing transaction history...");
  };

  const connectAccount = () => {
    // TODO: Implement account connection logic
    console.log("Connecting account...");
  };

  return (
    <PageLayout>
      <div className="min-h-screen p-4">
        <BackButton onBack={() => onNavigate("home")} />

        <motion.div
          className="max-w-4xl mx-auto mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              <span className="text-lime-500">Cashback</span> Rewards
            </h1>
            <p className="text-gray-600">Track and manage your rewards</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-lime-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Earned
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-lime-600">
                    ${cashbackData.totalEarned.toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-lime-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Available Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    ${cashbackData.availableBalance.toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-lime-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Pending Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    ${cashbackData.pendingRewards.toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-lime-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Activity
                  <Badge
                    variant="outline"
                    className="border-lime-500 text-lime-600"
                  >
                    Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  No recent transactions. Connect your account to start earning
                  rewards.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={fetchCashbackData}
                    className="bg-lime-500 hover:bg-lime-600 text-white"
                  >
                    Refresh Data
                  </Button>
                  <Button
                    onClick={redeemRewards}
                    variant="outline"
                    className="border-lime-500 text-lime-600 hover:bg-lime-50"
                  >
                    Redeem Rewards
                  </Button>
                  <Button
                    onClick={viewTransactionHistory}
                    variant="outline"
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    View History
                  </Button>
                  <Button
                    onClick={connectAccount}
                    variant="outline"
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    Connect Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  );
}

export default CashbackPage;
