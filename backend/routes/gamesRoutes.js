import express from "express";
import { getGames, createGame, getGameById, updateGame, deleteGame, countGames } from "../controllers/gamesController.js";

export default function gamesRoutes(db) {
  const router = express.Router();

  router.route("/")
    .get(getGames)
    .post(createGame)

  router.route("/stats")
    .get(countGames)

  router.route("/match/:matchNo")
    .get(getGameById)
    .put(updateGame)
    .delete(deleteGame)

  

  return router;
}
