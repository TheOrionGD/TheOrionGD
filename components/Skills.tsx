import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS, LEADERSHIP_XR } from '../constants';
import { usePortfolioData } from '../hooks/usePortfolioData';
import {
  FaLayerGroup,
  FaBrain,
  FaShieldAlt,
  FaVrCardboard,
  FaFlask,
  FaAward
} from 'react-icons/fa';

const SKILL_ICONS: React.ComponentType<{ size?: number; className?: string }>[] = [FaLayerGroup, FaBrain, FaShieldAlt, FaVrCardboard, FaFlask];

const capabilityMap: Record<string, string> = {
  "Full Stack Engineering": "Architecting systems that scale, not just apps that run. Full ownership from schema design to deployment pipelines.",
  "AI & Intelligent Systems": "Wiring language models and automation into real engineering workflows — RAG, agents, and vector search at production scale.",
  "Cybersecurity & Systems": "Designing for the attack that hasn't happened yet. Vulnerability analysis, intrusion detection, and secure system design.",
  "Interactive & Creative Tech": "AR, Unity, and interfaces built to be felt, not just used. Spatial computing from ARCore to WebGL.",
  "Areas of Interest": "Applied ML · Spatial Computing & XR · AI Agent Workflows · CyberSecurity · Framework Optimization"
};

const Skills: React.FC = () => {
  const { data } = usePortfolioData();
  const skillsList = data.skills || SKILLS;

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="skills" className="py-0 relative overflow-hidden bg-transparent">

      {/* ─── TOP RULE ─── */}
      <div className="w-full h-px bg-[#E5E5E5]" />

      <div className="relative z-10">

        {/* ─── SECTION HEADER ROW ─── */}
        <div className="py-10 border-b border-[#E5E5E5]">
          <div className="container mx-auto px-6 md:px-10 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-0">

            {/* Left: Headline block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 lg:border-r border-[#DCDCDC] lg:pr-10 pb-8 lg:pb-0 flex flex-col justify-between"
            >
              <div>
                <div className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-black mb-6">
                  Section 03 // Arsenal
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-none text-black mb-6 font-space-grotesk">
                  Technical capability matrix
                </h2>
                <p className="text-sm leading-relaxed text-black max-w-sm">
                  Multi-disciplinary engineering built for high-performance execution. Five core domains, one throughline.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-10">
                <button
                  onClick={handleScrollToContact}
                  className="inline-flex items-center bg-[#0A0A08] hover:bg-[#7B3F00] transition-colors duration-300 text-black text-[10px] font-bold font-mono tracking-widest uppercase py-3 px-5 cursor-pointer"
                >
                  <span className="text-black/70 mr-2.5 text-xs">▪</span>
                  Start a collaboration
                </button>
              </div>
            </motion.div>

            {/* Right: 2-column capability grid */}
            <div className="lg:col-span-8 lg:pl-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 h-full divide-y divide-[#DCDCDC] sm:divide-y-0">
                {skillsList.map((category, index) => {
                  const Icon = SKILL_ICONS[index % SKILL_ICONS.length];
                  const description = capabilityMap[category.category] || '';
                  const isLeftCol = index % 2 === 0;
                  const isLastRow = index >= skillsList.length - 2;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className={[
                        'relative p-8 group cursor-default',
                        // Right border on left-column items (desktop)
                        isLeftCol ? 'sm:border-r border-[#DCDCDC]' : '',
                        // Bottom border except on the last row
                        !isLastRow ? 'border-b border-[#DCDCDC]' : '',
                      ].join(' ')}
                    >
                      {/* Crosshair marker — top-left of each cell (desktop) */}
                      <span className="absolute -top-[5px] -left-[5px] text-black/20 text-xs leading-none select-none pointer-events-none hidden sm:block">+</span>
                      {/* Crosshair marker — top-right of right column cells */}
                      {!isLeftCol && (
                        <span className="absolute -top-[5px] -right-[5px] text-black/20 text-xs leading-none select-none pointer-events-none hidden sm:block">+</span>
                      )}

                      {/* Icon */}
                      <div className="mb-6 text-black group-hover:text-black transition-colors duration-300">
                        <Icon size={32} />
                      </div>

                      {/* Capability Title */}
                      <h3 className="text-lg font-bold font-space-grotesk tracking-tight text-black mb-3 leading-snug">
                        {category.category}
                      </h3>

                      {/* Description */}
                      <p className="text-xs leading-relaxed text-black mb-4">
                        {description}
                      </p>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#DCDCDC]/70">
                        {category.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-full glass-badge"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ─── LEADERSHIP / XR STRIP ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-b border-[#DCDCDC]"
        >
          <div className="container mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <FaAward className="text-black text-sm" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-black">
                Field Leadership &amp; Community Impact
              </h4>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {LEADERSHIP_XR.map((role, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-bold uppercase tracking-widest text-black"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
