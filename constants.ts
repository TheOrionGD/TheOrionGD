/**
 * Returns a root-relative URL for a GridFS asset.
 * Assets are served by the embedded Vite plugin at /assets/* on the same
 * origin — no separate backend or absolute URL required.
 */
export const getAssetUrl = (path: string): string => path;

import { Project, Experience, Education, SkillCategory, Certification, CertificateFile, GalleryImage } from './types';
import { FaGithub, FaLinkedin, FaHackerrank } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export const PERSONAL_INFO = {
  name: "",
  role: "",
  tagline: "",
  email: "",
  phone: "",
  location: "",
  github: "",
  linkedin: "",
  hackerrank: "",
  leetcode: "",
  profileImage: "/godfrey_portrait.png"
};

export const SOCIAL_LINKS = [
  { icon: FaGithub, url: PERSONAL_INFO.github, label: "GitHub" },
  { icon: FaLinkedin, url: PERSONAL_INFO.linkedin, label: "LinkedIn" },
  { icon: SiLeetcode, url: PERSONAL_INFO.leetcode, label: "LeetCode" },
  { icon: FaHackerrank, url: PERSONAL_INFO.hackerrank, label: "HackerRank" },
];

export const EDUCATION: Education[] = [];

export const EXPERIENCE: Experience[] = [];

export const SKILLS: SkillCategory[] = [
  {
    category: "Full Stack Engineering",
    skills: ["TypeScript", "React", "Node.js", "Next.js", "PostgreSQL", "Docker", "REST / tRPC"]
  },
  {
    category: "AI & Intelligent Systems",
    skills: ["Google ADK 2.0", "FastMCP", "PyTorch", "Vector RAG", "Whisper STT", "FAISS", "BioBERT"]
  },
  {
    category: "Cybersecurity & Systems",
    skills: ["Zero-Trust MAS", "Snort 3 IDS", "SIEM / SOAR", "NetworkX", "Npcap", "Isolation Forest"]
  },
  {
    category: "Interactive & Creative Tech",
    skills: ["ARCore", "Sceneview", "Three.js", "WebGL", "Unity", "Jetpack Compose", "Spatial UI"]
  },
  {
    category: "Areas of Interest",
    skills: ["Applied ML", "Spatial Computing & XR", "AI Agent Workflows", "CyberSecurity", "Framework Optimization"]
  }
];

export const LEADERSHIP_XR = [
  "XR Club Vice President",
  "Software Bootcamp Facilitator",
  "Mentoring Juniors",
  "Active NSS Volunteer",
  "Events Coordination"
];

export const PROJECTS: Project[] = [];

export const CERTIFICATIONS: Certification[] = [];

export const GALLERY_IMAGES: GalleryImage[] = [];

export const CERTIFICATE_ARCHIVE: CertificateFile[] = [];
