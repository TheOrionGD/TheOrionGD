import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { FaGraduationCap, FaCertificate, FaMicrochip, FaBookOpen } from 'react-icons/fa';

const Academics: React.FC = () => {
  const { data } = usePortfolioData();
  const educationList = data.education || [];
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
      
      {/* Top Divider */}
      <div className="w-full h-px bg-[#D3D3D3] mb-20" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 glass-badge">
            <FaGraduationCap className="animate-pulse" /> Section 07b // Education
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Academic <span className="text-black uppercase tracking-tighter">Milestones</span>
          </h2>
          <div className="w-24 h-1.5 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg, #7B3F00, #B87333)' }} />
          <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
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
            <h3 className="text-2xl font-black mb-8 uppercase tracking-tight flex items-center gap-3">
              Institutional Education
              <span className="h-0.5 w-12 bg-[#7B3F00] rounded-full inline-block"></span>
            </h3>
            
            <div className="space-y-6 md:space-y-8">
              {educationList.map((edu, index) => (
                <motion.div 
                   key={edu.degree} 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.2 }}
                   className="relative pl-10 md:pl-12 group"
                >
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center z-10 group-hover:scale-125 transition-transform duration-300 shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
                    style={{ background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #B87333 40%, #7B3F00 90%)' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffffff]/60 animate-pulse"></div>
                  </div>
                  
                  {index !== educationList.length - 1 && (
                    <div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-gradient-to-b from-[#7B3F00]/50 to-transparent"></div>
                  )}
 
                  <div className="glow-border-container rounded-2xl hover:scale-[1.01] hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.12)]">
                    <div className="glow-border-content p-6"
                      style={{
                        background: 'linear-gradient(135deg, #fcfcfc 0%, #ededed 100%)',
                        borderTop: '2px solid #ffffff',
                        borderLeft: '2px solid #ffffff',
                        borderRight: '1px solid #c8c8c8',
                        borderBottom: '2.5px solid #b8b8b8',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget.parentElement as HTMLElement).style.boxShadow = '0 15px 30px -6px rgba(0,0,0,0.18)';
                        (e.currentTarget as HTMLElement).style.borderBottomColor = '#7B3F00';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget.parentElement as HTMLElement).style.boxShadow = '0 8px 20px -4px rgba(0,0,0,0.12)';
                        (e.currentTarget as HTMLElement).style.borderBottomColor = '#b8b8b8';
                      }}>
                      <h4 className="text-lg md:text-xl font-black mb-1 uppercase tracking-tight">{edu.degree}</h4>
                      <p className="text-[11px] font-black uppercase tracking-widest mb-3">{edu.institution}</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                         <span className="w-4 h-px bg-text-muted opacity-30"></span>
                         {edu.period}
                      </div>
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
            <h3 className="text-2xl font-black mb-8 uppercase tracking-tight flex items-center gap-3">
              Research &amp; Coursework Highlights
              <span className="h-0.5 w-12 bg-[#B87333] rounded-full inline-block"></span>
            </h3>

            <div className="space-y-6">
              {academicHighlights.map((high, index) => (
                <div key={index} className="glow-border-container rounded-2xl hover:scale-[1.01] hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.10)]">
                  <div className="glow-border-content p-6 flex gap-5 group"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #eaeaea 100%)',
                      borderTop: '2px solid #ffffff',
                      borderLeft: '2px solid #ffffff',
                      borderRight: '1px solid #d3d3d3',
                      borderBottom: '2.5px solid #c0c0c0',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget.parentElement as HTMLElement).style.boxShadow = '0 15px 30px -6px rgba(0,0,0,0.16)';
                      (e.currentTarget as HTMLElement).style.borderBottomColor = '#7B3F00';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget.parentElement as HTMLElement).style.boxShadow = '0 8px 20px -4px rgba(0,0,0,0.10)';
                      (e.currentTarget as HTMLElement).style.borderBottomColor = '#c0c0c0';
                    }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                      style={{
                        background: 'linear-gradient(135deg, #e0e0e0 0%, #b8b8b8 100%)',
                        borderTop: '1px solid #ffffff',
                        borderLeft: '1px solid #ffffff',
                        borderBottom: '1.5px solid #7a7a7a',
                        borderRight: '1.5px solid #7a7a7a'
                      }}
                    >
                      <high.icon className="text-lg text-black" />
                    </div>
                    <div>
                      <h4 className="text-base font-black uppercase tracking-wider mb-2">{high.title}</h4>
                      <p className="text-sm leading-relaxed">{high.desc}</p>
                    </div>
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
