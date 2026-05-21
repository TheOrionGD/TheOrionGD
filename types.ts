export interface Project {
  title: string;
  category: string;
  tech: string[];
  description: string;
  github?: string;
  demo?: string;
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
}