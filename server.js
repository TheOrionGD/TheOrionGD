import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import apiApp from './api/index.js';
import { getDb, getBucket } from './api/db.js';

dotenv.config({ override: true });

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Mount all API routes (/api/auth, /api/admin, /api/public, /api/chat)
app.use(apiApp);

const PORT = process.env.PORT || 3001;

// Intercept asset requests
app.use('/assets', async (req, res) => {
  try {
    // req.path is relative to the mounted '/assets' router (e.g. "/resume.pdf")
    const filePath = '/assets' + decodeURIComponent(req.path);
    
    // Dynamically retrieve database and bucket (resilient to startup connection failures)
    const db = await getDb();
    const bucket = await getBucket();

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
    res.status(502).send(`Database connection failed: ${err.message}`);
  }
});

// Start the backend server immediately; database connection is handled dynamically/on-demand
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});

