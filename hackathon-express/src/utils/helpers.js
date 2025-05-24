const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = {
  generateId,
  formatCurrency,
  validateEmail,
};
