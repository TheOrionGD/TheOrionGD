import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { FaGithub, FaMicrochip, FaBroadcastTower, FaSignal, FaCertificate, FaCheckCircle, FaPlay, FaFileAlt } from 'react-icons/fa';
import MarkdownModal from './MarkdownModal';

const ImmersiveSystems: React.FC = () => {
  const { data } = usePortfolioData();
  const projectsList = data.projects || [];

  // Filter Immersive systems (Spatial Computing, XR)
  const immersiveProjects = projectsList.filter(project => 
    project.category === 'Immersive Systems'
  );

  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string>('');
  const [isDocOpen, setIsDocOpen] = useState(false);

  const selectedProject = projectsList.find(p => p.title === selectedProjectTitle) || immersiveProjects[0] || projectsList[0];

  if (!selectedProject) {
    return (
      <section id="immersive-systems" className="py-24 bg-transparent relative overflow-hidden">
        <div className="container mx-auto px-6 text-center font-mono text-xs uppercase tracking-widest text-black/60">
          Loading Immersive Systems...
        </div>
      </section>
    );
  }

  return (
    <section id="immersive-systems" className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-section-label text-[13px] font-semibold uppercase tracking-[0.08em] mb-6 glass-badge">
            <FaMicrochip className="animate-spin-slow" /> Section 05
          </div>
          <h2 className="font-section-heading text-4xl md:text-5xl font-bold mb-6 tracking-[-0.03em] flex flex-col md:flex-row items-center justify-center gap-4">
            Immersive &amp; Spatial <span className="text-black uppercase tracking-tighter">Systems</span>
          </h2>
          <div className="w-24 h-1.5 mx-auto rounded-full mb-6"
            style={{ background: 'linear-gradient(90deg, #7B3F00, #B87333)' }}></div>
          <p className="max-w-2xl mx-auto font-body-text text-base md:text-[18px] font-normal leading-[1.7]">
            Telemetry Dashboard: Reviewing spatial mappings, hardware frequencies, patents, and low-level specifications.
          </p>
        </motion.div>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          
          {/* LEFT: Structural Selector Grid (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="font-small-label text-[11px] font-medium uppercase tracking-[0.12em] px-2 mb-2 flex items-center gap-2">
              <FaSignal className="animate-bounce" /> Telemetry Channels
            </div>

            {immersiveProjects.map((project) => {
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
                    <h3 className="font-card-title text-lg font-bold tracking-[-0.03em] uppercase transition-colors"
                      style={{ color: '#000000' }}>
                      {project.title}
                    </h3>
                    {project.title.toLowerCase().includes('remote') ? (
                      <span className="font-status-badge text-[13px] font-semibold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 glass-badge">
                        <FaCertificate /> Patent Record
                      </span>
                    ) : (
                      <span className="font-status-badge text-[13px] font-semibold uppercase px-2.5 py-0.5 rounded-full glass-badge">
                        Immersive
                      </span>
                    )}
                  </div>

                  <p className="font-body-text text-xs leading-[1.7] line-clamp-2 mb-4 font-normal">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="font-status-badge text-[13px] font-semibold uppercase px-2.5 py-0.5 rounded-full glass-badge">
                        #{t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: CAD Specs & Telemetry Board (col-span-7) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl relative overflow-hidden h-full flex flex-col justify-between"
              style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', boxShadow: '0 8px 32px rgba(255,99,99,0.10)', backdropFilter: 'blur(16px)' }}>
              
              <div>
                <div className="flex justify-between items-center mb-6 pb-4" style={{ borderBottom: '1px solid rgba(190,228,208,0.80)' }}>
                  <div className="flex items-center gap-3">
                    <FaBroadcastTower className="text-accent text-2xl animate-pulse" />
                    <div>
                      <h4 className="font-card-title text-xl font-bold uppercase tracking-[-0.03em]">{selectedProject.title}</h4>
                      <p className="font-small-label text-[11px] font-medium uppercase tracking-[0.12em] mt-0.5">Device Engineering Specs &amp; Telemetry</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="font-status-badge text-[13px] font-semibold text-emerald-600 uppercase tracking-[0.06em]">Active</span>
                  </div>
                </div>

                <h5 className="font-small-label text-[11px] font-medium uppercase tracking-[0.12em] mb-3">System Objective &amp; Problem</h5>
                {selectedProject.problemStatement && (
                  <p className="font-body-text text-xs sm:text-sm leading-[1.7] italic mb-4 font-bold">
                    Problem: {selectedProject.problemStatement}
                  </p>
                )}
                <p className="font-body-text text-sm sm:text-base leading-[1.7] mb-6 font-normal">
                  {selectedProject.description}
                </p>

                {/* Hardware Stack Integration */}
                <h5 className="font-small-label text-[11px] font-medium uppercase tracking-[0.12em] mb-4">Hardware Stack Integration</h5>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
                  {selectedProject.tech.map((tech, idx) => (
                    <React.Fragment key={idx}>
                      <div className="px-4 py-3 rounded-xl flex items-center justify-center font-space-grotesk font-bold text-xs uppercase grow text-center"
                        style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}>
                        {tech}
                      </div>
                      {idx < selectedProject.tech.length - 1 && (
                        <div className="hidden sm:block text-lg font-bold shrink-0">→</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Key Deliverables & System Specs */}
                <h5 className="font-small-label text-[11px] font-medium uppercase tracking-[0.12em] mb-3 flex items-center gap-2">
                  <FaCheckCircle size={10} className="text-accent" /> Key Deliverables &amp; System Specs
                </h5>
                <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: 'rgba(248,249,251,0.95)', border: '1px solid rgba(190,228,208,0.80)' }}>
                  {selectedProject.deliverables ? (
                    selectedProject.deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 font-body-text text-xs sm:text-sm leading-[1.7]">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start gap-2.5 font-body-text text-xs sm:text-sm leading-[1.7]">
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
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-space-grotesk font-bold text-xs uppercase tracking-[0.02em] transition-all bg-accent text-white hover:opacity-90 shadow-md shadow-accent/20 cursor-pointer"
                >
                  <FaFileAlt size={10} /> View Documentation
                </button>
                <div className="grid grid-cols-2 gap-4">
                  {selectedProject.github && selectedProject.github !== "#" ? (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 py-4 rounded-2xl font-space-grotesk font-bold text-xs uppercase tracking-[0.02em] transition-all"
                      style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = '#7B3F00'; el.style.color = '#7B3F00'; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(190,228,208,0.80)'; el.style.color = '#000000'; }}
                    >
                      <FaGithub size={14} /> Repository
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-3 py-4 rounded-2xl font-space-grotesk font-bold text-xs uppercase tracking-[0.02em] opacity-40 select-none"
                      style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}>
                      <FaGithub size={14} /> Private Repo
                    </div>
                  )}

                  {selectedProject.demo && selectedProject.demo !== "#" ? (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 py-4 rounded-2xl font-space-grotesk font-bold text-xs uppercase tracking-[0.02em] transition-all"
                      style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = '#7B3F00'; el.style.color = '#7B3F00'; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(190,228,208,0.80)'; el.style.color = '#000000'; }}
                    >
                      <FaPlay size={10} /> Live Stream
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-3 py-4 rounded-2xl font-space-grotesk font-bold text-xs uppercase tracking-[0.02em] opacity-40 select-none"
                      style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}>
                      <FaPlay size={10} /> Demo Offline
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

export default ImmersiveSystems;
