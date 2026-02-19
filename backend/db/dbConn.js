import {MongoClient} from "mongodb";

export const connectDB = () => {
    try {
        const client = new MongoClient(process.env.DATABASE_URI);
        client.connect();
        return client;
    }
    catch (err) {
        console.log(err);
    }
}