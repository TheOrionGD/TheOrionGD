import React, { useEffect, useState } from 'react';
import { Project, GalleryImage, MediaItem } from '../types';
import { motion } from 'framer-motion';
import { setGlobalDataCache, getSocialLinks, PortfolioData } from '../hooks/usePortfolioData';

interface LoaderProps {
  onComplete: () => void;
}

const STATUS_MESSAGES = [
  "CONNECTING TO DATABASE...",
  "INITIALIZING API LOADERS...",
  "PRELOADING BRAND PORTRAIT & COVER IMAGES...",
  "BUFFERING BACKGROUND SYSTEM VIDEOS...",
  "VERIFYING ENGINE READINESS...",
  "SYSTEM ACTIVE // RENDERING SITE"
];

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let totalAssets = 5; // 4 APIs + 1 Fonts initially
    let loadedAssets = 0;

    const updateProgress = () => {
      loadedAssets++;
      const currentProgress = Math.min(100, Math.round((loadedAssets / totalAssets) * 100));
      setProgress(currentProgress);

      // Map progress to status messages
      if (currentProgress < 15) setStatusIndex(0);
      else if (currentProgress < 30) setStatusIndex(1);
      else if (currentProgress < 60) setStatusIndex(2);
      else if (currentProgress < 85) setStatusIndex(3);
      else if (currentProgress < 98) setStatusIndex(4);
      else setStatusIndex(5);
    };

    const preloadImage = (url: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          updateProgress();
          resolve();
        };
        img.onerror = () => {
          updateProgress(); // fail gracefully
          resolve();
        };
      });
    };

    const preloadVideo = (url: string): Promise<void> => {
      return new Promise((resolve) => {
        const video = document.createElement('video');
        video.src = url;
        video.preload = 'auto';
        video.muted = true;

        const onCanPlay = () => {
          cleanup();
          updateProgress();
          resolve();
        };
        const onError = () => {
          cleanup();
          updateProgress(); // fail gracefully
          resolve();
        };
        const cleanup = () => {
          video.removeEventListener('canplay', onCanPlay);
          video.removeEventListener('error', onError);
        };

        video.addEventListener('canplay', onCanPlay);
        video.addEventListener('error', onError);
        video.load();
      });
    };

    const runPreloadPipeline = async () => {
      try {
        // 1. API Loader - Fetch database resources in parallel
        const apiRequests = [
          fetch('/api/public/site'),
          fetch('/api/public/projects'),
          fetch('/api/public/gallery'),
          fetch('/api/public/media')
        ];

        const [siteRes, projectsRes, galleryRes, mediaRes] = await Promise.all(
          apiRequests.map(async (req) => {
            const res = await req;
            updateProgress(); // increment for each API response
            if (!res.ok) throw new Error(`API fetch error`);
            return res.json();
          })
        );

        // 2. Map and Merge Portfolio Data
        const portfolioData: PortfolioData = {
          personalInfo: siteRes.personalInfo || {},
          education: siteRes.education || [],
          experience: siteRes.experience || [],
          skills: siteRes.skills || [],
          projects: projectsRes || [],
          certifications: siteRes.certifications || [],
          certificateArchive: siteRes.certificateArchive || [],
          galleryImages: galleryRes || [],
          socialLinks: getSocialLinks(siteRes.personalInfo),
          botPersona: siteRes.botPersona || {},
          media: mediaRes || []
        };

        // Cache the loaded data immediately so usePortfolioData reads it without re-fetching
        setGlobalDataCache(portfolioData);

        // 3. Extract assets for preloading
        const imageUrls: string[] = [];
        if (portfolioData.personalInfo?.profileImage) {
          imageUrls.push(portfolioData.personalInfo.profileImage);
        }

        // Add project cover images
        portfolioData.projects.forEach((proj: Project) => {
          if (proj.coverImageId) {
            imageUrls.push(`/api/public/gallery/image/${proj.coverImageId}`);
          }
        });

        // Add gallery images
        portfolioData.galleryImages.forEach((img: GalleryImage) => {
          if (img.src) {
            imageUrls.push(img.src);
          }
        });

        // Add background videos from media collection
        const videoUrls = portfolioData.media
          .filter((item: MediaItem) => item.type === 'video' && item.secureUrl)
          .map((item: MediaItem) => item.secureUrl);

        // 4. Update total asset count
        totalAssets = 4 + 1 + imageUrls.length + videoUrls.length;

        // 5. Preload all assets in parallel
        const imagePreloadPromises = imageUrls.map(url => preloadImage(url));
        const videoPreloadPromises = videoUrls.map(url => preloadVideo(url));

        // 6. Font Loader
        const fontPromise = (async () => {
          try {
            await document.fonts.ready;
          } catch (e) {
            console.warn('Font preloading failed:', e);
          } finally {
            updateProgress(); // increment for fonts
          }
        })();

        // Wait for all preloads to complete
        await Promise.all([
          ...imagePreloadPromises,
          ...videoPreloadPromises,
          fontPromise
        ]);

        // Finish up loader
        setTimeout(() => {
          document.body.style.overflow = '';
          onComplete();
        }, 600);

      } catch (err) {
        console.error('[Loader Pipeline] Error preloading portfolio assets:', err);
        // Fail gracefully: complete loader so user can see page even if DB/Assets fail
        setTimeout(() => {
          document.body.style.overflow = '';
          onComplete();
        }, 500);
      }
    };

    runPreloadPipeline();

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#EDEDED' }}
    >
      <div className="w-full max-w-lg px-8 sm:px-12">
        
        {/* Sleek Terminal Progress Bar with Brackets */}
        <div className="relative w-full h-[18px] flex items-center px-1">
          {/* Left Bracket [ */}
          <div className="absolute left-0 top-0 bottom-0 w-2.5 border-t border-b border-l border-[#2E2E2E] pointer-events-none" />
          
          {/* Right Bracket ] */}
          <div className="absolute right-0 top-0 bottom-0 w-2.5 border-t border-b border-r border-[#2E2E2E] pointer-events-none" />
          
          {/* Progress bar track & filling */}
          <div className="w-full h-full p-[2px] flex items-center bg-[#E5E5E5]/30">
            <motion.div
              className="h-full"
              style={{
                width: `${progress}%`,
                backgroundImage: 'repeating-linear-gradient(45deg, #2E2E2E, #2E2E2E 3px, transparent 3px, transparent 7px)',
                backgroundSize: '10px 10px',
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.05 }}
            />
          </div>
        </div>

        {/* Labels Row: LOADING text and Progress Number */}
        <div className="flex justify-between items-center mt-3 text-xs font-mono uppercase tracking-wider text-black select-none">
          <span className="font-bold flex items-center gap-1.5">
            LOADING<span className="animate-pulse">▍</span>
          </span>
          <span className="font-bold">
            {Math.round(progress)} / 100
          </span>
        </div>

        {/* Dynamic status line beneath progress stats */}
        <div className="mt-3 text-[9px] font-mono uppercase tracking-widest text-black/60 text-left select-none">
          SYSTEM // {STATUS_MESSAGES[statusIndex]}
        </div>

      </div>
    </motion.div>
  );
};

export default Loader;
