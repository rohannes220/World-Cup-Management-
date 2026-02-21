import { getDB } from "../db/dbConn.js";


export const getAllCities = async (req,res) => {
    try {
        let db = getDB();
        const cities = await db.collection("cities").find({}).toArray();
        res.json(cities);
    } catch (err) {
        console.log(err);
    }
}

export const createCity = async (req, res) => {
    try {
        let db = getDB();
        const newCity = req.body;
        await db.collection("cities").insertOne(newCity);        
        res.json({ message: "City created successfully" });
    } catch (err) {
        console.log(err);
    }   
}

export const deleteCity = async (req, res) => {
    try {
        let db = getDB();
        const { cityId } = req.params;
        await db.collection("cities").deleteOne({ _id: new ObjectId(cityId) });
        res.json({ message: "City deleted successfully" });
    }
    catch (err) {
        console.log(err);
    }
}

export const getCityById = async (req, res) => {
    try {
        let db = getDB();
        const { cityId } = req.params;
        const city = await db.collection("cities").findOne({ _id: new ObjectId(cityId) });
        res.json(city);
    } catch (err) {
        console.log(err);
    }
}

export const updateCity = async (req, res) => {
    try {
        let db = getDB();   
        const { cityId } = req.params;
        const updatedData = req.body;
        await db.collection("cities").updateOne({ _id: new ObjectId(cityId) }, { $set: updatedData });
        res.json({ message: "City updated successfully" });
    } catch (err) {
        console.log(err);
    }
}