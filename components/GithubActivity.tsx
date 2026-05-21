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
          className="max-w-5xl mx-auto bg-[#0F172A] border border-[#1F2937] rounded-2xl p-6 md:p-10 shadow-xl"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-8 border-b border-[#1F2937]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#22C55E] flex items-center justify-center text-black">
                <FaGithub size={28} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#E2E8F0]">
                  GitHub Contributions
                </h2>
                <p className="text-sm text-[#94A3B8]">
                  @OrionGD • Live open-source activity
                </p>
              </div>
            </div>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-[#22C55E] hover:text-[#16A34A] transition-colors"
            >
              View GitHub Profile ↗
            </a>
          </div>

          {/* Live Contribution Graph */}
          <div className="flex justify-center overflow-hidden">
            <img
              src="https://ghchart.rshah.org/OrionGD"
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
