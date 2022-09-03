import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL


if (!process.env.DATABASE_URL) {
  throw new Error('Please add your Mongo URI to .env.local')
}

export async function connectToDatabase() {

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client;
}

