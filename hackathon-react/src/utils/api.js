export const apiClient = {
  // Use the environment variable with a fallback
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",

  async request(endpoint, options = {}) {
    // TODO: Implement API request logic with error handling
    console.log(`API request to: ${endpoint}`, options);

    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`API response from ${endpoint}:`, data);
      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  },

  // Health check method
  async healthCheck() {
    // TODO: Implement health check endpoint
    console.log("Checking API health");
    try {
      return await this.request("/api/health");
    } catch (error) {
      console.warn("API health check failed:", error);
      return { status: "offline", error: error.message };
    }
  },

  // Chatbot API methods
  async sendChatMessage(message) {
    // TODO: Implement chatbot API integration
    console.log("Sending chat message:", message);
    return this.request("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  },

  async getChatHistory() {
    // TODO: Implement chat history fetching
    console.log("Fetching chat history");
    return this.request("/api/chat/history");
  },

  // Cashback API methods
  async getCashbackData() {
    // TODO: Implement cashback data fetching
    console.log("Fetching cashback data");
    return this.request("/api/cashback");
  },

  async redeemRewards(amount) {
    // TODO: Implement reward redemption
    console.log("Redeeming rewards:", amount);
    return this.request("/api/cashback/redeem", {
      method: "POST",
      body: JSON.stringify({ amount }),
    });
  },

  async getTransactionHistory() {
    // TODO: Implement transaction history fetching
    console.log("Fetching transaction history");
    return this.request("/api/cashback/transactions");
  },

  // User authentication methods
  async login(credentials) {
    // TODO: Implement user login
    console.log("Logging in user:", credentials.email);
    return this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  async logout() {
    // TODO: Implement user logout
    console.log("Logging out user");
    return this.request("/api/auth/logout", {
      method: "POST",
    });
  },

  async getCurrentUser() {
    // TODO: Implement get current user
    console.log("Getting current user");
    return this.request("/api/auth/me");
  },
};
