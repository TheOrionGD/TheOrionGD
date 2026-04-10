import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-background-deep/50 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
            Career Milestones
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4">
            Professional <span className="text-gradient uppercase tracking-tighter">Experience</span>
          </h2>
          <div className="w-24 h-1.5 bg-signature mx-auto rounded-full mb-10 shadow-lg shadow-accent/20"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-border/20 to-transparent md:-translate-x-1/2"></div>
          
          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`mb-16 relative pl-12 md:pl-0 flex flex-col ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
            >
              {/* Timeline Node */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-2 w-8 h-8 rounded-full glass border-2 border-accent z-20 flex items-center justify-center shadow-[0_0_15px_rgba(252,58,69,0.3)]">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>

              {/* Side Spacer for Desktop */}
              <div className="hidden md:block md:w-1/2"></div>

              {/* Experience Card */}
              <div className="w-full md:w-[45%] group">
                <div className="glass p-8 rounded-[2rem] border border-white/5 group-hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
                  
                  <div className="flex flex-wrap items-center gap-3 mb-6 relative z-10 text-[10px] font-black uppercase tracking-widest">
                    <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-text-muted opacity-30"></span>
                    <span className="text-text-muted">{exp.company}</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black text-text-primary mb-6 tracking-tight uppercase group-hover:text-gradient transition-all duration-300 relative z-10">
                    {exp.role}
                  </h3>
                  
                  <ul className="space-y-4 relative z-10">
                    {exp.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0 shadow-[0_0_8px_rgba(252,58,69,0.5)]"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Corner indicator */}
                  <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-1 h-0 group-hover:h-full bg-accent/30 transition-all duration-700`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;