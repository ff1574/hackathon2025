import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  X,
  Users,
  Copy,
  Mail,
  MessageCircle,
  Share2,
  Gift,
  CheckCircle,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

function ReferFriendsModal({ isOpen, onClose }) {
  const [referralCode] = useState("HACKATHON2025");
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sentEmails, setSentEmails] = useState([]);
  const { addNotification, referralStats, referFriend } = useApp();

  const shareOptions = [
    {
      id: "copy",
      title: "Copy Link",
      description: "Copy referral link",
      icon: Copy,
      color: "bg-gray-500 hover:bg-gray-600",
      action: () => copyReferralLink(),
    },
    {
      id: "email",
      title: "Email",
      description: "Send via email",
      icon: Mail,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => shareViaEmail(),
    },
    {
      id: "sms",
      title: "SMS",
      description: "Send via text",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      action: () => shareViaSMS(),
    },
    {
      id: "social",
      title: "Social",
      description: "Share on social media",
      icon: Share2,
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => shareOnSocial(),
    },
  ];

  const copyReferralLink = () => {
    const referralLink = `https://otpbank.com/join?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    addNotification({
      type: "success",
      title: "Link Copied!",
      message: "Referral link copied to clipboard.",
    });
  };

  const shareViaEmail = () => {
    const subject = "Join me on OTP Bank and earn cashback!";
    const body = `Hey! I've been earning amazing cashback with OTP Bank. Join using my referral code ${referralCode} and we both get 15€ bonus! https://otpbank.com/join?ref=${referralCode}`;
    window.open(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`
    );
  };

  const shareViaSMS = () => {
    const message = `Join me on OTP Bank! Use code ${referralCode} for 15€ bonus: https://otpbank.com/join?ref=${referralCode}`;
    window.open(`sms:?body=${encodeURIComponent(message)}`);
  };

  const shareOnSocial = () => {
    const text = `I'm earning amazing cashback with OTP Bank! Join me and get 15€ bonus with code ${referralCode}`;
    const url = `https://otpbank.com/join?ref=${referralCode}`;

    if (navigator.share) {
      navigator.share({ title: "OTP Bank Referral", text, url });
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`
      );
    }
  };

  const sendEmailInvite = async () => {
    if (!email) {
      addNotification({
        type: "error",
        title: "Email Required",
        message: "Please enter an email address.",
      });
      return;
    }

    setIsSending(true);

    // Simulate sending email
    await new Promise((resolve) => setTimeout(resolve, 2000));

    referFriend(email);
    setSentEmails([...sentEmails, email]);
    setEmail("");
    setIsSending(false);

    addNotification({
      type: "success",
      title: "Invitation Sent!",
      message: `Referral invitation sent to ${email}`,
    });
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
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto"
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
                  <Users className="w-5 h-5 text-lime-600" />
                  Refer Friends
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Invite friends and earn {referralStats.bonusPerReferral}€ for
                  each successful referral!
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Referral Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-lime-200 bg-lime-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-lime-600">
                        {referralStats.totalReferred}
                      </div>
                      <div className="text-sm text-gray-600">
                        Friends Referred
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {referralStats.bonusEarned}€
                      </div>
                      <div className="text-sm text-gray-600">Bonus Earned</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Referral Code */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Your Referral Code
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        {referralCode}
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={copyReferralLink}
                        variant="outline"
                        size="sm"
                        className="border-lime-300 text-lime-600 hover:bg-lime-50"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Share Options */}
                <div>
                  <h3 className="font-medium mb-3">Share your referral:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {shareOptions.map((option) => (
                      <motion.div
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={option.action}
                          className={`w-full h-auto p-4 flex flex-col items-center gap-2 text-white ${option.color}`}
                        >
                          <option.icon className="w-5 h-5" />
                          <div className="text-center">
                            <div className="font-medium text-xs">
                              {option.title}
                            </div>
                            <div className="text-xs opacity-80">
                              {option.description}
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Email Invitation */}
                <div>
                  <h3 className="font-medium mb-3">Send direct invitation:</h3>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="friend@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 border-lime-200 focus:border-lime-500"
                    />
                    <Button
                      onClick={sendEmailInvite}
                      disabled={isSending || !email}
                      className="bg-lime-500 hover:bg-lime-600 text-white"
                    >
                      {isSending ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Send
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Recent Invitations */}
                {sentEmails.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3">Recent invitations:</h3>
                    <div className="space-y-2">
                      {sentEmails.slice(-3).map((sentEmail, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 p-2 rounded"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Sent to {sentEmail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bonus Info */}
                <div className="bg-gradient-to-r from-lime-50 to-green-50 border border-lime-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-5 h-5 text-lime-600" />
                    <span className="font-medium text-lime-800">
                      Referral Bonus
                    </span>
                  </div>
                  <p className="text-sm text-lime-700">
                    You and your friend both get
                    {referralStats.bonusPerReferral}€ when they make their first
                    purchase!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ReferFriendsModal;
