import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/dbConn.js";

import citiesRoutes from "./routes/cities.js";
import gamesRoutes from "./routes/games.js";
import teamsRoutes from "./routes/teams.js";

const PORT = process.env.PORT || 3000;
dotenv.config();
const client = connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/cities", citiesRoutes(client.db("WorldCup")));
app.use("/api/games", gamesRoutes(client.db("WorldCup")));  
app.use("/api/teams", teamsRoutes(client.db("WorldCup"))); 

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// ideas:
// add map
