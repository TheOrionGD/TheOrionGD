import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { FaGithub, FaExternalLinkAlt, FaBrain, FaTerminal, FaPlay, FaCheckCircle, FaMicrochip } from 'react-icons/fa';

const AIProjects: React.FC = () => {
  // Filter only AI / ML projects
  const aiProjects = PROJECTS.filter(project => project.category === 'AI / ML');
  const [selectedProject, setSelectedProject] = useState(aiProjects[0]);

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
            <FaMicrochip className="animate-pulse" /> Section 04
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4">
            AI Innovations <span className="text-gradient uppercase tracking-tighter">Terminal</span>
          </h2>
          <div className="w-24 h-1.5 bg-signature mx-auto rounded-full mb-6"></div>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Recruiter Dashboard: Real-time system pipeline analysis, model specs, and direct architecture logs.
          </p>
        </motion.div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          
          {/* LEFT PANEL: High-Density Project Matrix (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="text-[10px] font-black text-accent uppercase tracking-widest px-2 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
              Active System Matrix
            </div>

            {aiProjects.map((project) => {
              const isCurrent = project.title === selectedProject.title;
              return (
                <motion.div
                  key={project.title}
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ x: 6 }}
                  className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 border ${
                    isCurrent 
                      ? 'glass bg-accent/10 border-accent/60 shadow-[0_0_25px_rgba(255,0,0,0.15)]' 
                      : 'glass-dark border-white/5 hover:border-accent/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-lg font-black tracking-tight uppercase transition-colors ${
                      isCurrent ? 'text-white' : 'text-text-secondary group-hover:text-white'
                    }`}>
                      {project.title}
                    </h3>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${
                      isCurrent ? 'bg-accent/20 text-accent border border-accent/30' : 'glass-dark text-text-muted border border-white/5'
                    }`}>
                      {project.category}
                    </span>
                  </div>

                  <p className="text-text-muted text-xs leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="text-[9px] font-bold text-accent/80 uppercase">
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
            <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
              
              {/* Header Details */}
              <div>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <FaBrain className="text-accent text-2xl animate-pulse" />
                    <div>
                      <h4 className="text-xl font-black text-white uppercase tracking-tight">{selectedProject.title}</h4>
                      <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mt-0.5">Model Blueprint &amp; Microservices</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Active</span>
                  </div>
                </div>

                <h5 className="text-[10px] font-black text-accent uppercase tracking-widest mb-3">System Specifications</h5>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Architecture Pipeline Simulation */}
                <h5 className="text-[10px] font-black text-accent uppercase tracking-widest mb-4">Technical Pipeline Flow</h5>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
                  {selectedProject.tech.map((tech, idx) => (
                    <React.Fragment key={idx}>
                      <div className="glass-dark border border-white/10 px-4 py-3 rounded-xl flex items-center justify-center font-bold text-xs text-white uppercase grow text-center shadow-inner">
                        {tech}
                      </div>
                      {idx < selectedProject.tech.length - 1 && (
                        <div className="hidden sm:block text-accent text-lg font-black shrink-0">→</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Technical Specifications & Deliverables */}
                <h5 className="text-[10px] font-black text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FaCheckCircle size={10} className="text-accent" /> Key Deliverables &amp; System Architecture
                </h5>
                <div className="glass-dark border border-white/5 rounded-2xl p-5 flex flex-col gap-3 shadow-inner">
                  {selectedProject.title.toLowerCase().includes('lms') && (
                    <>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Dynamic custom educational paths generated real-time via Gemini API integration.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Responsive full-stack dashboard for seamless student progress tracking.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Highly secure token validation protocols preventing unauthorized course fetching.</span>
                      </div>
                    </>
                  )}
                  {selectedProject.title.toLowerCase().includes('translate') && (
                    <>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Context-preserving multilingual translation processing with ultra-low latency.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Prompt injection security checks validating all translated context entries.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Serverless edge endpoints reducing translation load latency to ~180ms.</span>
                      </div>
                    </>
                  )}
                  {!selectedProject.title.toLowerCase().includes('lms') && !selectedProject.title.toLowerCase().includes('translate') && (
                    <>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Modular pipeline execution splitting NLP operations for granular control.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Tokenizer optimization processing long-form string contexts seamlessly.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Lightweight client-side implementation with zero runtime backend dependencies.</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
                {selectedProject.github && selectedProject.github !== "#" ? (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/10 hover:border-accent"
                  >
                    <FaGithub size={14} /> Inspect Codebase
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-3 py-4 bg-white/5 text-text-muted rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/5 cursor-not-allowed opacity-40">
                    Proprietary / Enterprise
                  </div>
                )}

                {selectedProject.demo && selectedProject.demo !== "#" ? (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 py-4 bg-signature hover:opacity-90 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-accent/20 transition-all transform hover:scale-[1.02]"
                  >
                    <FaPlay size={10} /> Execute System Demo
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-3 py-4 bg-white/10 text-text-muted rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/10 cursor-not-allowed opacity-50">
                    Pending Deploy
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AIProjects;
