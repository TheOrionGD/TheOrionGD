/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import {
  VID_DESKTOP_1, VID_DESKTOP_2, VID_DESKTOP_3, VID_DESKTOP_4, VID_DESKTOP_5,
  VID_MOBILE_1, VID_MOBILE_2,
} from '../assets';

const SECTION_IDS = ['home', 'skills', 'coding-hub', 'projects', 'certifications', 'gallery', 'contact'];

interface BackgroundVideoProps {
  hidden?: boolean;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ hidden = false }) => {
  const { data } = usePortfolioData();
  const mediaList = data.media || [];

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  const findVideoUrl = (section: string, isMobileDevice: boolean) => {
    const deviceType = isMobileDevice ? 'mobile' : 'desktop';
    // Exact match section & deviceType
    let match = mediaList.find(
      (m: any) => m.type === 'video' &&
        m.metadata?.section === section &&
        m.metadata?.deviceType === deviceType
    );

    // Section fallbacks
    if (!match) {
      if (['projects', 'certifications', 'gallery'].includes(section)) {
        match = mediaList.find(
          (m: any) => m.type === 'video' &&
            m.metadata?.section === 'projects' &&
            m.metadata?.deviceType === deviceType
        );
      } else if (['skills', 'coding-hub'].includes(section)) {
        match = mediaList.find(
          (m: any) => m.type === 'video' &&
            m.metadata?.section === 'skills' &&
            m.metadata?.deviceType === deviceType
        );
      }
    }

    // Static imports ultimate safety fallback
    if (!match) {
      if (isMobileDevice) {
        return section === 'home' ? VID_MOBILE_1 : VID_MOBILE_2;
      } else {
        if (section === 'home') return VID_DESKTOP_1;
        if (['skills', 'coding-hub'].includes(section)) return VID_DESKTOP_3;
        if (section === 'contact') return VID_DESKTOP_5;
        return VID_DESKTOP_4;
      }
    }
    return match.secureUrl;
  };

  const [activeVideo, setActiveVideo] = useState(() => findVideoUrl('home', typeof window !== 'undefined' && window.innerWidth < 768));

  // Track intersection ratios for all sections persistently
  const intersectionRatiosRef = useRef<Record<string, number>>({});

  // 1. Detect mobile / desktop
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Reset to default video when breakpoint switches or media loads
  useEffect(() => {
    setActiveVideo(findVideoUrl('home', isMobile));
    intersectionRatiosRef.current = {};
  }, [isMobile, mediaList]);

  // 3. Track active section via IntersectionObserver
  useEffect(() => {
    intersectionRatiosRef.current = {};

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        intersectionRatiosRef.current[entry.target.id] =
          entry.isIntersecting ? entry.intersectionRatio : 0;
      });

      let maxRatio = 0;
      let activeId = '';
      for (const [id, ratio] of Object.entries(intersectionRatiosRef.current)) {
        if (ratio > maxRatio) { maxRatio = ratio; activeId = id; }
      }

      if (activeId) {
        setActiveVideo(findVideoUrl(activeId, isMobile));
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-25% 0px -25% 0px',
      threshold: [0, 0.1, 0.25, 0.5],
    });

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      SECTION_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [isMobile, mediaList]);

  const videoUrls = Array.from(new Set(
    SECTION_IDS.map(id => findVideoUrl(id, isMobile))
  ));

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      style={{
        opacity: hidden ? 0 : 1,
        transition: hidden ? 'none' : 'opacity 0.6s ease-in-out',
        transitionDelay: hidden ? '0s' : '0.6s',
      }}
    >
      {/* Light overlay — soft 65% opacity wash for gentle video intensity */}
      <div
        className="absolute inset-0 z-0 opacity-[0.65]"
        style={{ backgroundColor: '#EDEDED' }}
      />
      {/* Blur + slight scale */}
      <div className="absolute inset-0 w-full h-full" style={{ filter: 'blur(8px)', transform: 'scale(1.03)', transformOrigin: 'center' }}>
        {videoUrls.map(url => (
          <VideoLayer
            key={url}
            src={url}
            isActive={activeVideo === url}
          />
        ))}
      </div>
    </div>
  );
};

// ── VideoLayer ────────────────────────────────────────────────────────────────
interface VideoLayerProps {
  src: string;
  isActive: boolean;
}

const VideoLayer: React.FC<VideoLayerProps> = ({ src, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  // Start playback once the browser has enough data
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReadyAndPlay = () => {
      setReady(true);
      video.play().catch(err => {
        console.warn(`[BackgroundVideo] Autoplay blocked for ${src}:`, err.message);
      });
    };

    if (video.readyState >= 2) {
      markReadyAndPlay();
    } else {
      const onLoaded = () => {
        markReadyAndPlay();
      };
      video.addEventListener('canplay', onLoaded, { once: true });
      video.addEventListener('loadeddata', onLoaded, { once: true });
      return () => {
        video.removeEventListener('canplay', onLoaded);
        video.removeEventListener('loadeddata', onLoaded);
      };
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      onLoadedData={() => setReady(true)}
      onCanPlay={() => setReady(true)}
      className="absolute inset-0 w-full h-full object-cover"
      style={{
        opacity: isActive ? 0.35 : 0,
        transition: 'opacity 1.2s ease-in-out',
        willChange: 'opacity',
        filter: 'grayscale(100%)',
      }}
    />
  );
};
