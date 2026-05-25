import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../constants';
import { FaGraduationCap, FaCertificate, FaMicrochip, FaBookOpen } from 'react-icons/fa';

const Academics: React.FC = () => {
  // Key Academic research and specialized courses
  const academicHighlights = [
    {
      title: "Core Specialization & Focus",
      desc: "Deep focus on AI Agent Workflows, Scalable Full-Stack architectures, and Applied Machine Learning interfaces.",
      icon: FaMicrochip
    },
    {
      title: "NPTEL Academic Certification",
      desc: "Successfully completed NPTEL certifications in 'The Joy of Computing using Python' and 'Enhancing Soft Skills and Personality' with distinction.",
      icon: FaCertificate
    },
    {
      title: "Research Interests",
      desc: "Exploring applied framework optimizations, low-latency client-side rendering pipeline compressions, and AI agent architectures.",
      icon: FaBookOpen
    }
  ];

  return (
    <section id="academic-milestones" className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary text-[10px] font-black uppercase tracking-widest mb-6">
            <FaGraduationCap className="animate-pulse" /> Section 10
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6 tracking-tight">
            Academic <span className="text-gradient uppercase tracking-tighter">Milestones</span>
          </h2>
          <div className="w-24 h-1.5 bg-signature mx-auto rounded-full mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Acquiring engineering foundations, exploring specialized computer architectures, and pursuing deep research insights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          
          {/* Left Column: Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-black text-text-primary mb-8 uppercase tracking-tight flex items-center gap-3">
              Institutional Education
              <span className="h-0.5 w-12 bg-accent rounded-full inline-block"></span>
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

          {/* Right Column: Academic Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-black text-text-primary mb-8 uppercase tracking-tight flex items-center gap-3">
              Research &amp; Coursework Highlights
              <span className="h-0.5 w-12 bg-accent-secondary rounded-full inline-block"></span>
            </h3>

            <div className="space-y-6">
              {academicHighlights.map((high, index) => (
                <div key={index} className="glass p-6 rounded-2xl border border-white/5 hover:border-accent-secondary/40 transition-all duration-300 flex gap-5 group">
                  <div className="w-10 h-10 rounded-xl bg-accent-secondary/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <high.icon className="text-accent-secondary text-lg" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-text-primary uppercase tracking-wider mb-2">{high.title}</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">{high.desc}</p>
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

export default Academics;
