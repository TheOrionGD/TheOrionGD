/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_IMAGES } from '../constants';
import { usePortfolioData } from '../hooks/usePortfolioData';
import {
  FaTrophy, FaCode, FaChevronLeft, FaChevronRight, FaPlay, FaPause
} from 'react-icons/fa';

// Helper to get circular distance in infinite loop
const getCircularDistance = (idx: number, active: number, len: number) => {
  let diff = idx - active;
  while (diff < -len / 2) diff += len;
  while (diff > len / 2) diff -= len;
  return diff;
};

const Hackathons: FC = () => {
  const { data } = usePortfolioData();
  const galleryList = data.galleryImages || GALLERY_IMAGES;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [screenWidth, setScreenWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200);

  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileScreen = screenWidth < 768;
  const isTinyScreen = screenWidth < 480;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    touchStartXRef.current = null;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const encodeUrl = (src: string) => src.replace(/ /g, '%20');

  // Metadata describing each exhibit
  const imageInfo = [
    { title: "Campus Tech Labs", desc: "Collaborating with fellow engineers on prototype development." },
    { title: "Codeathon Innovation 1.0", desc: "Assembling secure API pathways under a 24-hour sprint." },
    { title: "Systems Debugging Run", desc: "Deploying local compiler matrices and testing socket feeds." },
    { title: "Final Stage Review", desc: "Demonstrating automated quarantine sequences to project evaluators." },
    { title: "Regional Code Sprint", desc: "Achieving design benchmarks for systems security modules." },
    { title: "DreamGen AI Workshop", desc: "Configuring multi-agent pipeline weights and prompting runs." },
    { title: "Generative Model Demo", desc: "Presenting containerized models to technical audiences." },
    { title: "Graph Theory Correlator", desc: "Evaluating NetworkX attack path visualization libraries." },
    { title: "Telemetry Audit Testing", desc: "Verifying event log persistence checks under packet loads." },
    { title: "LLM Agent Verification", desc: "Running local benchmark tests on offline systems models." },
    { title: "Kernel Policy Showcase", desc: "Demonstrating socket filters on virtualization environments." },
    { title: "EDC Team Briefing", desc: "Whiteboarding security topologies with system architects." },
  ];

  const getInfo = (idx: number) => {
    if (!imageInfo || imageInfo.length === 0) {
      return { title: "Campus Tech Labs", desc: "Collaborating with fellow engineers on prototype development." };
    }
    const safeIdx = ((Math.floor(idx) % imageInfo.length) + imageInfo.length) % imageInfo.length;
    return imageInfo[safeIdx] || imageInfo[0];
  };

  const handleNext = useCallback(() => {
    if (!galleryList.length) return;
    setActiveIndex((prev) => (prev + 1) % galleryList.length);
  }, [galleryList.length]);

  const handlePrev = useCallback(() => {
    if (!galleryList.length) return;
    setActiveIndex((prev) => ((prev - 1) % galleryList.length + galleryList.length) % galleryList.length);
  }, [galleryList.length]);

  // Autoplay handler
  useEffect(() => {
    if (isPlaying && galleryList.length > 0) {
      const timer = setInterval(() => {
        handleNext();
      }, 3500);
      return () => clearInterval(timer);
    }
  }, [isPlaying, handleNext, galleryList.length]);

  const activeInfo = getInfo(activeIndex);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-transparent relative overflow-hidden text-black border-y border-[#D3D3D3]">

      {/* Subtle Grid Background (same as Hero Section) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] select-none"
        style={{
          backgroundImage: 'radial-gradient(#2E2E2E 1px, transparent 0), radial-gradient(#2E2E2E 1px, transparent 0)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      />

      {/* Subtle Soft Glow Gradient (same as Hero Section) */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#B87333] to-[#7B3F00] opacity-[0.05] blur-[100px] pointer-events-none select-none" />

      <div className="container mx-auto px-5 sm:px-6 mb-10 md:mb-16 text-center max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 font-section-label text-xs sm:text-[13px] font-semibold tracking-[0.08em] uppercase mb-4 glass-badge">
            <FaTrophy className="animate-pulse" /> Section 06 // Field Log
          </div>
        </motion.div>
      </div>

      {/* 3D Coverflow Showcase */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full py-8 md:py-16 overflow-hidden flex flex-col items-center justify-center select-none min-h-[420px] md:min-h-[560px]"
      >

        {/* Dynamic Title and Description */}
        <div className="text-center mb-8 md:mb-10 max-w-xl px-5 sm:px-6 relative z-20 min-h-[70px] sm:min-h-[80px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-card-title text-xl sm:text-2xl font-bold tracking-[-0.03em] text-black mb-1.5 sm:mb-2 uppercase">
                {activeInfo?.title || "Field Log"}
              </h3>
              <p className="font-body-text text-xs sm:text-sm md:text-base text-black leading-[1.65]">
                {activeInfo?.desc || ""}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3D Perspective Viewport */}
        <div
          className="relative w-full max-w-4xl h-[200px] sm:h-[240px] md:h-[300px] flex items-center justify-center overflow-visible"
          style={{ perspective: isTinyScreen ? '700px' : '1200px', transformStyle: 'preserve-3d' }}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 md:left-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#D3D3D3] bg-[#EDEDED]/90 hover:bg-[#EDEDED] flex items-center justify-center text-black hover:text-black hover:border-[#B87333] transition-all z-30 focus:outline-none cursor-pointer shadow-sm active:scale-90"
            aria-label="Previous photograph"
          >
            <FaChevronLeft size={12} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 md:right-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#D3D3D3] bg-[#EDEDED]/90 hover:bg-[#EDEDED] flex items-center justify-center text-black hover:text-black hover:border-[#B87333] transition-all z-30 focus:outline-none cursor-pointer shadow-sm active:scale-90"
            aria-label="Next photograph"
          >
            <FaChevronRight size={12} />
          </button>

          {/* Flowing Images */}
          <div className="relative w-40 h-52 sm:w-52 sm:h-64 md:w-[20rem] md:h-80 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {galleryList.map((img, index) => {
              const distance = getCircularDistance(index, activeIndex, galleryList.length);
              const absDistance = Math.abs(distance);
              const maxVisible = isTinyScreen ? 1 : isMobileScreen ? 2 : 3;
              const isVisible = absDistance <= maxVisible;

              if (!isVisible) return null;

              const zIndex = 100 - absDistance;
              const rotateY = distance * (isTinyScreen ? -22 : -30);
              const translateX = distance * (isTinyScreen ? 45 : isMobileScreen ? 68 : 130);
              const translateZ = -absDistance * (isTinyScreen ? 60 : 90);
              const scale = 1 - absDistance * (isTinyScreen ? 0.15 : 0.12);
              const opacity = 1 - absDistance * (isTinyScreen ? 0.45 : 0.28);

              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="absolute inset-0 cursor-pointer overflow-visible transition-all duration-500"
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Image Container */}
                  <div className="w-full h-full rounded-2xl overflow-hidden glow-border-container shadow-md relative">
                    <div className="glow-border-content bg-[#EDEDED] overflow-hidden rounded-[calc(2rem-1.5px)] w-full h-full">
                      <img
                        src={encodeUrl(img.src)}
                        alt={img.alt}
                        loading="lazy"
                        draggable={false}
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* 3D Mirror Reflection under the image (fading to light background) */}
                  <div
                    className="absolute top-[100%] left-0 right-0 h-1/2 opacity-30 pointer-events-none overflow-hidden scale-y-[-1] blur-[0.5px]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <img
                      src={encodeUrl(img.src)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to bottom, transparent 15%, #EDEDED 95%)'
                      }}
                    />
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Play/Pause Control */}
        <div className="mt-14 relative z-20">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full border border-[#D3D3D3] bg-[#EDEDED]/90 hover:bg-[#EDEDED] flex items-center justify-center text-black hover:text-black hover:border-[#B87333] transition-all cursor-pointer focus:outline-none shadow-sm"
          >
            {isPlaying ? <FaPause size={10} /> : <FaPlay size={10} className="ml-0.5" />}
          </button>
        </div>

        {/* Indicators Dots */}
        <div className="mt-6 flex gap-2 relative z-20">
          {galleryList.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeIndex === index
                  ? 'bg-[#B87333] w-4'
                  : 'bg-[#D3D3D3] hover:bg-[#3A3A3A]'
                }`}
            />
          ))}
        </div>

      </div>

    </section>
  );
};

export default Hackathons;
