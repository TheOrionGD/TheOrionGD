import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import type { Experience } from '../types';
import { VID_MOBILE_2, VID_DESKTOP_4 } from '../assets';

const companyHeadingMap: Record<string, string> = {
  "VDart Academy": "VDart: Full Stack OJT",
  "SkillCraft": "SkillCraft: UI/UX Redesign",
  "Prodigy InfoTech": "Prodigy: Web API Sync",
  "Adaovi": "Adaovi: Cyber Audit Gate"
};

const paragraphMap: Record<string, string> = {
  "VDart Academy": "Structured On-the-Job Training in full-stack architecture. Engineered core database components using the MERN stack and delivered training milestones within strict schedules.",
  "SkillCraft": "Designed modern dark-mode workflows and optimized user flows for high-usability applications. Rebuilt mobile-first hierarchies and fitness application homepages.",
  "Prodigy InfoTech": "Developed responsive frontend web applications consuming RESTful APIs. Built real-time weather tracking modules with dynamic data rendering and API synchronization.",
  "Adaovi": "Constructed real-time security vulnerability monitors and entropy-based password feedback gauges. Implemented ethical keylogger simulations for threat education."
};

/* ─── Individual right-column experience row ─────────────────── */
interface ExpRowProps {
  exp: Experience;
  index: number;
  scrollRoot: React.RefObject<HTMLDivElement | null>;
  onEnter: (i: number) => void;
}

