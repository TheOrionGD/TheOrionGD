/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from './db.js';

export const publicRouter = express.Router();

// 60-second in-memory TTL cache: collectionName -> { timestamp, data }
const cache = new Map();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

const ALLOWED_COLLECTIONS = [
  'personal_info',
  'education',
  'experience',
  'skills',
  'projects',
  'certifications',
  'certificate_archive',
  'gallery_images',
  'gallery',
  'media',
];

function parseObjectId(id) {
  try {
    return new ObjectId(id);
  } catch (err) {
    return id; // fallback for non-ObjectId strings if any
  }
}

// Serves binary image files from the Gallery collection
publicRouter.get('/gallery/image/:id', async (req, res) => {
  try {
    const db = await getDb();
    const doc = await db.collection('gallery').findOne({ _id: parseObjectId(req.params.id) });
    if (!doc || !doc.imageBinary) {
      return res.status(404).send('Image not found in MongoDB Gallery');
    }
    
    res.set('Content-Type', doc.mimeType || 'image/jpeg');
    res.set('Cache-Control', 'public, max-age=31536000, immutable'); // Cache aggressively
    
    const buffer = doc.imageBinary.buffer || doc.imageBinary;
    return res.send(buffer);
  } catch (err) {
    console.error('[Public API] Error serving gallery image:', err);
    return res.status(500).send('Error serving image');
  }
});

