import { useState, useEffect } from 'react';
import { Project, Experience, Education, SkillCategory, Certification, CertificateFile, PersonalInfo, BotPersona, GalleryImage, MediaItem } from '../types';
import { FaGithub, FaLinkedin, FaHackerrank } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

import portfolioKnowledge from '../data/portfolio_knowledge.json';
import { SKILLS } from '../constants';

export interface PortfolioData {
  personalInfo: PersonalInfo | Record<string, never>;
  education: Education[];
  experience: Experience[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  certificateArchive: CertificateFile[];
  galleryImages: GalleryImage[];
  socialLinks: { icon: React.ComponentType; url: string; label: string }[];
  botPersona: BotPersona | Record<string, never>;
  media: MediaItem[];
}

export const getSocialLinks = (personalInfo: Partial<PersonalInfo>) => [
  { icon: FaGithub, url: personalInfo?.github || "", label: "GitHub" },
  { icon: FaLinkedin, url: personalInfo?.linkedin || "", label: "LinkedIn" },
  { icon: SiLeetcode, url: personalInfo?.leetcode || "", label: "LeetCode" },
  { icon: FaHackerrank, url: personalInfo?.hackerrank || "", label: "HackerRank" },
];

const fallbackDeveloper = (portfolioKnowledge.developer as unknown as PersonalInfo) || {};
const fallbackProjects = (portfolioKnowledge.projects as unknown as Project[]) || [];
const fallbackCertifications = (portfolioKnowledge.certifications as unknown as Certification[]) || [];

const defaultData: PortfolioData = {
  personalInfo: fallbackDeveloper,
  education: [],
  experience: [],
  skills: SKILLS,
  projects: fallbackProjects,
  certifications: fallbackCertifications,
  certificateArchive: [],
  galleryImages: [],
  socialLinks: getSocialLinks(fallbackDeveloper),
  botPersona: {},
  media: []
};

// Singleton cache to prevent multiple simultaneous requests across components
let globalDataCache: PortfolioData | null = null;
let globalFetchPromise: Promise<PortfolioData> | null = null;

export const setGlobalDataCache = (data: PortfolioData) => {
  globalDataCache = data;
};

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData>(globalDataCache || defaultData);
  const [loading, setLoading] = useState<boolean>(!globalDataCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (globalDataCache) {
      setData(globalDataCache);
      setLoading(false);
      return;
    }

    if (!globalFetchPromise) {
      globalFetchPromise = (async () => {
        try {
          const [projectsRes, galleryRes, mediaRes, siteRes] = await Promise.all([
            fetch('/api/public/projects'),
            fetch('/api/public/gallery'),
            fetch('/api/public/media'),
            fetch('/api/public/site')
          ]);

          if (!projectsRes.ok || !galleryRes.ok || !mediaRes.ok || !siteRes.ok) {
            throw new Error(`HTTP fetch failed`);
          }

          const [projects, gallery, media, site] = await Promise.all([
            projectsRes.json(),
            galleryRes.json(),
            mediaRes.json(),
            siteRes.json()
          ]);

          const validProjects = Array.isArray(projects) && projects.length > 0 ? projects : defaultData.projects;
          const validPersonalInfo = site.personalInfo && Object.keys(site.personalInfo).length > 0 ? site.personalInfo : defaultData.personalInfo;
          const validSkills = Array.isArray(site.skills) && site.skills.length > 0 ? site.skills : defaultData.skills;
          const validCertifications = Array.isArray(site.certifications) && site.certifications.length > 0 ? site.certifications : defaultData.certifications;

          const merged: PortfolioData = {
            personalInfo: validPersonalInfo,
            education: site.education || [],
            experience: site.experience || [],
            skills: validSkills,
            projects: validProjects,
            certifications: validCertifications,
            certificateArchive: site.certificateArchive || [],
            galleryImages: gallery || [],
            socialLinks: getSocialLinks(validPersonalInfo),
            botPersona: site.botPersona || {},
            media: media || []
          };

          globalDataCache = merged;
          return merged;
        } catch (err) {
          console.warn('[usePortfolioData] Error fetching CMS portfolio data:', err);
          return defaultData;
        } finally {
          globalFetchPromise = null;
        }
      })();
    }

    globalFetchPromise.then(res => {
      setData(res);
      setLoading(false);
    }).catch(() => {
      setData(defaultData);
      setLoading(false);
      setError('Failed to fetch live portfolio data');
    });
  }, []);

  return { data, loading, error };
};
