import express from 'express';
import cors from 'cors';
import { MongoClient, GridFSBucket } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DATABASE_NAME = process.env.DATABASE_NAME;

let db;
let bucket;

async function connectToMongo() {
  const client = new MongoClient(CONNECTION_STRING);
  await client.connect();
  db = client.db(DATABASE_NAME);
  bucket = new GridFSBucket(db, { bucketName: 'assetsBucket' });
  console.log("Connected to MongoDB database:", DATABASE_NAME);
}

// Intercept asset requests
app.use('/assets', async (req, res) => {
  try {
    // req.path is relative to the mounted '/assets' router (e.g. "/resume.pdf")
    const filePath = '/assets' + decodeURIComponent(req.path);
    // Check if db is connected
    if (!db || !bucket) {
       return res.status(500).send("Database not connected yet");
    }

    // Find the file metadata in GridFS
    const files = await db.collection('assetsBucket.files').find({ filename: filePath }).toArray();
    
    if (!files || files.length === 0) {
      return res.status(404).send("File not found in MongoDB GridFS");
    }

    const file = files[0];
    
    // Ensure PDF files get the correct content type even if missing in DB
    let cType = file.contentType || 'application/octet-stream';
    if (filePath.toLowerCase().endsWith('.pdf')) {
      cType = 'application/pdf';
    }
    
    res.set('Content-Type', cType);
    // Force inline display instead of attachment (download)
    res.set('Content-Disposition', `inline; filename="${file.filename || 'document.pdf'}"`);
    
    // Pipe the download stream directly to the response
    const downloadStream = bucket.openDownloadStreamByName(filePath);
    downloadStream.pipe(res).on('error', (err) => {
      console.error("Error piping file:", err);
      res.status(500).send("Error streaming file");
    });
  } catch (err) {
    console.error("Error serving file:", err);
    res.status(500).send("Server Error");
  }
});

connectToMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
  });
}).catch(console.error);
