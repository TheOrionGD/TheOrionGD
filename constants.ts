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
    title: "Smart LMS with AI Assistance",
    category: "AI / ML",
    tech: ["MERN", "TypeScript", "Gemini API"],
    description: "AI-assisted learning management platform built using the MERN stack. Integrates Google Gemini to generate quizzes, provide adaptive content assistance, and personalise learning workflows for students.",
    github: "https://github.com/OrionGD/SMART-LMS-16",
    demo: "https://smart-k6c7kww3i-oriongds-projects.vercel.app/"
  },
  {
    title: "AI Translation & Conversation Platform",
    category: "AI / ML",
    tech: ["React", "TypeScript", "Gemini 2.5"],
    description: "Real-time multilingual communication platform that leverages Gemini APIs for contextual translation, conversation assistance, and sentiment analysis across languages.",
    github: "https://github.com/OrionGD/VELTRIO",
    demo: "https://veltrio.vercel.app/"
  },
  {
    title: "Mobile Tracking & Security System",
    category: "Systems",
    tech: ["Java", "GPS API", "Encryption"],
    description: "Android-based device security application enabling real-time GPS location tracking and remote data lock functionality to protect sensitive information on lost or stolen devices.",
    github: "https://github.com/OrionGD/GD-s-Mobile-Tracking-System",
    demo: "#"
  },
  {
    title: "Hostel Management System",
    category: "Systems",
    tech: ["Python", "Tkinter", "MySQL"],
    description: "Role-based desktop application for hostel attendance tracking and outpass management. Features a customised GUI with CRUD operations and persistent MySQL storage.",
    github: "https://github.com/OrionGD/GD-S-HOSTEL-MANAGEMENT-SYSTEM",
    demo: "#"
  },
  {
    title: "ARgorithm — XR Algorithm Visualiser",
    category: "XR",
    tech: ["Unity", "ARCore", "C#"],
    description: "Unity-based augmented reality application that renders data structures and algorithm execution steps in 3D space, helping students build intuitive understanding of complex CS concepts.",
    github: "https://github.com/OrionGD/ARgorithm",
    demo: "#"
  },
  {
    title: "GD Text Analyzer",
    category: "AI / ML",
    tech: ["Python", "Regex", "NLP"],
    description: "Modular text-processing pipeline implementing cleaning, tokenisation, keyword extraction, and sentiment analysis — built to demonstrate applied NLP fundamentals.",
    github: "https://github.com/OrionGD/GD-s-TEXT-ANALYZER",
    demo: "#"
  },
  {
    title: "Waiting List Management System",
    category: "Systems",
    tech: ["C", "Linked Lists", "Queues"],
    description: "Console-based seat booking system implemented in C using linked lists and queues to efficiently manage waitlisted entries and cancellation reassignments.",
    github: "https://github.com/OrionGD/GD-s-WAITING-LIST-MANAGEMENT-SYSTEM",
    demo: "#"
  },
  {
    title: "Weather Sphere Pro",
    category: "Web",
    tech: ["JavaScript", "REST APIs", "CSS"],
    description: "Responsive weather web application integrating OpenWeather REST APIs with dynamic UI rendering, location-based forecasts, and animated atmospheric condition displays.",
    github: "https://github.com/OrionGD/GD-S-Web-Weather-Application",
    demo: "#"
  },
  {
    title: "Client-Side Image Optimiser",
    category: "Web",
    tech: ["JavaScript", "Canvas API", "HTML5"],
    description: "Browser-based image compression tool using the HTML5 Canvas API to reduce file sizes without perceptible quality loss, requiring no server-side processing.",
    github: "https://github.com/OrionGD/GDs-Image-Optimization",
    demo: "#"
  },
  {
    title: "Password Strength Checker",
    category: "Cybersecurity",
    tech: ["JavaScript", "Regex", "Security"],
    description: "Real-time password strength evaluator providing instant entropy scoring, pattern-vulnerability detection, and actionable improvement feedback to users.",
    github: "https://github.com/OrionGD/Password-Strength_Checker",
    demo: "#"
  },
  {
    title: "Chrono Stopwatch",
    category: "Web",
    tech: ["JavaScript", "DOM", "CSS"],
    description: "High-precision web stopwatch with lap-time management and a clean UI, demonstrating accurate DOM timing and interactive state management.",
    github: "https://github.com/OrionGD/Chrono-Stopwatch",
    demo: "#"
  },
  {
    title: "Strategic Tic-Tac-Toe",
    category: "Web",
    tech: ["JavaScript", "Game Logic", "CSS"],
    description: "Browser-based Tic-Tac-Toe with two difficulty levels, win-detection logic, and a glassmorphism UI — built as a focused exercise in game-state management.",
    github: "https://github.com/OrionGD/TicTacToe-Pro",
    demo: "#"
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
  { name: "Azure AI Engineer Associate (AI-102)", file: getAssetUrl("/assets/certi/Microsoft Certified Azure AI Engineer Associate AI-102.pdf"), category: "Core Professional", issuer: "Simplilearn", tag: "Top Credential" },
  { name: "Applied Generative AI Specialization", file: getAssetUrl("/assets/certi/Applied Generative AI Specialization.pdf"), category: "Core Professional", issuer: "Simplilearn", tag: "Specialization" },
  { name: "Advanced GenAI – Building LLM Applications", file: getAssetUrl("/assets/certi/Advanced Generative AI - Building LLM Applications.pdf"), category: "AI & Generative AI", issuer: "Simplilearn" },
  { name: "Advanced GenAI – Models and Architecture", file: getAssetUrl("/assets/certi/Advanced Generative AI - Models and Architecture.pdf"), category: "AI & Generative AI", issuer: "Simplilearn" },
  { name: "Advanced GenAI – Image Generation Capabilities", file: getAssetUrl("/assets/certi/Advanced Generative AI - Image Generation Capabilities.pdf"), category: "AI & Generative AI", issuer: "Simplilearn" },
  { name: "Advanced GenAI Capstone Project", file: getAssetUrl("/assets/certi/Advanced Generative AI Capstone Project.pdf"), category: "AI & Generative AI", issuer: "Simplilearn" },
  { name: "Generative AI Governance", file: getAssetUrl("/assets/certi/Generative AI Governance.pdf"), category: "AI & Generative AI", issuer: "Simplilearn" },
  { name: "Copilot Foundations", file: getAssetUrl("/assets/certi/Copilot Foundations.pdf"), category: "AI & Generative AI", issuer: "Simplilearn" },
  { name: "Core Essentials of GenAI, Prompt Engineering & ChatGPT", file: getAssetUrl("/assets/certi/Core_Essentials of Generative AI, Prompt Engineering & ChatGPT.pdf"), category: "AI & Generative AI", issuer: "Simplilearn" },
  { name: "Open Source Models with Hugging Face", file: getAssetUrl("/assets/certi/Open Source Models with Hugging Face.pdf"), category: "AI & Generative AI", issuer: "Simplilearn" },
  { name: "Deep Learning Onramp – MATLAB", file: getAssetUrl("/assets/certi/DLO_1_1.pdf"), category: "AI & Generative AI", issuer: "MATLAB" },
  { name: "Machine Learning Onramp – MATLAB", file: getAssetUrl("/assets/certi/MLO_1_1.pdf"), category: "AI & Generative AI", issuer: "MATLAB" },
  { name: "Fundamentals of Generative AI", file: getAssetUrl("/assets/certi/Fundamentals of Generative AI.pdf"), category: "Microsoft", issuer: "Microsoft" },
  { name: "Fundamentals of Responsible Generative AI", file: getAssetUrl("/assets/certi/Fundamentals of Responsible Generative AI.pdf"), category: "Microsoft", issuer: "Microsoft" },
  { name: "Get Started with Azure OpenAI Service", file: getAssetUrl("/assets/certi/Get started with Azure OpenAI Service.pdf"), category: "Microsoft", issuer: "Microsoft" },
  { name: "Build Natural Language Solutions with Azure OpenAI", file: getAssetUrl("/assets/certi/Build natural language solutions with Azure OpenAI Service.pdf"), category: "Microsoft", issuer: "Microsoft" },
  { name: "Apply Prompt Engineering with Azure OpenAI", file: getAssetUrl("/assets/certi/Apply prompt engineering with Azure OpenAI Service.pdf"), category: "Microsoft", issuer: "Microsoft" },
  { name: "Get Started with Microsoft Copilot", file: getAssetUrl("/assets/certi/Get started with Microsoft Copilot.pdf"), category: "Microsoft", issuer: "Microsoft" },
  { name: "Boost Productivity with Microsoft Copilot", file: getAssetUrl("/assets/certi/Boost your productivity with Microsoft Copilot.pdf"), category: "Microsoft", issuer: "Microsoft" },
  { name: "Explore Generative AI", file: getAssetUrl("/assets/certi/Explore Generative AI.pdf"), category: "Microsoft", issuer: "Microsoft" },
  { name: "Full Stack Intern – Certificate (VDart)", file: getAssetUrl("/assets/certi/Godfrey T R -A1215 - Completion_Certificate.pdf"), category: "Internship", issuer: "VDart Academy", tag: "Full Stack" },
  { name: "Web Dev Intern – Certificate (Prodigy InfoTech)", file: getAssetUrl("/assets/certi/WAD-Certificate_1_1.pdf"), category: "Internship", issuer: "Prodigy InfoTech", tag: "Web Dev" },
  { name: "Cybersecurity Intern – Certificate (Adaovi)", file: getAssetUrl("/assets/certi/CS-Certificate_1_1.pdf"), category: "Internship", issuer: "Adaovi", tag: "Cyber Security" },
  { name: "UI/UX Design Intern – Certificate (SkillCraft)", file: getAssetUrl("/assets/certi/UIUX-Certificate_1_1.pdf"), category: "Internship", issuer: "SkillCraft Tech", tag: "UI/UX" },
  { name: "C# (Basic) – HackerRank", file: getAssetUrl("/assets/certi/c_sharp_basic certificate.pdf"), category: "Technical Skills", issuer: "HackerRank", tag: "Verified" },
  { name: "CSS (Basic) – HackerRank", file: getAssetUrl("/assets/certi/CSS (Basic).png"), fileType: "image", category: "Technical Skills", issuer: "HackerRank", tag: "Verified" },
  { name: "AI for Beginners", file: getAssetUrl("/assets/certi/AI for Beginners.pdf"), category: "Technical Skills", issuer: "HP LIFE" },
  { name: "Design Thinking", file: getAssetUrl("/assets/certi/Design Thinking.pdf"), category: "Technical Skills", issuer: "HP LIFE" },
  { name: "The Joy of Computing using Python", file: getAssetUrl("/assets/certi/The Joy of Computing using Python_1_1.pdf"), category: "Academic (NPTEL)", issuer: "NPTEL" },
  { name: "Enhancing Soft Skills and Personality", file: getAssetUrl("/assets/certi/Enhancing Soft Skills and Personality_1_1.pdf"), category: "Academic (NPTEL)", issuer: "NPTEL" },
  { name: "Celonis AI Foundations", file: getAssetUrl("/assets/certi/Celonis AI Foundations_1_1.pdf"), category: "Learnathon", issuer: "Celonis", tag: "AI Foundations" },
  { name: "Celonis – Academic Process Mining", file: getAssetUrl("/assets/certi/Celonis- Academic Process Mining Fundamentals_1_1.pdf"), category: "Learnathon", issuer: "Celonis" },
  { name: "UiPath Automation Explorer", file: getAssetUrl("/assets/certi/UiPath Automation Explorer_1_1.pdf"), category: "Learnathon", issuer: "UiPath" },
  { name: "Introduction to MongoDB for Students", file: getAssetUrl("/assets/certi/Introduction to MongoDB for Students_1_1.pdf"), category: "Learnathon", issuer: "MongoDB" },
  { name: "MongoDB, AI & Vector Search – ICT Academy", file: getAssetUrl("/assets/certi/Introduction to MongoDB, AI, and Vector Search - ICT Academy Learnathon_1_1.pdf"), category: "Learnathon", issuer: "MongoDB" },
  { name: "Work with Components in Figma", file: getAssetUrl("/assets/certi/Work with Components in Figma.pdf"), category: "Design & Development", issuer: "Coursera" },
  { name: "Build a Free Website with WordPress", file: getAssetUrl("/assets/certi/Build a free website with WordPress.pdf"), category: "Design & Development", issuer: "Coursera" },
  { name: "Graphic Design in PowerPoint", file: getAssetUrl("/assets/certi/Building Digital Media using Graphic Design in PowerPoint.pdf"), category: "Design & Development", issuer: "Coursera" },
  { name: "Build Website With AI", file: getAssetUrl("/assets/certi/Build Website With AI.pdf"), category: "Design & Development", issuer: "Simplilearn" },
  { name: "How to Create Presentations using Canva", file: getAssetUrl("/assets/certi/How to create presentations using Canva.pdf"), category: "Design & Development", issuer: "Coursera" },
  { name: "AI Tools Workshop", file: getAssetUrl("/assets/certi/AI Tools_1_1.pdf"), category: "Workshops", issuer: "Workshop" },
  { name: "Power BI (OfficeMaster)", file: getAssetUrl("/assets/certi/Power BI_1_1.pdf"), category: "Workshops", issuer: "Workshop" },
  { name: "ChatGPT & AI Workshop", file: getAssetUrl("/assets/certi/ChatGPT & AI_1_1.pdf"), category: "Workshops", issuer: "Workshop" },
  { name: "KRCT – Trash to Treasure (Winner)", file: getAssetUrl("/assets/certi/KRCT Certificate Trash to Treasure_1_1.pdf"), category: "Awards & Events", issuer: "KRCT", tag: "Winner" },
  { name: "JET Hackathon 1.0", file: getAssetUrl("/assets/certi/GODFREY T R -23_1_1.pdf"), category: "Awards & Events", issuer: "JET", tag: "Hackathon" },
  { name: "Code Sprint 6.0", file: getAssetUrl("/assets/certi/Code sprint 6.0_1_1.pdf"), category: "Awards & Events", issuer: "KRCT" },
  { name: "Caption Debug – Inter College Event", file: getAssetUrl("/assets/certi/INTER COLLEGE EVENT Caption Debug_1_1.pdf"), category: "Awards & Events", issuer: "KRCT" },
  { name: "NSS Camp Certificate", file: getAssetUrl("/assets/certi/GODFREY T R-certificate_1_1.pdf"), category: "NSS & Civic", issuer: "NSS" },
  { name: "My Bharat Quiz Certificate", file: getAssetUrl("/assets/certi/MyBharat_Quiz_Certificate.png"), fileType: "image", category: "NSS & Civic", issuer: "My Bharat" },
  { name: "Patent – Android TV Using Remote IR Sensor", file: getAssetUrl("/assets/certi/Draft_1_1.pdf"), category: "Patent", issuer: "Patent Office", tag: "Innovation" }
];
