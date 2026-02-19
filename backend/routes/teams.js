import express from "express";
import { getAllTeams, createTeam, getTeamById, deleteTeam, updateTeam } from "../controllers/teamsController.js";

export default function teamsRoutes(db) {
    const router = express.Router();

    router.route("/")
        .get(getAllTeams)
        .post(createTeam)
    
    router.route("/:teamId")
        .get(getTeamById)
        .delete(deleteTeam)
        .put(updateTeam)

    return router;
}