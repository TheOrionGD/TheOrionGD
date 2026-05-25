import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
            Section 07
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4">
            Professional <span className="text-gradient uppercase tracking-tighter">Experience</span>
          </h2>
          <div className="w-24 h-1.5 bg-signature mx-auto rounded-full mb-10 shadow-lg shadow-accent/20"></div>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Collaborative industry delivery, API development, full-stack optimizations, and cybersecurity operations.
          </p>
        </motion.div>

        {/* Asymmetric Two-Column Editorial List */}
        <div className="max-w-6xl mx-auto flex flex-col">
          {EXPERIENCE.map((exp, index) => {
            const startYear = exp.period.match(/\d{4}/)?.[0] || '2025';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-12 border-b border-white/5 relative group"
              >
                {/* Left Column: Timeframe & Company (col-span-3) */}
                <div className="lg:col-span-3 flex flex-col justify-start relative select-none">
                  {/* Huge faint background year */}
                  <div className="absolute -left-4 -top-6 text-7xl md:text-8xl font-black text-white/[0.02] group-hover:text-accent/[0.04] transition-colors duration-500 font-mono tracking-tighter">
                    {startYear}
                  </div>
                  
                  {/* Firm/Company Name */}
                  <h4 className="text-lg font-black text-white uppercase tracking-tight relative z-10 mb-2">
                    {exp.company}
                  </h4>
                  
                  {/* Dates */}
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest relative z-10">
                    {exp.period}
                  </span>
                </div>

                {/* Right Column: The Role & Key Deliverables (col-span-9) */}
                <div className="lg:col-span-9 flex flex-col justify-start">
                  {/* Role Title */}
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-6 group-hover:text-gradient transition-all duration-300">
                    {exp.role}
                  </h3>

                  {/* Bullet Deliverables */}
                  <ul className="space-y-4">
                    {exp.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3.5 text-text-secondary text-sm md:text-base leading-relaxed">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0 shadow-[0_0_8px_rgba(255,0,0,0.6)]"></span>
                        <span className="text-white/80">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Experience;