import express from "express";
import { ObjectId } from "mongodb";

export default function citiesRoutes(db) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const cities = await db.collection("cities").find({}).toArray();
    res.json(cities);
  });

  router.post("/", async (req, res) => {
    const { name, country } = req.body;

    const result = await db.collection("cities").insertOne({
      name,
      country,
      stadiums: []
    });

    res.json(result);
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    await db.collection("cities").deleteOne({
      _id: new ObjectId(id)
    });

    res.json({ message: "City deleted successfully" });
  });

  return router;
}
