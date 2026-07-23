import { z } from 'zod';

// Simple HTML/script sanitization helper
export function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '');
}

export function sanitizeData(data) {
  if (typeof data === 'string') {
    return sanitizeString(data);
  }
  if (Array.isArray(data)) {
    return data.map(item => sanitizeData(item));
  }
  if (data !== null && typeof data === 'object') {
    const cleaned = {};
    for (const [key, value] of Object.entries(data)) {
      cleaned[key] = sanitizeData(value);
    }
    return cleaned;
  }
  return data;
}

export const PersonalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  tagline: z.string().min(1, "Tagline is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().min(1, "Location is required"),
  github: z.string().url("Invalid GitHub URL"),
  linkedin: z.string().url("Invalid LinkedIn URL"),
  hackerrank: z.string().optional().default(""),
  leetcode: z.string().optional().default(""),
  profileImage: z.string().optional().default("https://res.cloudinary.com/dhpwd7uta/image/upload/v1784111251/IMG_20260410_185513_oamxwl.png"),
  updatedAt: z.any().optional(),
});

export const EducationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  period: z.string().min(1, "Period is required"),
  order: z.number().optional().default(1),
});

export const ExperienceSchema = z.object({
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  period: z.string().min(1, "Period is required"),
  details: z.array(z.string()).min(1, "At least one detail is required"),
  order: z.number().optional().default(1),
});

export const SkillsSchema = z.object({
  category: z.string().min(1, "Category is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  order: z.number().optional().default(1),
});

export const ProjectsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  tech: z.array(z.string()).min(1, "At least one tech tag is required"),
  technologies: z.array(z.string()).min(1, "At least one tech tag is required"),
  coverImageId: z.string().nullable().optional().default(null),
  galleryImageIds: z.array(z.string()).optional().default([]),
  videoId: z.string().nullable().optional().default(null),
  status: z.string().min(1, "Status is required").default("published"),
  featured: z.boolean().optional().default(false),
  github: z.string().optional().default(""),
  demo: z.string().optional().default(""),
  problemStatement: z.string().optional().default(""),
  deliverables: z.array(z.string()).optional().default([]),
  hook: z.string().optional().default(""),
  order: z.number().optional().default(1),
  createdAt: z.any().optional(),
  updatedAt: z.any().optional(),
});

export const CertificationsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z.string().min(1, "Year/Period is required"),
  description: z.string().optional().default(""),
  order: z.number().optional().default(1),
});

export const CertificateArchiveSchema = z.object({
  name: z.string().min(1, "Certificate name is required"),
  file: z.string().min(1, "File path/URL is required"),
  fileType: z.string().optional().default("pdf"),
  category: z.string().min(1, "Category is required"),
  issuer: z.string().min(1, "Issuer is required"),
  tag: z.string().optional().default(""),
  summary: z.string().optional().default(""),
});

export const GalleryImagesSchema = z.object({
  src: z.string().min(1, "Image source path is required"),
  alt: z.string().min(1, "Alt text is required"),
  width: z.number().optional().default(1920),
  height: z.number().optional().default(1080),
  order: z.number().optional().default(1),
});

// Binary representation Zod schema
export const GallerySchema = z.object({
  title: z.string().min(1, "Title is required"),
  imageBinary: z.any(), // Serves as raw Binary data type
  mimeType: z.string().min(1, "Mime type is required"),
  alt: z.string().min(1, "Alt text is required"),
  order: z.number().optional().default(1),
  createdAt: z.any().optional(),
});

export const MediaSchema = z.object({
  type: z.string().min(1, "Type is required"),
  provider: z.string().min(1, "Provider is required"),
  publicId: z.string().min(1, "Public ID is required"),
  secureUrl: z.string().url("Invalid secure URL"),
  size: z.number().optional().default(0),
  duration: z.number().optional().default(0),
  metadata: z.record(z.any()).optional().default({}),
  createdAt: z.any().optional(),
});

export const BotPersonaSchema = z.object({
  botName: z.string().min(1, "Bot name is required"),
  avatarSourceType: z.string().optional().default("brand_logo"),
  avatarModelUrl: z.string().optional().default("/assets/models/oriongd-brand-avatar.glb"),
  brandLogoSourceUrl: z.string().optional().default("/assets/brand/oriongd-logo.svg"),
  greeting: z.string().min(1, "Greeting is required"),
  systemPrompt: z.string().min(1, "System prompt is required"),
  speakingStyle: z.object({
    tone: z.string().optional().default("confident, direct, slightly informal"),
    sentenceRhythm: z.string().optional().default("short declarative sentences"),
    signaturePhrases: z.array(z.string()).optional().default([]),
    sampleResponses: z.array(z.object({
      prompt: z.string(),
      response: z.string(),
    })).optional().default([]),
    avoid: z.array(z.string()).optional().default([]),
  }).optional().default({}),
  idleAnimations: z.array(z.string()).optional().default(["breathing", "look_around", "wave"]),
  updatedAt: z.any().optional(),
});

export const LeadKeywordsConfigSchema = z.object({
  keywords: z.array(z.string()).min(1, "At least one keyword is required"),
  updatedAt: z.any().optional(),
});

export const CollectionSchemas = {
  personal_info: PersonalInfoSchema,
  education: EducationSchema,
  experience: ExperienceSchema,
  skills: SkillsSchema,
  projects: ProjectsSchema,
  certifications: CertificationsSchema,
  certificate_archive: CertificateArchiveSchema,
  gallery_images: GalleryImagesSchema,
  gallery: GallerySchema,
  media: MediaSchema,
  bot_persona: BotPersonaSchema,
  lead_keywords_config: LeadKeywordsConfigSchema,
};

export function validateSchema(collectionName, data) {
  const schema = CollectionSchemas[collectionName];
  if (!schema) {
    throw new Error(`No validation schema defined for collection: ${collectionName}`);
  }
  const sanitized = sanitizeData(data);
  return schema.parse(sanitized);
}
