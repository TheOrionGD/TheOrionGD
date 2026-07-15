import express from 'express';
import { getDb } from './db.js';
import { sanitizeString } from './schemas.js';

export const chatRouter = express.Router();

// Rate limiting: sessionId -> { count, lastAttempt }
const chatLimits = new Map();

// Regex for basic contact extraction
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;

async function callLLM(systemPrompt, contextData, messages, newMsg) {
  const groqKey = process.env.GROQ_API_KEY;

  const promptContext = `SYSTEM PROMPT:\n${systemPrompt}\n\nPORTFOLIO CONTEXT (JSON):\n${JSON.stringify(contextData, null, 2)}\n\nRespond to the user's latest message in Godfrey's voice based on this context.`;

  // 1. Groq LLM API (llama-3.3-70b-versatile)
  if (groqKey) {
    try {
      const url = 'https://api.groq.com/openai/v1/chat/completions';
      const formattedMsgs = [
        { role: 'system', content: promptContext },
        ...messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: newMsg }
      ];
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: formattedMsgs,
          max_tokens: 150,
          temperature: 0.7
        })
      });
      const data = await resp.json();
      if (data.choices && data.choices[0]?.message?.content) {
        return data.choices[0].message.content;
      } else if (data.error) {
        console.error('[Chat API] Groq API error response:', data.error);
      }
    } catch (e) {
      console.error('[Chat API] Groq call failed:', e.message);
    }
  }

  // 2. Smart Fallback Mode (No Groq key or fallback triggered)
  const lowerMsg = newMsg.toLowerCase();
  if (lowerMsg.includes('project') || lowerMsg.includes('work') || lowerMsg.includes('build')) {
    const proj = contextData.projects?.[0]?.title || 'Veltrio.Suite';
    return `I build AI-integrated systems and immersive XR platforms. One of my flagship works is ${proj} — check out the Featured Works section to see the live demos and architecture breakdowns!`;
  }
  if (lowerMsg.includes('skill') || lowerMsg.includes('tech') || lowerMsg.includes('stack')) {
    return "My technical arsenal covers Full Stack Engineering (MERN, TypeScript), AI & LLM integration, Cybersecurity fundamentals, and Spatial Computing / AR with Unity.";
  }
  if (lowerMsg.includes('contact') || lowerMsg.includes('hire') || lowerMsg.includes('connect') || lowerMsg.includes('collab')) {
    return "I'm always open to new adventures and technical challenges! Feel free to drop your email or message right here in the chat, or reach out via the Signal Portal at the bottom of the page.";
  }
  return "Hey there! I'm Godfrey's AI assistant. You can ask me anything about his projects, technical stack, internships, or certifications!";
}

chatRouter.post('/message', async (req, res) => {
  try {
    const { sessionId, message } = req.body;
    if (!sessionId || !message) {
      return res.status(400).json({ error: 'sessionId and message are required' });
    }

    const cleanMsg = sanitizeString(message.trim());
    if (!cleanMsg) {
      return res.status(400).json({ error: 'Empty message after sanitization' });
    }

    // Rate limiting check
    const now = Date.now();
    const limit = chatLimits.get(sessionId) || { count: 0, lastAttempt: 0 };
    if (now - limit.lastAttempt > 10 * 60 * 1000) {
      limit.count = 0;
    }
    if (limit.count >= 20) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please wait a few minutes before sending more messages.' });
    }
    limit.count++;
    limit.lastAttempt = now;
    chatLimits.set(sessionId, limit);

    const db = await getDb();
    
    // 1. Fetch persona and context
    const persona = await db.collection('bot_persona').findOne({}) || {};
    const systemPrompt = (persona.systemPrompt || "You are Godfrey's AI portfolio assistant.") +
      "\n\nIMPORTANT: Keep every reply SHORT — 2-3 sentences max. Be direct and punchy, no waffle.";
    
    const [personalInfo, projects, skills, experience, certifications] = await Promise.all([
      db.collection('personal_info').findOne({}),
      db.collection('projects').find({}).limit(10).toArray(),
      db.collection('skills').find({}).toArray(),
      db.collection('experience').find({}).toArray(),
      db.collection('certifications').find({}).limit(10).toArray(),
    ]);

    const contextData = { personalInfo, projects, skills, experience, certifications };

    // 2. Fetch or initialize chat session
    let session = await db.collection('chat_sessions').findOne({ sessionId });
    const existingMessages = session?.messages || [];

    // 3. Call LLM
    const assistantReply = await callLLM(systemPrompt, contextData, existingMessages, cleanMsg);

    // 4. Lead Detection
    const keywordsConfig = await db.collection('lead_keywords_config').findOne({}) || {
      keywords: ["connect", "collaborate", "hire", "job", "opportunity", "work with", "reach out", "get in touch", "internship"]
    };
    
    // Normalize both sides: lowercase + strip apostrophes/punctuation for fuzzy matching
    const normalize = (s) => s.toLowerCase().replace(/[''`]/g, '').replace(/\s+/g, ' ').trim();
    const normalizedMsg = normalize(cleanMsg);
    const matchedKeywords = (keywordsConfig.keywords || []).filter(kw => normalizedMsg.includes(normalize(kw)));
    
    let isLead = session?.leadDetected || matchedKeywords.length > 0;
    const currentMatched = new Set([...(session?.leadKeywordsMatched || []), ...matchedKeywords]);

    // Extract emails and phones
    const emails = cleanMsg.match(EMAIL_REGEX) || [];
    const phones = cleanMsg.match(PHONE_REGEX) || [];
    
    const extractedContact = session?.extractedContact || { name: null, email: null, phone: null, note: "Visitor interacting in chat" };
    if (emails.length > 0) extractedContact.email = emails[0];
    if (phones.length > 0) extractedContact.phone = phones[0];
    if (emails.length > 0 || phones.length > 0) {
      isLead = true;
      extractedContact.note = "Contact info captured from chat message";
    }

    // 5. Generate thread summary if lead or > 2 messages
    let summary = session?.summary || "Visitor exploring portfolio via chatbot.";
    if (isLead && !session?.leadDetected) {
      summary = `Lead detected! Interested in: ${Array.from(currentMatched).join(', ')}.`;
    }

    const newMessages = [
      ...existingMessages,
      { role: 'user', content: cleanMsg, timestamp: new Date() },
      { role: 'assistant', content: assistantReply, timestamp: new Date() }
    ];

    const visitorLabel = session?.visitorLabel || `Visitor #${Math.floor(1000 + Math.random() * 9000)}`;

    const updateDoc = {
      $set: {
        sessionId,
        visitorLabel,
        messages: newMessages,
        leadDetected: isLead,
        leadKeywordsMatched: Array.from(currentMatched),
        extractedContact,
        summary,
        status: isLead ? 'unread' : (session?.status || 'read'),
        lastActiveAt: new Date()
      },
      $setOnInsert: {
        createdAt: new Date(),
        muted: false
      }
    };

    await db.collection('chat_sessions').updateOne({ sessionId }, updateDoc, { upsert: true });

    return res.json({ reply: assistantReply });
  } catch (err) {
    console.error('[Chat API] Error processing message:', err);
    return res.status(500).json({ error: 'Failed to process chat message' });
  }
});
