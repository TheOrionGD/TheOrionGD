import { MongoClient, GridFSBucket } from 'mongodb';

let cachedPromise = null;
let cachedClient = null;
let cachedDb = null;
let cachedBucket = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb, bucket: cachedBucket };
  }

  if (!cachedPromise) {
    const uri = process.env.MONGODB_URI || process.env.CONNECTION_STRING;
    const databaseName = process.env.DATABASE_NAME || 'portfolio_db';

    if (!uri) {
      throw new Error('MONGODB_URI or CONNECTION_STRING is missing in Environment Variables');
    }

    const client = new MongoClient(uri, {
      connectTimeoutMS: 10_000,
      socketTimeoutMS: 45_000,
      serverSelectionTimeoutMS: 15_000,
    });

    cachedPromise = client.connect().then(() => {
      const db = client.db(databaseName);
      const bucket = new GridFSBucket(db, { bucketName: 'assetsBucket' });
      cachedClient = client;
      cachedDb = db;
      cachedBucket = bucket;
      console.log('[MongoDB] Connected to database:', databaseName);
      return { client, db, bucket };
    }).catch(err => {
      cachedPromise = null; // reset promise on failure to allow retry
      throw err;
    });
  }

  return cachedPromise;
}

export async function getClient() {
  const { client } = await connectToDatabase();
  return client;
}

export async function getDb() {
  const { db } = await connectToDatabase();
  return db;
}

export async function getBucket() {
  const { bucket } = await connectToDatabase();
  return bucket;
}

