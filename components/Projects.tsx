import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { FaGithub, FaExternalLinkAlt, FaEllipsisH, FaClock, FaRocket, FaBan, FaFilter } from 'react-icons/fa';

const Projects: React.FC = () => {
  const categories = ['All', 'AI / ML', 'Systems', 'Web', 'Cybersecurity', 'UI/UX', 'XR'];
  const [activeCategory, setActiveCategory] = useState('All');

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
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.2 } }
  };

  const detailVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.4 }
    }
  };

  return (
    <section id="projects" className="py-24 bg-transparent relative">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(252,58,69,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest mb-4">
            <FaRocket className="animate-bounce" /> Creative Works
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-4 tracking-tight drop-shadow-sm">
            Project Portfolio
          </h2>
          <div className="w-24 h-1.5 bg-signature mx-auto rounded-full mb-10 shadow-lg shadow-accent/20"></div>

          {/* Category Filter Navigation */}
          <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
            <div className="flex items-center gap-2 mr-2 text-text-muted text-xs font-bold uppercase tracking-tighter">
              <FaFilter size={10} /> Filter By:
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-500 ${activeCategory === cat
                    ? 'text-white scale-110'
                    : 'text-text-secondary hover:text-text-primary'
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => {
              const isLive = project.demo && project.demo !== "#";
              const hasSource = project.github && project.github !== "#";

              return (
                <motion.div
                  layout
                  key={`${project.title}-${index}`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  whileHover={{ y: -5 }}
                  transition={{
                    layout: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="group relative h-[24rem] cursor-pointer overflow-hidden rounded-3xl bg-surface/80 backdrop-blur-xl border border-border/20 hover:border-accent/30 transition-colors shadow-xl"
                >
                  {/* BASE CONTENT (Always Visible) */}
                  <div className="p-8 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="inline-block px-3 py-1 rounded-lg bg-background/50 border border-border/20 text-text-secondary text-[10px] font-black uppercase tracking-widest transition-colors group-hover:text-accent group-hover:border-accent/40">
                        {project.category}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center backdrop-blur-md border border-accent/20 group-hover:scale-110 transition-transform duration-500">
                        <FaRocket className="text-accent text-lg" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-text-primary mb-4 leading-tight tracking-tight">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-[9px] font-black text-text-muted bg-background/30 px-3 py-1 rounded-full border border-border/10 uppercase tracking-widest">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-widest pt-4 border-t border-border/10">
                      Learn More <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* HOVER OVERLAY (Slides Up) */}
                  <motion.div 
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="absolute inset-0 bg-background-deep/95 backdrop-blur-2xl p-8 flex flex-col justify-between border-t border-accent/20 z-20"
                  >
                    <div className="flex-1">
                      <h4 className="text-xl font-black text-white mb-2 tracking-tight border-b border-accent/20 pb-2">{project.title}</h4>
                      <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-6">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tech.map((t, i) => (
                          <span key={i} className="text-[9px] font-bold text-accent-secondary opacity-80">#{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-6">
                      {hasSource ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/10 hover:border-accent/50"
                        >
                          <FaGithub /> Source
                        </a>
                      ) : (
                        <div className="flex items-center justify-center gap-2 py-3 bg-white/5 text-text-muted rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/5 cursor-not-allowed opacity-50">
                          <FaBan size={10} /> Private
                        </div>
                      )}

                      {isLive ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 py-3 bg-signature hover:opacity-90 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-accent/20 transition-all transform hover:scale-105"
                        >
                          <FaExternalLinkAlt size={10} /> View Demo
                        </a>
                      ) : (
                        <div className="flex items-center justify-center gap-2 py-3 bg-white/10 text-text-muted rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/10 cursor-not-allowed opacity-60">
                          <FaClock size={10} /> Pending
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
          className="mt-20 text-center"
        >
          <a
            href="https://github.com/OrionGD?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="text-text-muted hover:text-accent transition-colors font-bold text-sm flex items-center justify-center gap-2 group"
          >
            See all 15+ repositories on GitHub <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
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