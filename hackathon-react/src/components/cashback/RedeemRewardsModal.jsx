import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  X,
  DollarSign,
  CreditCard,
  Smartphone,
  Gift,
  CheckCircle,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

function RedeemRewardsModal({ isOpen, onClose }) {
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { addNotification, availableBalance, redeemRewards } = useApp();

  const redeemMethods = [
    {
      id: "bank",
      title: "Bank Transfer",
      description: "Direct to your bank account",
      icon: CreditCard,
      minAmount: 10,
      fee: 0,
      processingTime: "1-2 business days",
    },
    {
      id: "paypal",
      title: "PayPal",
      description: "Instant transfer to PayPal",
      icon: Smartphone,
      minAmount: 5,
      fee: 0.5,
      processingTime: "Instant",
    },
    {
      id: "giftcard",
      title: "Gift Cards",
      description: "Various store gift cards",
      icon: Gift,
      minAmount: 25,
      fee: 0,
      processingTime: "Instant",
    },
  ];

  const handleRedeem = async () => {
    if (
      !amount ||
      Number.parseFloat(amount) <
        redeemMethods.find((m) => m.id === selectedMethod).minAmount
    ) {
      addNotification({
        type: "error",
        title: "Invalid Amount",
        message: `Minimum redemption amount is $${
          redeemMethods.find((m) => m.id === selectedMethod).minAmount
        }`,
      });
      return;
    }

    if (Number.parseFloat(amount) > availableBalance) {
      addNotification({
        type: "error",
        title: "Insufficient Balance",
        message: "You don't have enough rewards to redeem this amount.",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const success = redeemRewards(Number.parseFloat(amount), selectedMethod);

    setIsProcessing(false);

    if (success) {
      setIsSuccess(true);
      addNotification({
        type: "success",
        title: "Redemption Successful!",
        message: `$${amount} has been redeemed via ${
          redeemMethods.find((m) => m.id === selectedMethod).title
        }`,
      });

      setTimeout(() => {
        setIsSuccess(false);
        setAmount("");
        onClose();
      }, 3000);
    }
  };

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg"
          >
            <Card className="border-lime-200 shadow-2xl">
              <CardHeader className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-lime-600" />
                  Redeem Rewards
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Available balance:
                  </span>
                  <Badge className="bg-lime-100 text-lime-800 font-bold">
                    ${availableBalance.toFixed(2)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <AnimatePresence mode="wait">
                  {!isProcessing && !isSuccess && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Redemption Methods */}
                      <div>
                        <h3 className="font-medium mb-3">
                          Choose redemption method:
                        </h3>
                        <div className="space-y-2">
                          {redeemMethods.map((method) => (
                            <motion.div
                              key={method.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Card
                                className={`cursor-pointer transition-all duration-200 ${
                                  selectedMethod === method.id
                                    ? "border-lime-500 bg-lime-50"
                                    : "border-gray-200 hover:border-lime-300"
                                }`}
                                onClick={() => setSelectedMethod(method.id)}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <method.icon className="w-5 h-5 text-gray-600" />
                                    <div className="flex-1">
                                      <div className="font-medium">
                                        {method.title}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        {method.description}
                                      </div>
                                      <div className="text-xs text-gray-500 mt-1">
                                        Min: ${method.minAmount} • Fee: $
                                        {method.fee} • {method.processingTime}
                                      </div>
                                    </div>
                                    {selectedMethod === method.id && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-4 h-4 bg-lime-500 rounded-full flex items-center justify-center"
                                      >
                                        <CheckCircle className="w-3 h-3 text-white" />
                                      </motion.div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Amount Input */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Amount to redeem:
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="pl-10 border-lime-200 focus:border-lime-500"
                            min={
                              redeemMethods.find((m) => m.id === selectedMethod)
                                ?.minAmount || 0
                            }
                            max={availableBalance}
                            step="0.01"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>
                            Min: $
                            {
                              redeemMethods.find((m) => m.id === selectedMethod)
                                ?.minAmount
                            }
                          </span>
                          <span>Max: ${availableBalance.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Quick Amount Buttons */}
                      <div className="flex gap-2">
                        {[25, 50, 100].map((quickAmount) => (
                          <Button
                            key={quickAmount}
                            variant="outline"
                            size="sm"
                            onClick={() => setAmount(quickAmount.toString())}
                            disabled={quickAmount > availableBalance}
                            className="flex-1 border-lime-300 text-lime-600 hover:bg-lime-50"
                          >
                            ${quickAmount}
                          </Button>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setAmount(availableBalance.toString())}
                          className="flex-1 border-lime-300 text-lime-600 hover:bg-lime-50"
                        >
                          Max
                        </Button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={onClose}
                          className="flex-1 border-gray-300"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleRedeem}
                          className="flex-1 bg-lime-500 hover:bg-lime-600 text-white"
                          disabled={!amount || Number.parseFloat(amount) <= 0}
                        >
                          Redeem ${amount || "0.00"}
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {isProcessing && (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="w-12 h-12 border-4 border-lime-200 border-t-lime-500 rounded-full mx-auto mb-4"
                      />
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Processing redemption...
                      </h3>
                      <p className="text-sm text-gray-600">
                        Please wait while we process your request.
                      </p>
                    </motion.div>
                  )}

                  {isSuccess && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          delay: 0.2,
                        }}
                        className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckCircle className="w-8 h-8 text-lime-600" />
                      </motion.div>
                      <h3 className="font-bold text-xl text-gray-900 mb-2">
                        Redemption Successful! 🎉
                      </h3>
                      <p className="text-sm text-gray-600">
                        ${amount} has been redeemed via{" "}
                        {
                          redeemMethods.find((m) => m.id === selectedMethod)
                            ?.title
                        }
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RedeemRewardsModal;
