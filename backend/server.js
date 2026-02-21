import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/dbConn.js";

import citiesRoutes from "./routes/citiesRoutes.js";
import gamesRoutes from "./routes/gamesRoutes.js";
import teamsRoutes from "./routes/teamsRoutes.js";
import playersRoutes from "./routes/playersRoutes.js";

const PORT = process.env.PORT || 10000;
dotenv.config();
const client = connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/cities", citiesRoutes(client.db("WorldCup")));
app.use("/api/games", gamesRoutes(client.db("WorldCup")));  
app.use("/api/teams", teamsRoutes(client.db("WorldCup"))); 
app.use("/api/players", playersRoutes(client.db("WorldCup")));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
