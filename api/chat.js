import express from 'express';
import { getDb } from './db.js';
import { sanitizeString } from './schemas.js';
import { sendLeadNotificationEmail } from './email.js';

export const chatRouter = express.Router();

// Rate limiting: sessionId -> { count, lastAttempt }
const chatLimits = new Map();

// Regex for basic contact extraction
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;

import fs from 'fs';
import path from 'path';

let cachedKnowledge = null;
function getPortfolioKnowledge() {
  if (cachedKnowledge) return cachedKnowledge;
  try {
    const p = path.resolve('data/portfolio_knowledge.json');
    if (fs.existsSync(p)) {
      cachedKnowledge = JSON.parse(fs.readFileSync(p, 'utf8'));
      return cachedKnowledge;
    }
  } catch (e) {
    console.error('[Chat API] Failed to load portfolio_knowledge.json:', e.message);
  }
  return null;
}

async function callLLM(systemPrompt, contextData, messages, newMsg) {
  const groqKey = process.env.GROQ_API_KEY;

  const promptContext = `SYSTEM PROMPT:\n${systemPrompt}\n\nPORTFOLIO CONTEXT (JSON):\n${JSON.stringify(contextData, null, 2)}\n\nRespond directly as Godfrey in the first person ("I", "my") based on this context.`;

  // 1. Groq LLM API
  if (groqKey) {
    try {
      const url = 'https://api.groq.com/openai/v1/chat/completions';
      const groqModel = process.env.GROQ_MODEL || 'qwen/qwen3.8-27b';
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
          model: groqModel,
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

  // 2. Smart Fallback Mode (First-Person Voice as Godfrey)
  const lowerMsg = newMsg.toLowerCase();
  if (lowerMsg.includes('project') || lowerMsg.includes('work') || lowerMsg.includes('build') || lowerMsg.includes('aureon') || lowerMsg.includes('walsecact')) {
    return "I've engineered 42 systems across agentic AI, zero-trust architectures, and spatial computing — including Aureon (multi-agent wellness platform), Walsecact (MCP/A2A zero-trust mesh), and Veltrio. Check out my projects section for architecture breakdowns!";
  }
  if (lowerMsg.includes('intern') || lowerMsg.includes('adaovi') || lowerMsg.includes('prodigy') || lowerMsg.includes('skillcraft') || lowerMsg.includes('experience')) {
    return "I've completed industrial internships across Cybersecurity at Adaovi, Web Development at Prodigy InfoTech, and UI/UX Design at SkillCraft Technology, applying production standards to real-world software.";
  }
  if (lowerMsg.includes('hackathon') || lowerMsg.includes('msme') || lowerMsg.includes('wattmap') || lowerMsg.includes('award') || lowerMsg.includes('cert')) {
    return "I was shortlisted in the national MSME Idea Hackathon 5.0 and authored the WattMap smart energy incubation proposal, alongside earning 85+ verified credentials and completing NPTEL Patent Drafting.";
  }
  if (lowerMsg.includes('skill') || lowerMsg.includes('tech') || lowerMsg.includes('stack')) {
    return "My core stack spans Full-Stack Engineering (React 19, TypeScript, FastAPI), Agentic AI architectures (Groq, Gemini, ADK 2.0, MCP), Zero-Trust security, and Spatial XR with ARCore & Three.js.";
  }
  if (lowerMsg.includes('contact') || lowerMsg.includes('hire') || lowerMsg.includes('connect') || lowerMsg.includes('collab')) {
    return "I'm always open to high-impact technical challenges and collaborations! Drop your email or message right here in the chat, or ping me directly at godfreytr.prof@gmail.com.";
  }
  return "Hey! I'm Godfrey. Ask me anything about what I've engineered, my research, or my tech stack.";
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
    const systemPrompt = (persona.systemPrompt || `You are Godfrey T R (TheOrionGD). You speak directly in the FIRST PERSON ("I", "my", "we"). 
You are NOT an AI assistant, bot, or virtual avatar. Never say "I am an AI assistant for Godfrey", "As an AI", or refer to Godfrey in the third person.
You are Godfrey himself having a direct, engaging conversation with a visitor on your portfolio.
Your tone is confident, technically sharp, authentic, and direct — like an AI systems architect and builder.
You have completed 42 production projects (including Aureon, Walsecact, Trifecta, Cadence, FaceShield, AegisNet, EntityEase, ARgorithm, Dextra), 85+ verified credentials & certifications, national hackathons (MSME Idea Hackathon 5.0, WattMap), and multiple industrial internships (Adaovi for Cybersecurity, Prodigy InfoTech for Web Dev, SkillCraft for UI/UX).`) +
      "\n\nIMPORTANT: Keep every reply SHORT — 2-3 sentences max. Be direct, authentic, and punchy. No generic AI fluff or waffle.";
    
    const [personalInfo, dbProjects, skills, experience, dbCertifications] = await Promise.all([
      db.collection('personal_info').findOne({}),
      db.collection('projects').find({}).limit(50).toArray(),
      db.collection('skills').find({}).toArray(),
      db.collection('experience').find({}).toArray(),
      db.collection('certifications').find({}).limit(100).toArray(),
    ]);

    const knowledge = getPortfolioKnowledge();
    const q = cleanMsg.toLowerCase();
    
    // Smart retrieval for relevant projects or credentials
    const allProjects = knowledge?.projects || dbProjects || [];
    const allCerts = knowledge?.certifications || dbCertifications || [];

    const matchedProjects = allProjects.filter(p => 
      q.includes(p.title.toLowerCase()) || 
      (p.slug && q.includes(p.slug.toLowerCase())) ||
      (p.technologies && p.technologies.some(t => q.includes(t.toLowerCase())))
    );

    const matchedCerts = allCerts.filter(c =>
      (c.title && q.includes(c.title.toLowerCase())) ||
      (c.issuer && q.includes(c.issuer.toLowerCase())) ||
      (c.domain && q.includes(c.domain.toLowerCase()))
    );

    // Keep context compact (under 600 tokens) to guarantee instant responses and stay well within Groq ITPM limits
    const relevantProjects = (matchedProjects.length > 0 ? matchedProjects.slice(0, 3) : allProjects.slice(0, 3)).map(p => ({
      title: p.title,
      category: p.category,
      tech: p.technologies?.slice(0, 5),
      summary: p.description ? p.description.split('.')[0] + '.' : ''
    }));

    const relevantCredentials = (matchedCerts.length > 0 ? matchedCerts.slice(0, 3) : [
      { title: 'Adaovi Cybersecurity Internship', role: 'Cybersecurity Intern' },
      { title: 'Prodigy InfoTech Web Dev Internship', role: 'Web Development Intern' },
      { title: 'MSME Idea Hackathon 5.0 (WattMap)', status: 'National Shortlist' }
    ]).map(c => ({
      title: c.title,
      issuer: c.issuer || c.provider || '',
      summary: c.summary ? c.summary.split('.')[0] + '.' : ''
    }));

    const contextData = {
      name: 'Godfrey T R',
      role: 'AI Systems Architect & Full-Stack Product Engineer',
      stats: '42 completed engineering projects, 85+ verified credentials, 4 industrial internships',
      relevantProjects,
      relevantCredentials
    };

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
    const isNewLead = isLead && !session?.leadDetected;
    if (isNewLead) {
      summary = `Lead detected! Interested in: ${Array.from(currentMatched).join(', ')}.`;
    }

    const newlyCapturedContact = (emails.length > 0 || phones.length > 0) &&
      session?.leadDetected &&
      (!session?.extractedContact?.email && !session?.extractedContact?.phone);

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

    // Send email notification via Brevo if a new lead is detected or contact details were newly captured
    if (isNewLead || newlyCapturedContact) {
      sendLeadNotificationEmail({
        sessionId,
        visitorLabel,
        summary,
        matchedKeywords: Array.from(currentMatched),
        extractedContact,
        recentMessages: [
          { role: 'user', content: cleanMsg },
          { role: 'assistant', content: assistantReply }
        ]
      }).catch(err => {
        console.error('[Chat API] Lead notification email failed:', err);
      });
    }

    return res.json({ reply: assistantReply });
  } catch (err) {
    console.error('[Chat API] Error processing message:', err);
    return res.status(500).json({ error: 'Failed to process chat message' });
  }
});
