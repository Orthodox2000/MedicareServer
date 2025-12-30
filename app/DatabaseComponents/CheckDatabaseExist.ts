'use server'
import { MongoClient } from 'mongodb'; 


const uri :any = process.env.uri; 
const client = new MongoClient(uri);
export default async function CheckDatabaseExists(dbName: string) {
   
  try {
    await client.connect();

    // List all databases
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();

    // Check if dbName exists
    const exists = dbs.databases.some(db => db.name === dbName);
    if (exists) {
      return `Database "${dbName}" exists.`;
    } else {
      return `Database "${dbName}" does NOT exist.`;
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
} 