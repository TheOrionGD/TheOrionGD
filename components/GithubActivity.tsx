import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';
import { FaGithub } from 'react-icons/fa';

const GithubActivity: React.FC = () => {
  return (
    <section id="github-activity" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-[2rem] p-6 md:p-10 shadow-xl"
          style={{ background: 'rgba(255,255,255,0.90)', border: '1px solid rgba(99,102,241,0.12)', boxShadow: '0 8px 32px rgba(99,102,241,0.10)', backdropFilter: 'blur(16px)' }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-8"
            style={{ borderBottom: '1px solid rgba(99,102,241,0.10)' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', color: '#4f46e5' }}>
                <FaGithub size={28} />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: '#0f172a' }}>
                  GitHub Contributions
                </h2>
                <p className="text-xs uppercase tracking-widest mt-1" style={{ color: '#64748b' }}>
                  @OrionGD • Live open-source activity
                </p>
              </div>
            </div>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-black uppercase tracking-widest transition-colors hover:opacity-85"
              style={{ color: '#4f46e5' }}
            >
              View GitHub Profile ↗
            </a>
          </div>

          {/* Live Contribution Graph (Indigo themed) */}
          <div className="flex justify-center overflow-hidden">
            <img
              src="https://ghchart.rshah.org/6366f1/OrionGD"
              alt="GitHub contribution graph for OrionGD"
              className="w-full max-w-4xl"
              loading="lazy"
            />
          </div>

          <p className="mt-6 text-xs text-[#64748B] italic text-center">
            Live data sourced directly from GitHub — updated automatically.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubActivity;
