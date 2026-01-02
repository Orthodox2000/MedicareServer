import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.uri!;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.uri) {
  throw new Error("Add MONGODB_URI to .env");
}

client = new MongoClient(uri);
clientPromise = client.connect();

export default clientPromise;
