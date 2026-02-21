import { getDB } from "../db/dbConn.js";
import { ObjectId } from "mongodb";


export const getTeams = async (req, res) => {
    const { group, countryCode, country, wins, losses, goalsFor, goalsAgainst } = req.query;
    let db = getDB();
    let query = {};
    if (group) {
        query.group = group;
    }
    if (countryCode) {
        query.countryCode = countryCode;
    }
    if (country) {
        query.country = country;
    }
    if (wins) {
        query.wins = parseInt(wins);
    }
    if (losses) {
        query.losses = parseInt(losses);
    }
    if (goalsFor) {
        query.goalsFor = parseInt(goalsFor);
    }
    if (goalsAgainst) {
        query.goalsAgainst = parseInt(goalsAgainst);
    }
    const teams = await db.collection("teams").find(query).sort({ country: 1 }).toArray();
    res.json(teams);
}

export const getTeamById = async (req, res) => {
    let db = getDB();
    const teamId  = req.params.teamId;
    const team = await db.collection("teams").findOne({ _id: new ObjectId(teamId) });
    if (!team) {
        return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
}

export const createTeam = async (req, res) => {
    let db = getDB();
    const newTeam = req.body;
    await db.collection("teams").insertOne(newTeam);
    res.json({ message: "Team created successfully" });
}

export const updateTeam = async (req, res) => {
    let db = getDB();
    const { teamId } = req.params;
    await db.collection("teams").updateOne();
    res.json({ message: "Team updated successfully" });
}

export const deleteTeam = async (req, res) => {
    let db = getDB();
    const { teamId } = req.params;
    await db.collection("teams").deleteOne({ _id: new ObjectId(teamId) });
    res.json({ message: "Team deleted successfully" });
}