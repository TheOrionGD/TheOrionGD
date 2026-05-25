import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { FaGithub, FaExternalLinkAlt, FaDatabase, FaServer, FaCode, FaNetworkWired, FaCheckCircle } from 'react-icons/fa';

const ScalableSystems: React.FC = () => {
  // Filter Full-Stack & Scalable systems
  const scalableProjects = PROJECTS.filter(project => 
    project.category === 'Web' || 
    project.title.toLowerCase().includes('hostel') ||
    project.title.toLowerCase().includes('waiting') ||
    project.title.toLowerCase().includes('compressor')
  );

  const [selectedProject, setSelectedProject] = useState(scalableProjects[0]);

  return (
    <section id="scalable-systems" className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
            <FaServer className="animate-pulse" /> Section 06
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4">
            Scalable Systems <span className="text-gradient uppercase tracking-tighter">Compiler</span>
          </h2>
          <div className="w-24 h-1.5 bg-signature mx-auto rounded-full mb-6"></div>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            DBMS &amp; Engine Dashboard: High-fidelity transaction query mapping, runtime performance, and codebase execution.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          
          {/* LEFT: System Matrix Selectors (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="text-[10px] font-black text-accent uppercase tracking-widest px-2 mb-2 flex items-center gap-2">
              <FaNetworkWired className="animate-ping" /> Runtime Engine Grid
            </div>

            {scalableProjects.map((project) => {
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
                    <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded bg-accent/20 text-accent border border-accent/30">
                      DBMS / Backend
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

          {/* RIGHT: DBMS Specifications Panel (col-span-7) */}
          <div className="lg:col-span-7">
            <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
              
              <div>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <FaDatabase className="text-accent text-2xl animate-pulse" />
                    <div>
                      <h4 className="text-xl font-black text-white uppercase tracking-tight">{selectedProject.title}</h4>
                      <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mt-0.5">Database Query Optimization &amp; Complexity</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                    <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Active</span>
                  </div>
                </div>

                <h5 className="text-[10px] font-black text-accent uppercase tracking-widest mb-3">System Specifications</h5>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Pipeline Flow */}
                <h5 className="text-[10px] font-black text-accent uppercase tracking-widest mb-4">Execution Thread Stages</h5>
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

                {/* Key Deliverables & System Specs */}
                <h5 className="text-[10px] font-black text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FaCheckCircle size={10} className="text-accent" /> Key Deliverables &amp; System Specs
                </h5>
                <div className="glass-dark border border-white/5 rounded-2xl p-5 flex flex-col gap-3 shadow-inner">
                  {selectedProject.title.toLowerCase().includes('hostel') && (
                    <>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Relational database system utilizing optimized primary/foreign keys across tables.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Structured transactional query flow preventing parallel processing deadlocks.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Robust administrative modules for room allocation, student records, and fee management.</span>
                      </div>
                    </>
                  )}
                  {selectedProject.title.toLowerCase().includes('waiting') && (
                    <>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Console-based double priority queue data structures engineered entirely in native C.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Optimized linear search arrays reducing sorting complexities significantly.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Strict manual pointer memory allocation resulting in absolute zero runtime leaks.</span>
                      </div>
                    </>
                  )}
                  {!selectedProject.title.toLowerCase().includes('hostel') && !selectedProject.title.toLowerCase().includes('waiting') && (
                    <>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Performance-focused image compressor sizing down payloads by up to 85% dynamically.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Interactive responsive client views displaying live charts and clean meteorological records.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>Lightweight state-driven frameworks preventing browser thread blockages.</span>
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
                    <FaGithub size={14} /> Review Logic
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-3 py-4 bg-white/5 text-text-muted rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/5 cursor-not-allowed opacity-40">
                    Proprietary Codebase
                  </div>
                )}

                {selectedProject.demo && selectedProject.demo !== "#" ? (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 py-4 bg-signature hover:opacity-90 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-accent/20 transition-all transform hover:scale-[1.02]"
                  >
                    Execute DBMS Query
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-3 py-4 bg-white/10 text-text-muted rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/10 cursor-not-allowed opacity-50">
                    Console App Only
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

export default ScalableSystems;
