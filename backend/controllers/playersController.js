import { getDB } from "../db/dbConn.js";
import { ObjectId } from "mongodb";

export const getPlayers = async (req, res) => {
    const { countryCode, position, country, wins, losses, goals, assists, yellowCards, redCards } = req.query;
    let db = getDB();
    let query = {};
    if (countryCode) query.countryCode = countryCode;
    if (position) query.position = position;
    if (country) query.country = country;
    if (wins) query.wins = parseInt(wins);
    if (losses) query.losses = parseInt(losses);
    if (goals) query.goals = parseInt(goals);
    if (assists) query.assists = parseInt(assists);
    if (yellowCards) query.yellowCards = parseInt(yellowCards);
    if (redCards) query.redCards = parseInt(redCards);
    const players = await db.collection("players").find(query).sort({ country: 1 }).toArray();
    res.json(players);
}

export const getPlayerById = async (req, res) => {
    let db = getDB();
    const playerId  = req.params.playerId;
    const player = await db.collection("players").findOne({ _id: new ObjectId(playerId) });
    if (!player) {
        return res.status(404).json({ message: "Player not found" });
    }
    res.json(player);
}

export const createPlayer = async (req, res) => {
    let db = getDB();
    const newPlayer = req.body;
    await db.collection("players").insertOne(newPlayer);
    res.json({ message: "Player created successfully" });
}

export const updatePlayer = async (req, res) => {
    let db = getDB();
    const name  = req.params.name;
    console.log("Updating player:", name);
    const updateData = req.body;
    await db.collection("players").updateOne({ name: name }, { $set: updateData });
    res.json({ message: "Player updated successfully" });
}

export const deletePlayer = async (req, res) => {
    let db = getDB();
    const { name } = req.params;
    await db.collection("players").deleteOne({ name: name });
    res.json({ message: "Player deleted successfully" });
}