import express from "express";
import { getAllCities, createCity, deleteCity, getCityById, updateCity } from "../controllers/citiesController.js";

export default function citiesRoutes(db) {
  const router = express.Router();

  router.route("/")
    .get(getAllCities)
    .post(createCity)
  
  router.route("/:cityId")
    .get(getCityById)
    .put(updateCity)
    .delete(deleteCity)

  return router;
}
