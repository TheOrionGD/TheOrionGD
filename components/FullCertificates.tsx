/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useMemo, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CERTIFICATE_ARCHIVE } from '../constants';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { VID_MOBILE_2, VID_DESKTOP_2 } from '../assets';
import {
  FaArrowLeft, FaEye, FaTimes,
  FaFileAlt, FaImage, FaChevronLeft, FaChevronRight, FaPlay, FaPause,
} from 'react-icons/fa';

// ── Colour maps ──────────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  'Core Professional':   'from-[#EDEDED]/60 to-[#D3D3D3]/30 border-[#D3D3D3] text-black',
  'AI & Generative AI':  'from-[#B87333]/30 to-[#7B3F00]/10 border-[#B87333]/50 text-black',
  'Microsoft':           'from-[#D3D3D3]/50 to-[#EDEDED]/30 border-[#D3D3D3] text-black',
  'Internship':          'from-[#EDEDED]/70 to-[#D3D3D3]/40 border-[#D3D3D3] text-black',
  'Design & Development':'from-[#B87333]/40 to-[#7B3F00]/15 border-[#B87333]/60 text-black',
  'Great Learning':      'from-[#EDEDED]/50 to-[#B87333]/20 border-[#D3D3D3] text-black',
  'Technical Skills':    'from-[#7B3F00]/20 to-[#B87333]/10 border-[#7B3F00]/40 text-black',
  'Academic (NPTEL)':    'from-[#D3D3D3]/60 to-[#EDEDED]/30 border-[#D3D3D3] text-black',
  'Workshops':           'from-[#EDEDED]/60 to-[#D3D3D3]/30 border-[#D3D3D3] text-black',
  'Learnathon':          'from-[#B87333]/30 to-[#D3D3D3]/30 border-[#B87333]/50 text-black',
  'Awards & Events':     'from-[#7B3F00]/25 to-[#B87333]/15 border-[#7B3F00]/50 text-black',
  'NSS & Civic':         'from-[#EDEDED]/80 to-[#D3D3D3]/50 border-[#D3D3D3] text-black',
  'Patent':              'from-[#D3D3D3]/60 to-[#B87333]/20 border-[#D3D3D3] text-black',
  'Academic':            'from-[#EDEDED]/60 to-[#D3D3D3]/30 border-[#D3D3D3] text-black',
};

const TAG_COLORS: Record<string, string> = {
  'Top Credential': 'bg-[#7B3F00] text-white border-[#7B3F00]',
  'Specialization': 'bg-[#B87333]/40 text-black border-[#B87333]',
  'Verified':       'bg-[#D3D3D3] text-black border-[#D3D3D3]',
  'Winner':         'bg-[#7B3F00] text-white border-[#7B3F00]',
  'Hackathon':      'bg-[#B87333]/40 text-black border-[#B87333]',
  'Innovation':     'bg-[#D3D3D3] text-black border-[#D3D3D3]',
  'Full Stack':     'bg-[#EDEDED] text-black border-[#D3D3D3]',
  'Web Dev':        'bg-[#D3D3D3] text-black border-[#D3D3D3]',
  'Cyber Security': 'bg-[#B87333]/40 text-black border-[#B87333]',
  'UI/UX':          'bg-[#EDEDED] text-black border-[#D3D3D3]',
  'AI Foundations': 'bg-[#B87333]/40 text-black border-[#B87333]',
  'Civic Pledge':   'bg-[#D3D3D3] text-black border-[#D3D3D3]',
};

