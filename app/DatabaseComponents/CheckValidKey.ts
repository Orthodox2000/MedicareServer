import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env['uri'] || '';
if (!uri) {
  throw new Error('Missing environment variable: uri');
}
const client = new MongoClient(uri);

 

export default async function CheckValidKey(key:string): Promise<string>
{
 try {
    await client.connect();

    const database = client.db(process.env.ApiDbName!); // replace with your DB name
    const collection = database.collection(process.env.ApiCollectionName!); // replace with your collection name

    // Find the document with the matching key
    const keyDoc = await collection.findOne({ 'key': key });

    if (!keyDoc) {
      return `Key "${key}" does not exist.`;
    }  
    // Check if usage is under limit
    if (keyDoc['useage'] <1000) {
      return `Key "${key}" exists and is under limit.`;
    } else {
      return `Key "${key}" has exceeded its usage limit.`;
    }
  } catch (error) {
    console.error('Error checking key:', error);
    return 'An error occurred while checking the key.';
  } finally {
    await client.close();
  }
}