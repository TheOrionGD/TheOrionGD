/**
 * Returns a root-relative URL for a GridFS asset.
 * Assets are served by the embedded Vite plugin at /assets/* on the same
 * origin — no separate backend or absolute URL required.
 */
export const getAssetUrl = (path: string): string => path;

import { Project, Experience, Education, SkillCategory, Certification, CertificateFile } from './types';
import { FaGithub, FaLinkedin, FaHackerrank } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export const PERSONAL_INFO = {
  name: "GODFREY T R",
  role: "SOFTWARE ENGINEER",
  tagline: "Turning ideas into intelligent systems and interactive realities.",
  email: "godfreytr.prof@gmail.com",
  phone: "+91 93444 62238",
  location: "Tiruchirapalli, Tamil Nadu, India",
  github: "https://github.com/TheOrionGD",
  linkedin: "https://linkedin.com/in/godfrey192607",
  hackerrank: "https://hackerrank.com/OrionGD07",
  leetcode: "https://leetcode.com/u/OrionGD/"
};

export const SOCIAL_LINKS = [
  { icon: FaGithub, url: PERSONAL_INFO.github, label: "GitHub" },
  { icon: FaLinkedin, url: PERSONAL_INFO.linkedin, label: "LinkedIn" },
  { icon: SiLeetcode, url: PERSONAL_INFO.leetcode, label: "LeetCode" },
  { icon: FaHackerrank, url: PERSONAL_INFO.hackerrank, label: "HackerRank" },
];

export const EDUCATION: Education[] = [
  {
    degree: "B.E CSE",
    institution: "K. Ramakrishnan College of Technology",
    period: "Aug 2023 – May 2027 (Expected)"
  },
  {
    degree: "Higher Secondary (Math & Biology)",
    institution: "Sri Bala Vidyamandir MHSS",
    period: "Jul 2019 – Jul 2023"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Full Stack Intern",
    company: "VDart Academy",
    period: "Jan 2026 – Jan 2026",
    details: [
      "Completed structured On-the-Job Training (OJT) in full-stack development",
      "Built and iterated on full-stack components applying MERN stack concepts",
      "Collaborated with a team to deliver training milestones within deadline",
      "Demonstrated strong adaptability and initiative throughout the programme"
    ]
  },
  {
    role: "UI/UX Design Intern",
    company: "SkillCraft",
    period: "Feb 2025 – Mar 2025",
    details: [
      "Designed modern UI workflows and dark-mode interfaces applying UX principles",
      "Improved visual hierarchy and usability for mobile-first application screens",
      "Conducted user flow analysis and interface optimisation for fitness and e-commerce apps",
      "Delivered homepage redesign with improved information architecture and clarity"
    ]
  },
  {
    role: "Web Development Intern",
    company: "Prodigy InfoTech",
    period: "Aug 2024 – Sept 2024",
    details: [
      "Developed responsive frontend applications using JavaScript and REST APIs",
      "Implemented dynamic DOM interactions and interactive UI components",
      "Built a location-based weather application with real-time API data rendering",
      "Improved cross-device compatibility and frontend responsiveness across projects"
    ]
  },
  {
    role: "Cybersecurity Intern",
    company: "Adaovi",
    period: "Jun 2024 – Jul 2024",
    details: [
      "Built a real-time password strength checker with entropy-based feedback",
      "Implemented an ethical keylogger simulation for security education demonstrations",
      "Applied penetration testing fundamentals and password audit techniques",
      "Gained hands-on experience in security vulnerability analysis and reporting"
    ]
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Full Stack Engineering",
    skills: ["Full Stack Development", "Scalable Systems Architecture", "Database Schema Design"]
  },
  {
    category: "AI & Intelligent Systems",
    skills: ["AI Integration & Automation", "Conversational AI & LLM Integration"]
  },
  {
    category: "Cybersecurity & Systems",
    skills: ["Secure System Design", "Network & Device Monitoring"]
  },
  {
    category: "Interactive & Creative Tech",
    skills: ["AR & Unity Development", "Interactive UI/UX Experience Design"]
  },
  {
    category: "Areas of Interest",
    skills: ["Applied Machine Learning", "Spatial Computing & XR", "AI Agent Workflows", "CyberSecurity", "Framework Optimization"]
  }
];

export const LEADERSHIP_XR = [
  "XR Club Vice President",
  "Software Bootcamp Facilitator",
  "Mentoring Juniors",
  "Active NSS Volunteer",
  "Events Coordination"
];

