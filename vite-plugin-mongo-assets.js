/**
 * vite-plugin-mongo-assets.js
 *
 * A Vite plugin that serves MongoDB GridFS assets directly through the Vite
 * dev server. No separate backend process is required — `npm run dev` starts
 * everything in a single command.
 *
 * How it works:
 *  - Vite exposes a `configureServer` hook that runs in Node.js context.
 *  - We attach an Express-compatible middleware to the Vite dev server's
 *    Connect instance, intercepting any request that starts with /assets/.
 *  - The middleware connects to MongoDB using the Non-SRV URI from .env and
 *    streams files out of a GridFSBucket directly to the browser.
 *
 * Non-SRV URI is used deliberately to avoid DNS/SRV resolution timeouts in
 * environments that cannot resolve mongodb+srv:// hostnames.
 */

import { MongoClient, GridFSBucket } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// ── Connection state (module-level singleton) ─────────────────────────────────
let _client = null;
let _db     = null;
let _bucket = null;
let _connecting = false;

/**
 * Returns a ready GridFSBucket, connecting lazily on first request.
 * Re-uses the same connection for all subsequent requests.
 */
async function getBucket() {
  if (_bucket) return _bucket;
  if (_connecting) {
    // If connection is already in progress, poll until it resolves
    await new Promise(resolve => {
      const interval = setInterval(() => {
        if (_bucket) { clearInterval(interval); resolve(); }
      }, 50);
    });
    return _bucket;
  }

  _connecting = true;
  try {
    const uri          = process.env.CONNECTION_STRING;
    const databaseName = process.env.DATABASE_NAME;

    if (!uri)          throw new Error('[mongo-assets] CONNECTION_STRING is not set in .env');
    if (!databaseName) throw new Error('[mongo-assets] DATABASE_NAME is not set in .env');

    console.log('\n[mongo-assets] Connecting to MongoDB...');
    _client = new MongoClient(uri, {
      connectTimeoutMS:       10_000,
      socketTimeoutMS:        45_000,
      serverSelectionTimeoutMS: 15_000,
    });
    await _client.connect();
    _db     = _client.db(databaseName);
    _bucket = new GridFSBucket(_db, { bucketName: 'assetsBucket' });
    console.log(`[mongo-assets] ✅ Connected to MongoDB — database: "${databaseName}"`);
    console.log('[mongo-assets] Assets are available at /assets/...\n');
  } catch (err) {
    _connecting = false;
    _client = null; _db = null; _bucket = null;
    throw err;
  }
  _connecting = false;
  return _bucket;
}

/**
 * Derives a MIME type from the file extension so browsers can handle
 * images, PDFs, and other assets correctly without relying on GridFS metadata.
 */
function getMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const map = {
    // Images
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
    gif: 'image/gif',  webp: 'image/webp', svg: 'image/svg+xml',
    avif: 'image/avif', ico: 'image/x-icon',
    // Documents
    pdf: 'application/pdf',
    // Video / Audio
    mp4: 'video/mp4', webm: 'video/webm',
    mp3: 'audio/mpeg', ogg: 'audio/ogg',
    // Fonts
    woff: 'font/woff', woff2: 'font/woff2',
    ttf: 'font/ttf',   otf: 'font/otf',
  };
  return map[ext] || 'application/octet-stream';
}

// ── Vite Plugin ───────────────────────────────────────────────────────────────
export default function mongoAssetsPlugin() {
  return {
    name: 'vite-plugin-mongo-assets',

    /**
     * configureServer runs in Node.js (not the browser).
     * `server.middlewares` is a Connect instance — we push our handler there.
     */
    configureServer(server) {
      server.middlewares.use('/assets', async (req, res, next) => {
        try {
          // Decode URL encoding (e.g. %20 → space, %26 → &)
          const requestedPath = decodeURIComponent(req.url || '/');

          // GridFS stores files with the full path as filename: /assets/foo.jpg
          const gridFsFilename = '/assets' + requestedPath;

          const bucket = await getBucket();

          // Look up file metadata
          const filesCollection = _db.collection('assetsBucket.files');
          const files = await filesCollection
            .find({ filename: gridFsFilename })
            .toArray();

          if (!files || files.length === 0) {
            console.warn(`[mongo-assets] 404 — not found in GridFS: ${gridFsFilename}`);
            res.statusCode = 404;
            res.end(`Asset not found: ${gridFsFilename}`);
            return;
          }

          const file = files[0];

          // Determine content type: prefer DB metadata, fall back to extension
          const mimeType = file.contentType || getMimeType(gridFsFilename);

          res.setHeader('Content-Type', mimeType);
          res.setHeader('Content-Disposition', `inline; filename="${file.filename?.split('/').pop() || 'file'}"`);
          // Cache for 1 hour in dev to reduce repeated DB round-trips
          res.setHeader('Cache-Control', 'public, max-age=3600');

          const downloadStream = bucket.openDownloadStreamByName(gridFsFilename);

          downloadStream.on('error', (err) => {
            console.error('[mongo-assets] Stream error:', err.message);
            if (!res.headersSent) {
              res.statusCode = 500;
              res.end('Error streaming file from MongoDB');
            }
          });

          downloadStream.pipe(res);
        } catch (err) {
          console.error('[mongo-assets] Handler error:', err.message);
          // If MongoDB isn't connected yet, fall through to Vite's own handler
          // (it will 404, but at least it won't crash the dev server)
          if (!res.headersSent) {
            res.statusCode = 502;
            res.end(`MongoDB connection error: ${err.message}`);
          }
        }
      });

      // Eagerly start the DB connection so it's ready before the first request
      getBucket().catch(err => {
        console.error('\n[mongo-assets] ❌ Failed to connect to MongoDB:', err.message);
        console.error('[mongo-assets] Assets will return 502 until the connection succeeds.\n');
      });
    },
  };
}
