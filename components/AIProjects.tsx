import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { FaGithub, FaBrain, FaPlay, FaCheckCircle, FaMicrochip, FaFileAlt } from 'react-icons/fa';
import MarkdownModal from './MarkdownModal';

const AIProjects: React.FC = () => {
  const { data } = usePortfolioData();
  const projectsList = data.projects || [];

  // Filter only AI / ML projects
  const aiProjects = projectsList.filter(project => project.category === 'AI / ML');
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string>('');
  const [isDocOpen, setIsDocOpen] = useState(false);

  const selectedProject = aiProjects.find(p => p.title === selectedProjectTitle) || aiProjects[0];

  if (!selectedProject) {
    return (
      <section id="ai-innovations" className="py-24 bg-transparent relative overflow-hidden">
        <div className="container mx-auto px-6 text-center font-mono text-xs uppercase tracking-widest text-black/60">
          Loading AI Innovations...
        </div>
      </section>
    );
  }

  return (
    <section id="ai-innovations" className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 glass-badge">
            <FaMicrochip className="animate-pulse" /> Section 04
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4">
            AI Innovations <span className="text-black uppercase tracking-tighter">Terminal</span>
          </h2>
          <div className="w-24 h-1.5 mx-auto rounded-full mb-6"
            style={{ background: 'linear-gradient(90deg, #7B3F00, #B87333)' }}></div>
          <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Recruiter Dashboard: Real-time system pipeline analysis, model specs, and direct architecture logs.
          </p>
        </motion.div>
 
        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          
          {/* LEFT PANEL: High-Density Project Matrix (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="text-[10px] font-black uppercase tracking-widest px-2 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-ping" style={{ background: '#7B3F00' }}></span>
              Active System Matrix
            </div>
 
            {aiProjects.map((project) => {
              const isCurrent = project.title === selectedProject.title;
              return (
                <motion.div
                  key={project.title}
                  onClick={() => setSelectedProjectTitle(project.title)}
                  whileHover={{ x: 6 }}
                  className={`cursor-pointer p-6 rounded-2xl transition-all duration-300`}
                  style={{
                    background: isCurrent ? 'rgba(219,255,203,0.80)' : 'rgba(255,255,255,0.95)',
                    border: isCurrent ? '1px solid rgba(255,99,99,0.50)' : '1px solid rgba(190,228,208,0.80)',
                    boxShadow: isCurrent ? '0 4px 20px rgba(255,99,99,0.15)' : '0 1px 4px rgba(255,99,99,0.04)'
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-black tracking-tight uppercase transition-colors"
                      style={{ color: '#000000' }}>
                      {project.title}
                    </h3>
                    <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full glass-badge">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full glass-badge">
                        #{t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT PANEL: Recruiter Pipeline & Logs Analyzer (col-span-7) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl relative overflow-hidden h-full flex flex-col justify-between"
              style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', boxShadow: '0 8px 32px rgba(255,99,99,0.10)', backdropFilter: 'blur(16px)' }}>
              
              {/* Header Details */}
              <div>
                <div className="flex justify-between items-center mb-6 pb-4" style={{ borderBottom: '1px solid rgba(190,228,208,0.80)' }}>
                  <div className="flex items-center gap-3">
                    <FaBrain className="text-accent text-2xl animate-pulse" />
                    <div>
                      <h4 className="text-xl font-black uppercase tracking-tight">{selectedProject.title}</h4>
                      <p className="text-[9px] font-bold uppercase tracking-widest mt-0.5">Model Blueprint &amp; Microservices</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Active</span>
                  </div>
                </div>

                <h5 className="text-[10px] font-black uppercase tracking-widest mb-3">System Objective &amp; Problem</h5>
                {selectedProject.problemStatement && (
                  <p className="text-xs leading-relaxed italic mb-4 font-bold">
                    Problem: {selectedProject.problemStatement}
                  </p>
                )}
                <p className="text-sm leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Technical Pipeline Flow */}
                <h5 className="text-[10px] font-black uppercase tracking-widest mb-4">Technical Pipeline Flow</h5>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
                  {selectedProject.tech.map((tech, idx) => (
                    <React.Fragment key={idx}>
                      <div className="px-4 py-3 rounded-xl flex items-center justify-center font-bold text-xs uppercase grow text-center"
                        style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}>
                        {tech}
                      </div>
                      {idx < selectedProject.tech.length - 1 && (
                        <div className="hidden sm:block text-lg font-black shrink-0">→</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Technical Specifications & Deliverables */}
                <h5 className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FaCheckCircle size={10} className="text-accent" /> Key Deliverables &amp; System Architecture
                </h5>
                <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: 'rgba(248,249,251,0.95)', border: '1px solid rgba(190,228,208,0.80)' }}>
                  {selectedProject.deliverables ? (
                    selectedProject.deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                      <span>Full system features and dynamic interface metrics configuration.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-8 pt-6" style={{ borderTop: '1px solid rgba(190,228,208,0.80)' }}>
                <button
                  onClick={() => setIsDocOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all bg-accent text-white hover:opacity-90 shadow-md shadow-accent/20 cursor-pointer"
                >
                  <FaFileAlt size={10} /> View Documentation
                </button>
                <div className="grid grid-cols-2 gap-4">
                  {selectedProject.github && selectedProject.github !== "#" ? (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                      style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = '#7B3F00'; el.style.color = '#7B3F00'; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(190,228,208,0.80)'; el.style.color = '#000000'; }}
                    >
                      <FaGithub size={14} /> Inspect Codebase
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-not-allowed opacity-40"
                      style={{ background: 'rgba(248,249,251,0.80)', border: '1px solid rgba(190,228,208,0.40)', color: '#000000' }}>
                      Proprietary / Enterprise
                    </div>
                  )}

                  {selectedProject.demo && selectedProject.demo !== "#" ? (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 py-4 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all transform hover:scale-[1.02]"
                      style={{ background: 'linear-gradient(135deg, #7B3F00, #B87333)', boxShadow: '0 4px 16px rgba(255,99,99,0.30)' }}
                    >
                      <FaPlay size={10} /> Execute System Demo
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-not-allowed opacity-50"
                      style={{ background: 'rgba(248,249,251,0.80)', border: '1px solid rgba(190,228,208,0.40)', color: '#000000' }}>
                      Pending Deploy
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
      <MarkdownModal isOpen={isDocOpen} onClose={() => setIsDocOpen(false)} projectTitle={selectedProject.title} />
    </section>
  );
};

export default AIProjects;
