/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { ObjectId } from 'mongodb';
import { getDb, getClient } from './db.js';
import { validateSchema, sanitizeData } from './schemas.js';
import { clearCache } from './public.js';

export const adminRouter = express.Router();

// Blocklist sensitive collections from generic CRUD
const BLOCKLIST = ['admin_users', 'bot_persona', 'chat_sessions', 'lead_keywords_config'];

function checkBlocklist(req, res, next) {
  const { collection } = req.params;
  if (BLOCKLIST.includes(collection)) {
    return res.status(403).json({ error: `Access to collection '${collection}' is forbidden via generic CRUD routes` });
  }
  next();
}

function parseObjectId(id) {
  try {
    return new ObjectId(id);
  } catch (err) {
    return id; // fallback for non-ObjectId strings if any
  }
}

// --- DEDICATED BOT PERSONA ENDPOINTS ---
adminRouter.get('/bot-persona', async (req, res) => {
  try {
    const db = await getDb();
    let persona = await db.collection('bot_persona').findOne({});
    if (!persona) {
      // Default initial persona
      persona = {
        botName: "ORIONGD",
        avatarSourceType: "brand_logo",
        avatarModelUrl: "/assets/models/oriongd-brand-avatar.glb",
        brandLogoSourceUrl: "/assets/brand/oriongd-logo.svg",
        greeting: "Hey, I'm Godfrey's assistant — ask me about the projects, skills, or experience on this site.",
        systemPrompt: "You are the AI assistant embedded in Godfrey T R's (OrionGD) developer portfolio, represented visually by his brand mark. You respond in Godfrey's own voice and tone, using the speakingStyle data provided below as your reference for phrasing, sentence rhythm, and personality — not as a generic assistant. Only answer using the project, skill, experience, and certification data provided in context — never invent details Godfrey hasn't shared. If asked something outside the portfolio's scope, redirect politely to contacting Godfrey directly.",
        speakingStyle: {
          tone: "confident, direct, slightly informal — avoids corporate-speak",
          sentenceRhythm: "short declarative sentences, occasional em-dash asides",
          signaturePhrases: ["Innovate. Build. Impact."],
          sampleResponses: [],
          avoid: ["overly formal corporate phrasing", "excessive hedging", "generic AI-assistant filler"]
        },
        idleAnimations: ["breathing", "look_around", "wave"],
        updatedAt: new Date()
      };
      await db.collection('bot_persona').insertOne(persona);
    }
    return res.json(persona);
  } catch (err) {
    console.error('[Admin API] Error fetching bot persona:', err);
    return res.status(500).json({ error: 'Failed to fetch bot persona' });
  }
});

adminRouter.patch('/bot-persona', async (req, res) => {
  try {
    const validated = validateSchema('bot_persona', req.body);
    validated.updatedAt = new Date();
    const db = await getDb();
    
    const existing = await db.collection('bot_persona').findOne({});
    if (existing) {
      await db.collection('bot_persona').updateOne({ _id: existing._id }, { $set: validated });
    } else {
      await db.collection('bot_persona').insertOne(validated);
    }
    return res.json({ success: true, persona: validated });
  } catch (err) {
    console.error('[Admin API] Error updating bot persona:', err);
    return res.status(400).json({ error: err.message || 'Validation error updating bot persona' });
  }
});

// --- DEDICATED LEAD KEYWORDS ENDPOINTS ---
adminRouter.get('/lead-keywords', async (req, res) => {
  try {
    const db = await getDb();
    let config = await db.collection('lead_keywords_config').findOne({});
    if (!config) {
      config = {
        keywords: [
          "connect", "collaborate", "hire", "job", "opportunity",
          "work with", "reach out", "get in touch", "interested in working",
          "internship", "recruiter", "let's talk"
        ],
        updatedAt: new Date()
      };
      await db.collection('lead_keywords_config').insertOne(config);
    }
    return res.json(config);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch lead keywords' });
  }
});

