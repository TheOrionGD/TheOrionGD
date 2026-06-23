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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
            style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.20)', color: '#7c3aed' }}>
            <FaGraduationCap className="animate-pulse" /> Section 10
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight" style={{ color: '#0f172a' }}>
            Academic <span className="text-gradient uppercase tracking-tighter">Milestones</span>
          </h2>
          <div className="w-24 h-1.5 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg, #6366f1, #7c3aed)' }} />
          <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed" style={{ color: '#64748b' }}>
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
            <h3 className="text-2xl font-black mb-8 uppercase tracking-tight flex items-center gap-3" style={{ color: '#0f172a' }}>
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
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center z-10 group-hover:scale-125 transition-transform duration-300"
                    style={{ background: 'rgba(255,255,255,0.95)', border: '2px solid rgba(99,102,241,0.60)', boxShadow: '0 0 12px rgba(99,102,241,0.20)' }}>
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                  </div>
                  
                  {index !== EDUCATION.length - 1 && (
                    <div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-gradient-to-b from-accent/50 to-transparent"></div>
                  )}

                  <div className="p-6 rounded-2xl transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(99,102,241,0.10)', boxShadow: '0 2px 8px rgba(99,102,241,0.06)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.35)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.10)'}>
                    <h4 className="text-lg md:text-xl font-black mb-1 uppercase tracking-tight" style={{ color: '#0f172a' }}>{edu.degree}</h4>
                    <p className="text-[11px] font-black uppercase tracking-widest mb-3" style={{ color: '#4f46e5' }}>{edu.institution}</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>
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
            <h3 className="text-2xl font-black mb-8 uppercase tracking-tight flex items-center gap-3" style={{ color: '#0f172a' }}>
              Research &amp; Coursework Highlights
              <span className="h-0.5 w-12 bg-accent-secondary rounded-full inline-block"></span>
            </h3>

            <div className="space-y-6">
              {academicHighlights.map((high, index) => (
                <div key={index} className="p-6 rounded-2xl flex gap-5 group transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(124,58,237,0.10)', boxShadow: '0 2px 8px rgba(124,58,237,0.05)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.35)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.10)'}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)' }}>
                    <high.icon className="text-accent-secondary text-lg" />
                  </div>
                  <div>
                    <h4 className="text-base font-black uppercase tracking-wider mb-2" style={{ color: '#0f172a' }}>{high.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#334155' }}>{high.desc}</p>
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
