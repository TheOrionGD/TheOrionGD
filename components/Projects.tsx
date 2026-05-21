import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { FaGithub, FaExternalLinkAlt, FaRocket, FaBan, FaFilter } from 'react-icons/fa';

const Projects: React.FC = () => {
  const categories = ['All', 'AI / ML', 'Systems', 'Web', 'Cybersecurity', 'UI/UX', 'XR'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }
  };

  return (
    <section id="projects" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background radial glow removed */}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
            <FaRocket className="animate-bounce" /> Featured Works
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4">
            Creative <span className="text-gradient uppercase tracking-tighter">Portfolio</span>
          </h2>
          <div className="w-24 h-1.5 bg-signature mx-auto rounded-full mb-10 shadow-lg shadow-accent/20"></div>

          {/* Category Filter Navigation */}
          <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
            <div className="flex items-center gap-2 mr-2 text-text-muted text-[10px] font-black uppercase tracking-widest">
              <FaFilter size={10} /> Filter:
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${activeCategory === cat
                    ? 'text-white'
                    : 'text-text-secondary hover:text-accent'
                  }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-signature rounded-xl shadow-lg shadow-accent/20 z-0"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => {
              const isLive = project.demo && project.demo !== "#";
              const hasSource = project.github && project.github !== "#";
              const isSelected = selectedId === index;

              return (
                <motion.div
                  layout
                  key={`${project.title}-${index}`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  onClick={() => setSelectedId(isSelected ? null : index)}
                  className={`group relative h-[22rem] md:h-[24rem] cursor-pointer overflow-hidden rounded-3xl glass backdrop-blur-xl border border-white/5 hover:border-accent/40 transition-all duration-300 shadow-xl ${isSelected ? 'ring-2 ring-accent/50' : ''}`}
                >
                  {/* BASE CONTENT */}
                  <div className="p-8 h-full flex flex-col justify-between relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="inline-block px-3 py-1 rounded-lg glass-dark border border-white/5 text-[9px] font-black uppercase tracking-widest text-text-muted group-hover:text-accent group-hover:border-accent/30 transition-colors">
                        {project.category}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center border border-white/5 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                        <FaRocket className="text-accent text-lg" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-text-primary mb-4 leading-tight tracking-tight uppercase group-hover:text-gradient transition-all duration-500">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-[9px] font-black text-text-muted glass-dark px-3 py-1 rounded-full border border-white/5 uppercase tracking-widest">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-widest pt-4 border-t border-white/5">
                      Explore Details <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* ADAPTIVE OVERLAY (Responsive: Swipe/Tap/Hover) */}
                  <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: isSelected ? 0 : "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="absolute inset-0 glass-dark backdrop-blur-2xl p-8 flex flex-col justify-between border-t border-accent/30 z-20"
                  >
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                         <h4 className="text-xl font-black text-white tracking-tighter uppercase">{project.title}</h4>
                         <button className="text-white/40 hover:text-accent md:hidden" onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}>
                            <FaBan size={14} />
                         </button>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-5 md:line-clamp-6">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tech.map((t, i) => (
                          <span key={i} className="text-[9px] font-bold text-accent-secondary opacity-70">#{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-6 relative z-30">
                      {hasSource ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-2 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all border border-white/10 hover:border-accent/40"
                        >
                          <FaGithub /> Source
                        </a>
                      ) : (
                        <div className="flex items-center justify-center gap-2 py-3.5 bg-white/5 text-text-muted rounded-2xl font-black text-[9px] uppercase tracking-widest border border-white/5 cursor-not-allowed opacity-40">
                          <FaBan size={10} /> Private
                        </div>
                      )}

                      {isLive ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-2 py-3.5 bg-signature hover:opacity-90 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl shadow-accent/20 transition-all transform hover:scale-105"
                        >
                          <FaExternalLinkAlt size={10} /> Live Demo
                        </a>
                      ) : (
                        <div className="flex items-center justify-center gap-2 py-3.5 bg-white/10 text-text-muted rounded-2xl font-black text-[9px] uppercase tracking-widest border border-white/10 cursor-not-allowed opacity-50">
                           Pending
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Call to action for more projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a
            href="https://github.com/OrionGD?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl glass-dark border border-white/5 text-text-muted hover:text-accent hover:border-accent/40 transition-all font-bold text-xs uppercase tracking-widest group"
          >
            Explore 20+ Repositories <FaArrowRight size={10} className="group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Internal utility for the CTA
const FaArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default Projects;