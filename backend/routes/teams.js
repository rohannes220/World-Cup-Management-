import express from "express";

export default function teamsRoutes(db) {
    const router = express.Router();

    router.get("/", async (req, res) => {
        const teams = await db.collection("teams").find({}).toArray();
        res.json(teams);
    });
}