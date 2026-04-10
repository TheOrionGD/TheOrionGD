import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative bg-surface/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
            Technical Stack
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4">
            Skill <span className="text-gradient uppercase tracking-tighter">Inventory</span>
          </h2>
          <div className="w-24 h-1.5 bg-signature mx-auto rounded-full mb-10 shadow-lg shadow-accent/20"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SKILLS.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-[2rem] border border-white/5 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
              
              <h3 className="text-lg md:text-xl font-bold text-accent mb-8 uppercase tracking-widest flex items-center gap-3">
                <span className="w-1.5 h-6 bg-accent rounded-full inline-block"></span>
                {category.category}
              </h3>
              
              <div className="flex flex-wrap gap-3 relative z-10">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-background-deep/40 text-text-secondary text-[11px] font-bold rounded-xl border border-white/5 hover:border-accent/50 hover:text-accent hover:bg-accent/5 transition-all cursor-default uppercase tracking-wider"
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