import express from "express";
import { ObjectId } from "mongodb";

export default function citiesRoutes(db) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const cities = await db.collection("cities").find({}).toArray();
    res.json(cities);
  });

  router.get("/stats/total-cities", async (req, res) => {
    try {
      const totalCities = await db.collection("cities").countDocuments();
      res.json({ totalCities });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving total cities" });
    }
  });

  router.get("/stats/total-countries", async (req, res) => {
    try {
      const cities = await db.collection("cities").find({}).toArray();

      const countries = new Set();
      cities.forEach(city => {
        if (city.country) {
          countries.add(city.country);
        }
      });

      res.json({ totalCountries: countries.size });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving total countries" });
    }
  });

  router.get("/stats/total-stadiums", async (req, res) => {
    try {
      const cities = await db.collection("cities").find({}).toArray();

      let totalStadiums = 0;

      cities.forEach(city => {
        if (city.stadiums && city.stadiums.length > 0) {
          totalStadiums += city.stadiums.length;
        }
      });

      res.json({ totalStadiums });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving total stadiums" });
    }
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

  router.put("/name/:name/delete", async (req, res) => {
    const inputName = req.params.name.toLowerCase();
    const { stadium } = req.body;

    const cities = await db.collection("cities").find({}).toArray();

    const city = cities.find(
      c => c.name.toLowerCase() === inputName
    );

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    await db.collection("cities").updateOne(
      { _id: city._id },
      { $pull: { stadiums: { name: stadium } } }
    );

    res.json({ message: "Stadium deleted successfully." });
  });

  router.put("/name/:name", async (req, res) => {
    const inputName = req.params.name.toLowerCase();
    const { stadium, occupancy } = req.body;

    const cities = await db.collection("cities").find({}).toArray();

    const city = cities.find(
      c => c.name.toLowerCase() === inputName
    );

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    await db.collection("cities").updateOne(
      { _id: city._id },
      {
        $push: {
          stadiums: {
            name: stadium,
            occupancy: Number(occupancy)
          }
        }
      }
    );

    res.json({ message: "Success! Operation done." });
  });

  return router;
}