// GET /api/projects
publicRouter.get('/projects', async (req, res) => {
  try {
    const cacheKey = 'projects';
    const now = Date.now();
    const cached = cache.get(cacheKey);
    if (cached && (now - cached.timestamp < CACHE_TTL_MS)) {
      return res.json(cached.data);
    }

    const db = await getDb();
    const docs = await db.collection('projects').find({}).sort({ order: 1, _id: -1 }).toArray();
    cache.set(cacheKey, { timestamp: now, data: docs });
    return res.json(docs);
  } catch (err) {
    console.error('[Public API] Error fetching projects:', err);
    return res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/gallery
publicRouter.get('/gallery', async (req, res) => {
  try {
    const cacheKey = 'gallery';
    const now = Date.now();
    const cached = cache.get(cacheKey);
    if (cached && (now - cached.timestamp < CACHE_TTL_MS)) {
      return res.json(cached.data);
    }

    const db = await getDb();
    const docs = await db.collection('gallery').find({}).project({ imageBinary: 0 }).sort({ order: 1, _id: -1 }).toArray();
    
    // Project necessary fields and map src to dynamic binary image URL
    const items = docs.map(doc => ({
      _id: doc._id,
      title: doc.title,
      alt: doc.alt,
      order: doc.order,
      createdAt: doc.createdAt,
      src: `/api/public/gallery/image/${doc._id}`, // served dynamically
      width: doc.width || 1280,
      height: doc.height || 720,
    }));

    cache.set(cacheKey, { timestamp: now, data: items });
    return res.json(items);
  } catch (err) {
    console.error('[Public API] Error fetching gallery:', err);
    return res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

// GET /api/media
publicRouter.get('/media', async (req, res) => {
  try {
    const cacheKey = 'media';
    const now = Date.now();
    const cached = cache.get(cacheKey);
    if (cached && (now - cached.timestamp < CACHE_TTL_MS)) {
      return res.json(cached.data);
    }

    const db = await getDb();
    const docs = await db.collection('media').find({}).sort({ createdAt: -1 }).toArray();
    cache.set(cacheKey, { timestamp: now, data: docs });
    return res.json(docs);
  } catch (err) {
    console.error('[Public API] Error fetching media:', err);
    return res.status(500).json({ error: 'Failed to fetch media' });
  }
});

// GET /api/site
publicRouter.get('/site', async (req, res) => {
  try {
    const cacheKey = 'site';
    const now = Date.now();
    const cached = cache.get(cacheKey);
    if (cached && (now - cached.timestamp < CACHE_TTL_MS)) {
      return res.json(cached.data);
    }

    const db = await getDb();
    const [
      personalInfo,
      education,
      experience,
      skills,
      certifications,
      certificateArchive,
      botPersona,
    ] = await Promise.all([
      db.collection('personal_info').findOne({}),
      db.collection('education').find({}).sort({ order: 1 }).toArray(),
      db.collection('experience').find({}).sort({ order: 1 }).toArray(),
      db.collection('skills').find({}).sort({ order: 1 }).toArray(),
      db.collection('certifications').find({}).sort({ order: 1 }).toArray(),
      db.collection('certificate_archive').find({}).sort({ order: 1 }).toArray(),
      db.collection('bot_persona').findOne({}),
    ]);

    const data = {
      personalInfo: personalInfo || {},
      education,
      experience,
      skills,
      certifications,
      certificateArchive,
      botPersona: botPersona || {},
    };

    cache.set(cacheKey, { timestamp: now, data });
    return res.json(data);
  } catch (err) {
    console.error('[Public API] Error fetching site details:', err);
    return res.status(500).json({ error: 'Failed to fetch site config' });
  }
});

publicRouter.get('/bot-persona', async (req, res) => {
  try {
    const cacheKey = 'bot_persona';
    const now = Date.now();
    const cached = cache.get(cacheKey);

    if (cached && (now - cached.timestamp < CACHE_TTL_MS)) {
      return res.json(cached.data);
    }

    const db = await getDb();
    let persona = await db.collection('bot_persona').findOne({});
    if (!persona) {
      // Default persona if none exists yet
      persona = {
        botName: "ORIONGD",
        avatarSourceType: "brand_logo",
        avatarModelUrl: "/assets/models/oriongd-brand-avatar.glb",
        greeting: "Hey, I'm Godfrey's assistant — ask me about the projects, skills, or experience on this site.",
        speakingStyle: {
          tone: "confident, direct, slightly informal",
          signaturePhrases: ["Innovate. Build. Impact."]
        }
      };
    }

    cache.set(cacheKey, { timestamp: now, data: persona });
    return res.json(persona);
  } catch (err) {
    console.error('[Public API] Error fetching bot persona:', err);
    return res.status(500).json({ error: 'Failed to fetch bot persona' });
  }
});

publicRouter.get('/all', async (req, res) => {
  try {
    const now = Date.now();
    const cacheKey = '__all__';
    const cached = cache.get(cacheKey);

    if (cached && (now - cached.timestamp < CACHE_TTL_MS)) {
      return res.json(cached.data);
    }

    const db = await getDb();

    const [
      personalInfo,
      education,
      experience,
      skills,
      projects,
      certifications,
      certificateArchive,
      galleryImages,
      botPersona,
    ] = await Promise.all([
      db.collection('personal_info').findOne({}),
      db.collection('education').find({}).sort({ order: 1 }).toArray(),
      db.collection('experience').find({}).sort({ order: 1 }).toArray(),
      db.collection('skills').find({}).sort({ order: 1 }).toArray(),
      db.collection('projects').find({}).sort({ order: 1 }).toArray(),
      db.collection('certifications').find({}).sort({ order: 1 }).toArray(),
      db.collection('certificate_archive').find({}).sort({ order: 1 }).toArray(),
      db.collection('gallery_images').find({}).sort({ order: 1 }).toArray(),
      db.collection('bot_persona').findOne({}),
    ]);

    const result = {
      personalInfo: personalInfo || {},
      education,
      experience,
      skills,
      projects,
      certifications,
      certificateArchive,
      galleryImages,
      botPersona: botPersona || {},
    };

    cache.set(cacheKey, { timestamp: now, data: result });
    return res.json(result);
  } catch (err) {
    console.error('[Public API] Error fetching all collections:', err);
    return res.status(500).json({ error: 'Failed to fetch all portfolio data' });
  }
});

publicRouter.get('/:collection', async (req, res) => {
  try {
    const { collection } = req.params;
    if (!ALLOWED_COLLECTIONS.includes(collection)) {
      return res.status(403).json({ error: 'Access denied to this collection' });
    }

    const now = Date.now();
    const cached = cache.get(collection);

    if (cached && (now - cached.timestamp < CACHE_TTL_MS)) {
      return res.json(cached.data);
    }

    const db = await getDb();
    const col = db.collection(collection);
    
    // For personal_info, return single object or null
    if (collection === 'personal_info') {
      const doc = await col.findOne({});
      cache.set(collection, { timestamp: now, data: doc || {} });
      return res.json(doc || {});
    }

    // For lists, sort by order ascending
    const docs = await col.find({}).sort({ order: 1, _id: -1 }).toArray();
    cache.set(collection, { timestamp: now, data: docs });
    return res.json(docs);
  } catch (err) {
    console.error(`[Public API] Error fetching ${req.params.collection}:`, err);
    return res.status(500).json({ error: `Failed to fetch public data for ${req.params.collection}` });
  }
});

// Endpoint to clear cache manually when admin updates data
export function clearCache(collectionName) {
  if (collectionName) {
    cache.delete(collectionName);
  } else {
    cache.clear();
  }
}
