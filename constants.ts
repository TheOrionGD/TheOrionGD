export const getAssetUrl = (path: string) => {
  const base = import.meta.env.VITE_API_URI || "http://localhost:5000";
  return `${base}${path}`;
};

import { Project, Experience, Education, SkillCategory, Certification, CertificateFile } from './types';
import { FaGithub, FaLinkedin, FaHackerrank } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export const PERSONAL_INFO = {
  name: "GODFREY T R",
  role: "SOFTWARE ENGINEER",
  tagline: "Software Engineer specializing in full-stack development, building scalable, AI-integrated applications from concept to deployment.",
  email: "godfreytr.prof@gmail.com",
  phone: "+91 93444 62238",
  location: "Tiruchirapalli, Tamil Nadu, India",
  github: "https://github.com/OrionGD",
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
      "Completed Academic Internship as part of On-the-Job Training (OJT)",
      "Worked on full stack development concepts and practical implementation",
      "Collaborated with peers and mentors to build and enhance technical skills",
      "Demonstrated strong learning ability and successfully completed training within the timeframe"
    ]
  },
  {
    role: "UI/UX Design Intern",
    company: "SkillCraft",
    period: "Feb 2025 – Mar 2025",
    details: [
      "Homepage redesign for improved hierarchy and visual clarity",
      "Dark mode theme integration for mobile news applications",
      "E-commerce checkout flow optimization to reduce friction",
      "User journey mapping and pain point analysis for fitness apps"
    ]
  },
  {
    role: "Web Development Intern",
    company: "Prodigy InfoTech",
    period: "Aug 2024 – Sept 2024",
    details: [
      "Weather Web App using REST APIs and responsive design",
      "Utility tools: Stopwatch and Tic-Tac-Toe with dynamic DOM",
      "Frontend-backend integration focusing on cross-platform compatibility"
    ]
  },
  {
    role: "Cybersecurity Intern",
    company: "Adaovi",
    period: "Jun 2024 – Jul 2024",
    details: [
      "Password Strength Checker with real-time feedback",
      "Ethical Keylogger simulation for security demonstrations",
      "Penetration testing fundamentals and password security audits"
    ]
  }

];

export const SKILLS: SkillCategory[] = [
  { category: "Programming", skills: ["C", "C++", "Java", "Python", "HTML", "CSS", "JavaScript", "TypeScript"] },
  { category: "Web", skills: ["MERN Stack", "REST APIs", "DOM", "Responsive Design", "Tailwind CSS", "FastAPI"] },
  { category: "Databases", skills: ["MySQL", "MongoDB"] },
  { category: "Tools", skills: ["Git", "GitHub", "VS Code", "Figma", "Canva", "GenAI Tools", "Unity"] },
  { category: "Concepts", skills: ["AI Integration", "UI/UX", "Cybersecurity", "NLP", "Text Analysis", "ARCore"] },
  { category: "XR", skills: ["Unity3D", "ARCore", "Blender"] }
];

export const LEADERSHIP_XR = [
  "XR Club Vice President",
  "AR Workshops Facilitator",
  "Mentoring Juniors",
  "Active NSS Volunteer",
  "Events Coordination"
];

