import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGO_URI!);

export default mongoClient;
