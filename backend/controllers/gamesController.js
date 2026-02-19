import { getDB } from "../db/dbConn";

const db = getDB();

export const getAllGames = async (req,res) => {
    try {
        const games = await db.collection("games").find({}).toArray();     
        res.json(games);
    } catch (err) {
        console.log(err);
    }
}

export const getGameById = async (req, res) => {
    try {
        const { gameId } = req.params;
        const game = await db.collection("games").findOne({ gameId: Number(gameId) });
        res.json(game);
    } catch (err) {
        console.log(err);
    }
}

export const createGame = async (req, res) => {
    try {
        const newGame = req.body;
        await db.collection("games").insertOne(newGame);        
        res.json({ message: "Game created successfully" });
    } catch (err) {
        console.log(err);
    }   
}

export const updateGame = async (req, res) => {
    try {
        const { gameId } = req.params;
        const updatedData = req.body;
        await db.collection("games").updateOne({ gameId: Number(gameId) }, { $set: updatedData });
        res.json({ message: "Game updated successfully" });
    } catch (err) {
        console.log(err);
    }
}

export const deleteGame = async (req, res) => {
    try {
        const { gameId } = req.params;
        await db.collection("games").deleteOne({ gameId: Number(gameId) });
        res.json({ message: "Game deleted successfully" });
    }
    catch (err) {
        console.log(err);
    }
}