export const PROJECTS: Project[] = [
  {
    title: "SMART-LMS-16",
    category: "AI / ML",
    tech: ["MERN", "TypeScript", "Google Gemini"],
    description: "AI-powered adaptive learning platform. Personalizes lessons using Google Gemini, generates quizzes, and rewrites content based on learning styles.",
    github: "https://github.com/OrionGD/SMART-LMS-16",
    demo: "https://smart-k6c7kww3i-oriongds-projects.vercel.app/"
  },
  {
    title: "VELTRIO",
    category: "AI / ML",
    tech: ["React", "TypeScript", "Gemini 2.5"],
    description: "AI-Powered Real-time Translation & Conversation Platform. Leveraging Gemini models for seamless language processing and sentiment analysis.",
    github: "https://github.com/OrionGD/VELTRIO",
    demo: "https://veltrio.vercel.app/"
  },
  {
    title: "MTS Security",
    category: "Systems",
    tech: ["Java", "GPS API", "Encryption"],
    description: "Mobile Tracking System (MTS) designed for device security, enabling real-time location tracking and remote sensitive data locking.",
    github: "https://github.com/OrionGD/GD-s-Mobile-Tracking-System",
    demo: "#"
  },
  {
    title: "Hostel Mgt System",
    category: "Systems",
    tech: ["Python", "Tkinter", "MySQL"],
    description: "A role-based Hostel Management System for attendance and outpass tracking, featuring a customized desktop GUI.",
    github: "https://github.com/OrionGD/GD-S-HOSTEL-MANAGEMENT-SYSTEM",
    demo: "#"
  },
  {
    title: "GD Text Analyzer",
    category: "AI / ML",
    tech: ["Python", "Regex", "NLP"],
    description: "Processing pipeline for text cleaning, sentiment analysis, and keyword identification with modular design.",
    github: "https://github.com/OrionGD/GD-s-TEXT-ANALYZER",
    demo: "#"
  },
  {
    title: "ARgorithm",
    category: "XR",
    tech: ["Unity", "ARCore", "C#"],
    description: "Augmented reality visualizer for data structures and algorithms, helping students grasp complex concepts in 3D space.",
    github: "https://github.com/OrionGD/ARgorithm",
    demo: "#"
  },
  {
    title: "Waiting List Mgt",
    category: "Systems",
    tech: ["C", "Linked Lists", "Queues"],
    description: "Console-based system implemented in C to manage seat bookings efficiently using advanced data structures.",
    github: "https://github.com/OrionGD/GD-s-WAITING-LIST-MANAGEMENT-SYSTEM",
    demo: "#"
  },
  {
    title: "Weather Sphere Pro",
    category: "Web",
    tech: ["JavaScript", "REST APIs", "CSS"],
    description: "Responsive Weather Web App providing hyper-local forecasts and dynamic atmospheric visualizations.",
    github: "https://github.com/OrionGD/GD-S-Web-Weather-Application",
    demo: "#"
  },
  {
    title: "GD Optimizer",
    category: "Web",
    tech: ["JavaScript", "Canvas", "HTML5"],
    description: "Client-side image optimization tool to enhance web loading speeds by reducing file sizes without quality loss.",
    github: "https://github.com/OrionGD/GDs-Image-Optimization",
    demo: "#"
  },
  {
    title: "SecurLink Checker",
    category: "Cybersecurity",
    tech: ["JavaScript", "Regex", "Security"],
    description: "Real-time password strength evaluator providing instant feedback on entropy and pattern vulnerabilities.",
    github: "https://github.com/OrionGD/Password-Strength_Checker",
    demo: "#"
  },
  {
    title: "Chrono-Stopwatch",
    category: "Web",
    tech: ["JavaScript", "DOM", "CSS"],
    description: "High-precision web stopwatch with lap management and specialized UI for performance monitoring.",
    github: "https://github.com/OrionGD/Chrono-Stopwatch",
    demo: "#"
  },
  {
    title: "Tactical Tic-Tac-Toe",
    category: "Web",
    tech: ["Logic", "JavaScript", "Animation"],
    description: "Strategic game implementation with multiple difficulty levels and a sleek glassmorphism interface.",
    github: "https://github.com/OrionGD/TicTacToe-Pro",
    demo: "#"
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Patent: Android TV Using Remote IR Sensor", year: "2024", description: "Innovative control mechanism for smart TVs using infrared signal processing." },
  { title: "Azure AI Engineer Associate (AI-102)", year: "Feb 2025", description: "Definitive proof of expertise in designing and implementing AI solutions—including natural language processing and computer vision—using Azure services." },
  { title: "Applied Generative AI Specialization", year: "Apr 2026", description: "Comprehensive mastery of modern Generative AI. Supported by advanced technical modules including Building LLM Applications, Generative AI Models and Architecture, and Generative AI Governance." }
];

export const GALLERY_IMAGES = [
  { src: getAssetUrl("/assets/CampusX.jpg"), alt: "Campus Experience", width: 1164, height: 655 },

  { src: getAssetUrl("/assets/Codeathon1.jpg"), alt: "Codeathon Session 1", width: 1280, height: 720 },
  { src: getAssetUrl("/assets/Codeathon2.jpg"), alt: "Codeathon Session 2", width: 1280, height: 720 },
  { src: getAssetUrl("/assets/Codeathon3.jpg"), alt: "Codeathon Session 3", width: 1280, height: 721 },
  { src: getAssetUrl("/assets/CodeSprintt.jpg"), alt: "Code Sprint Event", width: 3196, height: 1596 },

  { src: getAssetUrl("/assets/DreamGen.jpg"), alt: "DreamGen Innovation", width: 2448, height: 3264 },
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
