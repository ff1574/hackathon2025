const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' // frontend URL
}));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Express server connected!" });
});

// Example API route
app.get("/api/test", async (req, res) => {
  try {
    // Test Supabase connection
    const { data, error } = await supabase
      .from("test_table")
      .select("*")
      .limit(1);

    if (error) {
      return res.status(500).json({ error: "Database connection failed" });
    }

    res.json({ message: "Backend and Supabase connected successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
