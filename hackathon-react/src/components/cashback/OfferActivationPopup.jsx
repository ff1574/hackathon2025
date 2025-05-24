import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, CheckCircle, Star, Clock, Info, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";

function OfferActivationPopup({ offer, isOpen, onClose }) {
  const [activationStep, setActivationStep] = useState("confirming"); // confirming, activating, success
  const { addNotification } = useApp();

  useEffect(() => {
    if (isOpen && offer) {
      setActivationStep("confirming");
    }
  }, [isOpen, offer]);

  const handleActivate = async () => {
    setActivationStep("activating");

    // Simulate activation process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setActivationStep("success");

    // Add success notification
    addNotification({
      type: "success",
      title: "Offer Activated!",
      message: `${offer.store} offer is now active on your account.`,
    });

    // Auto close after success animation
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: 15,
      transition: {
        duration: 0.2,
      },
    },
  };

  const successVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
  };

  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
  };

  if (!offer) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="border-lime-200 shadow-2xl overflow-hidden">
              {/* Header with gradient */}
              <div className={`h-2 bg-gradient-to-r ${offer.color}`} />

              <CardHeader className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </Button>

                <div className="flex items-center gap-4 pr-8">
                  <motion.div
                    className="text-4xl"
                    animate={{
                      rotate: activationStep === "activating" ? 360 : 0,
                      scale: activationStep === "success" ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      rotate: {
                        duration: 1,
                        repeat:
                          activationStep === "activating"
                            ? Number.POSITIVE_INFINITY
                            : 0,
                      },
                      scale: { duration: 0.5 },
                    }}
                  >
                    {offer.logo}
                  </motion.div>
                  <div>
                    <CardTitle className="text-xl">{offer.store}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">
                          {offer.rating}
                        </span>
                      </div>
                      <Badge className="bg-lime-100 text-lime-800 text-sm font-bold">
                        {offer.cashback}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Offer Details */}
                <div className="space-y-3">
                  <p className="text-gray-700">{offer.description}</p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-900 mb-1">
                          Terms & Conditions
                        </p>
                        <p className="text-xs text-blue-700">{offer.terms}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>Expires in {offer.expires}</span>
                    </div>
                  </div>
                </div>

                {/* Activation States */}
                <AnimatePresence mode="wait">
                  {activationStep === "confirming" && (
                    <motion.div
                      key="confirming"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Activate this offer?
                        </h3>
                        <p className="text-sm text-gray-600">
                          This offer will be added to your active offers and
                          you'll start earning cashback immediately.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          onClick={onClose}
                          variant="outline"
                          className="flex-1 border-gray-300"
                        >
                          Cancel
                        </Button>
                        <motion.div
                          className="flex-1"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            onClick={handleActivate}
                            className="w-full bg-lime-500 hover:bg-lime-600 text-white"
                          >
                            Activate Offer
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {activationStep === "activating" && (
                    <motion.div
                      key="activating"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
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
                        Activating offer...
                      </h3>
                      <p className="text-sm text-gray-600">
                        Please wait while we set up your cashback.
                      </p>
                    </motion.div>
                  )}

                  {activationStep === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 relative"
                    >
                      {/* Success Animation */}
                      <motion.div
                        variants={successVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative"
                      >
                        <motion.div
                          className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <CheckCircle className="w-8 h-8 text-lime-600" />
                        </motion.div>

                        {/* Sparkles */}
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            variants={sparkleVariants}
                            initial="hidden"
                            animate="visible"
                            className="absolute"
                            style={{
                              top: `${20 + Math.random() * 60}%`,
                              left: `${20 + Math.random() * 60}%`,
                            }}
                          >
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                          </motion.div>
                        ))}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          Offer Activated! 🎉
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          You're now earning {offer.cashback} cashback at{" "}
                          {offer.store}
                        </p>
                        <Badge className="bg-lime-100 text-lime-800 px-4 py-2">
                          ✓ Active in your wallet
                        </Badge>
                      </motion.div>
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

export default OfferActivationPopup;
