import express from "express";
import { getPlayers, createPlayer, getPlayerById, deletePlayer, updatePlayer } from "../controllers/playersController.js";
export default function playersRoutes(db) {
    const router = express.Router();

    router.route("/")
        .get(getPlayers)
        .post(createPlayer)
    
    router.route("/:name")
        .get(getPlayerById)
        .delete(deletePlayer)
        .put(updatePlayer)

    return router;
}