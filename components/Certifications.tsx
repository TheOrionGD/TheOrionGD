import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTv, FaCloud, FaFolderOpen, FaAward, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const ShieldGraphic: React.FC = () => (
  <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 flex items-center justify-center select-none pointer-events-none">
    {/* Upper-Right Dot Matrix Decoration (Tiny 4x4 grid in #DADADA) */}
    <div className="absolute top-1 right-1 grid grid-cols-4 gap-1.5 opacity-35">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-[#DADADA]" />
      ))}
    </div>

    {/* Orbital Ring 1: Primary Horizontal Path with Glowing Orange Verification Node */}
    <svg className="absolute inset-0 w-full h-full animate-[spin_24s_linear_infinite] opacity-80" viewBox="0 0 240 240">
      <ellipse cx="120" cy="115" rx="104" ry="38" fill="none" stroke="#DADADA" strokeWidth="1.2" transform="rotate(-18 120 115)" />
      {/* Active Verification Point: Orange Sphere (#F68B1F) with soft bloom */}
      <circle cx="26" cy="94" r="5.5" fill="#F68B1F" className="drop-shadow-[0_0_12px_rgba(246,139,31,0.9)]" />
      {/* Secondary passive nodes */}
      <circle cx="204" cy="134" r="3" fill="#FFFFFF" stroke="#DADADA" strokeWidth="1" />
      <circle cx="68" cy="154" r="2.5" fill="#FFFFFF" stroke="#ECECEC" strokeWidth="1" />
    </svg>

    {/* Orbital Ring 2: Steep Vertical Tilt */}
    <svg className="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite_reverse] opacity-60" viewBox="0 0 240 240">
      <ellipse cx="120" cy="115" rx="96" ry="28" fill="none" stroke="#DADADA" strokeWidth="1" transform="rotate(42 120 115)" />
      <circle cx="176" cy="66" r="3" fill="#FFFFFF" stroke="#DADADA" strokeWidth="1" />
    </svg>

    {/* Orbital Ring 3: Diagonal Outer Boundary Ring */}
    <svg className="absolute inset-0 w-full h-full opacity-45" viewBox="0 0 240 240">
      <ellipse cx="120" cy="115" rx="112" ry="44" fill="none" stroke="#ECECEC" strokeWidth="1" transform="rotate(-58 120 115)" />
    </svg>

    {/* Orbital Ring 4: Translucent Counter Orbit */}
    <svg className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite] opacity-35" viewBox="0 0 240 240">
      <ellipse cx="120" cy="115" rx="88" ry="34" fill="none" stroke="#DADADA" strokeWidth="1" transform="rotate(72 120 115)" />
    </svg>

    {/* Under the Shield: Minimal White 3-Tiered Pedestal Base */}
    <div className="absolute bottom-1 w-50 sm:w-60 md:w-68 h-9.5 bg-gradient-to-r from-[#F5F5F5] via-white to-[#F5F5F5] rounded-full shadow-[0_6px_24px_rgba(0,0,0,0.04)] border border-[#ECECEC] flex items-center justify-center">
      {/* Tier 2 */}
      <div className="w-[92%] h-[68%] rounded-full bg-gradient-to-r from-[#FAFAFA] via-white to-[#FAFAFA] border border-[#ECECEC] shadow-[inset_0_2px_4px_rgba(255,255,255,0.9)] flex items-center justify-center">
        {/* Tier 3 Top Deck */}
        <div className="w-[85%] h-[55%] rounded-full bg-white border border-[#ECECEC]/90 shadow-xs" />
      </div>
    </div>
    <div className="absolute bottom-6 w-38 sm:w-46 md:w-52 h-5.5 bg-gradient-to-r from-white via-[#FAFAFA] to-white rounded-full shadow-xs border border-[#ECECEC]/80 opacity-90" />

    {/* Centerpiece Floating 3D Frosted Glass Shield */}
    <div className="relative z-10 w-30 h-34 sm:w-38 sm:h-42 md:w-42 md:h-46 animate-float drop-shadow-[0_12px_28px_rgba(0,0,0,0.05)]">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 160 180">
        <defs>
          {/* Frosted White Glass Body Gradient (#FAFAFA & #FFFFFF) */}
          <linearGradient id="trustShieldBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.97" />
            <stop offset="40%" stopColor="#FAFAFA" stopOpacity="0.80" />
            <stop offset="80%" stopColor="#F5F5F5" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.92" />
          </linearGradient>

          {/* Liquid Glass Highlight Sheen */}
          <linearGradient id="trustShieldSheen" x1="15%" y1="0%" x2="85%" y2="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>

          {/* Border Rim Stroke (#ECECEC & #FFFFFF) */}
          <linearGradient id="trustShieldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="50%" stopColor="#ECECEC" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
          </linearGradient>

          {/* Inner Groove Ridge */}
          <linearGradient id="trustShieldInnerGroove" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ECECEC" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#DADADA" stopOpacity="0.5" />
          </linearGradient>

          {/* Soft Neumorphic Shadow */}
          <filter id="trustSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.04" />
          </filter>
        </defs>

        {/* 1. Frosted White Glass Outer Shield Contour */}
        <path
          d="M80 14 C108 8 138 18 144 28 C144 95 118 140 80 166 C42 140 16 95 16 28 C22 18 52 8 80 14 Z"
          fill="url(#trustShieldBody)"
          stroke="url(#trustShieldRim)"
          strokeWidth="3"
          filter="url(#trustSoftShadow)"
        />

        {/* 2. Inner Refractive Ridge */}
        <path
          d="M80 24 C103 19 127 27 132 35 C132 90 110 128 80 150 C50 128 28 90 28 35 C33 27 57 19 80 24 Z"
          fill="none"
          stroke="url(#trustShieldInnerGroove)"
          strokeWidth="2"
        />

        {/* 3. Matte Liquid Specular Highlight Sheen */}
        <path
          d="M80 18 C104 13 130 22 135 30 C135 65 125 95 110 115 C95 80 70 45 80 18 Z"
          fill="url(#trustShieldSheen)"
        />

        {/* 4. Minimal Engraved Center Checkmark */}
        <path
          d="M62 86 L76 100 L102 68"
          fill="none"
          stroke="#334155"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 2px 3px rgba(255,255,255,0.95))' }}
        />
      </svg>
    </div>
  </div>
);