export const PROJECTS: Project[] = [
  {
    "title": "EchoCortex-Intelligence",
    "category": "AI / ML",
    "tech": [
      "React",
      "Whisper API",
      "Sentence Transformers",
      "MongoDB Atlas",
      "Three.js"
    ],
    "description": "EchoCortex-Intelligence is an institutional-grade decentralized intelligence platform and automated second brain designed to capture and index verbal meeting inputs. The system intercepts transient conversational flows via the MediaRecorder API, using Whisper speech-to-text models to generate structured transcripts. A machine learning pipeline powered by Sentence Transformers vectorizes text snippets, which are subsequently indexed in MongoDB Atlas and Supabase PostgreSQL. To handle network offline states, the platform includes a local-first memory fallback system that caches logs and bypasses database calls using validation checks. The user interface implements the high-contrast Obsidian Stark design system, utilizing Three.js to render interactive 3D neural lattices and Framer Motion for dashboard transitions. Security and compliance are enforced through explicit consent workflows that allow users to redact transcripts and purge records completely from vector indices. This platform serves remote teams by converting meetings into permanent, searchable knowledge maps.",
    "github": "https://github.com/TheOrionGD/EchoCortex-Intelligence",
    "demo": "",
    "problemStatement": "Recorders lose conversational context. This captures verbal meetings, indexes transcripts, and builds 3D knowledge graphs.",
    "deliverables": [
      "MediaRecorder audio stream capture converted via Whisper speech-to-text models.",
      "ChromaDB and MongoDB Atlas vector indexes mapping semantic embeddings.",
      "Obsidian Stark UI rendering 3D neural lattices via Three.js and Framer Motion."
    ]
  },
  {
    "title": "FaceShield-Authentication",
    "category": "AI / ML",
    "tech": [
      "Python",
      "FastAPI",
      "ONNX Runtime",
      "NestJS",
      "React 19",
      "Prisma"
    ],
    "description": "FaceShield-Authentication is an edge-AI facial recognition, PPE compliance, and passive liveness verification system designed for the NHAI Innovation Hackathon 7.0. The edge biometrics service is built in Python using FastAPI, running localized face-detection and ArcFace feature-extraction models via the ONNX Runtime. A NestJS API Gateway directs platform requests to the edge service or to a cloud PostgreSQL database managed via Prisma. To handle offline construction environments, the system maintains a decoupled dual-database architecture using an edge SQLite cache that syncs data back using an exponential backoff algorithm when connections resume. Visual compliance checks are handled locally via OpenCV to audit hard hats and safety vests before computing a composite identity trust score. The frontend dashboard is built in React 19, providing supervisors with real-time site stats, spoof attempt logs, and enrollment forms. The system delivers offline-capable, tamper-proof biometric checks at toll gates.",
    "github": "https://github.com/TheOrionGD/FaceShield-Authentication",
    "demo": "https://face-shield-snowy.vercel.app/",
    "problemStatement": "Site entry logs are vulnerable to badge sharing. This enforces Edge AI facial recognition and PPE check gates.",
    "deliverables": [
      "ONNX Runtime face detection and ArcFace extraction in FastAPI endpoints.",
      "Decoupled SQLite edge cache syncing via exponential backoff to Postgres.",
      "Safety audits scanning hard hats and vests using OpenCV model checks."
    ]
  },
  {
    "title": "EntityEase-DataPlatform",
    "category": "AI / ML",
    "tech": [
      "FastAPI",
      "BioBERT",
      "FAISS",
      "PyTorch",
      "React"
    ],
    "description": "EntityEase-DataPlatform is a clinical entity extraction and ICD-11 classification platform designed to automate billing reconciliation and medical note audit trails. The backend is written in FastAPI, integrating a hybrid Hierarchical Attention Network and BioBERT models to extract clinical concepts from narratives. To match these extracted entities with ICD-11 codes, the system maps vectors against a dense FAISS index containing over seventeen thousand classifications. The FastAPI server offloads CPU-intensive PyTorch inference tasks to independent thread executors via asyncio, ensuring that the main uvicorn loop remains responsive. Real-time updates and collaborative auditing workflows are synchronized across React client dashboards using persistent WebSocket connections. Security compliance is maintained through HIPAA-safe de-identification filters, session-based access controllers, and immutable logs written to MongoDB for every audit edit. The platform reduces administrative overhead, returning valuable time to clinicians.",
    "github": "https://github.com/TheOrionGD/EntityEase-DataPlatform",
    "demo": "",
    "problemStatement": "Manual medical coding is slow and error-prone. This platform automates notes audit trails.",
    "deliverables": [
      "BioBERT pipelines parsing note texts against a FAISS index of 17k+ ICD codes.",
      "FastAPI uvicorn thread executors offloading intensive PyTorch calculation tasks.",
      "HIPAA-compliant de-identification filters and access control structures."
    ]
  },
  {
    "title": "AegisNet-IDS",
    "category": "Immersive Systems",
    "tech": [
      "FastAPI",
      "libpcap",
      "Snort 3",
      "Isolation Forest",
      "NetworkX",
      "React"
    ],
    "description": "AegisNet-IDS is an enterprise-grade security platform integrating intrusion detection, log analytics, and automated orchestration (SIEM and SOAR) capabilities. The system operates by capturing in-line network traffic using libpcap (Npcap on Windows hosts) and running raw data streams through Snort 3 for signature-based packet inspection. To supplement signature detection, the system forwards alert metrics to a machine learning engine running an unsupervised Isolation Forest model, which profiles network activities over a rolling sixty-second window to spot zero-day anomalies. Discovered threats are aggregated into multi-stage attack paths using a Graph Theory correlation engine powered by NetworkX, which maps related events from reconnaissance to system delivery. Real-time visualization and alerting are delivered to analysts via a web dashboard built with React, Vite, and Tailwind CSS, communicating through asynchronous WebSockets with a backend managed by FastAPI. For mitigation, the SOAR engine uses thread-safe command execution blocks that interface with host drivers like iptables or netsh to quarantine attackers. The resulting setup offers sub-second incident grouping and automated threat mitigation in virtualization environments.",
    "github": "https://github.com/TheOrionGD/AegisNet-IDS",
    "demo": "",
    "problemStatement": "Manual threat analysis is too slow for network attacks. This SIEM/SOAR automates threat mitigation.",
    "deliverables": [
      "Raw packet inspection utilizing libpcap and Snort 3 signature rules.",
      "Zero-day threat modeling via an unsupervised Isolation Forest engine.",
      "SOAR mitigation block executing host firewall quarantines dynamically."
    ]
  },
  {
    "title": "FenceIN-AccessControl",
    "category": "Immersive Systems",
    "tech": [
      "React",
      "NestJS",
      "ONNX Runtime",
      "pgvector",
      "PostgreSQL",
      "MongoDB"
    ],
    "description": "FenceIN-AccessControl is an enterprise command and control platform designed for workforce management and biometric access control in heavy industrial environments. The platform integrates local biometrics (ArcFace ONNX models for facial recognition and ORB minutiae extraction for fingerprint checks) running on edge nodes to avoid cloud API latencies. Identity records are split using a dual-database architecture: PostgreSQL handles users, shifts, and 512-dimensional vector matching via pgvector, while MongoDB logs telemetry streams and Sentry alerts. Fingerprint templates are encrypted locally using AES-CBC algorithms, allowing exact-match duplicate checks while isolating records across multiple client tenants. Shift attendance is validated dynamically using geographical coordinate checks mapped against assigned site radius perimeters using the Haversine formula. The React web client and NestJS backend gateway synchronize state over WebSockets, providing administrators with real-time access reports and threat dashboards.",
    "github": "https://github.com/TheOrionGD/FenceIN-AccessControl",
    "demo": "",
    "problemStatement": "Enforcing secure workforce shifts and biometric compliance in offline/remote industrial zones.",
    "deliverables": [
      "Edge facial recognition utilizing ArcFace ONNX models and minutiae fingerprint encryption.",
      "Dual database synchronization offloading Sentry alerts to MongoDB and shifts to pgvector PostgreSQL.",
      "Geofencing validation checks mapped via the Haversine formula against assigned site perimeters."
    ]
  },
  {
    "title": "CodeSight-DeveloperToolkit",
    "category": "Immersive Systems",
    "tech": [
      "Python",
      "FastAPI",
      "React",
      "D3.js",
      "Graphviz",
      "Docker"
    ],
    "description": "CodeSight-DeveloperToolkit is an automatic code-to-diagram generator with semantic reasoning built at the intersection of computer vision and natural language processing. The Python-based backend parses source code into a language-agnostic Semantic Intermediate Representation, which is subsequently mapped to graphs representing architectural dependencies. These graphs are rendered into interactive UML and system diagrams using Graphviz and D3 on a React-based front-end interface. The core innovation lies in the platform's ability to explain the structural architecture in clear technical language and analyze diagram layout structures to flag design conflicts. Beyond simple visualization, the system explores a bidirectional workflow where editing diagrams on the UI translates back to refactoring recommendations. It operates with standard Docker setups and CI/CD pipelines to evaluate code quality, providing software engineers and system architects with an explainable code intelligence dashboard rather than standard static documentation.",
    "github": "https://github.com/TheOrionGD/CodeSight-DeveloperToolkit",
    "demo": "",
    "problemStatement": "Visualizing complex software code architectures and structural dependency conflicts in real-time.",
    "deliverables": [
      "Language-agnostic Semantic Intermediate Representation compiled from source files.",
      "Interactive UML layouts and dependency graphs rendered dynamically via Graphviz and D3.",
      "Bidirectional UI code sync translating visual diagram edits back to refactoring suggestions."
    ]
  },
  {
    "title": "Veltrio.Suite",
    "category": "AI / ML",
    "tech": [
      "React",
      "TypeScript",
      "Gemini 2.5",
      "Whisper",
      "Llama 3",
      "Groq"
    ],
    "description": "Veltrio.Suite is an AI-powered communication hub designed to perform real-time, context-aware translation and deep sentiment analysis on text strings. Built with a React client on Vite and a Node.js/Express backend, the platform uses MongoDB to persist user history and profiles. The system features a translation process powered by the Gemini API, going beyond simple literal conversion to evaluate the sentiment and context of conversations. The interface features a floating AI companion, an advanced command palette shortcut, and dynamic theming variables configured in Tailwind CSS. The system utilizes JSON Web Tokens and role-based permissions to secure API routes, while testing is managed via Cypress for end-to-end user flows and Vitest for unit validation. The platform provides international businesses and multilingual customer support teams with a real-time translation portal.",
    "github": "https://github.com/TheOrionGD/Veltrio.Suite",
    "demo": "https://veltrio.vercel.app",
    "problemStatement": "Support desks face translation latency. This translates conversations with sentiment checks.",
    "deliverables": [
      "Gemini API integrations generating translation contexts dynamically.",
      "VAD checks securing translation text fields via JWT endpoints.",
      "Cypress test specs verifying end-to-end user communication channels."
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Patent: Android TV Using Remote IR Sensor", year: "2024", description: "Registered innovation for a control mechanism using infrared signal processing — demonstrates applied hardware-software integration." },
  { title: "Azure AI Engineer Associate (AI-102)", year: "Feb 2025", description: "Microsoft-certified expertise in designing and implementing AI solutions — including NLP, computer vision, and conversational AI — on Azure infrastructure." },
  { title: "Applied Generative AI Specialization", year: "Apr 2026", description: "Advanced specialization covering LLM application development, generative model architecture, AI governance, and prompt engineering best practices." }
];

// DreamGen.jpg is intentionally excluded — it is the Hero section profile portrait
export const GALLERY_IMAGES = [
  { src: getAssetUrl("/assets/CampusX.jpg"), alt: "Campus Experience", width: 1164, height: 655 },

  { src: getAssetUrl("/assets/Codeathon1.jpg"), alt: "Codeathon Session 1", width: 1280, height: 720 },
  { src: getAssetUrl("/assets/Codeathon2.jpg"), alt: "Codeathon Session 2", width: 1280, height: 720 },
  { src: getAssetUrl("/assets/Codeathon3.jpg"), alt: "Codeathon Session 3", width: 1280, height: 721 },
  { src: getAssetUrl("/assets/CodeSprintt.jpg"), alt: "Code Sprint Event", width: 3196, height: 1596 },

  { src: getAssetUrl("/assets/DreamGen 1.jpg"), alt: "DreamGen Session 1", width: 1600, height: 721 },
  { src: getAssetUrl("/assets/DreamGen 2.jpg"), alt: "DreamGen Session 2", width: 1600, height: 721 },
  { src: getAssetUrl("/assets/DreamGen 3.jpg"), alt: "DreamGen Session 3", width: 4160, height: 3120 },
  { src: getAssetUrl("/assets/DreamGen 4.jpg"), alt: "DreamGen Session 4", width: 4096, height: 3072 },
  { src: getAssetUrl("/assets/DREAMGEN 5.jpg"), alt: "DreamGen Session 5", width: 960, height: 1280 },
  { src: getAssetUrl("/assets/DREAMGEN0.jpg"), alt: "DreamGen Special Session", width: 1600, height: 721 },

  { src: getAssetUrl("/assets/EDC Workshop 1.jpg"), alt: "EDC Workshop", width: 1280, height: 963 },

  { src: getAssetUrl("/assets/ENTHUSIA 2.jpg"), alt: "Enthusia Event", width: 1280, height: 591 },

  { src: getAssetUrl("/assets/IV 2.jpg"), alt: "Industrial Visit", width: 1600, height: 1200 },

  { src: getAssetUrl("/assets/Jet Hackathon 2.jpg"), alt: "Jet Hackathon", width: 4096, height: 3072 },

  { src: getAssetUrl("/assets/MarchPast.jpg"), alt: "March Past Event", width: 4160, height: 3120 },

  { src: getAssetUrl("/assets/nSS cAMP 26.jpg"), alt: "NSS Camp Activity", width: 4096, height: 3072 },

  { src: getAssetUrl("/assets/Oyasys 2.jpg"), alt: "Oyasys Event", width: 1271, height: 710 },

  { src: getAssetUrl("/assets/Vdart1.jpg"), alt: "VDart Internship", width: 4096, height: 2304 },

  { src: getAssetUrl("/assets/XTIC.jpg"), alt: "XTIC Event", width: 3264, height: 1836 },
  { src: getAssetUrl("/assets/XTIC 1.jpg"), alt: "XTIC Session 1", width: 3013, height: 1834 },
  { src: getAssetUrl("/assets/XTIC 2.jpg"), alt: "XTIC Session 2", width: 4096, height: 2304 },
  { src: getAssetUrl("/assets/XTIC 3.jpg"), alt: "XTIC Session 3", width: 2880, height: 2068 },
  { src: getAssetUrl("/assets/XTIC 4.jpg"), alt: "XTIC Session 4", width: 3072, height: 4096 },

  { src: getAssetUrl("/assets/Yoga Workshop 1.jpg"), alt: "Yoga Workshop 1", width: 1280, height: 960 },
  { src: getAssetUrl("/assets/Yoga Workshop 2.jpg"), alt: "Yoga Workshop 2", width: 1280, height: 960 },

  { src: getAssetUrl("/assets/CLUB XR.jpg"), alt: "XR Club", width: 4096, height: 3072 }
];

export const CERTIFICATE_ARCHIVE: CertificateFile[] = [
  { name: "Azure AI Engineer Associate (AI-102)", file: getAssetUrl("/assets/certi/Microsoft Certified Azure AI Engineer Associate AI-102.pdf"), category: "Core Professional", issuer: "Simplilearn", tag: "Top Credential", summary: "This certificate verifies the completion of the Azure AI Engineer training program matching the AI-102 syllabus. It validates capabilities in configuring cognitive search, speech-to-text APIs, and AI models in Microsoft Azure. This credential confirms cloud engineering readiness for enterprise setups." },
  { name: "Applied Generative AI Specialization", file: getAssetUrl("/assets/certi/Applied Generative AI Specialization.pdf"), category: "Core Professional", issuer: "Simplilearn", tag: "Specialization", summary: "This consolidated record represents the student's completion of 24 Microsoft Learn training paths under the Learnathon 2k25 programme. The courses span three major technical tracks: **(1) Generative AI & Microsoft Copilot** — Explore Generative AI, Fundamentals of Generative AI, Fundamentals of Responsible Generative AI, Apply Prompt Engineering with Azure OpenAI Service, Build Natural Language Solutions with Azure OpenAI Service, Get Started with Azure OpenAI Service, Write Effective Prompts to Achieve Optimal Results, Explore Generative AI with Copilot in Bing, Boost Your Productivity with Microsoft Copilot, Design a Dream Destination using Microsoft Copilot, Get Started with Microsoft Copilot, Get Started with Microsoft 365 Copilot Chat, and Work Smarter with Microsoft 365 Copilot Chat; **(2) Cybersecurity Fundamentals** — Describe Basic Cybersecurity Threats Attacks & Mitigations, Describe Network-Based Threats & Mitigations, Describe Application-Based Threats & How to Protect Against Them, Describe Device-Based Threats & Security Controls, Describe Authentication & Authorization in Cybersecurity, and Describe Concepts of Cryptography; **(3) Microsoft Fabric & Data Engineering** — Introduction to End-to-End Analytics using Microsoft Fabric, Get Started with Lakehouses in Microsoft Fabric, Use Apache Spark in Microsoft Fabric, Use Data Factory Pipelines in Microsoft Fabric, and Work with Delta Lake Tables in Microsoft Fabric. This achievement demonstrates the student's commitment to continuous upskilling across cloud AI services, responsible AI governance, cybersecurity threat modelling, and modern data engineering platforms." },
  { name: "Advanced GenAI – Building LLM Applications", file: getAssetUrl("/assets/certi/Advanced Generative AI - Building LLM Applications.pdf"), category: "AI & Generative AI", issuer: "Simplilearn", summary: "This certificate verifies the successful completion of the 'Advanced Generative AI - Building LLM Applications' course offered by Simplilearn. It validates the student's ability to construct custom applications leveraging large language models and orchestrating data. This coursework demonstrates advanced capability in prompt engineering and model development." },
  { name: "Advanced GenAI – Models and Architecture", file: getAssetUrl("/assets/certi/Advanced Generative AI - Models and Architecture.pdf"), category: "AI & Generative AI", issuer: "Simplilearn", summary: "This certificate verifies the successful completion of the 'Advanced Generative AI - Models and Architecture' course offered by Simplilearn. It covers neural architectures, transformer networks, and training paradigms for modern generative networks. This course supports the student's theoretical background in deep learning." },
  { name: "Advanced GenAI – Image Generation Capabilities", file: getAssetUrl("/assets/certi/Advanced Generative AI - Image Generation Capabilities.pdf"), category: "AI & Generative AI", issuer: "Simplilearn", summary: "This certificate verifies the successful completion of the 'Advanced Generative AI - Image Generation Capabilities' course offered by Simplilearn. It validates the student's understanding of diffusion models, image-to-image workflows, and latent space design. This credential demonstrates creative AI engineering readiness." },
  { name: "Advanced GenAI Capstone Project", file: getAssetUrl("/assets/certi/Advanced Generative AI Capstone Project.pdf"), category: "AI & Generative AI", issuer: "Simplilearn", summary: "This certificate verifies the successful completion of the 'Advanced Generative AI Capstone Project' offered by Simplilearn. The capstone required building, evaluating, and deploying a functional AI application matching industry standards. This project serves as validation of end-to-end software delivery skills using advanced models." },
  { name: "Generative AI Governance", file: getAssetUrl("/assets/certi/Generative AI Governance.pdf"), category: "AI & Generative AI", issuer: "Simplilearn", summary: "This consolidated record represents the student's completion of 24 Microsoft Learn training paths under the Learnathon 2k25 programme. The courses span three major technical tracks: **(1) Generative AI & Microsoft Copilot** — Explore Generative AI, Fundamentals of Generative AI, Fundamentals of Responsible Generative AI, Apply Prompt Engineering with Azure OpenAI Service, Build Natural Language Solutions with Azure OpenAI Service, Get Started with Azure OpenAI Service, Write Effective Prompts to Achieve Optimal Results, Explore Generative AI with Copilot in Bing, Boost Your Productivity with Microsoft Copilot, Design a Dream Destination using Microsoft Copilot, Get Started with Microsoft Copilot, Get Started with Microsoft 365 Copilot Chat, and Work Smarter with Microsoft 365 Copilot Chat; **(2) Cybersecurity Fundamentals** — Describe Basic Cybersecurity Threats Attacks & Mitigations, Describe Network-Based Threats & Mitigations, Describe Application-Based Threats & How to Protect Against Them, Describe Device-Based Threats & Security Controls, Describe Authentication & Authorization in Cybersecurity, and Describe Concepts of Cryptography; **(3) Microsoft Fabric & Data Engineering** — Introduction to End-to-End Analytics using Microsoft Fabric, Get Started with Lakehouses in Microsoft Fabric, Use Apache Spark in Microsoft Fabric, Use Data Factory Pipelines in Microsoft Fabric, and Work with Delta Lake Tables in Microsoft Fabric. This achievement demonstrates the student's commitment to continuous upskilling across cloud AI services, responsible AI governance, cybersecurity threat modelling, and modern data engineering platforms." },
  { name: "Copilot Foundations", file: getAssetUrl("/assets/certi/Copilot Foundations.pdf"), category: "AI & Generative AI", issuer: "Simplilearn", summary: "This consolidated record represents the student's completion of 24 Microsoft Learn training paths under the Learnathon 2k25 programme. The courses span three major technical tracks: **(1) Generative AI & Microsoft Copilot** — Explore Generative AI, Fundamentals of Generative AI, Fundamentals of Responsible Generative AI, Apply Prompt Engineering with Azure OpenAI Service, Build Natural Language Solutions with Azure OpenAI Service, Get Started with Azure OpenAI Service, Write Effective Prompts to Achieve Optimal Results, Explore Generative AI with Copilot in Bing, Boost Your Productivity with Microsoft Copilot, Design a Dream Destination using Microsoft Copilot, Get Started with Microsoft Copilot, Get Started with Microsoft 365 Copilot Chat, and Work Smarter with Microsoft 365 Copilot Chat; **(2) Cybersecurity Fundamentals** — Describe Basic Cybersecurity Threats Attacks & Mitigations, Describe Network-Based Threats & Mitigations, Describe Application-Based Threats & How to Protect Against Them, Describe Device-Based Threats & Security Controls, Describe Authentication & Authorization in Cybersecurity, and Describe Concepts of Cryptography; **(3) Microsoft Fabric & Data Engineering** — Introduction to End-to-End Analytics using Microsoft Fabric, Get Started with Lakehouses in Microsoft Fabric, Use Apache Spark in Microsoft Fabric, Use Data Factory Pipelines in Microsoft Fabric, and Work with Delta Lake Tables in Microsoft Fabric. This achievement demonstrates the student's commitment to continuous upskilling across cloud AI services, responsible AI governance, cybersecurity threat modelling, and modern data engineering platforms." },
  { name: "Core Essentials of GenAI, Prompt Engineering & ChatGPT", file: getAssetUrl("/assets/certi/Core_Essentials of Generative AI, Prompt Engineering & ChatGPT.pdf"), category: "AI & Generative AI", issuer: "Simplilearn", summary: "This certificate verifies the successful completion of the 'Core Essentials of Generative AI, Prompt Engineering & ChatGPT' course by Simplilearn. It validates foundational skills in structuring text queries, design patterns, and context window management. This coursework establishes a solid base for advanced AI integration." },
  { name: "Open Source Models with Hugging Face", file: getAssetUrl("/assets/certi/Open Source Models with Hugging Face.pdf"), category: "AI & Generative AI", issuer: "Simplilearn", summary: "This certificate verifies the successful completion of the 'Open Source Models with Hugging Face' course offered by Simplilearn. The training covers accessing, configuring, and deploying open-source models for NLP tasks using Hugging Face pipelines. This credential demonstrates the student's knowledge of modern machine learning workflows." },
  { name: "Deep Learning Onramp – MATLAB", file: getAssetUrl("/assets/certi/DLO_1_1.pdf"), category: "AI & Generative AI", issuer: "MATLAB", summary: "This consolidated record represents the student's completion of all course certifications under the ICT Academy Learnathon 2k24 programme, delivered through globally recognized technology partners. The courses span five technical tracks: **(1) Engineering & Modelling (Bentley)** — 2D/3D CAD Modeling of Building Environment, Modeling Structures with Analytical Modeler, and Road Design Concepts & Fundamentals with OpenRoads Designer; **(2) Process Mining & AI (Celonis)** — Academic Process Mining Fundamentals and Celonis AI Foundations; **(3) Machine Learning & Deep Learning (MathWorks)** — Deep Learning Onramp and Machine Learning Onramp; **(4) Database Administration & AI (MongoDB)** — Introduction to MongoDB for Students and Introduction to MongoDB, AI, and Vector Search; **(5) Robotic Process Automation (UiPath)** — UiPath Automation Explorer. Together with the main ICT Academy Learnathon 2024 completion certificate, this achievement demonstrates the student's capability to engage with multi-disciplinary technical learning across CAD engineering, data-driven process optimization, deep learning, NoSQL database design, and automation development." },
  { name: "Machine Learning Onramp – MATLAB", file: getAssetUrl("/assets/certi/MLO_1_1.pdf"), category: "AI & Generative AI", issuer: "MATLAB", summary: "This consolidated record represents the student's completion of all course certifications under the ICT Academy Learnathon 2k24 programme, delivered through globally recognized technology partners. The courses span five technical tracks: **(1) Engineering & Modelling (Bentley)** — 2D/3D CAD Modeling of Building Environment, Modeling Structures with Analytical Modeler, and Road Design Concepts & Fundamentals with OpenRoads Designer; **(2) Process Mining & AI (Celonis)** — Academic Process Mining Fundamentals and Celonis AI Foundations; **(3) Machine Learning & Deep Learning (MathWorks)** — Deep Learning Onramp and Machine Learning Onramp; **(4) Database Administration & AI (MongoDB)** — Introduction to MongoDB for Students and Introduction to MongoDB, AI, and Vector Search; **(5) Robotic Process Automation (UiPath)** — UiPath Automation Explorer. Together with the main ICT Academy Learnathon 2024 completion certificate, this achievement demonstrates the student's capability to engage with multi-disciplinary technical learning across CAD engineering, data-driven process optimization, deep learning, NoSQL database design, and automation development." },
  { name: "Fundamentals of Generative AI", file: getAssetUrl("/assets/certi/Fundamentals of Generative AI.pdf"), category: "Microsoft", issuer: "Microsoft", summary: "This consolidated record represents the student's completion of 24 Microsoft Learn training paths under the Learnathon 2k25 programme. The courses span three major technical tracks: **(1) Generative AI & Microsoft Copilot** — Explore Generative AI, Fundamentals of Generative AI, Fundamentals of Responsible Generative AI, Apply Prompt Engineering with Azure OpenAI Service, Build Natural Language Solutions with Azure OpenAI Service, Get Started with Azure OpenAI Service, Write Effective Prompts to Achieve Optimal Results, Explore Generative AI with Copilot in Bing, Boost Your Productivity with Microsoft Copilot, Design a Dream Destination using Microsoft Copilot, Get Started with Microsoft Copilot, Get Started with Microsoft 365 Copilot Chat, and Work Smarter with Microsoft 365 Copilot Chat; **(2) Cybersecurity Fundamentals** — Describe Basic Cybersecurity Threats Attacks & Mitigations, Describe Network-Based Threats & Mitigations, Describe Application-Based Threats & How to Protect Against Them, Describe Device-Based Threats & Security Controls, Describe Authentication & Authorization in Cybersecurity, and Describe Concepts of Cryptography; **(3) Microsoft Fabric & Data Engineering** — Introduction to End-to-End Analytics using Microsoft Fabric, Get Started with Lakehouses in Microsoft Fabric, Use Apache Spark in Microsoft Fabric, Use Data Factory Pipelines in Microsoft Fabric, and Work with Delta Lake Tables in Microsoft Fabric. This achievement demonstrates the student's commitment to continuous upskilling across cloud AI services, responsible AI governance, cybersecurity threat modelling, and modern data engineering platforms." },
  { name: "Fundamentals of Responsible Generative AI", file: getAssetUrl("/assets/certi/Fundamentals of Responsible Generative AI.pdf"), category: "Microsoft", issuer: "Microsoft", summary: "This consolidated record represents the student's completion of 24 Microsoft Learn training paths under the Learnathon 2k25 programme. The courses span three major technical tracks: **(1) Generative AI & Microsoft Copilot** — Explore Generative AI, Fundamentals of Generative AI, Fundamentals of Responsible Generative AI, Apply Prompt Engineering with Azure OpenAI Service, Build Natural Language Solutions with Azure OpenAI Service, Get Started with Azure OpenAI Service, Write Effective Prompts to Achieve Optimal Results, Explore Generative AI with Copilot in Bing, Boost Your Productivity with Microsoft Copilot, Design a Dream Destination using Microsoft Copilot, Get Started with Microsoft Copilot, Get Started with Microsoft 365 Copilot Chat, and Work Smarter with Microsoft 365 Copilot Chat; **(2) Cybersecurity Fundamentals** — Describe Basic Cybersecurity Threats Attacks & Mitigations, Describe Network-Based Threats & Mitigations, Describe Application-Based Threats & How to Protect Against Them, Describe Device-Based Threats & Security Controls, Describe Authentication & Authorization in Cybersecurity, and Describe Concepts of Cryptography; **(3) Microsoft Fabric & Data Engineering** — Introduction to End-to-End Analytics using Microsoft Fabric, Get Started with Lakehouses in Microsoft Fabric, Use Apache Spark in Microsoft Fabric, Use Data Factory Pipelines in Microsoft Fabric, and Work with Delta Lake Tables in Microsoft Fabric. This achievement demonstrates the student's commitment to continuous upskilling across cloud AI services, responsible AI governance, cybersecurity threat modelling, and modern data engineering platforms." },
  { name: "Get Started with Azure OpenAI Service", file: getAssetUrl("/assets/certi/Get started with Azure OpenAI Service.pdf"), category: "Microsoft", issuer: "Microsoft", summary: "This consolidated record represents the student's completion of 24 Microsoft Learn training paths under the Learnathon 2k25 programme. The courses span three major technical tracks: **(1) Generative AI & Microsoft Copilot** — Explore Generative AI, Fundamentals of Generative AI, Fundamentals of Responsible Generative AI, Apply Prompt Engineering with Azure OpenAI Service, Build Natural Language Solutions with Azure OpenAI Service, Get Started with Azure OpenAI Service, Write Effective Prompts to Achieve Optimal Results, Explore Generative AI with Copilot in Bing, Boost Your Productivity with Microsoft Copilot, Design a Dream Destination using Microsoft Copilot, Get Started with Microsoft Copilot, Get Started with Microsoft 365 Copilot Chat, and Work Smarter with Microsoft 365 Copilot Chat; **(2) Cybersecurity Fundamentals** — Describe Basic Cybersecurity Threats Attacks & Mitigations, Describe Network-Based Threats & Mitigations, Describe Application-Based Threats & How to Protect Against Them, Describe Device-Based Threats & Security Controls, Describe Authentication & Authorization in Cybersecurity, and Describe Concepts of Cryptography; **(3) Microsoft Fabric & Data Engineering** — Introduction to End-to-End Analytics using Microsoft Fabric, Get Started with Lakehouses in Microsoft Fabric, Use Apache Spark in Microsoft Fabric, Use Data Factory Pipelines in Microsoft Fabric, and Work with Delta Lake Tables in Microsoft Fabric. This achievement demonstrates the student's commitment to continuous upskilling across cloud AI services, responsible AI governance, cybersecurity threat modelling, and modern data engineering platforms." },
  { name: "Build Natural Language Solutions with Azure OpenAI", file: getAssetUrl("/assets/certi/Build natural language solutions with Azure OpenAI Service.pdf"), category: "Microsoft", issuer: "Microsoft", summary: "This consolidated record represents the student's completion of 24 Microsoft Learn training paths under the Learnathon 2k25 programme. The courses span three major technical tracks: **(1) Generative AI & Microsoft Copilot** — Explore Generative AI, Fundamentals of Generative AI, Fundamentals of Responsible Generative AI, Apply Prompt Engineering with Azure OpenAI Service, Build Natural Language Solutions with Azure OpenAI Service, Get Started with Azure OpenAI Service, Write Effective Prompts to Achieve Optimal Results, Explore Generative AI with Copilot in Bing, Boost Your Productivity with Microsoft Copilot, Design a Dream Destination using Microsoft Copilot, Get Started with Microsoft Copilot, Get Started with Microsoft 365 Copilot Chat, and Work Smarter with Microsoft 365 Copilot Chat; **(2) Cybersecurity Fundamentals** — Describe Basic Cybersecurity Threats Attacks & Mitigations, Describe Network-Based Threats & Mitigations, Describe Application-Based Threats & How to Protect Against Them, Describe Device-Based Threats & Security Controls, Describe Authentication & Authorization in Cybersecurity, and Describe Concepts of Cryptography; **(3) Microsoft Fabric & Data Engineering** — Introduction to End-to-End Analytics using Microsoft Fabric, Get Started with Lakehouses in Microsoft Fabric, Use Apache Spark in Microsoft Fabric, Use Data Factory Pipelines in Microsoft Fabric, and Work with Delta Lake Tables in Microsoft Fabric. This achievement demonstrates the student's commitment to continuous upskilling across cloud AI services, responsible AI governance, cybersecurity threat modelling, and modern data engineering platforms." },
  { name: "Apply Prompt Engineering with Azure OpenAI", file: getAssetUrl("/assets/certi/Apply prompt engineering with Azure OpenAI Service.pdf"), category: "Microsoft", issuer: "Microsoft", summary: "This consolidated record represents the student's completion of 24 Microsoft Learn training paths under the Learnathon 2k25 programme. The courses span three major technical tracks: **(1) Generative AI & Microsoft Copilot** — Explore Generative AI, Fundamentals of Generative AI, Fundamentals of Responsible Generative AI, Apply Prompt Engineering with Azure OpenAI Service, Build Natural Language Solutions with Azure OpenAI Service, Get Started with Azure OpenAI Service, Write Effective Prompts to Achieve Optimal Results, Explore Generative AI with Copilot in Bing, Boost Your Productivity with Microsoft Copilot, Design a Dream Destination using Microsoft Copilot, Get Started with Microsoft Copilot, Get Started with Microsoft 365 Copilot Chat, and Work Smarter with Microsoft 365 Copilot Chat; **(2) Cybersecurity Fundamentals** — Describe Basic Cybersecurity Threats Attacks & Mitigations, Describe Network-Based Threats & Mitigations, Describe Application-Based Threats & How to Protect Against Them, Describe Device-Based Threats & Security Controls, Describe Authentication & Authorization in Cybersecurity, and Describe Concepts of Cryptography; **(3) Microsoft Fabric & Data Engineering** — Introduction to End-to-End Analytics using Microsoft Fabric, Get Started with Lakehouses in Microsoft Fabric, Use Apache Spark in Microsoft Fabric, Use Data Factory Pipelines in Microsoft Fabric, and Work with Delta Lake Tables in Microsoft Fabric. This achievement demonstrates the student's commitment to continuous upskilling across cloud AI services, responsible AI governance, cybersecurity threat modelling, and modern data engineering platforms." },
  { name: "Get Started with Microsoft Copilot", file: getAssetUrl("/assets/certi/Get started with Microsoft Copilot.pdf"), category: "Microsoft", issuer: "Microsoft", summary: "This consolidated record represents the student's completion of 24 Microsoft Learn training paths under the Learnathon 2k25 programme. The courses span three major technical tracks: **(1) Generative AI & Microsoft Copilot** — Explore Generative AI, Fundamentals of Generative AI, Fundamentals of Responsible Generative AI, Apply Prompt Engineering with Azure OpenAI Service, Build Natural Language Solutions with Azure OpenAI Service, Get Started with Azure OpenAI Service, Write Effective Prompts to Achieve Optimal Results, Explore Generative AI with Copilot in Bing, Boost Your Productivity with Microsoft Copilot, Design a Dream Destination using Microsoft Copilot, Get Started with Microsoft Copilot, Get Started with Microsoft 365 Copilot Chat, and Work Smarter with Microsoft 365 Copilot Chat; **(2) Cybersecurity Fundamentals** — Describe Basic Cybersecurity Threats Attacks & Mitigations, Describe Network-Based Threats & Mitigations, Describe Application-Based Threats & How to Protect Against Them, Describe Device-Based Threats & Security Controls, Describe Authentication & Authorization in Cybersecurity, and Describe Concepts of Cryptography; **(3) Microsoft Fabric & Data Engineering** — Introduction to End-to-End Analytics using Microsoft Fabric, Get Started with Lakehouses in Microsoft Fabric, Use Apache Spark in Microsoft Fabric, Use Data Factory Pipelines in Microsoft Fabric, and Work with Delta Lake Tables in Microsoft Fabric. This achievement demonstrates the student's commitment to continuous upskilling across cloud AI services, responsible AI governance, cybersecurity threat modelling, and modern data engineering platforms." },
  { name: "Boost Productivity with Microsoft Copilot", file: getAssetUrl("/assets/certi/Boost your productivity with Microsoft Copilot.pdf"), category: "Microsoft", issuer: "Microsoft", summary: "This consolidated record represents the student's completion of 24 Microsoft Learn training paths under the Learnathon 2k25 programme. The courses span three major technical tracks: **(1) Generative AI & Microsoft Copilot** — Explore Generative AI, Fundamentals of Generative AI, Fundamentals of Responsible Generative AI, Apply Prompt Engineering with Azure OpenAI Service, Build Natural Language Solutions with Azure OpenAI Service, Get Started with Azure OpenAI Service, Write Effective Prompts to Achieve Optimal Results, Explore Generative AI with Copilot in Bing, Boost Your Productivity with Microsoft Copilot, Design a Dream Destination using Microsoft Copilot, Get Started with Microsoft Copilot, Get Started with Microsoft 365 Copilot Chat, and Work Smarter with Microsoft 365 Copilot Chat; **(2) Cybersecurity Fundamentals** — Describe Basic Cybersecurity Threats Attacks & Mitigations, Describe Network-Based Threats & Mitigations, Describe Application-Based Threats & How to Protect Against Them, Describe Device-Based Threats & Security Controls, Describe Authentication & Authorization in Cybersecurity, and Describe Concepts of Cryptography; **(3) Microsoft Fabric & Data Engineering** — Introduction to End-to-End Analytics using Microsoft Fabric, Get Started with Lakehouses in Microsoft Fabric, Use Apache Spark in Microsoft Fabric, Use Data Factory Pipelines in Microsoft Fabric, and Work with Delta Lake Tables in Microsoft Fabric. This achievement demonstrates the student's commitment to continuous upskilling across cloud AI services, responsible AI governance, cybersecurity threat modelling, and modern data engineering platforms." },
  { name: "Explore Generative AI", file: getAssetUrl("/assets/certi/Explore Generative AI.pdf"), category: "Microsoft", issuer: "Microsoft", summary: "This consolidated record represents the student's completion of 24 Microsoft Learn training paths under the Learnathon 2k25 programme. The courses span three major technical tracks: **(1) Generative AI & Microsoft Copilot** — Explore Generative AI, Fundamentals of Generative AI, Fundamentals of Responsible Generative AI, Apply Prompt Engineering with Azure OpenAI Service, Build Natural Language Solutions with Azure OpenAI Service, Get Started with Azure OpenAI Service, Write Effective Prompts to Achieve Optimal Results, Explore Generative AI with Copilot in Bing, Boost Your Productivity with Microsoft Copilot, Design a Dream Destination using Microsoft Copilot, Get Started with Microsoft Copilot, Get Started with Microsoft 365 Copilot Chat, and Work Smarter with Microsoft 365 Copilot Chat; **(2) Cybersecurity Fundamentals** — Describe Basic Cybersecurity Threats Attacks & Mitigations, Describe Network-Based Threats & Mitigations, Describe Application-Based Threats & How to Protect Against Them, Describe Device-Based Threats & Security Controls, Describe Authentication & Authorization in Cybersecurity, and Describe Concepts of Cryptography; **(3) Microsoft Fabric & Data Engineering** — Introduction to End-to-End Analytics using Microsoft Fabric, Get Started with Lakehouses in Microsoft Fabric, Use Apache Spark in Microsoft Fabric, Use Data Factory Pipelines in Microsoft Fabric, and Work with Delta Lake Tables in Microsoft Fabric. This achievement demonstrates the student's commitment to continuous upskilling across cloud AI services, responsible AI governance, cybersecurity threat modelling, and modern data engineering platforms." },
  { name: "Full Stack Intern – Certificate (VDart)", file: getAssetUrl("/assets/certi/Godfrey T R -A1215 - Completion_Certificate.pdf"), category: "Internship", issuer: "VDart Academy", tag: "Full Stack", summary: "This certificate certifies the completion of an Academic Internship in Full Stack Development at VDart Academy in January 2026. It validates the student's hands-on experience in MERN stack development, API integration, and collaborative coding. This experience demonstrates the student's readiness for professional software engineering roles." },
  { name: "Web Dev Intern – Certificate (Prodigy InfoTech)", file: getAssetUrl("/assets/certi/WAD-Certificate_1_1.pdf"), category: "Internship", issuer: "Prodigy InfoTech", tag: "Web Dev", summary: "This certificate certifies the completion of a Web Development internship at Prodigy InfoTech in August-September 2024. It validates the student's hands-on experience in building responsive web applications and integrating APIs. This credential confirms the student's practical web engineering skills." },
  { name: "Cybersecurity Intern – Certificate (Adaovi)", file: getAssetUrl("/assets/certi/CS-Certificate_1_1.pdf"), category: "Internship", issuer: "Adaovi", tag: "Cyber Security", summary: "This certificate from Adaovi validates the student's completion of Cyber Security training, confirming their knowledge in the domain of digital safety and protection. It covers foundational concepts such as network security, threat detection, and practical training in risk mitigation and secure workflows. This training demonstrates the student's capability to leverage cybersecurity practices to solve real-world problems and safeguard scalable systems." },
  { name: "UI/UX Design Intern – Certificate (SkillCraft)", file: getAssetUrl("/assets/certi/UIUX-Certificate_1_1.pdf"), category: "Internship", issuer: "SkillCraft Tech", tag: "UI/UX", summary: "This certificate certifies the completion of a one-month UI/UX design internship at SkillCraft Technology in early 2025. It validates the student's practical skills in wireframing, layout optimization, and user journey mapping. This experience highlights the student's ability to design user-centric interfaces." },
  { name: "C# (Basic) – HackerRank", file: getAssetUrl("/assets/certi/c_sharp_basic certificate.pdf"), category: "Technical Skills", issuer: "HackerRank", tag: "Verified", summary: "This certificate from HackerRank validates the student's successful completion of the C# (Basic) skill certification test in the domain of software development. It covers foundational concepts such as syntax and data types, control structures, and practical implementation of object-oriented programming principles. This certification demonstrates the student's capability to leverage C# fundamentals to build scalable applications and contribute effectively to professional development projects." },
  { name: "CSS (Basic) – HackerRank", file: getAssetUrl("/assets/certi/CSS (Basic).png"), fileType: "image", category: "Technical Skills", issuer: "HackerRank", tag: "Verified", summary: "This certificate from HackerRank validates the student's successful completion of the CSS (Basic) skill certification test in the domain of web development. It covers foundational concepts such as selectors and properties, styling layouts, and practical implementation of responsive design techniques. This certification demonstrates the student's capability to leverage CSS fundamentals to build visually consistent, scalable, and industry-ready web interfaces." },
  { name: "AI for Beginners", file: getAssetUrl("/assets/certi/AI for Beginners.pdf"), category: "Technical Skills", issuer: "HP LIFE", summary: "This certificate verifies the successful completion of the HP LIFE 'AI for Beginners' online course. It validates the student's understanding of key artificial intelligence concepts, the importance of data, and the real-world applications of AI. This training reflects the student's awareness of emerging technological trends and their societal impacts." },
  { name: "Design Thinking", file: getAssetUrl("/assets/certi/Design Thinking.pdf"), category: "Technical Skills", issuer: "HP LIFE", summary: "This certificate verifies the successful completion of the HP LIFE 'Design Thinking' online course. It covers the core stages of the design thinking process, problem definition, user empathy, and iterative prototyping based on feedback. This coursework validates the student's ability to apply customer-centric methodologies to solve complex engineering and product design challenges." },
  { name: "The Joy of Computing using Python", file: getAssetUrl("/assets/certi/The Joy of Computing using Python_1_1.pdf"), category: "Academic (NPTEL)", issuer: "NPTEL", summary: "This certificate validates the completion of the 12-week NPTEL course 'The Joy of Computing Using Python'. It covers programming fundamentals, algorithm design, and problem-solving using Python. This credential demonstrates the student's analytical capabilities and foundational coding skills." },
  { name: "Enhancing Soft Skills and Personality", file: getAssetUrl("/assets/certi/Enhancing Soft Skills and Personality_1_1.pdf"), category: "Academic (NPTEL)", issuer: "NPTEL", summary: "This certificate validates the completion of the 8-week NPTEL course 'Enhancing Soft Skills and Personality'. It certifies the development of professional communication, interpersonal skills, and leadership qualities. This training is essential for the student's personal development and readiness for corporate environments." },
  { name: "Celonis AI Foundations", file: getAssetUrl("/assets/certi/Celonis AI Foundations_1_1.pdf"), category: "Learnathon", issuer: "Celonis", tag: "AI Foundations", summary: "This consolidated record represents the student's completion of all course certifications under the ICT Academy Learnathon 2k24 programme, delivered through globally recognized technology partners. The courses span five technical tracks: **(1) Engineering & Modelling (Bentley)** — 2D/3D CAD Modeling of Building Environment, Modeling Structures with Analytical Modeler, and Road Design Concepts & Fundamentals with OpenRoads Designer; **(2) Process Mining & AI (Celonis)** — Academic Process Mining Fundamentals and Celonis AI Foundations; **(3) Machine Learning & Deep Learning (MathWorks)** — Deep Learning Onramp and Machine Learning Onramp; **(4) Database Administration & AI (MongoDB)** — Introduction to MongoDB for Students and Introduction to MongoDB, AI, and Vector Search; **(5) Robotic Process Automation (UiPath)** — UiPath Automation Explorer. Together with the main ICT Academy Learnathon 2024 completion certificate, this achievement demonstrates the student's capability to engage with multi-disciplinary technical learning across CAD engineering, data-driven process optimization, deep learning, NoSQL database design, and automation development." },
  { name: "Celonis – Academic Process Mining", file: getAssetUrl("/assets/certi/Celonis- Academic Process Mining Fundamentals_1_1.pdf"), category: "Learnathon", issuer: "Celonis", summary: "This consolidated record represents the student's completion of all course certifications under the ICT Academy Learnathon 2k24 programme, delivered through globally recognized technology partners. The courses span five technical tracks: **(1) Engineering & Modelling (Bentley)** — 2D/3D CAD Modeling of Building Environment, Modeling Structures with Analytical Modeler, and Road Design Concepts & Fundamentals with OpenRoads Designer; **(2) Process Mining & AI (Celonis)** — Academic Process Mining Fundamentals and Celonis AI Foundations; **(3) Machine Learning & Deep Learning (MathWorks)** — Deep Learning Onramp and Machine Learning Onramp; **(4) Database Administration & AI (MongoDB)** — Introduction to MongoDB for Students and Introduction to MongoDB, AI, and Vector Search; **(5) Robotic Process Automation (UiPath)** — UiPath Automation Explorer. Together with the main ICT Academy Learnathon 2024 completion certificate, this achievement demonstrates the student's capability to engage with multi-disciplinary technical learning across CAD engineering, data-driven process optimization, deep learning, NoSQL database design, and automation development." },
  { name: "UiPath Automation Explorer", file: getAssetUrl("/assets/certi/UiPath Automation Explorer_1_1.pdf"), category: "Learnathon", issuer: "UiPath", summary: "This certificate verifies the successful completion of the UiPath Automation Explorer course. It validates the student's foundational skills in Robotic Process Automation (RPA) design, workflow configuration, and bot deployment. This training is highly relevant to business process automation and digital transformation." },
  { name: "Introduction to MongoDB for Students", file: getAssetUrl("/assets/certi/Introduction to MongoDB for Students_1_1.pdf"), category: "Learnathon", issuer: "MongoDB", summary: "This certificate certifies the completion of the 'Introduction to MongoDB for Students' course. It validates the student's skills in document-based NoSQL databases, query optimization, and schema design. This knowledge is essential for building scalable modern web applications." },
  { name: "MongoDB, AI & Vector Search – ICT Academy", file: getAssetUrl("/assets/certi/Introduction to MongoDB, AI, and Vector Search - ICT Academy Learnathon_1_1.pdf"), category: "Learnathon", issuer: "MongoDB", summary: "This consolidated record represents the student's completion of all course certifications under the ICT Academy Learnathon 2k24 programme, delivered through globally recognized technology partners. The courses span five technical tracks: **(1) Engineering & Modelling (Bentley)** — 2D/3D CAD Modeling of Building Environment, Modeling Structures with Analytical Modeler, and Road Design Concepts & Fundamentals with OpenRoads Designer; **(2) Process Mining & AI (Celonis)** — Academic Process Mining Fundamentals and Celonis AI Foundations; **(3) Machine Learning & Deep Learning (MathWorks)** — Deep Learning Onramp and Machine Learning Onramp; **(4) Database Administration & AI (MongoDB)** — Introduction to MongoDB for Students and Introduction to MongoDB, AI, and Vector Search; **(5) Robotic Process Automation (UiPath)** — UiPath Automation Explorer. Together with the main ICT Academy Learnathon 2024 completion certificate, this achievement demonstrates the student's capability to engage with multi-disciplinary technical learning across CAD engineering, data-driven process optimization, deep learning, NoSQL database design, and automation development." },
  { name: "Work with Components in Figma", file: getAssetUrl("/assets/certi/Work with Components in Figma.pdf"), category: "Design & Development", issuer: "Coursera", summary: "This certificate represents the successful completion of the online project course 'Work with Components in Figma' authorized by Coursera Project Network. The curriculum focuses on hands-on practical implementation of component states, typography scaling, and dynamic UI design structures in Figma to build real-world applications and workflows. This experience validates the student's ability to utilize modern design and development platforms in professional settings." },
  { name: "Build a Free Website with WordPress", file: getAssetUrl("/assets/certi/Build a free website with WordPress.pdf"), category: "Design & Development", issuer: "Coursera", summary: "This certificate represents the successful completion of the online project course 'Build a free website with WordPress' authorized by Coursera Project Network. The curriculum focuses on hands-on practical implementation of WordPress development and web hosting setup to build real-world applications and workflows. This experience validates the student's ability to utilize modern design and development platforms in professional settings." },
  { name: "Graphic Design in PowerPoint", file: getAssetUrl("/assets/certi/Building Digital Media using Graphic Design in PowerPoint.pdf"), category: "Design & Development", issuer: "Coursera", summary: "This certificate from Coursera validates the student's completion of the course “Building Digital Media using Graphic Design in PowerPoint” in the domain of digital media and design. It covers key skills including slide composition, visual storytelling, and practical implementation of PowerPoint-based graphic workflows. This training demonstrates the student's readiness to apply modern graphic design methodologies in professional digital content creation and presentation roles." },
  { name: "Build Website With AI", file: getAssetUrl("/assets/certi/Build Website With AI.pdf"), category: "Design & Development", issuer: "Simplilearn", summary: "This certificate verifies the successful completion of the 'Build Website With AI' course offered by Simplilearn. The training covers practical elements of AI tools for rapid website prototyping and development. This credential demonstrates the student's continuous learning and technical readiness in the Web Development and AI domain." },
  { name: "How to Create Presentations using Canva", file: getAssetUrl("/assets/certi/How to create presentations using Canva.pdf"), category: "Design & Development", issuer: "Coursera", summary: "This certificate represents the successful completion of the online project course 'How to create presentations using Canva' authorized by Coursera Project Network. The curriculum focuses on hands-on practical implementation of visual slide design, template customization, and digital presentation layout structure to build real-world applications and workflows. This experience validates the student's ability to utilize modern design and development platforms in professional settings." },
  { name: "AI Tools Workshop", file: getAssetUrl("/assets/certi/AI Tools_1_1.pdf"), category: "Workshops", issuer: "Workshop", summary: "This certificate from be10x validates the student's completion of the 2-Day AI Tools Workshop, focusing on the domain of AI-driven productivity and innovation. It covers foundational concepts such as AI-powered workflows, automation techniques, and practical training in modern AI tools for professional use. This training demonstrates the student's capability to leverage AI applications and digital efficiency skills to solve real-world problems, streamline tasks, and build scalable workflows in industry settings." },
  { name: "Power BI (OfficeMaster)", file: getAssetUrl("/assets/certi/Power BI_1_1.pdf"), category: "Workshops", issuer: "Workshop", summary: "This certificate from OfficeMaster validates the student's completion of the 1-Day Power BI Workshop, focusing on the domain of business intelligence and data visualization. It covers foundational concepts such as Power BI dashboards, data modeling and transformation, and practical training in interactive reporting and visualization techniques. This training demonstrates the student's capability to leverage Power BI skills to analyze datasets, create dynamic dashboards, and build scalable workflows for industry-ready decision-making." },
  { name: "ChatGPT & AI Workshop", file: getAssetUrl("/assets/certi/ChatGPT & AI_1_1.pdf"), category: "Workshops", issuer: "Workshop", summary: "This certificate from be10x validates the student's completion of the ChatGPT & AI Tools Workshop, focusing on the domain of applied AI and conversational technologies. It covers foundational concepts such as prompt engineering, AI-assisted productivity workflows, and practical training in ChatGPT and related AI tools for professional applications. This training demonstrates the student's capability to leverage AI-driven communication and automation skills to solve real-world problems, enhance efficiency, and build scalable workflows in industry contexts." },
  { name: "KRCT – Trash to Treasure (Winner)", file: getAssetUrl("/assets/certi/KRCT Certificate Trash to Treasure_1_1.pdf"), category: "Awards & Events", issuer: "KRCT", tag: "Winner", summary: "This certificate from K. Ramakrishnan College of Technology validates the student's achievement of winning second prize in the “Trash to Treasure” event during MATHISTIC – A Technical and Non-Technical Event, organized by the Department of Science and Humanities and the Homi Bhabha Science Club. It covers foundational concepts such as creative reuse of materials, logical problem-solving in sustainability, and practical teamwork in transforming waste into valuable products. This accomplishment demonstrates the student's capability to leverage innovation and environmental awareness to design meaningful solutions, present ideas effectively, and contribute to sustainable development initiatives." },
  { name: "JET Hackathon 1.0", file: getAssetUrl("/assets/certi/GODFREY T R -23_1_1.pdf"), category: "Awards & Events", issuer: "JET", tag: "Hackathon", summary: "This certificate from Jeyram Educational Institution validates the student's participation in the JET Hackathon-1.0, focusing on the domain of web development and innovation. It covers foundational concepts such as interactive CSS design, team-based project creation, and practical exposure to hackathon-style problem solving and government-supported technical courses. This experience demonstrates the student's capability to leverage web development skills, collaborative teamwork, and innovation mindset to solve real-world challenges and contribute to technical excellence." },
  { name: "Code Sprint 6.0", file: getAssetUrl("/assets/certi/Code sprint 6.0_1_1.pdf"), category: "Awards & Events", issuer: "KRCT", summary: "This certificate from K. Ramakrishnan College of Technology validates the student's participation in CODESPRINT 6.0 – a 6-hour internal hackathon in the domain of computer science and engineering. It covers foundational concepts such as algorithmic problem-solving, collaborative coding, and practical training in hackathon-based project workflows. This experience demonstrates the student's capability to leverage team-based programming and innovation skills to solve real-world challenges and build scalable solutions under time constraints." },
  { name: "Caption Debug – Inter College Event", file: getAssetUrl("/assets/certi/INTER COLLEGE EVENT Caption Debug_1_1.pdf"), category: "Awards & Events", issuer: "KRCT", summary: "This certificate from K. Ramakrishnan College of Technology validates the student's participation in the Inter-Departmental Paper Presentation Contest in the domain of computer science and engineering. It covers foundational concepts such as research analysis, technical documentation, and practical training in academic presentation workflows. This experience demonstrates the student's capability to leverage communication and technical reasoning skills to present innovative ideas, solve real-world problems, and contribute to professional knowledge-sharing forums." },
  { name: "NSS Camp Certificate", file: getAssetUrl("/assets/certi/GODFREY T R-certificate_1_1.pdf"), category: "NSS & Civic", issuer: "NSS", summary: "This certificate from the National Service Scheme recognizes the student's participation in the 50174 Marathon event. It highlights the student's commitment to community welfare, physical health advocacy, and support for social awareness campaigns. This engagement demonstrates active citizenship, team spirit, and participation in community-driven events." },
  { name: "My Bharat Quiz Certificate", file: getAssetUrl("/assets/certi/MyBharat_Quiz_Certificate.png"), fileType: "image", category: "NSS & Civic", issuer: "My Bharat", summary: "This certificate from the Ministry of Youth Affairs & Sports, Government of India validates the student's participation in the MY Bharat Budget Quest 2026 Online Quiz, guided by the NSS Programming Officers of KRCT, in the domain of civic awareness and national development. It covers foundational concepts such as budgetary knowledge, policy awareness, and practical exposure to quiz-based evaluation on governance and economics. This recognition demonstrates the student's capability to leverage civic responsibility and analytical reasoning to understand national priorities, contribute to informed discussions, and support initiatives toward a Viksit Bharat." },
  { name: "Patent – Android TV Using Remote IR Sensor", file: getAssetUrl("/assets/certi/Draft_1_1.pdf"), category: "Patent", issuer: "Patent Office", tag: "Innovation", summary: "This official document from the Patent Office of India verifies the publication of the patent application 'Android TV By using Remote Sensor (IR)' (Application No. 202441033032 A). It records the formal entry of the student's hardware-software innovation into the national patent journal. This publication represents a major research milestone in the student's undergraduate portfolio." },
];
