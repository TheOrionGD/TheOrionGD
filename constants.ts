import { Project, Experience, Education, SkillCategory, Certification } from './types';
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
  { title: "OASYS IT Hackathon – Best Performance", description: "Awarded for excellence in rapid prototyping and full-stack development." },
  { title: "National Science Day – 1st Prize", description: "Recognition for technical exhibition and innovative engineering solutions." }
];

export const GALLERY_IMAGES = [
  { src: "/assets/CampusX.jpg", alt: "Campus Experience", width: 1164, height: 655 },

  { src: "/assets/Codeathon1.jpg", alt: "Codeathon Session 1", width: 1280, height: 720 },
  { src: "/assets/Codeathon2.jpg", alt: "Codeathon Session 2", width: 1280, height: 720 },
  { src: "/assets/Codeathon3.jpg", alt: "Codeathon Session 3", width: 1280, height: 721 },
  { src: "/assets/CodeSprintt.jpg", alt: "Code Sprint Event", width: 3196, height: 1596 },

  { src: "/assets/DreamGen.jpg", alt: "DreamGen Innovation", width: 2448, height: 3264 },
  { src: "/assets/DreamGen 1.jpg", alt: "DreamGen Session 1", width: 1600, height: 721 },
  { src: "/assets/DreamGen 2.jpg", alt: "DreamGen Session 2", width: 1600, height: 721 },
  { src: "/assets/DreamGen 3.jpg", alt: "DreamGen Session 3", width: 4160, height: 3120 },
  { src: "/assets/DreamGen 4.jpg", alt: "DreamGen Session 4", width: 4096, height: 3072 },
  { src: "/assets/DREAMGEN 5.jpg", alt: "DreamGen Session 5", width: 960, height: 1280 },
  { src: "/assets/DREAMGEN0.jpg", alt: "DreamGen Special Session", width: 1600, height: 721 },

  { src: "/assets/EDC Workshop 1.jpg", alt: "EDC Workshop", width: 1280, height: 963 },

  { src: "/assets/ENTHUSIA 2.jpg", alt: "Enthusia Event", width: 1280, height: 591 },

  { src: "/assets/IV 2.jpg", alt: "Industrial Visit", width: 1600, height: 1200 },

  { src: "/assets/Jet Hackathon 2.jpg", alt: "Jet Hackathon", width: 4096, height: 3072 },

  { src: "/assets/MarchPast.jpg", alt: "March Past Event", width: 4160, height: 3120 },

  { src: "/assets/nSS cAMP 26.jpg", alt: "NSS Camp Activity", width: 4096, height: 3072 },

  { src: "/assets/Oyasys 2.jpg", alt: "Oyasys Event", width: 1271, height: 710 },

  { src: "/assets/Vdart1.jpg", alt: "VDart Internship", width: 4096, height: 2304 },

  { src: "/assets/XTIC.jpg", alt: "XTIC Event", width: 3264, height: 1836 },
  { src: "/assets/XTIC 1.jpg", alt: "XTIC Session 1", width: 3013, height: 1834 },
  { src: "/assets/XTIC 2.jpg", alt: "XTIC Session 2", width: 4096, height: 2304 },
  { src: "/assets/XTIC 3.jpg", alt: "XTIC Session 3", width: 2880, height: 2068 },
  { src: "/assets/XTIC 4.jpg", alt: "XTIC Session 4", width: 3072, height: 4096 },

  { src: "/assets/Yoga Workshop 1.jpg", alt: "Yoga Workshop 1", width: 1280, height: 960 },
  { src: "/assets/Yoga Workshop 2.jpg", alt: "Yoga Workshop 2", width: 1280, height: 960 },

  { src: "/assets/CLUB XR.jpg", alt: "XR Club", width: 4096, height: 3072 }
];