adminRouter.patch('/lead-keywords', async (req, res) => {
  try {
    const validated = validateSchema('lead_keywords_config', req.body);
    validated.updatedAt = new Date();
    const db = await getDb();
    
    const existing = await db.collection('lead_keywords_config').findOne({});
    if (existing) {
      await db.collection('lead_keywords_config').updateOne({ _id: existing._id }, { $set: validated });
    } else {
      await db.collection('lead_keywords_config').insertOne(validated);
    }
    return res.json({ success: true, config: validated });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// --- DEDICATED CONVERSATIONS INBOX ENDPOINTS ---
adminRouter.get('/conversations', async (req, res) => {
  try {
    const db = await getDb();
    const sessions = await db.collection('chat_sessions')
      .find({})
      .sort({ lastActiveAt: -1, createdAt: -1 })
      .limit(100)
      .toArray();
    return res.json(sessions);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

adminRouter.get('/conversations/:id', async (req, res) => {
  try {
    const db = await getDb();
    const session = await db.collection('chat_sessions').findOne({
      $or: [{ _id: parseObjectId(req.params.id) }, { sessionId: req.params.id }]
    });
    if (!session) return res.status(404).json({ error: 'Conversation not found' });
    return res.json(session);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch conversation thread' });
  }
});

adminRouter.patch('/conversations/:id/status', async (req, res) => {
  try {
    const { status } = req.body; // "read" | "unread"
    const db = await getDb();
    await db.collection('chat_sessions').updateOne(
      { $or: [{ _id: parseObjectId(req.params.id) }, { sessionId: req.params.id }] },
      { $set: { status } }
    );
    return res.json({ success: true, status });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update conversation status' });
  }
});

adminRouter.patch('/conversations/:id/mute', async (req, res) => {
  try {
    const { muted } = req.body; // boolean
    const db = await getDb();
    await db.collection('chat_sessions').updateOne(
      { $or: [{ _id: parseObjectId(req.params.id) }, { sessionId: req.params.id }] },
      { $set: { muted: !!muted } }
    );
    return res.json({ success: true, muted: !!muted });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update conversation mute state' });
  }
});

// --- GENERIC COLLECTION CRUD ENDPOINTS ---

// Reorder endpoint (must come before /:id)
adminRouter.patch('/data/:collection/reorder', checkBlocklist, async (req, res) => {
  const client = await getClient();
  const session = client.startSession();
  try {
    const { collection } = req.params;
    const { items } = req.body; // Array of { id, order }

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'items must be an array of { id, order }' });
    }

    const db = await getDb();
    const col = db.collection(collection);

    // Execute bulk write for reordering inside a transaction
    await session.withTransaction(async () => {
      const operations = items.map(item => ({
        updateOne: {
          filter: { _id: parseObjectId(item.id) },
          update: { $set: { order: item.order } }
        }
      }));

      if (operations.length > 0) {
        await col.bulkWrite(operations, { session });
      }
    });

    clearCache(collection);
    clearCache('site'); // Also clear the site data cache since lists might be part of site layout
    clearCache('projects');
    clearCache('gallery');
    clearCache('media');

    return res.json({ success: true, message: `Reordered ${items.length} items in ${collection}` });
  } catch (err) {
    console.error('[Admin API] Reorder error:', err);
    return res.status(500).json({ error: 'Failed to reorder items' });
  } finally {
    await session.endSession();
  }
});

adminRouter.get('/data/:collection', checkBlocklist, async (req, res) => {
  try {
    const { collection } = req.params;
    const db = await getDb();
    const col = db.collection(collection);
    
    // Sort by order ascending if present, else by createdAt or _id descending
    let query = col.find({});
    if (collection === 'gallery') {
      query = query.project({ imageBinary: 0 });
    }
    const docs = await query.sort({ order: 1, _id: -1 }).toArray();
    return res.json(docs);
  } catch (err) {
    console.error(`[Admin API] GET /data/${req.params.collection} error:`, err);
    return res.status(500).json({ error: `Failed to fetch data from ${req.params.collection}` });
  }
});

adminRouter.post('/data/:collection', checkBlocklist, async (req, res) => {
  const client = await getClient();
  const session = client.startSession();
  try {
    const { collection } = req.params;
    const validated = validateSchema(collection, req.body);
    
    if (collection === 'projects') {
      validated.createdAt = new Date();
      validated.updatedAt = new Date();
    } else if (collection === 'personal_info') {
      validated.updatedAt = new Date();
    }

    const db = await getDb();
    const col = db.collection(collection);
    let resultDoc = null;

    await session.withTransaction(async () => {
      // If personal_info (singleton), check if one already exists
      if (collection === 'personal_info') {
        const existing = await col.findOne({}, { session });
        if (existing) {
          await col.updateOne({ _id: existing._id }, { $set: validated }, { session });
          resultDoc = { _id: existing._id, ...validated };
          return;
        }
      }

      // ACID TRANSACTION SAMPLE (Create Project -> Store Image -> Create Media Record -> Commit)
      // If client sends inline cover image as base64 in `validated.coverImage`
      if (collection === 'projects' && req.body.coverImage) {
        const imgData = req.body.coverImage; // { title, imageBinary (base64), mimeType, alt }
        const imgBuffer = Buffer.from(imgData.imageBinary, 'base64');
        const galleryCol = db.collection('gallery');
        const galleryInsert = await galleryCol.insertOne({
          title: imgData.title || `${validated.title} Cover`,
          imageBinary: imgBuffer,
          mimeType: imgData.mimeType || 'image/png',
          alt: imgData.alt || validated.title,
          order: 0,
          createdAt: new Date(),
        }, { session });
        validated.coverImageId = galleryInsert.insertedId.toString();
        delete validated.coverImage;
      }

      const result = await col.insertOne(validated, { session });
      resultDoc = { _id: result.insertedId, ...validated };
    });

    clearCache(collection);
    clearCache('site');
    clearCache('projects');
    clearCache('gallery');
    clearCache('media');

    return res.status(201).json(resultDoc);
  } catch (err) {
    console.error(`[Admin API] POST /data/${req.params.collection} error:`, err);
    return res.status(400).json({ error: err.message || 'Validation error creating document' });
  } finally {
    await session.endSession();
  }
});

adminRouter.patch('/data/:collection/:id', checkBlocklist, async (req, res) => {
  const client = await getClient();
  const session = client.startSession();
  try {
    const { collection, id } = req.params;
    const sanitized = sanitizeData(req.body);
    
    if (collection === 'projects' || collection === 'personal_info') {
      sanitized.updatedAt = new Date();
    }
    
    // Remove _id from update body if present
    delete sanitized._id;

    const db = await getDb();
    const col = db.collection(collection);
    let updatedDoc = null;

    await session.withTransaction(async () => {
      const oldDoc = await col.findOne({ _id: parseObjectId(id) }, { session });
      if (!oldDoc) {
        throw new Error('Document not found');
      }

      // ACID TRANSACTION SAMPLE (Update Project -> Handle Cover Image Replacement -> Commit)
      // Check if old coverImageId is being replaced
      if (collection === 'projects' && sanitized.coverImageId !== undefined && oldDoc.coverImageId && oldDoc.coverImageId !== sanitized.coverImageId) {
        // Delete old cover image to prevent orphaned media
        const otherProjCount = await col.countDocuments({
          _id: { $ne: parseObjectId(id) },
          coverImageId: oldDoc.coverImageId
        }, { session });
        
        if (otherProjCount === 0) {
          await db.collection('gallery').deleteOne({ _id: parseObjectId(oldDoc.coverImageId) }, { session });
        }
      }

      // If client sends new inline cover image to replace existing one
      if (collection === 'projects' && req.body.coverImage) {
        const imgData = req.body.coverImage;
        const imgBuffer = Buffer.from(imgData.imageBinary, 'base64');
        const galleryCol = db.collection('gallery');
        
        // Delete old cover image if it exists and isn't shared
        if (oldDoc.coverImageId) {
          const otherProjCount = await col.countDocuments({
            _id: { $ne: parseObjectId(id) },
            coverImageId: oldDoc.coverImageId
          }, { session });
          if (otherProjCount === 0) {
            await galleryCol.deleteOne({ _id: parseObjectId(oldDoc.coverImageId) }, { session });
          }
        }

        const galleryInsert = await galleryCol.insertOne({
          title: imgData.title || `${sanitized.title || oldDoc.title} Cover`,
          imageBinary: imgBuffer,
          mimeType: imgData.mimeType || 'image/png',
          alt: imgData.alt || sanitized.title || oldDoc.title,
          order: 0,
          createdAt: new Date(),
        }, { session });
        sanitized.coverImageId = galleryInsert.insertedId.toString();
        delete sanitized.coverImage;
      }

      const result = await col.findOneAndUpdate(
        { _id: parseObjectId(id) },
        { $set: sanitized },
        { returnDocument: 'after', session }
      );

      updatedDoc = result;
    });

    if (!updatedDoc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    clearCache(collection);
    clearCache('site');
    clearCache('projects');
    clearCache('gallery');
    clearCache('media');

    return res.json(updatedDoc);
  } catch (err) {
    console.error(`[Admin API] PATCH /data/${req.params.collection}/${req.params.id} error:`, err);
    return res.status(400).json({ error: err.message || 'Error updating document' });
  } finally {
    await session.endSession();
  }
});

adminRouter.delete('/data/:collection/:id', checkBlocklist, async (req, res) => {
  const client = await getClient();
  const session = client.startSession();
  try {
    const { collection, id } = req.params;
    const db = await getDb();
    const col = db.collection(collection);
    let deletedCount = 0;

    await session.withTransaction(async () => {
      // Hook: Prevent orphaned media by cleaning up images and videos on project deletion
      if (collection === 'projects') {
        const project = await col.findOne({ _id: parseObjectId(id) }, { session });
        if (project) {
          // Delete cover image if not referenced by another project
          if (project.coverImageId) {
            const count = await col.countDocuments({ _id: { $ne: parseObjectId(id) }, coverImageId: project.coverImageId }, { session });
            if (count === 0) {
              await db.collection('gallery').deleteOne({ _id: parseObjectId(project.coverImageId) }, { session });
            }
          }
          // Delete gallery images if any
          if (Array.isArray(project.galleryImageIds) && project.galleryImageIds.length > 0) {
            const imgIds = project.galleryImageIds.map(imgId => parseObjectId(imgId));
            await db.collection('gallery').deleteMany({ _id: { $in: imgIds } }, { session });
          }
          // Delete video references from media collection if exists
          if (project.videoId) {
            await db.collection('media').deleteOne({ _id: parseObjectId(project.videoId) }, { session });
          }
        }
      }

      // Cleanup projects referencing this gallery image if we are deleting from gallery
      if (collection === 'gallery') {
        await db.collection('projects').updateMany(
          { coverImageId: id },
          { $set: { coverImageId: null } },
          { session }
        );
        await db.collection('projects').updateMany(
          { galleryImageIds: id },
          { $pull: { galleryImageIds: id } },
          { session }
        );
      }

      // Cleanup projects referencing this video if we are deleting from media
      if (collection === 'media') {
        await db.collection('projects').updateMany(
          { videoId: id },
          { $set: { videoId: null } },
          { session }
        );
      }

      const result = await col.deleteOne({ _id: parseObjectId(id) }, { session });
      deletedCount = result.deletedCount;
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Document not found or already deleted' });
    }

    clearCache(collection);
    clearCache('site');
    clearCache('projects');
    clearCache('gallery');
    clearCache('media');

    return res.json({ success: true, deletedId: id });
  } catch (err) {
    console.error(`[Admin API] DELETE /data/${req.params.collection}/${req.params.id} error:`, err);
    return res.status(500).json({ error: 'Failed to delete document' });
  } finally {
    await session.endSession();
  }
});
