import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Filter,
  Download,
} from "lucide-react";

function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      store: "Starbucks",
      logo: "☕",
      amount: -12.5,
      cashback: +1.0,
      date: "2024-01-15",
      time: "09:30 AM",
      status: "completed",
      category: "Food & Drink",
    },
    {
      id: 2,
      store: "Amazon",
      logo: "📦",
      amount: -89.99,
      cashback: +4.5,
      date: "2024-01-14",
      time: "02:15 PM",
      status: "pending",
      category: "Shopping",
    },
    {
      id: 3,
      store: "Uber",
      logo: "🚗",
      amount: -25.3,
      cashback: +3.04,
      date: "2024-01-14",
      time: "07:45 PM",
      status: "completed",
      category: "Transport",
    },
    {
      id: 4,
      store: "Target",
      logo: "🎯",
      amount: -156.78,
      cashback: +6.27,
      date: "2024-01-13",
      time: "11:20 AM",
      status: "completed",
      category: "Shopping",
    },
    {
      id: 5,
      store: "McDonald's",
      logo: "🍟",
      amount: -8.99,
      cashback: +0.54,
      date: "2024-01-12",
      time: "12:30 PM",
      status: "completed",
      category: "Food & Drink",
    },
    {
      id: 6,
      store: "Apple Store",
      logo: "🍎",
      amount: -299.0,
      cashback: +8.97,
      date: "2024-01-11",
      time: "03:45 PM",
      status: "completed",
      category: "Electronics",
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

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const exportTransactions = () => {
    // TODO: Implement transaction export
    console.log("Exporting transactions...");
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header with Actions */}
      <motion.div variants={itemVariants}>
        <Card className="border-lime-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-lime-600" />
                Recent Transactions
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-lime-300 text-lime-600 hover:bg-lime-50"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button
                  onClick={exportTransactions}
                  variant="outline"
                  size="sm"
                  className="border-gray-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Transactions List */}
      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="group"
          >
            <Card className="border-gray-200 hover:border-lime-300 hover:shadow-md transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{transaction.logo}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {transaction.store}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{transaction.date}</span>
                        <span>•</span>
                        <span>{transaction.time}</span>
                        <span>•</span>
                        <span>{transaction.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <ArrowDownLeft className="w-4 h-4 text-red-500" />
                        <span className="font-semibold text-gray-900">
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ArrowUpRight className="w-3 h-3 text-lime-500" />
                        <span className="text-lime-600 font-medium">
                          +${transaction.cashback.toFixed(2)} cashback
                        </span>
                      </div>
                    </div>

                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <motion.div variants={itemVariants} className="text-center">
        <Button
          variant="outline"
          className="border-lime-300 text-lime-600 hover:bg-lime-50"
        >
          Load More Transactions
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default RecentTransactions;
