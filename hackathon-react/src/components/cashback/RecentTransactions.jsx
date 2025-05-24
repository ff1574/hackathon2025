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
import { useApp } from "../../context/AppContext";

function RecentTransactions() {
  const { transactions } = useApp();

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
        {transactions.slice(0, 10).map((transaction, index) => (
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