// ── Issuer Logo Map (Hunter.io Logo API for brand icons) ─────────────────────
const ISSUER_LOGOS: Record<string, string> = {
  'Microsoft':       'https://logos.hunter.io/microsoft.com',
  'Coursera':        'https://logos.hunter.io/coursera.org',
  'HackerRank':      'https://logos.hunter.io/hackerrank.com',
  'NPTEL':           'https://logos.hunter.io/nptel.ac.in',
  'MATLAB':          'https://logos.hunter.io/mathworks.com',
  'Simplilearn':     'https://logos.hunter.io/simplilearn.com',
  'MongoDB':         'https://logos.hunter.io/mongodb.com',
  'UiPath':          'https://logos.hunter.io/uipath.com',
  'HP LIFE':         'https://logos.hunter.io/hp.com',
  'Celonis':         'https://logos.hunter.io/celonis.com',
  'NSS':             'https://logos.hunter.io/nss.gov.in',
  'My Bharat':       'https://logos.hunter.io/mybharat.gov.in',
  'Patent Office':   'https://logos.hunter.io/ipindia.gov.in',
  'Adaovi':          'https://logos.hunter.io/adaovi.com',
  'Prodigy InfoTech':'https://logos.hunter.io/prodigyinfotech.in',
  'SkillCraft Tech': 'https://logos.hunter.io/skillcrafttech.in',
  'VDart Academy':   'https://logos.hunter.io/vdart.com',
  'Great Learning':  'https://logos.hunter.io/mygreatlearning.com',
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const encodePath = (p: string) =>
  p.replace(/ /g, '%20').replace(/&/g, '%26').replace(/,/g, '%2C');

const isImageFile = (path: string) => /\.(png|jpe?g|gif|webp|svg)$/i.test(path);

// ── Modal state type ─────────────────────────────────────────────────────────
interface ModalState {
  name: string;
  file: string;
  fileType: 'pdf' | 'image';
  pages: string[];   // empty = single page / PDF
  pageIndex: number;
  summary?: string;
}

// ── Hover prefetch ────────────────────────────────────────────────────────────
// Fires a silent background fetch the moment the cursor enters a card.
// The Vite plugin sets Cache-Control: public, max-age=3600 on all /assets/*
// responses, so by the time the user clicks "View" (~200ms later) the file is
// already in the browser's HTTP cache → zero cold-stream latency.
const prefetched = new Set<string>();

const prefetchFile = (url: string) => {
  const encoded = encodePath(url);
  if (prefetched.has(encoded)) return;   // already cached — skip
  prefetched.add(encoded);
  // fetch() with low priority so it never competes with page resources
  fetch(encoded, { priority: 'low' } as RequestInit).catch(() => {
    prefetched.delete(encoded);           // allow retry on transient error
  });
};

// ── Helper: circular coverflow distance ─────────────────────────────────────
const getCircularDistance = (idx: number, active: number, len: number) => {
  let diff = idx - active;
  while (diff < -len / 2) diff += len;
  while (diff > len / 2) diff -= len;
  return diff;
};

// ── Component ────────────────────────────────────────────────────────────────
const FullCertificates: FC = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { data } = usePortfolioData();
  const archiveList = data.certificateArchive || CERTIFICATE_ARCHIVE;
  const displayArchive = archiveList;

  const [modal, setModal] = useState<ModalState | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Coverflow state
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filtered = displayArchive;

  const handleNext = useCallback(() => {
    setActiveIndex(prev => filtered.length > 0 ? (prev + 1) % filtered.length : 0);
  }, [filtered.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex(prev => filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0);
  }, [filtered.length]);

  useEffect(() => {
    if (isPlaying && filtered.length > 1) {
      const t = setInterval(handleNext, 3500);
      return () => clearInterval(t);
    }
  }, [isPlaying, handleNext, filtered.length]);

  // Close modal on Escape key
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModal(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal]);

  // Open viewer directly from carousel active card
  const openViewer = (index: number) => {
    const cert = filtered[index];
    if (!cert) return;
    const pages = cert.pages ?? [];
    const fileType = cert.fileType ?? (isImageFile(cert.file) ? 'image' : 'pdf');
    setModal({ name: cert.name, file: cert.file, fileType, pages, pageIndex: 0, summary: cert.summary });
  };

  const closeViewer = () => setModal(null);

  const prevPage = () =>
    setModal(m => m && m.pages.length > 0
      ? { ...m, pageIndex: (m.pageIndex - 1 + m.pages.length) % m.pages.length }
      : m);

  const nextPage = () =>
    setModal(m => m && m.pages.length > 0
      ? { ...m, pageIndex: (m.pageIndex + 1) % m.pages.length }
      : m);

  const currentPageUrl = modal
    ? encodePath(modal.pages.length > 0 ? modal.pages[modal.pageIndex] : modal.file)
    : '';

  const activeCert = filtered[activeIndex];

  return (
    <div className="min-h-screen text-text-primary selection:bg-accent/30 selection:text-accent relative z-10">

      {/* ── Background Video (Video 2) ── */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Light overlay so content stays legible */}
        <div className="absolute inset-0 z-10 opacity-80" style={{ backgroundColor: '#EDEDED' }} />
        {/* Crisp video backdrop */}
        <div className="absolute inset-0 w-full h-full">
          <video
            key={isMobile ? 'mobile' : 'desktop'}
            src={isMobile ? VID_MOBILE_2 : VID_DESKTOP_2}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>


      {/* ── Floating Back Button (bottom-left) ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-8 left-6 z-50"
      >
        <Link
          to="/"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#EDEDED] text-text-secondary hover:text-black transition-all duration-300 shadow-[4px_4px_8px_#DCDCDC,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#DCDCDC,inset_-2px_-2px_4px_#ffffff] backdrop-blur-md pointer-events-auto"
        >
          <FaArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-bold text-[10px] uppercase tracking-widest hidden sm:inline">Back</span>
        </Link>
      </motion.div>

      {/* ── Page Content ── */}
      <div className="container mx-auto px-6 pt-10 pb-32 relative z-10">


        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-text-secondary"
          >
            <FaFileAlt className="mx-auto text-4xl mb-4 opacity-20" />
            <p className="text-sm font-black uppercase tracking-widest">No certificates match your search.</p>
          </motion.div>
        ) : (
          <>
            {/* ── Active Certificate Details Panel ─────────────────────────── */}
            <AnimatePresence mode="wait">
              {activeCert && (
                <motion.div
                  key={activeCert.file}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#EDEDED] rounded-3xl p-6 md:p-8 shadow-[8px_8px_16px_#DCDCDC,-8px_-8px_16px_#ffffff] mb-8"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Left: cert info */}
                    <div className="flex-1 min-w-0">
                      {/* Issuer + tag */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[9px] font-black uppercase tracking-widest text-black opacity-80">{activeCert.issuer}</span>
                        {activeCert.tag && (
                          <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full glass-badge">
                            {activeCert.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-text-primary tracking-tight mb-2">{activeCert.name}</h3>
                      <span className="inline-block text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full glass-badge mb-4">
                        {activeCert.category}
                      </span>
                      {activeCert.summary && (
                        <p className="text-xs leading-relaxed text-text-secondary border-l-2 border-[#B87333]/40 pl-3">
                          {activeCert.summary}
                        </p>
                      )}
                    </div>

                    {/* Right: View button + Provider logo */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-4">
                      <button
                        onClick={() => openViewer(activeIndex)}
                        className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#EDEDED] text-black font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[4px_4px_8px_#DCDCDC,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#DCDCDC,inset_-2px_-2px_4px_#ffffff] active:scale-95 w-full justify-center"
                      >
                        <FaEye size={12} /> View Certificate
                      </button>

                      {/* Issuer / Provider Logo */}
                      <div className="w-full flex flex-col items-center gap-2 pt-1">
                        {ISSUER_LOGOS[activeCert.issuer] ? (
                          <div className="w-full flex flex-col items-center gap-1.5">
                            <img
                              src={ISSUER_LOGOS[activeCert.issuer]}
                              alt={activeCert.issuer}
                              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'flex'; }}
                              className="w-12 h-12 object-contain rounded-xl bg-[#EDEDED] p-1.5 shadow-[inset_2px_2px_4px_#DCDCDC,inset_-2px_-2px_4px_#ffffff]"
                            />
                            <span
                              style={{ display: 'none' }}
                              className="w-12 h-12 rounded-xl bg-[#EDEDED] items-center justify-center text-[9px] font-black text-text-secondary uppercase tracking-wider text-center leading-tight px-1 shadow-[inset_2px_2px_4px_#DCDCDC,inset_-2px_-2px_4px_#ffffff]"
                            >
                              {activeCert.issuer}
                            </span>
                            <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest text-center">
                              {activeCert.issuer}
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-1.5">
                            <div className="w-12 h-12 rounded-xl bg-[#EDEDED] shadow-[inset_2px_2px_4px_#DCDCDC,inset_-2px_-2px_4px_#ffffff] flex items-center justify-center">
                              <FaFileAlt size={18} className="text-text-secondary opacity-60" />
                            </div>
                            <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest text-center">
                              {activeCert.issuer}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── 3D Coverflow Carousel ────────────────────────────────────── */}
            <div className="relative w-full flex flex-col items-center justify-center select-none min-h-[400px] md:min-h-[480px] py-6">

              {/* 3D Perspective Viewport */}
              <div
                className="relative w-full max-w-4xl h-[200px] md:h-[280px] flex items-center justify-center overflow-visible"
                style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
              >
                {/* Nav Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-8 w-11 h-11 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all z-30 focus:outline-none cursor-pointer shadow-sm"
                >
                  <FaChevronLeft size={14} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-8 w-11 h-11 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all z-30 focus:outline-none cursor-pointer shadow-sm"
                >
                  <FaChevronRight size={14} />
                </button>

                {/* Cards container */}
                <div
                  className="relative w-40 h-52 sm:w-48 sm:h-64 md:w-56 md:h-72 flex items-center justify-center"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {filtered.map((cert, index) => {
                    const distance = getCircularDistance(index, activeIndex, filtered.length);
                    const absDistance = Math.abs(distance);
                    if (absDistance > 3) return null;

                    const isImg = cert.fileType === 'image' || isImageFile(cert.file);
                    const tagColor = cert.tag ? (TAG_COLORS[cert.tag] ?? 'bg-accent/20 text-accent border-accent/30') : '';
                    const zIdx = 100 - absDistance;
                    const rotateY = distance * -32;
                    const translateX = distance * 130;
                    const translateZ = -absDistance * 85;
                    const scale = 1 - absDistance * 0.13;
                    const opacity = 1 - absDistance * 0.3;

                    return (
                      <div
                        key={cert.file}
                        onClick={() => setActiveIndex(index)}
                        className="absolute inset-0 cursor-pointer overflow-visible transition-all duration-500"
                        style={{
                          transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                          zIndex: zIdx,
                          opacity,
                          transformStyle: 'preserve-3d',
                        }}
                        onMouseEnter={() => prefetchFile(cert.file)}
                      >
                        {/* Card face */}
                        <div className="w-full h-full rounded-2xl overflow-hidden glow-border-container shadow-[6px_6px_12px_#DCDCDC,-6px_-6px_12px_#ffffff]">
                          <div className="glow-border-content bg-[#EDEDED] flex flex-col justify-between">
                            {/* Top accent stripe */}
                            <div className="h-1 w-full bg-gradient-to-r from-[#7B3F00] to-[#B87333] flex-none" />
                            <div className="p-4 flex flex-col flex-1 gap-2 justify-between">
                              <div>
                                <span className="text-[8px] font-black uppercase tracking-widest opacity-60 block truncate text-text-secondary">{cert.issuer}</span>
                                {cert.tag && (
                                  <span className="inline-block mt-1 text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full glass-badge">
                                    {cert.tag}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="w-8 h-8 rounded-lg bg-[#EDEDED] shadow-[inset_1.5px_1.5px_3px_#DCDCDC,inset_-1.5px_-1.5px_3px_#ffffff] flex items-center justify-center flex-shrink-0 text-black">
                                  {isImg ? <FaImage className="text-xs" /> : <FaFileAlt className="text-xs" />}
                                </div>
                                <span className="text-[10px] font-black leading-snug line-clamp-3 text-text-primary">{cert.name}</span>
                              </div>
                              <span className="self-start text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full glass-badge">
                                {cert.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Mirror reflection */}
                        <div
                          className="absolute top-[100%] left-0 right-0 h-1/3 opacity-25 pointer-events-none overflow-hidden scale-y-[-1] blur-[1.5px]"
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          <div className="w-full h-full rounded-2xl bg-[#EDEDED]" />
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 10%, #EDEDED 90%)' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Play/Pause */}
              <div className="mt-12 relative z-20">
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  className="w-10 h-10 rounded-full bg-[#EDEDED] text-black shadow-[3px_3px_6px_#DCDCDC,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#DCDCDC,inset_-2px_-2px_4px_#ffffff] active:scale-95 flex items-center justify-center transition-all cursor-pointer focus:outline-none"
                >
                  {isPlaying ? <FaPause size={10} /> : <FaPlay size={10} className="ml-0.5" />}
                </button>
              </div>

              {/* Dot indicators */}
              <div className="mt-5 flex gap-2 relative z-20">
                {filtered.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === i ? 'bg-[#B87333] w-4 shadow-[1px_1px_3px_#DCDCDC]' : 'bg-[#E5E5E5] w-1.5 hover:bg-[#3A3A3A]/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Viewer Modal ── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-black/85 backdrop-blur-md"
            onClick={closeViewer}
          >
            {/* Modal header */}
            <motion.div
              initial={{ y: -60 }}
              animate={{ y: 0 }}
              exit={{ y: -60 }}
              className="flex-none flex items-center justify-between px-6 py-4 glass border-b border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 min-w-0">
                {modal.fileType === 'image'
                  ? <FaImage className="text-accent flex-shrink-0" />
                  : <FaFileAlt className="text-accent flex-shrink-0" />}
                <span className="text-text-primary text-sm font-black uppercase tracking-widest truncate">{modal.name}</span>
                {modal.pages.length > 0 && (
                  <span className="ml-2 text-[10px] text-text-secondary font-black uppercase tracking-widest whitespace-nowrap">
                    Page {modal.pageIndex + 1} / {modal.pages.length}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <a
                  href={currentPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass-dark border border-white/10 text-text-secondary hover:text-accent hover:border-accent/40 text-[10px] font-black uppercase tracking-widest transition-all"
                  onClick={e => e.stopPropagation()}
                >
                  <FaFileAlt /> Open
                </a>
                <button
                  onClick={closeViewer}
                  className="w-9 h-9 rounded-xl glass-dark border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-all"
                >
                  <FaTimes />
                </button>
              </div>
            </motion.div>

            {/* Modal body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="flex-1 overflow-y-auto lg:overflow-hidden p-4 flex flex-col lg:flex-row gap-5"
              onClick={e => e.stopPropagation()}
            >
              {/* Document Container */}
              <div className="w-full h-[55vh] lg:h-full flex-none lg:flex-1 flex flex-col gap-3 overflow-hidden">
                {modal.fileType === 'image' ? (
                  <div className="flex-1 relative flex items-center justify-center overflow-hidden rounded-2xl bg-white/5 border border-white/10">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentPageUrl}
                        src={currentPageUrl}
                        alt={modal.name}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                      />
                    </AnimatePresence>

                    {/* Prev / Next arrows for multi-page */}
                    {modal.pages.length > 1 && (
                      <>
                        <button
                          onClick={prevPage}
                          className="absolute left-4 w-11 h-11 rounded-full glass-dark border border-white/10 flex items-center justify-center text-white hover:text-accent hover:border-accent/40 transition-all shadow-xl"
                        >
                          <FaChevronLeft />
                        </button>
                        <button
                          onClick={nextPage}
                          className="absolute right-4 w-11 h-11 rounded-full glass-dark border border-white/10 flex items-center justify-center text-white hover:text-accent hover:border-accent/40 transition-all shadow-xl"
                        >
                          <FaChevronRight />
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  /* ── PDF iframe ── */
                  <iframe
                    src={encodePath(modal.file)}
                    title={modal.name}
                    className="flex-1 w-full rounded-2xl border border-white/10 bg-white"
                  />
                )}

                {/* Page dot indicators for multi-page */}
                {modal.pages.length > 1 && (
                  <div className="flex-none flex items-center justify-center gap-1.5 pb-1">
                    {modal.pages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setModal(m => m ? { ...m, pageIndex: i } : m)}
                        className={`h-1.5 rounded-full transition-all duration-200 ${
                          i === modal.pageIndex ? 'w-6 bg-accent' : 'w-1.5 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Dialogue/Comment panel */}
              <div className="w-full lg:w-96 flex-shrink-0 flex flex-col gap-5 p-6 rounded-2xl glass border border-white/10 backdrop-blur-md overflow-y-auto max-h-none lg:max-h-full">
                <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
                  <h4 className="text-xs font-black uppercase text-text-primary tracking-widest">Metadata &amp; Verification</h4>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Credential Name</span>
                    <p className="text-xs font-bold text-text-primary mt-1">{modal.name}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Domain / Category</span>
                    <p className="text-xs font-bold text-text-primary mt-1">
                      {displayArchive.find(c => c.name === modal.name)?.category || "Professional Development"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Issuer / Authority</span>
                    <p className="text-xs font-bold text-text-primary mt-1">
                      {displayArchive.find(c => c.name === modal.name)?.issuer || "Verified Issuer"}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 mt-2">
                    <span className="text-[9px] font-black text-accent uppercase tracking-widest block mb-2">Verification Summary</span>
                    <p className="text-xs leading-relaxed text-text-primary select-none">{modal.summary || "No summary available"}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Logic */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-full bg-[#EDEDED] text-black hover:scale-110 active:scale-95 transition-all shadow-[4px_4px_8px_#DCDCDC,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#DCDCDC,inset_-2px_-2px_4px_#ffffff] flex items-center justify-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FullCertificates;
