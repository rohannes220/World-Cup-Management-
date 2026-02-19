import express from "express";
import { getAllGames, createGame, getGameByMatchNo, updateGame, deleteGame } from "../controllers/gamesController.js";

export default function gamesRoutes(db) {
  const router = express.Router();

  router.route("/")
    .get(getAllGames)
    .post(createGame)

  router.route("/:matchNo")
    .get(getGameByMatchNo)
    .put(updateGame)
    .delete(deleteGame)

  return router;
}
