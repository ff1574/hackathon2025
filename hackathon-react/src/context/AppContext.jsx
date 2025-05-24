"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);

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

  const value = {
    user,
    theme,
    notifications,
    login,
    logout,
    toggleTheme,
    addNotification,
    removeNotification,
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