const ExpRow: React.FC<ExpRowProps> = ({ exp, index, scrollRoot, onEnter }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const root = scrollRoot.current;
    if (!el || !root) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onEnter(index); },
      { root, threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index, onEnter, scrollRoot]);

  const caseNum = `00${index + 1}`;
  const title = companyHeadingMap[exp.company] ?? `${exp.company}: ${exp.role}`;
  const summary = paragraphMap[exp.company] ?? exp.details.join(' ');

  return (
    <div
      ref={ref}
      /* Each row takes the full height of the scroll container so one entry 
         fills the panel at a time */
      className="min-h-fit lg:min-h-full flex flex-col justify-center py-8 lg:py-16 px-4 lg:px-8 border-b border-[#DCDCDC]/60 last:border-b-0"
    >
      {/* Case number + title */}
      <div className="flex items-baseline gap-4 mb-5">
        <span className="font-mono text-xs font-bold text-black tracking-widest select-none">
          {caseNum}
        </span>
        <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold tracking-tight text-black uppercase leading-snug">
          {title}
        </h3>
      </div>

      {/* Period tag */}
      <div className="mb-5">
        <span className="inline-block text-[9px] font-bold font-mono tracking-widest uppercase px-2.5 py-1 rounded-full glass-badge">
          INTERVAL // {exp.period}
        </span>
      </div>

      {/* Summary */}
      <p className="text-sm leading-relaxed text-black mb-6 max-w-lg">
        {summary}
      </p>

      {/* Expandable deliverables */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[#DCDCDC] pt-4 mb-6"
          >
            <span className="font-mono text-[9px] font-bold text-black/60 uppercase tracking-widest block mb-3">
              System Logs // Deliverables
            </span>
            <ul className="space-y-3">
              {exp.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-black">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#7B3F00] shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(p => !p)}
        className="inline-flex items-center self-start bg-[#D3D3D3] hover:bg-[#7B3F00] hover:text-white transition-all duration-300 text-[10px] font-bold font-mono tracking-widest text-black py-2 px-3.5 uppercase cursor-pointer"
      >
        <span className="mr-3">{expanded ? 'Show Less' : 'Know More'}</span>
        <span className="pl-3 border-l border-[#000000]/10">{expanded ? '−' : '+'}</span>
      </button>
    </div>
  );
};

/* ─── Main Section ───────────────────────────────────────────── */
const Experience: React.FC = () => {
  const { data } = usePortfolioData();
  const experienceList = data.experience || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 1024
  );
  /* Ref to the right-column scroll container — passed to IntersectionObserver */
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const handleEnter = useCallback((i: number) => {
    setActiveIndex(i);
  }, []);

  const videoSrc = isMobile ? VID_MOBILE_2 : VID_DESKTOP_4;

  return (
    <section
      id="experience"
      /* Fixed height = viewport; overflow hidden so the section doesn't grow */
      className="relative bg-transparent h-screen overflow-hidden flex flex-col"
    >
      {/* ── Top Rule ── */}
      <div className="w-full h-px bg-[#D3D3D3] shrink-0" />

      {/* ── Section label bar ── */}
      <div className="container mx-auto px-6 md:px-10 shrink-0">
        <div className="py-5 border-b border-[#D3D3D3] flex items-center justify-between">
          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-black">
            Section 07 // Experience Log
          </span>
          {/* Progress dots */}
          <div className="flex gap-2 items-center">
            {experienceList.map((_, i) => (
              <div
                key={i}
                className={`h-[2px] transition-all duration-500 ${i === activeIndex ? 'w-6 bg-[#7B3F00]' : 'w-2 bg-[#DCDCDC]'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Split columns — fill remaining height ── */}
      <div className="container mx-auto px-6 md:px-10 flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* ── LEFT: Non-scrollable fixed video panel ── */}
          <div className="hidden lg:flex h-full items-center justify-center pr-10 border-r border-[#DCDCDC]">
            <div className="relative w-full max-w-[500px]">
              {/* Crosshair corners */}
              {['-top-3.5 -left-3.5', '-top-3.5 -right-3.5', '-bottom-3.5 -left-3.5', '-bottom-3.5 -right-3.5'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-6 h-6 flex items-center justify-center pointer-events-none opacity-30`}>
                  <div className="absolute w-[1.5px] h-full bg-[#000000]" />
                  <div className="absolute h-[1.5px] w-full bg-[#000000]" />
                </div>
              ))}

              {/* Video with chamfered corner */}
              <div
                className="w-full aspect-[4/3] bg-[#000000] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.10)]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)' }}
              >
                <AnimatePresence mode="wait">
                  <motion.video
                    key={activeIndex}
                    src={videoSrc}
                    autoPlay loop muted playsInline preload="auto"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.88 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
              </div>

              {/* Red accent strip */}
              <div className="absolute bottom-0 right-[40px] w-20 h-[2px] bg-[#7B3F00]/60" />

              {/* Active experience label */}
              <div className="mt-6 flex flex-col gap-1">
                <span className="font-mono text-[9px] text-black/60 uppercase tracking-widest">
                  Active Case
                </span>
                <span className="font-space-grotesk text-sm font-bold text-black uppercase tracking-tight">
                  {companyHeadingMap[experienceList[activeIndex]?.company] ?? experienceList[activeIndex]?.company}
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Independently scrollable list / Fixed video on mobile ── */}
          {isMobile ? (
            <div className="h-full flex flex-col overflow-hidden">
              {/* Fixed Video at top on mobile */}
              <div className="py-4 shrink-0">
                <div
                  className="w-full aspect-video bg-[#000000] overflow-hidden"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
                >
                  <video src={videoSrc} autoPlay loop muted playsInline preload="auto"
                    className="w-full h-full object-cover opacity-85" />
                </div>
              </div>

              {/* Scrollable list below the video */}
              <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#DCDCDC] scrollbar-track-transparent pb-10"
              >
                {experienceList.map((exp, index) => (
                  <ExpRow
                    key={index}
                    exp={exp}
                    index={index}
                    scrollRoot={scrollContainerRef}
                    onEnter={handleEnter}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="h-full overflow-y-auto pl-10 scrollbar-thin scrollbar-thumb-[#DCDCDC] scrollbar-track-transparent"
            >
              {experienceList.map((exp, index) => (
                <ExpRow
                  key={index}
                  exp={exp}
                  index={index}
                  scrollRoot={scrollContainerRef}
                  onEnter={handleEnter}
                />
              ))}
            </div>
          )}

        </div>
      </div>

      {/* ── Bottom Rule ── */}
      <div className="w-full h-px bg-[#D3D3D3] shrink-0" />
    </section>
  );
};

export default Experience;