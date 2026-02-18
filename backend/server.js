import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";

import citiesRoutes from "./routes/cities.js";
import gamesRoutes from "./routes/games.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "worldcup";

const client = new MongoClient(MONGO_URL);

let db;

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    db = client.db(DB_NAME);
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
  }
}

await connectDB();

app.use("/api/cities", citiesRoutes(db));
app.use("/api/games", gamesRoutes(db));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
