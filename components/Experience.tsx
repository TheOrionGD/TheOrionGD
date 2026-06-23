import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
            style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.20)', color: '#4f46e5' }}>
            Section 07
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4"
            style={{ color: '#0f172a' }}>
            Professional <span className="text-gradient uppercase tracking-tighter">Experience</span>
          </h2>
          <div className="w-24 h-1.5 mx-auto rounded-full mb-10"
            style={{ background: 'linear-gradient(90deg, #6366f1, #7c3aed)', boxShadow: '0 2px 12px rgba(99,102,241,0.25)' }}></div>
          <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed" style={{ color: '#64748b' }}>
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
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-12 relative group"
                style={{ borderBottom: '1px solid rgba(99,102,241,0.10)' }}
              >
                {/* Left Column: Timeframe & Company */}
                <div className="lg:col-span-3 flex flex-col justify-start relative select-none">
                  {/* Huge faint background year */}
                  <div className="absolute -left-4 -top-6 text-7xl md:text-8xl font-black font-mono tracking-tighter transition-colors duration-500"
                    style={{ color: 'rgba(99,102,241,0.04)' }}>
                    {startYear}
                  </div>
                  
                  {/* Firm/Company Name */}
                  <h4 className="text-lg font-black uppercase tracking-tight relative z-10 mb-2"
                    style={{ color: '#0f172a' }}>
                    {exp.company}
                  </h4>
                  
                  {/* Dates */}
                  <span className="text-[10px] font-bold uppercase tracking-widest relative z-10"
                    style={{ color: '#4f46e5' }}>
                    {exp.period}
                  </span>
                </div>

                {/* Right Column: The Role & Key Deliverables */}
                <div className="lg:col-span-9 flex flex-col justify-start">
                  {/* Role Title */}
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-6 transition-all duration-300"
                    style={{ color: '#0f172a' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #6366f1, #7c3aed)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'none'}>
                    {exp.role}
                  </h3>

                  {/* Bullet Deliverables */}
                  <ul className="space-y-4">
                    {exp.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3.5 text-sm md:text-base leading-relaxed"
                        style={{ color: '#334155' }}>
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: '#6366f1', boxShadow: '0 0 6px rgba(99,102,241,0.5)' }}></span>
                        <span>{detail}</span>
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