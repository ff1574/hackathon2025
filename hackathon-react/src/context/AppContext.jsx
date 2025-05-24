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
  const [nextGoal, setNextGoal] = useState(2500);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [activatedOffers, setActivatedOffers] = useState([]);
  const [storesVisited, setStoresVisited] = useState(8);
  const [totalRedemptions, setTotalRedemptions] = useState(3);
  const [referralStats, setReferralStats] = useState({
    totalReferred: 8,
    bonusEarned: 120.5,
    pendingInvites: 3,
    bonusPerReferral: 15.0,
  });
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      store: "KavanaZadar",
      logo: "☕",
      amount: -31.5,
      cashback: +2.83,
      date: "2024-01-14",
      time: "14:15 AM",
      status: "completed",
      category: "Food & Drink",
    },
    {
      id: 2,
      store: "Konzum Supermarket",
      logo: "🛒",
      amount: -130.6,
      cashback: +13.06,
      date: "2024-01-13",
      time: "11:00 AM",
      status: "pending",
      category: "Groceries",
    },
    {
      id: 3,
      store: "Zadar Street Food",
      logo: "🌯",
      amount: -88.66,
      cashback: +12.41,
      date: "2024-01-12",
      time: "17:15 PM",
      status: "pending",
      category: "Food & Drink",
    },
    {
      id: 4,
      store: "Verbum Zadar.",
      logo: "📚",
      amount: -52.32,
      cashback: +3.66,
      date: "2024-01-11",
      time: "19:45 AM",
      status: "pending",
      category: "Books",
    },
    {
      id: 5,
      store: "ZaraTech Repairs",
      logo: "🔧",
      amount: -130.89,
      cashback: +15.71,
      date: "2024-01-10",
      time: "15:00 PM",
      status: "pending",
      category: "Tech Repairs",
    },
    {
      id: 6,
      store: "Studio Fit Zadar",
      logo: "🏋️",
      amount: -296.75,
      cashback: +26.71,
      date: "2024-01-09",
      time: "18:15 AM",
      status: "completed",
      category: "Fitness",
    },
    {
      id: 7,
      store: "Bakery Sunce",
      logo: "🥐",
      amount: -272.7,
      cashback: +32.72,
      date: "2024-01-08",
      time: "19:15 PM",
      status: "pending",
      category: "Bakery",
    },
    {
      id: 8,
      store: "Green Market",
      logo: "🥬",
      amount: -28.44,
      cashback: +3.98,
      date: "2024-01-07",
      time: "11:45 PM",
      status: "completed",
      category: "Produce",
    },
    {
      id: 9,
      store: "Zara",
      logo: "👗",
      amount: -276.87,
      cashback: +24.92,
      date: "2024-01-06",
      time: "8:15 AM",
      status: "pending",
      category: "Clothing",
    },
    {
      id: 10,
      store: "ZooCity",
      logo: "🐶",
      amount: -275.66,
      cashback: +22.05,
      date: "2024-01-05",
      time: "19:30 PM",
      status: "completed",
      category: "Pet Supplies",
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

  // Check and handle goal completion
  const checkGoalCompletion = () => {
    if (totalEarned >= nextGoal && !completedGoals.includes(nextGoal)) {
      setCompletedGoals((prev) => [...prev, nextGoal]);
      setNextGoal((prev) => prev + 1000); // Set next goal

      // Bonus for completing goal
      const goalBonus = 50;
      setAvailableBalance((prev) => prev + goalBonus);
      setAccountBalance((prev) => prev + goalBonus);

      addNotification({
        type: "success",
        title: "🎉 Goal Completed!",
        message: `Congratulations! You've earned $${nextGoal}! Bonus: $${goalBonus}`,
      });
    }
  };

  // Cashback methods
  const activateOffer = (offer) => {
    console.log("Activating offer:", offer.store);

    // Check if offer is already activated
    if (activatedOffers.find((o) => o.id === offer.id)) {
      addNotification({
        type: "warning",
        title: "Offer Already Active",
        message: `${offer.store} offer is already activated.`,
      });
      return false;
    }

    setActivatedOffers((prev) => [
      ...prev,
      { ...offer, activatedAt: new Date().toISOString() },
    ]);

    // Small bonus for activating offers
    const bonus = 2.5;
    setAvailableBalance((prev) => prev + bonus);
    setPendingRewards((prev) => prev + bonus);
    setTotalEarned((prev) => prev + bonus);

    // Check if this is a new store
    const uniqueStores = new Set([
      ...activatedOffers.map((o) => o.store),
      offer.store,
    ]);
    setStoresVisited(uniqueStores.size);

    checkGoalCompletion();
    return true;
  };

  const redeemRewards = (amount, method) => {
    console.log("Redeeming rewards:", amount, method);
    if (amount <= availableBalance) {
      // Update balances
      setAvailableBalance((prev) => prev - amount);
      setAccountBalance((prev) => prev + amount); // Add to account balance
      setTotalSavings((prev) => prev + amount); // Add to total savings
      setTotalRedemptions((prev) => prev + 1);

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
      setTotalEarned((prev) => prev + 15.0);

      checkGoalCompletion();
    }, 5000); // 5 seconds delay to simulate processing
  };

  const refreshCashbackData = () => {
    console.log("Refreshing cashback data...");
    // Simulate small random increases
    const monthlyIncrease = Math.random() * 10;
    const balanceIncrease = Math.random() * 5;

    setMonthlyEarnings((prev) => prev + monthlyIncrease);
    setAvailableBalance((prev) => prev + balanceIncrease);
    setTotalEarned((prev) => prev + balanceIncrease);
    setStreakDays((prev) => prev + 1);

    // Potentially improve rank
    if (Math.random() > 0.7) {
      setRank((prev) => Math.max(1, prev - 1));
    }

    checkGoalCompletion();
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

      checkGoalCompletion();
    }
  };

  const isOfferActivated = (offerId) => {
    return activatedOffers.some((offer) => offer.id === offerId);
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
    completedGoals,
    activatedOffers,
    storesVisited,
    totalRedemptions,
    referralStats,
    transactions,
    // Cashback methods
    activateOffer,
    redeemRewards,
    referFriend,
    refreshCashbackData,
    addTransaction,
    isOfferActivated,
    checkGoalCompletion,
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
