const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, BorderStyle, WidthType, ShadingType,
  VerticalAlign, HeadingLevel, TabStopType, TabStopPosition
} = require('docx');
const fs = require('fs');

// ── Color palette ────────────────────────────────────────────────
const DARK   = "0F172A"; // slate-900
const ACCENT = "4F46E5"; // indigo-600
const VIOLET = "7C3AED"; // violet-600
const GRAY   = "334155"; // slate-700
const LGRAY  = "64748B"; // slate-500
const LINE   = "E2E8F0"; // slate-200
const BADGE  = "EEF2FF"; // indigo-50

// ── Reusable border helpers ───────────────────────────────────────
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const hairline = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const accentLine = { style: BorderStyle.SINGLE, size: 6, color: ACCENT };

// ── Section heading ───────────────────────────────────────────────
function sectionHeading(text) {
  return [
    new Paragraph({
      spacing: { before: 120, after: 24 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 4 } },
      children: [
        new TextRun({
          text: text.toUpperCase(),
          bold: true,
          size: 24,
          color: ACCENT,
          font: "Inter",
        })
      ]
    })
  ];
}

// ── Role + date row ───────────────────────────────────────────────
function roleRow(title, org, date, location) {
  return new Paragraph({
    spacing: { before: 90, after: 14 },
    tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
    children: [
      new TextRun({ text: title, bold: true, size: 20, color: DARK, font: "Inter" }),
      new TextRun({ text: "  |  ", size: 16, color: LGRAY, font: "Inter" }),
      new TextRun({ text: org, bold: false, size: 16, color: ACCENT, font: "Inter" }),
      new TextRun({ text: "\t", font: "Inter" }),
      new TextRun({ text: date + (location ? "  ·  " + location : ""), size: 14, color: LGRAY, font: "Inter" }),
    ]
  });
}

// ── Bullet point ─────────────────────────────────────────────────
function bullet(text, ref) {
  return new Paragraph({
    numbering: { reference: ref || "bullets", level: 0 },
    spacing: { before: 12, after: 12 },
    children: [new TextRun({ text, size: 16, color: GRAY, font: "Inter" })]
  });
}

// ── Plain paragraph ───────────────────────────────────────────────
function para(text, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.before || 0, after: opts.after || 36 },
    alignment: opts.align || AlignmentType.LEFT,
    children: [new TextRun({
      text,
      size: opts.size || 19,
      color: opts.color || GRAY,
      bold: opts.bold || false,
      font: "Inter",
      italics: opts.italic || false,
    })]
  });
}

// ── Skills row (two-column table) ────────────────────────────────
function skillsTable(rows) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2400, 6960],
    borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideH: noBorder, insideV: noBorder },
    rows: rows.map(([label, value]) =>
      new TableRow({
        children: [
          new TableCell({
            borders: noBorders,
            width: { size: 2400, type: WidthType.DXA },
            margins: { top: 30, bottom: 30, left: 0, right: 120 },
            children: [new Paragraph({
              children: [new TextRun({ text: label, bold: true, size: 18, color: DARK, font: "Inter" })]
            })]
          }),
          new TableCell({
            borders: noBorders,
            width: { size: 6960, type: WidthType.DXA },
            margins: { top: 30, bottom: 30, left: 0, right: 0 },
            children: [new Paragraph({
              children: [new TextRun({ text: value, size: 18, color: GRAY, font: "Inter" })]
            })]
          })
        ]
      })
    )
  });
}

// ── Achievement chip row ──────────────────────────────────────────
function achievementRow(items) {
  return new Paragraph({
    spacing: { before: 16, after: 16 },
    children: items.flatMap((item, i) => [
      new TextRun({ text: "▸ ", size: 16, color: ACCENT, font: "Inter", bold: true }),
      new TextRun({ text: item, size: 16, color: GRAY, font: "Inter" }),
      i < items.length - 1 ? new TextRun({ text: "    ", font: "Inter" }) : new TextRun({ text: "", font: "Inter" })
    ])
  });
}

// ── Problem statement paragraph ───────────────────────────────────
function problemStatement(text) {
  return new Paragraph({
    spacing: { before: 8, after: 14 },
    children: [
      new TextRun({ text: "Problem: ", bold: true, size: 16, color: VIOLET, font: "Inter" }),
      new TextRun({ text, size: 16, color: LGRAY, font: "Inter", italics: true })
    ]
  });
}

