import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6 w-fit">
              Who I Am
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-8 tracking-tight flex items-center gap-4">
              About Me 
              <span className="h-1 w-16 bg-accent rounded-full inline-block"></span>
            </h3>
            <div className="glass p-8 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
               {/* Decorative Gradient Inner Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
              
              <p className="text-text-secondary leading-relaxed text-base md:text-lg relative z-10">
                I build intelligent, user-centric software systems using full-stack development, AI integration, and strong UX principles. My approach combines technical excellence with a deep understanding of user needs, resulting in high-impact solutions that solve real-world problems.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4 relative z-10">
                <div className="px-4 py-2 rounded-xl glass-dark border border-white/5 text-[10px] font-bold text-accent uppercase tracking-wider">
                  Creative
                </div>
                <div className="px-4 py-2 rounded-xl glass-dark border border-white/5 text-[10px] font-bold text-accent-secondary uppercase tracking-wider">
                  Analytical
                </div>
                <div className="px-4 py-2 rounded-xl glass-dark border border-white/5 text-[10px] font-bold text-text-muted uppercase tracking-wider">
                  Scalable
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary text-[10px] font-black uppercase tracking-widest mb-6 w-fit">
              Background
            </div>
             <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-8 tracking-tight flex items-center gap-4">
              Education
              <span className="h-1 w-16 bg-accent-secondary rounded-full inline-block"></span>
            </h3>
            
            <div className="space-y-6 md:space-y-8">
              {EDUCATION.map((edu, index) => (
                <motion.div 
                  key={edu.degree} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative pl-10 md:pl-12 group"
                >
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full glass border border-accent flex items-center justify-center z-10 group-hover:scale-125 transition-transform duration-300">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                  </div>
                  
                  {/* Vertical line connecting nodes */}
                  {index !== EDUCATION.length - 1 && (
                    <div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-gradient-to-b from-accent/50 to-transparent"></div>
                  )}

                  <div className="glass-dark p-6 rounded-2xl border border-white/5 group-hover:border-accent/40 transition-all duration-300">
                    <h4 className="text-lg md:text-xl font-black text-text-primary mb-1 uppercase tracking-tight">{edu.degree}</h4>
                    <p className="text-accent text-[11px] font-black uppercase tracking-widest mb-3">{edu.institution}</p>
                    <div className="flex items-center gap-2 text-text-muted text-[10px] font-bold uppercase tracking-widest">
                       <span className="w-4 h-px bg-text-muted opacity-30"></span>
                       {edu.period}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;