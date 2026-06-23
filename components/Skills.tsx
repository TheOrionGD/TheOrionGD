import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
            style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.20)', color: '#4f46e5' }}>
            Section 03
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4"
            style={{ color: '#0f172a' }}>
            Technical <span className="text-gradient uppercase tracking-tighter">Arsenal</span>
          </h2>
          <div className="w-24 h-1.5 mx-auto rounded-full mb-10"
            style={{ background: 'linear-gradient(90deg, #6366f1, #7c3aed)', boxShadow: '0 2px 12px rgba(99,102,241,0.25)' }}></div>
          <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed" style={{ color: '#64748b' }}>
            A comprehensive inventory of my multi-disciplinary engineering stack, platforms, frameworks, and design capabilities.
          </p>
        </motion.div>

        {/* Skill Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {SKILLS.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="flex flex-col relative group pt-6"
              style={{ borderTop: '1px solid rgba(99,102,241,0.15)' }}
            >
              {/* Active top-line indicator */}
              <div className="absolute top-0 left-0 w-0 md:group-hover:w-full transition-all duration-500 h-[1.5px] rounded-full"
                style={{ background: 'linear-gradient(90deg, #6366f1, #7c3aed)' }} />
              
              <h3 className="text-lg md:text-xl font-black mb-6 uppercase tracking-wider flex items-center gap-3"
                style={{ color: '#0f172a' }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0 md:animate-pulse"
                  style={{ background: '#6366f1', boxShadow: '0 0 8px rgba(99,102,241,0.5)' }} />
                {category.category}
              </h3>
              
              <div className="flex flex-wrap gap-2.5 relative z-10">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 text-[11px] font-bold rounded-xl transition-all cursor-default uppercase tracking-wider"
                    style={{
                      background: 'rgba(255,255,255,0.90)',
                      border: '1px solid rgba(99,102,241,0.12)',
                      color: '#334155',
                      boxShadow: '0 1px 4px rgba(99,102,241,0.06)'
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'rgba(99,102,241,0.40)';
                      el.style.color = '#4f46e5';
                      el.style.background = 'rgba(99,102,241,0.06)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'rgba(99,102,241,0.12)';
                      el.style.color = '#334155';
                      el.style.background = 'rgba(255,255,255,0.90)';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
