import { getDB } from "../db/dbConn.js";

const db = getDB();

export const getAllTeams = async (req, res) => {
    const teams = await db.collection("teams").find({}).toArray();
    res.json(teams);
}

export const getTeamById = async (req, res) => {
    const { teamId } = req.params;
    const team = await db.collection("teams").findOne({ teamId: Number(teamId) });
    if (!team) {
        return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
}

export const createTeam = async (req, res) => {
    const newTeam = req.body;
    await db.collection("teams").insertOne(newTeam);
    res.json({ message: "Team created successfully" });
}

export const updateTeam = async (req, res) => {
    const { teamId } = req.params;
    await db.collection("teams").updateOne();
    res.json({ message: "Team updated successfully" });
}

export const deleteTeam = async (req, res) => {
    const { teamId } = req.params;
    await db.collection("teams").deleteOne({ teamId: Number(teamId) });
    res.json({ message: "Team deleted successfully" });
}