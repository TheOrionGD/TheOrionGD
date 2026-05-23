import { MongoClient, GridFSBucket } from 'mongodb';

let _client = null;
let _db = null;
let _bucket = null;
let _connecting = false;

async function getBucket() {
  if (_bucket) return _bucket;
  if (_connecting) {
    await new Promise(resolve => {
      const interval = setInterval(() => {
        if (_bucket) { clearInterval(interval); resolve(); }
      }, 50);
    });
    return _bucket;
  }

  _connecting = true;
  try {
    const uri = process.env.CONNECTION_STRING;
    const databaseName = process.env.DATABASE_NAME;

    if (!uri) throw new Error('CONNECTION_STRING is missing in Vercel Environment Variables');
    if (!databaseName) throw new Error('DATABASE_NAME is missing in Vercel Environment Variables');

    _client = new MongoClient(uri, {
      connectTimeoutMS: 10_000,
      socketTimeoutMS: 45_000,
      serverSelectionTimeoutMS: 15_000,
    });
    
    await _client.connect();
    _db = _client.db(databaseName);
    _bucket = new GridFSBucket(_db, { bucketName: 'assetsBucket' });
  } catch (err) {
    _connecting = false;
    _client = null; _db = null; _bucket = null;
    throw err;
  }
  _connecting = false;
  return _bucket;
}

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
    const filesCollection = _db.collection('assetsBucket.files');
    
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
