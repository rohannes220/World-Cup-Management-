import express from "express";

export default function gamesRoutes(db) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const games = await db.collection("games").find({}).toArray();
    res.json(games);
  });

  router.get("/group", async (req, res) => {
    const games = await db.collection("games")
      .find({ round: "Group Stage" })
      .sort({ matchNo: 1 })
      .toArray();
    res.json(games);
  });

  router.get("/knockout", async (req, res) => {
    const games = await db.collection("games")
      .find({ round: { $ne: "Group Stage" } })
      .toArray();
    res.json(games);
  });

  router.get("/stats", async (req, res) => {
    try {
      const totalGames = await db.collection("games").countDocuments();
      res.json({ totalGames });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving total games" });
    }
  });

  router.get("/stats/group", async (req, res) => {
    try {
      const totalGroupStage = await db.collection("games")
        .countDocuments({ round: "Group Stage" });
      res.json({ totalGroupStage });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving group stage games" });
    }
  });

  router.get("/stats/knockout", async (req, res) => {
    try {
      const totalKnockout = await db.collection("games")
        .countDocuments({ round: { $ne: "Group Stage" } });
      res.json({ totalKnockout });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving knockout games" });
    }
  });

  router.get("/match/:matchNo", async (req, res) => {
    const matchNo = Number(req.params.matchNo);
    const game = await db.collection("games").findOne({ matchNo });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json(game);
  });

  router.put("/match/:matchNo", async (req, res) => {
    const matchNo = Number(req.params.matchNo);
    const { winner } = req.body;

    const result = await db.collection("games").updateOne(
      { matchNo },
      { $set: { winner } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json({ message: "Winner updated successfully." });
  });

  router.post("/friendly", async (req, res) => {
    const { matchNo, homeTeam, awayTeam } = req.body;

    await db.collection("games").insertOne({
      matchNo: Number(matchNo),
      homeTeam,
      awayTeam,
      round: "Friendly",
      winner: null
    });

    res.json({ message: "Friendly match scheduled successfully." });
  });

  router.delete("/match/:matchNo", async (req, res) => {
    const matchNo = Number(req.params.matchNo);

    const result = await db.collection("games").deleteOne({ matchNo });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json({ message: "Game deleted successfully." });
  });

  return router;
}