import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { connectToDatabase } from '../api/db.js';

dotenv.config({ override: true });

function parseProjects() {
  const projectsRaw = fs.readFileSync(path.resolve('Docs/Projects.md'), 'utf8');
  const blocks = projectsRaw.split(/^##\s+/m).slice(1);

  return blocks.map((block, index) => {
    const lines = block.trim().split('\n');
    const title = lines[0].trim();
    const body = lines.slice(1).join('\n').trim();

    // Determine category based on content
    let category = 'Full Stack / Systems';
    const lower = body.toLowerCase();
    if (lower.includes('ai') || lower.includes('llm') || lower.includes('agent') || lower.includes('nlp') || lower.includes('rag')) {
      category = 'AI / Agents / ML';
    } else if (lower.includes('security') || lower.includes('siem') || lower.includes('ids') || lower.includes('zero-trust')) {
      category = 'Cybersecurity / Systems';
    } else if (lower.includes('augmented reality') || lower.includes('arcore') || lower.includes('3d') || lower.includes('three.js')) {
      category = 'Spatial Computing / XR';
    } else if (lower.includes('game') || lower.includes('physics')) {
      category = 'Game Dev / Engines';
    }

    // Extract technologies
    const techMatches = body.match(/(?:Python|FastAPI|React|React Native|Node\.js|Express|TypeScript|JavaScript|Kotlin|Jetpack Compose|ARCore|Three\.js|Vite|Tailwind CSS|MongoDB|PostgreSQL|SQLite|PyTorch|BioBERT|FAISS|ONNX|OpenCV|Snort 3|Whisper|Docker|Redis|Java|Spring Boot|C99|C11|Next\.js|Bun|Prisma|WebSockets|ChromaDB|NLTK)/gi) || [];
    const technologies = Array.from(new Set(techMatches.map(t => t.trim())));
    if (technologies.length === 0) {
      technologies.push('TypeScript', 'React');
    }

    return {
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      description: body,
      category,
      technologies,
      tech: technologies,
      status: 'published',
      featured: index < 7,
      order: index + 1,
      github: `https://github.com/TheOrionGD/${title}`,
      demo: '',
      problemStatement: body.split('.')[0] + '.',
      deliverables: [body.slice(0, 180) + '...'],
      hook: `Engineered by Godfrey: ${title}`
    };
  });
}

function parseCertificates() {
  const certsRaw = fs.readFileSync(path.resolve('Docs/certificate_report.md'), 'utf8');
  const parts = certsRaw.split(/^##\s+Part\s+/m).slice(1);

  const allCerts = [];
  parts.forEach(partStr => {
    const lines = partStr.split('\n');
    const partHeader = lines[0].trim();
    const certBlocks = partStr.split(/^###\s+/m).slice(1);

    certBlocks.forEach(b => {
      const bLines = b.trim().split('\n');
      const title = bLines[0].trim();
      const rest = bLines.slice(1).join('\n');
      const provider = rest.match(/\*\*Provider:\*\*\s*(.+)/i)?.[1]?.trim() || 'Accredited Institution';
      const year = rest.match(/\*\*Year:\*\*\s*(.+)/i)?.[1]?.trim() || '2024-2026';
      const domain = rest.match(/\*\*Domain:\*\*\s*(.+)/i)?.[1]?.trim() || 'Computer Science & Engineering';
      const rawSummary = rest.match(/\*\*Summary:\*\*\s*([\s\S]+?)(?=\n\n|$)/i)?.[1]?.trim() || rest.trim();
      const summary = rawSummary.replace(/---/g, '').trim();

      allCerts.push({
        title,
        issuer: provider,
        year,
        domain,
        partSection: partHeader,
        summary,
        status: 'verified'
      });
    });
  });

  return allCerts;
}

async function run() {
  console.log('Parsing Projects & Certificates from Docs...');
  const projects = parseProjects();
  const certs = parseCertificates();

  console.log(`Parsed ${projects.length} projects and ${certs.length} certificates & experiences.`);

  const knowledgeData = {
    developer: {
      name: 'Godfrey T R',
      handle: 'TheOrionGD',
      role: 'AI Systems Architect & Full-Stack Product Engineer',
      tagline: 'Building AI-native architectures, multi-agent frameworks, zero-trust systems, and spatial computing interfaces.',
      email: 'godfreytr.prof@gmail.com',
      location: 'Tiruchirapalli, Tamil Nadu, India',
      github: 'https://github.com/TheOrionGD',
      linkedin: 'https://linkedin.com/in/theoriongd'
    },
    projectsCount: projects.length,
    certificatesCount: certs.length,
    projects,
    certifications: certs,
    internships: [
      {
        company: 'Adaovi',
        role: 'Cybersecurity Intern',
        period: 'June - July 2024',
        details: 'Security analysis, network protection, threat detection, and secure workflows.'
      },
      {
        company: 'Prodigy InfoTech',
        role: 'Web Development Intern',
        period: 'August - September 2024',
        details: 'Building responsive web applications, API integrations, and CodeChallenge-Pro client IDE.'
      },
      {
        company: 'SkillCraft Technology',
        role: 'UI/UX Design Intern',
        period: 'Early 2025',
        details: 'Wireframing, user journeys, interaction design, and visual ergonomics.'
      },
      {
        company: 'CampusX',
        role: 'Full Stack & Innovation',
        period: '2026',
        details: 'Pitch-A-Thon finalist, startup prototyping, and full-stack software delivery.'
      }
    ],
    researchAndInnovations: [
      {
        title: 'MSME Idea Hackathon 5.0 Shortlisted Idea',
        summary: 'National innovation framework submission on sustainable engineering.'
      },
      {
        title: 'WattMap — MSME Incubation Scheme Proposal',
        summary: 'AI-powered smart energy monitoring system with renewable energy focus.'
      },
      {
        title: 'Patent Drafting for Beginners (NPTEL)',
        summary: 'Formal patent drafting, claims construction, and IP rights protection.'
      }
    ]
  };

  // Write to data/portfolio_knowledge.json
  const dataDir = path.resolve('data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const targetPath = path.join(dataDir, 'portfolio_knowledge.json');
  fs.writeFileSync(targetPath, JSON.stringify(knowledgeData, null, 2), 'utf8');
  console.log(`Saved knowledge dataset to ${targetPath}`);

  // Sync to MongoDB
  try {
    console.log('Connecting to MongoDB...');
    const { db } = await connectToDatabase();
    
    // 1. Update Persona to Godfrey First Person
    console.log('Updating bot_persona to Godfrey personal voice...');
    const newPersona = {
      botName: 'Godfrey T R',
      avatarSourceType: 'brand_logo',
      greeting: "Hey! I'm Godfrey. Ask me anything about what I've engineered, my research proposals, or my tech stack.",
      systemPrompt: `You are Godfrey T R (TheOrionGD). You ALWAYS speak directly in the FIRST PERSON ("I", "my", "we"). 
You are NOT an "AI assistant" or a third-party bot. Never say "I am an AI assistant for Godfrey", "As an AI...", or "Feel free to ask me about him". 
You are Godfrey himself having a direct, engaging conversation with a visitor on your portfolio.
Your tone is confident, technically sharp, authentic, and direct — like a passionate software architect and builder who loves discussing systems, zero-trust security, multi-agent frameworks, and spatial computing.
Keep responses concise (2 to 3 sentences maximum), punchy, and grounded directly in the projects and achievements provided in context.`,
      speakingStyle: {
        tone: 'authentic, confident, direct, passionate builder',
        perspective: 'first-person ("I", "my")',
        avoid: ['third-person reference to Godfrey', 'AI assistant tropes', 'robotic disclaimers', 'corporate fluff']
      },
      updatedAt: new Date()
    };

    await db.collection('bot_persona').updateOne(
      {},
      { $set: newPersona },
      { upsert: true }
    );

    // 2. Upsert all projects
    console.log(`Syncing ${projects.length} projects to MongoDB...`);
    for (const proj of projects) {
      await db.collection('projects').updateOne(
        { slug: proj.slug },
        { 
          $set: {
            title: proj.title,
            slug: proj.slug,
            description: proj.description,
            category: proj.category,
            tech: proj.tech,
            technologies: proj.technologies,
            status: 'published',
            featured: proj.featured,
            order: proj.order,
            github: proj.github,
            demo: proj.demo,
            problemStatement: proj.problemStatement,
            deliverables: proj.deliverables,
            hook: proj.hook,
            updatedAt: new Date()
          },
          $setOnInsert: {
            createdAt: new Date()
          }
        },
        { upsert: true }
      );
    }

    // 3. Upsert certifications
    console.log(`Syncing ${certs.length} certificates to MongoDB...`);
    for (const cert of certs) {
      await db.collection('certifications').updateOne(
        { title: cert.title },
        {
          $set: {
            title: cert.title,
            issuer: cert.issuer,
            year: cert.year,
            domain: cert.domain,
            summary: cert.summary,
            partSection: cert.partSection,
            status: 'verified',
            updatedAt: new Date()
          },
          $setOnInsert: {
            createdAt: new Date()
          }
        },
        { upsert: true }
      );
    }

    console.log('✅ Synchronization completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('MongoDB sync error:', err.message);
    process.exit(1);
  }
}

run();
