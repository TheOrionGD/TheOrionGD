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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6 w-fit">
              Section 02 // Narrative
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-8 tracking-tight flex items-center gap-4 uppercase">
              Developer Story 
              <span className="h-1 w-16 bg-accent rounded-full inline-block"></span>
            </h3>
            
            <div className="glass p-6 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
              
              <p className="text-text-secondary leading-relaxed text-base md:text-lg relative z-10">
                I am Godfrey — a Computer Science and Engineering student building scalable software, intelligent systems, and user-focused digital experiences. My journey is fueled by a profound interest in bridging advanced AI capabilities with robust, low-latency architectures.
              </p>
              
              <p className="text-text-secondary leading-relaxed text-sm md:text-base relative z-10 mt-4 opacity-80">
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary text-[10px] font-black uppercase tracking-widest mb-6 w-fit">
              Core Principles
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-8 tracking-tight flex items-center gap-4 uppercase">
              Engineering Mindset
              <span className="h-1 w-16 bg-accent-secondary rounded-full inline-block"></span>
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
                <div key={idx} className="glass-dark p-6 rounded-2xl border border-white/5 hover:border-accent-secondary/30 transition-all duration-300">
                  <h4 className="text-lg font-black text-text-primary mb-2 uppercase tracking-tight">{phi.title}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{phi.desc}</p>
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