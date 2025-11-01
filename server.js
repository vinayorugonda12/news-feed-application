// server.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.NEWS_API_KEY || "0d53b8de205a478cba55fe7a6410563e";

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("📰 News API Backend is running...");
});

// ✅ News route
app.get("/api/news", async (req, res) => {
  const { q, category = "general", country = "us" } = req.query;

  // Dynamically build URL
  let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`;

  // Only add category if provided (avoids invalid combinations)
  if (category && category !== "all") url += `&category=${category}`;
  // Add search query if provided
  if (q && q.trim() !== "") url += `&q=${encodeURIComponent(q.trim())}`;

  console.log(`🔍 Fetching news from: ${url}`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    // ✅ Validate NewsAPI response
    if (!data || data.status !== "ok") {
      console.error("❌ NewsAPI error:", data);
      return res.status(500).json({
        error: data.message || "Failed to fetch valid news data from NewsAPI",
      });
    }

    // ✅ Handle empty articles
    if (!data.articles || data.articles.length === 0) {
      console.warn("⚠️ No articles found for query:", { q, category, country });
      return res.status(404).json({ message: "No articles found" });
    }

    // ✅ Success
    res.status(200).json({
      status: "ok",
      totalResults: data.totalResults,
      articles: data.articles,
    });
  } catch (error) {
    console.error("🔥 Server error while fetching news:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
