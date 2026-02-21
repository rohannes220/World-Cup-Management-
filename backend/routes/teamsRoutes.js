import express from "express";
import { getTeams, createTeam, getTeamById, deleteTeam, updateTeam } from "../controllers/teamsController.js";

export default function teamsRoutes(db) {
    const router = express.Router();

    router.route("/")
        .get(getTeams)
        .post(createTeam)
    
    router.route("/:teamId")
        .get(getTeamById)
        .delete(deleteTeam)
        .put(updateTeam)

    return router;
}