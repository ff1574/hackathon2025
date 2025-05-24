import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);

  // Cashback state variables
  const [accountBalance, setAccountBalance] = useState(1247.83);
  const [totalSavings, setTotalSavings] = useState(892.45);
  const [monthlyEarnings, setMonthlyEarnings] = useState(156.78);
  const [totalEarned, setTotalEarned] = useState(2340.67);
  const [availableBalance, setAvailableBalance] = useState(187.25);
  const [pendingRewards, setPendingRewards] = useState(38.25);
  const [rank, setRank] = useState(12);
  const [totalUsers] = useState(1543);
  const [streakDays, setStreakDays] = useState(23);
  const [nextGoal] = useState(2500);
  const [activatedOffers, setActivatedOffers] = useState([]);
  const [referralStats, setReferralStats] = useState({
    totalReferred: 8,
    bonusEarned: 120.5,
    pendingInvites: 3,
    bonusPerReferral: 15.0,
  });
  const [transactions, setTransactions] = useState([
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
  ]);

  // TODO: Implement user authentication methods
  const login = (userData) => {
    console.log("Login method called", userData);
    setUser(userData);
  };

  const logout = () => {
    console.log("Logout method called");
    setUser(null);
  };

  // TODO: Implement theme switching
  const toggleTheme = () => {
    console.log("Theme toggle called");
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // TODO: Implement notification system
  const addNotification = (notification) => {
    console.log("Adding notification", notification);
    setNotifications((prev) => [...prev, { ...notification, id: Date.now() }]);
  };

  const removeNotification = (id) => {
    console.log("Removing notification", id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Cashback methods
  const activateOffer = (offer) => {
    console.log("Activating offer:", offer.store);
    setActivatedOffers((prev) => [
      ...prev,
      { ...offer, activatedAt: new Date().toISOString() },
    ]);

    // Small bonus for activating offers
    const bonus = 2.5;
    setAvailableBalance((prev) => prev + bonus);
    setPendingRewards((prev) => prev + bonus);
  };

  const redeemRewards = (amount, method) => {
    console.log("Redeeming rewards:", amount, method);
    if (amount <= availableBalance) {
      setAvailableBalance((prev) => prev - amount);
      setTotalEarned((prev) => prev + amount);

      // Add transaction record
      const newTransaction = {
        id: Date.now(),
        store: "OTP Bank Redemption",
        logo: "💰",
        amount: +amount,
        cashback: 0,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "completed",
        category: "Redemption",
      };
      setTransactions((prev) => [newTransaction, ...prev]);

      return true;
    }
    return false;
  };

  const referFriend = (email) => {
    console.log("Referring friend:", email);
    setReferralStats((prev) => ({
      ...prev,
      pendingInvites: prev.pendingInvites + 1,
    }));

    // Simulate successful referral after some time
    setTimeout(() => {
      setReferralStats((prev) => ({
        ...prev,
        totalReferred: prev.totalReferred + 1,
        bonusEarned: prev.bonusEarned + prev.bonusPerReferral,
        pendingInvites: prev.pendingInvites - 1,
      }));
      setAvailableBalance((prev) => prev + 15.0);
      setPendingRewards((prev) => prev + 15.0);
    }, 5000); // 5 seconds delay to simulate processing
  };

  const refreshCashbackData = () => {
    console.log("Refreshing cashback data...");
    // Simulate small random increases
    setMonthlyEarnings((prev) => prev + Math.random() * 10);
    setAvailableBalance((prev) => prev + Math.random() * 5);
    setStreakDays((prev) => prev + 1);

    // Potentially improve rank
    if (Math.random() > 0.7) {
      setRank((prev) => Math.max(1, prev - 1));
    }
  };

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setTransactions((prev) => [newTransaction, ...prev]);

    // Update balances based on transaction
    if (transaction.cashback > 0) {
      setAvailableBalance((prev) => prev + transaction.cashback);
      setMonthlyEarnings((prev) => prev + transaction.cashback);
      setTotalEarned((prev) => prev + transaction.cashback);
    }
  };

  const value = {
    user,
    theme,
    notifications,
    login,
    logout,
    toggleTheme,
    addNotification,
    removeNotification,
    // Cashback state
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
    activatedOffers,
    referralStats,
    transactions,
    // Cashback methods
    activateOffer,
    redeemRewards,
    referFriend,
    refreshCashbackData,
    addTransaction,
    setAccountBalance,
    setTotalSavings,
    setMonthlyEarnings,
    setTotalEarned,
    setAvailableBalance,
    setPendingRewards,
    setRank,
    setStreakDays,
    setActivatedOffers,
    setReferralStats,
    setTransactions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