const Certifications: React.FC = () => {
  const proofCards = [
    {
      num: "01",
      title: "PATENT: ANDROID TV USING REMOTE IR SENSOR",
      year: "2024",
      icon: <FaTv className="text-slate-800 text-base sm:text-lg" />,
      description: "The first time an idea became something legally, formally mine.",
    },
    {
      num: "02",
      title: "AZURE AI ENGINEER ASSOCIATE (AI-102)",
      year: "Feb 2025",
      icon: <FaCloud className="text-slate-800 text-base sm:text-lg" />,
      description: "Microsoft-verified: NLP, computer vision, conversational AI, at production scale.",
    },
    {
      num: "03",
      title: "APPLIED GENERATIVE AI SPECIALIZATION",
      year: "Apr 2026",
      icon: <HiSparkles className="text-slate-800 text-lg sm:text-xl" />,
      description: "LLM architecture, generative model design, AI governance — the discipline behind the hype.",
    },
  ];

  return (
    <section id="certifications" className="py-14 sm:py-20 md:py-28 bg-transparent relative overflow-hidden text-slate-900">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl relative z-10">

        {/* Header Grid Layout: Left (Tag + Title + Accent Line + Quote Card) | Right (3D Shield) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 sm:mb-12">
          
          {/* Left Column: Tag, Title, Accent Line & Status Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Section Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-section-label text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-800 bg-white border border-[#ECECEC] shadow-xs mb-3 sm:mb-4">
              <FaAward className="text-slate-500 text-xs" />
              <span>SECTION 05 // PROOF</span>
            </div>

            {/* Main Header Title */}
            <h2 className="font-hero text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] text-slate-950 uppercase leading-none mb-3">
              PROOF VAULT
            </h2>

            {/* Orange Accent Dot & Solid Line (#F68B1F) */}
            <div className="flex items-center gap-1.5 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F68B1F] shadow-[0_0_8px_rgba(246,139,31,0.85)]" />
              <div className="h-[2px] w-28 sm:w-36 bg-[#F68B1F] rounded-full" />
            </div>

            {/* Proving Systems Status Quote Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-white border border-[#ECECEC] p-5 sm:p-6 shadow-[0_6px_24px_rgba(0,0,0,0.03)] w-full max-w-xl">
              <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#F68B1F]" />
              
              <div className="flex items-center gap-2 font-status-badge text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-800 mb-2">
                <FaQuoteLeft className="text-[#F68B1F] text-xs shrink-0" />
                <span>PROVING SYSTEMS STATUS // ACTIVE</span>
              </div>

              <div className="relative">
                <p className="font-card-subtitle text-sm sm:text-base font-medium italic text-slate-800 leading-relaxed pr-6">
                  “Forty certifications across Azure, GenAI, and cybersecurity. A credential is a checkpoint — what matters is what you build with the knowledge after you pass.”
                </p>
                <FaQuoteRight className="text-[#F68B1F] text-xs absolute bottom-1 right-1 opacity-80" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Shield Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center lg:justify-end shrink-0"
          >
            <ShieldGraphic />
          </motion.div>

        </div>

        {/* 3 Main Proof Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {proofCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
              className="relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white border border-[#ECECEC] p-4 sm:p-5 md:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300 group overflow-hidden"
            >
              {/* Subtle hover accent line */}
              <div className="absolute left-0 top-4 bottom-4 w-1 bg-[#F68B1F] opacity-0 group-hover:opacity-100 transition-opacity rounded-r" />

              <div>
                {/* Header row */}
                <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FAFAFA] to-[#F5F5F5] border border-[#ECECEC] shadow-inner flex items-center justify-center text-slate-700 shrink-0">
                      {card.icon}
                    </div>
                    <div>
                      <span className="font-small-label text-[10px] font-medium uppercase tracking-[0.1em] text-slate-400 block">
                        PROVED CREDENTIAL
                      </span>
                    </div>
                  </div>

                  <span className="font-status-badge text-[11px] font-semibold uppercase tracking-[0.06em] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#FAFAFA] text-slate-700 border border-[#ECECEC] shadow-xs shrink-0">
                    {card.year} // PASS
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-card-title text-base sm:text-lg md:text-xl font-bold uppercase tracking-[-0.03em] text-slate-900 mb-2 sm:mb-3 leading-[1.2]">
                  {card.title}
                </h4>

                {/* Divider line with orange dot */}
                <div className="relative w-full h-px bg-[#ECECEC] my-3 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F68B1F]" />
                </div>

                {/* Description */}
                <p className="font-body-text text-xs sm:text-sm leading-[1.6] text-slate-600 font-normal mb-4 sm:mb-6">
                  {card.description}
                </p>
              </div>

              {/* Watermark Number */}
              <div className="self-end font-number-display text-2xl sm:text-3xl font-bold text-slate-300/80 select-none">
                {card.num}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Archive & Field Records Panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl sm:rounded-3xl bg-white border border-[#ECECEC] p-4 sm:p-6 md:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-[#ECECEC]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] flex items-center justify-center text-slate-700 shrink-0">
                <FaFolderOpen className="text-xs sm:text-sm" />
              </div>
              <div>
                <h4 className="font-section-heading text-xs sm:text-sm font-bold uppercase tracking-[-0.03em] text-slate-900">
                  THE ARCHIVE // FIELD RECORDS
                </h4>
                <p className="font-card-subtitle text-[11px] sm:text-xs text-slate-500 font-normal">
                  A growing vault of proof, patents, and professional milestones.
                </p>
              </div>
            </div>

            <Link
              to="/certificates"
              className="inline-flex items-center justify-center gap-2 bg-black/80 backdrop-blur-md text-white font-space-grotesk font-bold text-xs uppercase tracking-[0.02em] px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/20 shadow-md hover:bg-black transition-all cursor-pointer self-start sm:self-auto shrink-0"
            >
              <span>OPEN ARCHIVE</span>
              <span className="text-xs">↗</span>
            </Link>
          </div>

          {/* 5 Stats Chips Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
            <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-[#FAFAFA] border border-[#ECECEC]">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs">📺</span>
                <span className="font-small-label text-[10px] font-medium uppercase tracking-[0.1em] text-slate-700">PATENTS</span>
              </div>
              <span className="font-number-display text-xs font-bold text-slate-900">01</span>
            </div>

            <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-[#FAFAFA] border border-[#ECECEC]">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs">📄</span>
                <span className="font-small-label text-[10px] font-medium uppercase tracking-[0.1em] text-slate-700">CERTS</span>
              </div>
              <span className="font-number-display text-xs font-bold text-slate-900">40+</span>
            </div>

            <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-[#FAFAFA] border border-[#ECECEC]">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs">📁</span>
                <span className="font-small-label text-[10px] font-medium uppercase tracking-[0.1em] text-slate-700">PROJECTS</span>
              </div>
              <span className="font-number-display text-xs font-bold text-slate-900">12+</span>
            </div>

            <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-[#FAFAFA] border border-[#ECECEC]">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs">🔒</span>
                <span className="font-small-label text-[10px] font-medium uppercase tracking-[0.1em] text-slate-700">RESEARCH</span>
              </div>
              <span className="font-number-display text-xs font-bold text-slate-900">07</span>
            </div>

            <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-[#FAFAFA] border border-[#ECECEC] col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs">🏆</span>
                <span className="font-small-label text-[10px] font-medium uppercase tracking-[0.1em] text-slate-700">AWARDS</span>
              </div>
              <span className="font-number-display text-xs font-bold text-slate-900">05</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Certifications;