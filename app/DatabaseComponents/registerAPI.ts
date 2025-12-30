'use server'
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from "uuid";

const uri :any = process.env.uri;
const client = new MongoClient(uri);
export default async function registerAPI(email:string) {
    const apiKey = uuidv4();
    try {
        await client.connect();
        const db = client.db(process.env.ApiDbName!);
        const collection = db.collection(process.env.ApiCollectionName!);

        // Check if the key already exists
        const existing = await collection.findOne({ email: email });
        if (existing) {
            //console.log('Key already exists. Not inserting.');
            return { inserted: false, message: 'Key already exists',key:apiKey };
        }

        // Insert the key if not exists
        const result = await collection.insertOne({ 'email': email,'key':apiKey,'useage':0 });
        //console.log('Key inserted successfully.');
        return { inserted: true, message:'success',key:apiKey };
    } catch (err) {
        console.error('Error inserting key:', err);
        return { inserted: false, error: err };
    } finally {
        await client.close();
    }

}