const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:5000' 
  : 'http://localhost:5001'; // For development, still use localhost since ports are exposed

export const apiService = {
  async testConnection() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/test`);
      return response.json();
    } catch (error) {
      console.error('API connection failed:', error);
      throw error;
    }
  },
  
  async fetchData(endpoint) {
    const response = await fetch(`${API_BASE_URL}/api/${endpoint}`);
    return response.json();
  }
};
