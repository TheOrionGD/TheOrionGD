import { getDb, getBucket } from './db.js';


function getMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const map = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
    gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml',
    avif: 'image/avif', ico: 'image/x-icon',
    pdf: 'application/pdf',
    mp4: 'video/mp4', webm: 'video/webm',
    mp3: 'audio/mpeg', ogg: 'audio/ogg',
    woff: 'font/woff', woff2: 'font/woff2',
    ttf: 'font/ttf', otf: 'font/otf',
  };
  return map[ext] || 'application/octet-stream';
}

export default async function handler(req, res) {
  try {
    // req.query.path is passed from vercel.json rewrite
    const pathQuery = req.query.path || '';
    const requestedPath = decodeURIComponent(pathQuery);
    
    // GridFS stored filename is /assets/...
    const gridFsFilename = '/assets/' + requestedPath;

    const bucket = await getBucket();
    const db = await getDb();
    const filesCollection = db.collection('assetsBucket.files');
    
    const files = await filesCollection
      .find({ filename: gridFsFilename })
      .toArray();

    if (!files || files.length === 0) {
      console.warn(`[vercel-mongo-assets] 404 — not found in GridFS: ${gridFsFilename}`);
      return res.status(404).send(`Asset not found: ${gridFsFilename}`);
    }

    const file = files[0];
    const mimeType = file.contentType || getMimeType(gridFsFilename);

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${file.filename?.split('/').pop() || 'file'}"`);
    // Cache aggressively for Vercel CDN (Edge cache for 1 year)
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    const downloadStream = bucket.openDownloadStreamByName(gridFsFilename);

    downloadStream.on('error', (err) => {
      console.error('[vercel-mongo-assets] Stream error:', err.message);
      if (!res.headersSent) {
        res.status(500).send('Error streaming file from MongoDB');
      }
    });

    downloadStream.pipe(res);
  } catch (err) {
    console.error('[vercel-mongo-assets] Handler error:', err.message);
    if (!res.headersSent) {
      res.status(502).send(`MongoDB connection error: ${err.message}`);
    }
  }
}
