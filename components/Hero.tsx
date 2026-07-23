/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaCode, FaLayerGroup, FaArrowRight, FaLightbulb, FaRocket } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { IMG_PORTRAIT } from '../assets';

const expertise = [
  {
    step: "01 // INNOVATE",
    title: "Advanced Research",
    desc: "Developing novel hardware-software integrations, AI pipelines, and filing patents like Android TV IR remote signal mapping.",
    icon: FaLightbulb
  },
  {
    step: "02 // BUILD",
    title: "Full-Stack Systems",
    desc: "Constructing responsive web architectures, MERN databases, and secure full-stack applications like FenceIN.",
    icon: FaCode
  },
  {
    step: "03 // IMPACT",
    title: "Field Delivery",
    desc: "Hardening production pipelines, building scalable API networks, and winning high-pressure hackathon sprint milestones.",
    icon: FaRocket
  }
];

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { data } = usePortfolioData();
  const personal = data.personalInfo;

  const nameParts = (personal?.name || "GODFREY T R").split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  // Use the DB profileImage only if it's a real URL (not the default placeholder path).
  // Falls back to IMG_PORTRAIT which resolves to VITE_IMG_PORTRAIT (Cloudinary CDN) from .env.
  const portraitSrc =
    personal?.profileImage && !personal.profileImage.startsWith('/')
      ? personal.profileImage
      : IMG_PORTRAIT;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 45;
      const y = (e.clientY - window.innerHeight / 2) / 45;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const [internshipsCount, setInternshipsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [certsCount, setCertsCount] = useState(0);
  const [patentCount, setPatentCount] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const stepTime = 30;
    const totalSteps = duration / stepTime;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setInternshipsCount(Math.min(4, Math.round((4 / totalSteps) * currentStep)));
      setProjectsCount(Math.min(40, Math.round((40 / totalSteps) * currentStep)));
      setCertsCount(Math.min(40, Math.round((40 / totalSteps) * currentStep)));
      setPatentCount(Math.min(1, Math.round((1 / totalSteps) * currentStep)));
      if (currentStep >= totalSteps) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-transparent text-black overflow-hidden py-12 md:py-16 flex items-center justify-center">

      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] select-none"
        style={{
          backgroundImage: 'radial-gradient(#2E2E2E 1px, transparent 0), radial-gradient(#2E2E2E 1px, transparent 0)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      />

      {/* Subtle Soft Glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#B87333] to-[#7B3F00] opacity-[0.05] blur-[100px] pointer-events-none select-none" />

      {/* Decorative watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="font-space-grotesk text-[15vw] font-bold text-black opacity-[0.05] uppercase tracking-tighter leading-none select-none">
          TheOrionGD
        </span>
      </div>

      {/* ── DESKTOP: 3-column grid  MOBILE: flex column with reordered items ── */}
      <div className="max-w-7xl mx-auto px-5 w-full relative z-10">

        {/* ── MOBILE LAYOUT (hidden on lg) ── */}
        <div className="flex flex-col gap-0 lg:hidden">

          {/* 1. Badge + Name */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-left mb-6"
          >
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full font-section-label text-[13px] font-semibold tracking-[0.08em] uppercase mb-5 glass-badge">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              INNOVATE // BUILD // IMPACT
            </div>
            <h1
              onClick={() => navigate('/admin/login')}
              title="System of Record // CMS"
              className="font-hero text-[13vw] font-extrabold tracking-[-0.05em] text-black leading-[0.92] uppercase cursor-pointer hover:opacity-85 select-none"
            >
              {firstName}<br />
              <span className="text-black">{lastName}</span>
            </h1>
          </motion.div>

          {/* 2. Portrait — centre-stage on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="flex justify-center mb-8"
          >
            <div className="relative w-[72vw] max-w-[280px] aspect-[3/4] overflow-hidden glow-border-container rounded-[2rem] shadow-xl">
              <div className="glow-border-content bg-[#EDEDED] overflow-hidden rounded-[calc(2rem-1.5px)]">
                <img
                  src={portraitSrc}
                  alt={`${personal?.name || "Godfrey T R"} Studio Portrait`}
                  className="w-full h-full object-cover scale-[1.06] object-top select-none pointer-events-none"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = IMG_PORTRAIT; }}
                />
              </div>
            </div>
          </motion.div>

          {/* 3. Tagline + Buttons + Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="text-left"
          >
            <p className="font-body-text text-black text-[18px] leading-[1.7] mb-7 max-w-sm">
              {personal?.tagline || "Final-year CS engineer and systems architect. Four internships, one patent. Building fluid, intelligent platforms."}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="#projects"
                className="px-6 py-3 rounded-full bg-black/80 backdrop-blur-md hover:bg-[#B87333] text-white font-space-grotesk font-bold text-xs uppercase tracking-[0.02em] transition-all duration-300 hover:-translate-y-0.5 shadow-md border border-white/20 cursor-pointer"
              >
                Explore Work
              </a>
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-black/80 backdrop-blur-md hover:bg-black/95 text-white font-space-grotesk font-bold text-xs uppercase tracking-[0.02em] transition-all duration-300 hover:-translate-y-0.5 shadow-md border border-white/20 cursor-pointer"
              >
                View Case File
              </a>
            </div>

            {/* Stats — 2×2 on mobile */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 pt-6 border-t border-[#E5E5E5]">
              <div>
                <span className="font-number-display text-[42px] font-bold text-black">{internshipsCount}+</span>
                <span className="font-small-label text-[11px] text-black block mt-0.5 uppercase tracking-[0.12em]">Internships</span>
              </div>
              <div>
                <span className="font-number-display text-[42px] font-bold text-black">{projectsCount}+</span>
                <span className="font-small-label text-[11px] text-black block mt-0.5 uppercase tracking-[0.12em]">Projects</span>
              </div>
              <div>
                <span className="font-number-display text-[42px] font-bold text-black">{certsCount}+</span>
                <span className="font-small-label text-[11px] text-black block mt-0.5 uppercase tracking-[0.12em]">Credentials</span>
              </div>
              <div>
                <span className="font-number-display text-[42px] font-bold text-black">{patentCount}</span>
                <span className="font-small-label text-[11px] text-black block mt-0.5 uppercase tracking-[0.12em]">Patent</span>
              </div>
              <div className="col-span-2 border-t border-[#E5E5E5]/40 pt-4 flex justify-between items-center">
                <span className="font-small-label text-[11px] text-black uppercase tracking-[0.12em]">Education</span>
                <span className="font-space-grotesk text-sm font-bold text-black">B.E CSE</span>
              </div>
            </div>
          </motion.div>

          {/* 4. Expertise cards — compact 1-col on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 pt-8 border-t border-[#E5E5E5] space-y-6"
          >
            {expertise.map((exp, idx) => (
              <div key={idx} className="flex gap-4 items-start group">
                <div className="w-9 h-9 rounded-full border border-[#E5E5E5] bg-[#EDEDED] flex items-center justify-center text-black shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:border-[#B87333]/30">
                  <exp.icon size={13} />
                </div>
                <div>
                  <span className="font-space-grotesk text-[11px] font-bold text-black uppercase tracking-widest block mb-0.5">
                    {exp.step}
                  </span>
                  <h3 className="font-section-heading text-sm font-bold text-black mb-1 uppercase">
                    {exp.title}
                  </h3>
                  <p className="font-body-text text-xs text-black leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── DESKTOP LAYOUT (hidden on mobile) ── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center">

          {/* LEFT COLUMN (lg:col-span-5) */}
          <motion.div
            className="lg:col-span-5 flex flex-col text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full font-section-label text-[13px] font-semibold tracking-[0.08em] uppercase mb-6 glass-badge">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              INNOVATE // BUILD // IMPACT — {(personal?.name || "THEORIONGD").toUpperCase()}
            </div>

            <h1
              onClick={() => navigate('/admin/login')}
              title="System of Record // CMS"
              className="font-hero text-6xl lg:text-[72px] xl:text-[96px] font-extrabold tracking-[-0.05em] text-black leading-[0.95] uppercase mb-6 cursor-pointer hover:opacity-85 select-none"
            >
              {firstName}<br />
              <span className="text-black">{lastName}</span>
            </h1>

            <p className="font-body-text text-black text-[18px] leading-[1.7] mb-8 max-w-md">
              {personal?.tagline || "Final-year Computer Science engineer and systems architect. Backed by four internships in cybersecurity, UI/UX, and full-stack development, and one registered patent. Designing fluid, intelligent platforms."}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#projects"
                className="px-7 py-3.5 rounded-full bg-black/80 backdrop-blur-md hover:bg-[#B87333] text-white font-space-grotesk font-bold text-xs uppercase tracking-[0.02em] transition-all duration-300 hover:-translate-y-0.5 shadow-md border border-white/20 text-center cursor-pointer"
              >
                Explore Work
              </a>
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-black/80 backdrop-blur-md hover:bg-black/95 text-white font-space-grotesk font-bold text-xs uppercase tracking-[0.02em] transition-all duration-300 hover:-translate-y-0.5 shadow-md border border-white/20 text-center cursor-pointer"
              >
                View Case File
              </a>
            </div>

            <div className="grid grid-cols-5 gap-3 sm:gap-5 md:gap-6 pt-8 border-t border-[#E5E5E5] w-full max-w-2xl">
              <div className="min-w-0">
                <span className="font-number-display text-2xl md:text-[36px] font-bold text-black">{internshipsCount}+</span>
                <span className="font-small-label text-[10px] text-black block mt-1 uppercase tracking-[0.08em] truncate">Internships</span>
              </div>
              <div className="min-w-0">
                <span className="font-number-display text-2xl md:text-[36px] font-bold text-black">{projectsCount}+</span>
                <span className="font-small-label text-[10px] text-black block mt-1 uppercase tracking-[0.08em] truncate">Projects</span>
              </div>
              <div className="min-w-0">
                <span className="font-number-display text-2xl md:text-[36px] font-bold text-black">{certsCount}+</span>
                <span className="font-small-label text-[10px] text-black block mt-1 uppercase tracking-[0.08em] truncate">Credentials</span>
              </div>
              <div className="min-w-0">
                <span className="font-number-display text-2xl md:text-[36px] font-bold text-black">{patentCount}</span>
                <span className="font-small-label text-[10px] text-black block mt-1 uppercase tracking-[0.08em] truncate">Patent</span>
              </div>
              <div className="min-w-0">
                <span className="font-number-display text-2xl md:text-[36px] font-bold text-black">B.E</span>
                <span className="font-small-label text-[10px] text-black block mt-1 uppercase tracking-[0.08em] truncate">Education</span>
              </div>
            </div>
          </motion.div>

          {/* CENTER COLUMN: PORTRAIT (lg:col-span-4) */}
          <motion.div
            className="lg:col-span-4 flex items-center justify-center z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}
              className="relative mx-auto w-80 lg:w-full max-w-xs aspect-[4/5] overflow-hidden rounded-[2.5rem] glow-border-container shadow-2xl"
            >
              <div className="glow-border-content bg-[#EDEDED] overflow-hidden rounded-[calc(2.5rem-1.5px)]">
                <img
                  src={portraitSrc}
                  alt={`${personal?.name || "Godfrey T R"} Studio Portrait`}
                  className="w-full h-full object-cover scale-[1.08] object-top select-none pointer-events-none"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = IMG_PORTRAIT; }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: EXPERTISE (lg:col-span-3) */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-8 text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="space-y-8">
              {expertise.map((exp, idx) => (
                <div key={idx} className="flex gap-3.5 items-start group">
                  <div className="w-9 h-9 rounded-full border border-[#E5E5E5] bg-[#EDEDED] flex items-center justify-center text-black shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:border-[#B87333]/30 mt-0.5">
                    <exp.icon size={14} />
                  </div>
                  <div>
                    <span className="font-space-grotesk text-sm font-bold text-black uppercase tracking-wider block mb-0.5">
                      {exp.step}
                    </span>
                    <h3 className="font-small-label text-[11px] font-bold text-black/80 mb-1 uppercase tracking-wider">
                      {exp.title}
                    </h3>
                    <p className="font-body-text text-xs text-black/75 leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;