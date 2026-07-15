export interface Project {
  title: string;
  category: string;
  tech: string[];
  description: string;
  github?: string;
  demo?: string;
  problemStatement?: string;
  hook?: string;
  deliverables?: string[];
  specifications?: string[];
  coverImageId?: string | null;
  galleryImageIds?: string[];
  videoId?: string | null;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  details: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer?: string;
  year?: string;
  description?: string;
}

export interface CertificateFile {
  name: string;
  /** Primary file path (PDF or single image). For multi-page image sets use `pages`. */
  file: string;
  /** 'pdf' | 'image' – determines how the viewer renders the file */
  fileType?: 'pdf' | 'image';
  /** For multi-page image certs (e.g. pledge pages) provide all page paths here */
  pages?: string[];
  category: string;
  issuer: string;
  tag?: string;
  summary?: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  hackerrank?: string;
  leetcode?: string;
  profileImage?: string;
}

export interface BotPersona {
  botName: string;
  avatarSourceType?: string;
  avatarModelUrl?: string;
  brandLogoSourceUrl?: string;
  greeting: string;
  systemPrompt: string;
  speakingStyle?: {
    tone?: string;
    sentenceRhythm?: string;
    signaturePhrases?: string[];
    sampleResponses?: { prompt: string; response: string }[];
    avoid?: string[];
  };
  idleAnimations?: string[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  order?: number;
}

export interface MediaItem {
  type: string;
  provider: string;
  publicId: string;
  secureUrl: string;
  size?: number;
  duration?: number;
  metadata?: Record<string, unknown>;
  createdAt?: string;
}