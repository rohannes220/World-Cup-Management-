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
      .toArray();
    res.json(games);
  });

  router.get("/knockout", async (req, res) => {
    const games = await db.collection("games")
      .find({ round: { $ne: "Group Stage" } })
      .toArray();
    res.json(games);
  });

  router.get("/match/:matchNo", async (req, res) => {
  const { matchNo } = req.params;

  const game = await db.collection("games").findOne({
    matchNo: Number(matchNo)
  });

  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }

  res.json(game);
});

router.put("/match/:matchNo", async (req, res) => {
  const { matchNo } = req.params;

  await db.collection("games").updateOne(
    { matchNo: Number(matchNo) },
    { $set: req.body }
  );

  res.json({ message: "Game updated successfully" });
});

return router;

}
