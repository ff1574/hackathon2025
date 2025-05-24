// Utility helper functions

export const formatCurrency = (amount, currency = "USD") => {
  // TODO: Add internationalization support
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const formatDate = (date, options = {}) => {
  // TODO: Add timezone support
  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  };

  return new Intl.DateTimeFormat("en-US", defaultOptions).format(
    new Date(date)
  );
};

export const debounce = (func, wait) => {
  // TODO: Add cancel functionality
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  // TODO: Add leading/trailing options
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const generateId = () => {
  // TODO: Use a more robust ID generation method
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const validateEmail = (email) => {
  // TODO: Add more comprehensive email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const copyToClipboard = async (text) => {
  // TODO: Add fallback for older browsers
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
};

export const getStorageItem = (key, defaultValue = null) => {
  // TODO: Add error handling for storage access
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return defaultValue;
  }
};

export const setStorageItem = (key, value) => {
  // TODO: Add storage quota handling
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Error writing to localStorage:", error);
    return false;
  }
};

export const removeStorageItem = (key) => {
  // TODO: Add error handling
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing from localStorage:", error);
    return false;
  }
};
