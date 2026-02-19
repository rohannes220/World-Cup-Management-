import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
import path from "path";
import { fileURLToPath } from "url";

import citiesRoutes from "./routes/cities.js";
import gamesRoutes from "./routes/games.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend")));

const PORT = 3000;
const MONGO_URL = process.env.DATABASE_URI;
const DB_NAME = "WorldCup";

const client = new MongoClient(MONGO_URL);

let db;

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(DB_NAME);
  } catch (error) {
    console.error("MongoDB connection failed", error);
  }
}

await connectDB();

app.use("/api/cities", citiesRoutes(db));
app.use("/api/games", gamesRoutes(db));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
