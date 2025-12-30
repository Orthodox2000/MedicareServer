import { MongoClient } from "mongodb";

export default async function registerAPI(key) {
    const uri = process.env.uri;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(process.env.ApiDbName); 
        const collection = db.collection(process.env.ApiCollectionName);

        // Check if the key already exists
        const existing = await collection.findOne({ key: key });
        if (existing) {
            console.log('Key already exists. Not inserting.');
            return { inserted: false, message: 'Key already exists' };
        }

        // Insert the key if not exists
        const result = await collection.insertOne({ key: key });
        console.log('Key inserted successfully.');
        return { inserted: true, result: result };
    } catch (err) {
        console.error('Error inserting key:', err);
        return { inserted: false, error: err };
    } finally {
        await client.close();
    }

}