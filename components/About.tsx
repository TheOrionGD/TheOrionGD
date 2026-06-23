import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Column 1: The Narrative / Developer Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 w-fit"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.20)', color: '#4f46e5' }}>
              Section 02 // Narrative
            </div>
            <h3 className="text-3xl md:text-4xl font-black mb-8 tracking-tight flex items-center gap-4 uppercase"
              style={{ color: '#0f172a' }}>
              Developer Story 
              <span className="h-1 w-16 rounded-full inline-block" style={{ background: 'linear-gradient(90deg, #6366f1, #7c3aed)' }}></span>
            </h3>
            
            <div className="p-6 sm:p-10 rounded-[2.5rem] relative overflow-hidden group"
              style={{
                background: 'rgba(255,255,255,0.90)',
                border: '1px solid rgba(99,102,241,0.12)',
                boxShadow: '0 8px 32px rgba(99,102,241,0.08)',
                backdropFilter: 'blur(16px)'
              }}>
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl transition-colors"
                style={{ background: 'rgba(99,102,241,0.06)' }} />
              
              <p className="leading-relaxed text-base md:text-lg relative z-10" style={{ color: '#334155' }}>
                I am Godfrey — a Computer Science and Engineering student building scalable software, intelligent systems, and user-focused digital experiences. My journey is fueled by a profound interest in bridging advanced AI capabilities with robust, low-latency architectures.
              </p>
              
              <p className="leading-relaxed text-sm md:text-base relative z-10 mt-4" style={{ color: '#64748b' }}>
                From designing real-world patented hardware control systems to architecting AI-adaptive MERN stack learning engines, I specialize in transforming conceptual challenges into reliable, deployable codebases. I focus on modular engineering, strong security structures, and high-performance WebGL/spatial platforms.
              </p>
            </div>
          </motion.div>

          {/* Column 2: Engineering Philosophy & Directives */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 w-fit"
              style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.20)', color: '#7c3aed' }}>
              Core Principles
            </div>
            <h3 className="text-3xl md:text-4xl font-black mb-8 tracking-tight flex items-center gap-4 uppercase"
              style={{ color: '#0f172a' }}>
              Engineering Mindset
              <span className="h-1 w-16 rounded-full inline-block" style={{ background: 'linear-gradient(90deg, #7c3aed, #6366f1)' }}></span>
            </h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "⚡ Zero-Friction UX",
                  desc: "Designing highly optimized, responsive client-side interfaces. Prioritizing instant load speeds, 120 FPS animations, and fluid responsive touch controls."
                },
                {
                  title: "⚙️ Scalable by Design",
                  desc: "Engineering highly modular code, strict component encapsulation, and robust role-based access control platforms (RBAC) right from day one."
                },
                {
                  title: "🤖 AI as a Utility Multiplier",
                  desc: "Integrating large language models (LLMs) and cognitive translation APIs as native, deeply embedded backend utilities to solve actual workflow friction."
                }
              ].map((phi, idx) => (
                <div key={idx}
                  className="p-6 rounded-2xl transition-all duration-300 group"
                  style={{
                    background: 'rgba(255,255,255,0.80)',
                    border: '1px solid rgba(99,102,241,0.10)',
                    boxShadow: '0 2px 12px rgba(99,102,241,0.06)'
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.30)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.10)'}
                >
                  <h4 className="text-lg font-black mb-2 uppercase tracking-tight" style={{ color: '#0f172a' }}>{phi.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{phi.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;