"use client";

import { useState, useCallback } from "react";

export function useNavigation(initialPage = "home") {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [history, setHistory] = useState([initialPage]);

  const navigateTo = useCallback((page) => {
    // TODO: Add navigation validation and analytics
    console.log(`Navigating to: ${page}`);
    setCurrentPage(page);
    setHistory((prev) => [...prev, page]);
  }, []);

  const goBack = useCallback(() => {
    // TODO: Implement proper back navigation
    console.log("Going back in navigation");
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentPage(newHistory[newHistory.length - 1]);
    }
  }, [history]);

  const resetNavigation = useCallback(() => {
    // TODO: Add reset analytics
    console.log("Resetting navigation");
    setCurrentPage(initialPage);
    setHistory([initialPage]);
  }, [initialPage]);

  return {
    currentPage,
    history,
    navigateTo,
    goBack,
    resetNavigation,
  };
}
