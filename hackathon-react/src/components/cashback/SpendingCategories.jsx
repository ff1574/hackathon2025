import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Utensils,
  Car,
  ShoppingBag,
  Coffee,
  Home,
  Smartphone,
} from "lucide-react";

function SpendingCategories() {
  const categories = [
    {
      name: "Food & Dining",
      amount: 456.78,
      percentage: 35,
      icon: Utensils,
      color: "bg-red-500",
      lightColor: "bg-red-100",
      textColor: "text-red-600",
    },
    {
      name: "Transportation",
      amount: 234.56,
      percentage: 18,
      icon: Car,
      color: "bg-blue-500",
      lightColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      name: "Shopping",
      amount: 345.67,
      percentage: 26,
      icon: ShoppingBag,
      color: "bg-purple-500",
      lightColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      name: "Coffee & Drinks",
      amount: 123.45,
      percentage: 9,
      icon: Coffee,
      color: "bg-orange-500",
      lightColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
    {
      name: "Home & Garden",
      amount: 89.12,
      percentage: 7,
      icon: Home,
      color: "bg-green-500",
      lightColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      name: "Electronics",
      amount: 67.89,
      percentage: 5,
      icon: Smartphone,
      color: "bg-gray-500",
      lightColor: "bg-gray-100",
      textColor: "text-gray-600",
    },
  ];

  const totalSpent = categories.reduce((sum, cat) => sum + cat.amount, 0);

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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
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
            <PieChart className="w-5 h-5 text-lime-600" />
            Spending Categories
          </CardTitle>
          <p className="text-sm text-gray-600">
            Total spent this month: {totalSpent.toFixed(2)}€
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${category.lightColor}`}>
                    <category.icon
                      className={`w-4 h-4 ${category.textColor}`}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs text-gray-500">
                      {category.amount.toFixed(2)}€
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {category.percentage}%
                  </div>
                </div>
              </div>
              <Progress value={category.percentage} className="h-2" />
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default SpendingCategories;
