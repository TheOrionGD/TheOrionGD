import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-transparent relative">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
            Section 03
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4">
            Technical <span className="text-gradient uppercase tracking-tighter">Arsenal</span>
          </h2>
          <div className="w-24 h-1.5 bg-signature mx-auto rounded-full mb-10 shadow-lg shadow-accent/20"></div>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            A comprehensive inventory of my multi-disciplinary engineering stack, platforms, frameworks, and design capabilities.
          </p>
        </motion.div>

        {/* Premium Card-less Skill Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {SKILLS.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col relative group pt-6 border-t border-white/10"
            >
              {/* Thin neon active top-line indicator */}
              <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[1.5px] bg-accent transition-all duration-500" />
              
              <h3 className="text-lg md:text-xl font-black text-text-primary mb-6 uppercase tracking-wider flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(255,0,0,0.6)] shrink-0" />
                {category.category}
              </h3>
              
              <div className="flex flex-wrap gap-2.5 relative z-10">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 glass-dark text-text-secondary text-[11px] font-bold rounded-xl border border-white/5 hover:border-accent/40 hover:text-white transition-all cursor-default uppercase tracking-wider"
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