// ══════════════════════════════════════════════════════════════════
//  BUILD DOCUMENT
// ══════════════════════════════════════════════════════════════════
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: "–",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 360 } } }
        }]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 600, right: 700, bottom: 600, left: 700 }
      }
    },
    children: [

      // ── NAME ──────────────────────────────────────────────────
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 0, after: 40 },
        children: [
          new TextRun({ text: "GODFREY T R", bold: true, size: 60, color: DARK, font: "Inter" })
        ]
      }),

      // ── TITLE LINE ────────────────────────────────────────────
      new Paragraph({
        spacing: { before: 0, after: 80 },
        children: [
          new TextRun({ text: "Software Engineer  |  AI Engineer  |  Full Stack Developer  |  XR Developer", size: 22, color: ACCENT, font: "Inter", bold: false })
        ]
      }),

      // ── CONTACT BAR ───────────────────────────────────────────
      new Paragraph({
        spacing: { before: 0, after: 48 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LINE, space: 6 } },
        children: [
          new TextRun({ text: "godfreytr.prof@gmail.com", size: 18, color: GRAY, font: "Inter" }),
          new TextRun({ text: "   |   +91 93444 62238", size: 18, color: GRAY, font: "Inter" }),
          new TextRun({ text: "   |   Tiruchirapalli, Tamil Nadu", size: 18, color: GRAY, font: "Inter" }),
          new TextRun({ text: "   |   linkedin.com/in/godfrey192607", size: 18, color: ACCENT, font: "Inter" }),
          new TextRun({ text: "   |   github.com/TheOrionGD", size: 18, color: ACCENT, font: "Inter" }),
          new TextRun({ text: "   |   TheOrionGD.vercel.app", size: 18, color: ACCENT, font: "Inter" }),
        ]
      }),

      // ── PROFESSIONAL SUMMARY ──────────────────────────────────
      ...sectionHeading("Professional Summary"),
      new Paragraph({
        spacing: { before: 28, after: 28 },
        children: [
          new TextRun({
            text: "Computer Science and Engineering student (graduating May 2027) with 4 internships, a registered patent, Azure AI Engineer Associate certification (AI-102), and an Applied Generative AI Specialization with Distinction (Apr 2026). Delivered production-ready MERN applications, RAG-powered AI systems, biometric security platforms, and augmented reality educational tools. Skilled in full-stack engineering, LLM integration, edge-AI, and scalable cloud-native architectures. Currently Vice President of XR Club and NSS Senior Coordinator. Open to software engineering and AI engineering internships and full-time roles.",
            size: 18, color: GRAY, font: "Inter"
          })
        ]
      }),

      // ── TECHNICAL SKILLS ──────────────────────────────────────
      ...sectionHeading("Technical Skills"),
      new Paragraph({ spacing: { before: 28, after: 14 }, children: [] }),
      skillsTable([
        ["Core Languages",  "Python · Java · JavaScript · TypeScript · C · C# · SQL"],
        ["Frontend",        "React.js · React 19 · HTML5 · CSS3 · Tailwind CSS · Framer Motion · Three.js"],
        ["Backend & APIs",  "Node.js · Express.js · FastAPI · Flask · NestJS · REST APIs · WebSockets"],
        ["AI & ML",         "Google Gemini API · Azure AI · RAG · LLM Integration · NLP · Prompt Engineering · ONNX Runtime · ArcFace"],
        ["Databases",       "MongoDB · PostgreSQL · MySQL · Firebase · ChromaDB · Redis · SQLite · Supabase"],
        ["Immersive Tech",  "Unity · ARCore · Sceneview · C# · Spatial Math · WebGL · AR/VR"],
        ["DevOps & Tools",  "Git · GitHub · Docker · CI/CD · Vite · VS Code · Android Studio"],
        ["Design",          "Figma · Canva · Wireframing · UI/UX · Glassmorphism Design Systems"],
        ["Cybersecurity",   "Ethical Hacking · Penetration Testing · SIEM/SOAR · Network IDS · AES Encryption"],
      ]),

      // ── WORK EXPERIENCE ───────────────────────────────────────
      ...sectionHeading("Work Experience"),

      roleRow("Full Stack Intern (OJT)", "VDart Academy", "Jan 2026", "Tiruchirappalli, TN"),
      bullet("Delivered end-to-end MERN stack functionality across frontend, backend, and database tiers within an accelerated On-the-Job Training sprint programme."),
      bullet("Engineered reusable React 18 component libraries and secure Express.js REST API routes to support production-quality application workflows and auth flows."),
      bullet("Collaborated with a cross-functional cohort to meet sprint milestones, applying agile methodologies, version control discipline, and code review standards."),

      roleRow("UI/UX Designer Intern", "SkillCraft Technology", "Feb 2025 – Mar 2025", "Remote"),
      bullet("Redesigned homepage, dark-mode interface, and mobile navigation flows for a fitness and e-commerce platform, improving visual hierarchy and usability."),
      bullet("Streamlined checkout and onboarding flows — reducing user friction by restructuring information architecture and eliminating redundant form steps."),
      bullet("Delivered wireframes and high-fidelity Figma prototypes applying design-thinking methodologies and accessibility guidelines."),

      roleRow("Web Development Intern", "Prodigy InfoTech", "Aug 2024 – Sep 2024", "Remote"),
      bullet("Built a location-based real-time weather application integrating OpenWeather REST APIs with dynamic DOM rendering and animated condition displays."),
      bullet("Developed a responsive mobile-first portfolio site and interactive stopwatch tool, demonstrating strong vanilla JS and CSS proficiency."),

      roleRow("Cybersecurity Intern", "Adaovi", "Jun 2024 – Jul 2024", "Remote"),
      bullet("Created a zero-knowledge password strength tool with real-time entropy scoring, pattern detection, and HaveIBeenPwned K-Anonymity breach validation."),
      bullet("Implemented an ethical keylogger simulation and penetration testing awareness demo — applied for security education and vulnerability reporting."),

      // ── PROJECTS ──────────────────────────────────────────────
      ...sectionHeading("Featured Projects"),

      roleRow("FaceShield Authentication Platform", "React 19 · FastAPI · ArcFace ONNX · NestJS · PostgreSQL", "2025", ""),
      problemStatement("Traditional attendance relies on easily bypassed physical cards. This platform enforces secure, decentralized biometric verification."),
      bullet("Engineered an edge-AI biometric workforce platform with real-time facial recognition, PPE compliance checks, and passive liveness detection using ArcFace ONNX Runtime."),
      bullet("Designed a dual-database offline-first architecture using edge SQLite with exponential backoff sync to PostgreSQL — maintaining operation in zero-connectivity construction sites."),

      roleRow("ScholarAI Academic Assistant", "FastAPI · RAG · ChromaDB · Redis · JWT", "2025", ""),
      problemStatement("Researchers spend hours manually parsing papers. This uses RAG to instantly retrieve exact answers from uploaded academic literature."),
      bullet("Built a document RAG assistant using PyPDF/PyMuPDF for multi-column PDF parsing, ChromaDB vector store, and async Redis ARQ queues for CPU-intensive vectorization."),
      bullet("Delivered natural-language document querying with contextual citations and JWT-secured sessions across a React/Vite frontend."),

      roleRow("CodeSight Developer Toolkit", "Python · Graphviz · D3.js · Semantic Analysis", "2025", ""),
      problemStatement("Understanding complex codebases takes too long. This toolkit automatically extracts architecture and UML diagrams via semantic reasoning."),
      bullet("Developed an automated Code-to-Diagram generator producing interactive UML and system architecture diagrams from parsed Python source via a Semantic Intermediate Representation."),
      bullet("Implemented bidirectional workflow where diagram edits on the React UI translate back to code refactoring recommendations, reducing manual documentation time."),

      roleRow("EchoCortex Intelligence Platform", "Three.js · MongoDB Atlas · Sentence Transformers · Framer Motion", "2025", ""),
      problemStatement("Information overload causes institutional memory loss. This acts as an automated second brain, structuring verbal meeting data into knowledge graphs."),
      bullet("Intercepted transient meeting audio via MediaRecorder API, transcribed with Whisper, vectorized with Sentence Transformers, and indexed in MongoDB Atlas and Supabase PostgreSQL."),
      bullet("Built a local-first offline fallback cache to bypass database calls during network outages; rendered 3D neural lattices in Three.js with a high-contrast Obsidian Stark design system."),

      roleRow("AegisNet Intrusion Detection System", "FastAPI · Snort 3 · Isolation Forest · NetworkX · Vite", "2025", ""),
      problemStatement("Manual network security is too slow for modern threats. This automates threat detection and firewall mitigation using ML and SIEM/SOAR."),
      bullet("Captured in-line traffic via libpcap/Snort 3 for signature-based inspection, supplemented by an Isolation Forest ML engine profiling anomalies over 60-second rolling windows."),
      bullet("Correlated multi-stage attack paths using a NetworkX graph theory engine; SOAR module auto-quarantines attackers via iptables/netsh with sub-second incident grouping."),

      // ── EDUCATION ─────────────────────────────────────────────
      ...sectionHeading("Education"),

      roleRow("Bachelor of Engineering — Computer Science & Engineering", "K. Ramakrishnan College of Technology", "Aug 2023 – May 2027 (Expected)", "Tiruchirappalli"),
      new Paragraph({
        spacing: { before: 30, after: 30 },
        children: [
          new TextRun({ text: "Activities: ", bold: true, size: 18, color: DARK, font: "Inter" }),
          new TextRun({ text: "XR Club Vice President · NSS Senior Coordinator · FESTRONIX2K25 Overall Coordinator · AR/VR Workshops Facilitator · Software Bootcamp Facilitator", size: 18, color: GRAY, font: "Inter" })
        ]
      }),

      roleRow("Higher Secondary — Mathematics & Biology", "Sri Bala Vidyamandir MHSS", "Jul 2019 – Jul 2023", "Tiruchirappalli"),

      // ── CERTIFICATIONS & AWARDS ─────────────────────────────────
      ...sectionHeading("Certifications & Awards"),
      achievementRow(["Microsoft Azure AI Engineer Associate (AI-102) — Feb 2025"]),
      achievementRow(["Applied Generative AI Specialization — KRCT / Simplilearn, Apr 2026, with Distinction"]),
      achievementRow(["Microsoft Learnathon 2k25 — 24 Microsoft Learn paths: GenAI, Azure OpenAI, Cybersecurity, Microsoft Fabric"]),
      achievementRow(["ICT Learnathon 2k24 — 11 courses: Bentley CAD, Celonis AI, MathWorks ML, MongoDB, UiPath RPA"]),
      achievementRow(["NPTEL — The Joy of Computing using Python & Enhancing Soft Skills and Personality"]),
      achievementRow(["HackerRank — C# (Basic) & CSS (Basic) verified skill certifications"]),
      achievementRow(["Design Thinking — HP LIFE / HP Foundation"]),
      achievementRow(["Registered Patent — Android TV IR Sensor Control Mechanism (App No. 202441033032 A), Patent Office India, 2024"]),

      // ── ACHIEVEMENTS & LEADERSHIP ───────────────────────────────
      ...sectionHeading("Achievements & Leadership"),
      achievementRow(["Best Performance Award — OASYS IT Hackathon 2.0, 2025"]),
      achievementRow(["1st Prize — Extempore, National Science Day & Planckton 2K24 (KRCT)"]),
      achievementRow(["Winner — Trash to Treasure, MATHISTIC Technical Event 2023 (KRCT)"]),
      achievementRow(["Participation — NHAI Innovation Hackathon 7.0, JET Hackathon 1.0, Codeathon 4.0 (24h), Health-in-Pixels Startup Hackathon"]),
      achievementRow(["Vice President, XR Club — organised AR/VR workshops, student tech events, and spatial computing demos for 200+ students"]),
      achievementRow(["NSS Senior Coordinator — led 150+ volunteers across community service campaigns, marathons, and national pledge programmes"]),
      achievementRow(["FESTRONIX2K25 Overall Coordinator — managed national-level technical symposium with 500+ participants across 12 events"]),
      achievementRow(["WattMap AI — MSME Idea Hackathon 5.0 submission and incubation scheme proposal (Ministry of MSME, 2025)"]),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("godfrey_resume_upgraded.docx", buffer);
  console.log("✅ Done: godfrey_resume_upgraded.docx");
}).catch(err => {
  console.error("❌ Error generating resume:", err);
});