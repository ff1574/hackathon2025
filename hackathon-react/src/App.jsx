import { useState, useEffect } from "react";
import { apiService } from "./services/api";

function App() {
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const data = await apiService.testConnection();
        setBackendData(data);
      } catch (error) {
        console.error("Failed to connect to backend:", error);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Hackathon Stack Ready!</h1>
        {loading ? (
          <p>Connecting to backend...</p>
        ) : backendData ? (
          <div>
            <p className="text-green-600">✅ Backend Connected</p>
            <pre className="mt-2 text-sm bg-gray-100 p-2 rounded">
              {JSON.stringify(backendData, null, 2)}
            </pre>
          </div>
        ) : (
          <p className="text-red-600">❌ Backend Connection Failed</p>
        )}
      </div>
    </div>
  );
}

export default App;
