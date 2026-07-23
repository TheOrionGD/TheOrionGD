import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { FaGithub, FaHackerrank, FaArrowRight } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const CodingProfiles: React.FC = () => {
  const { data } = usePortfolioData();
  const info = data.personalInfo || {};

  const platforms = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: info.github || "",
      username: '@TheOrionGD',
      description: 'Repositories, open-source contributions, architecture explorations, and full-stack systems.',
      tags: ['Open Source', 'Full Stack', 'AI Systems', 'Architecture'],
      statsLabel: 'Codebase Repository'
    },
    {
      name: 'LeetCode',
      icon: SiLeetcode,
      url: info.leetcode || "",
      username: '@OrionGD',
      description: 'Problem solving, algorithmic challenges, dynamic programming, and data structure mastery.',
      tags: ['Algorithms', 'Data Structures', 'Problem Solving', 'DP'],
      statsLabel: 'Algorithmic Mastery'
    },
    {
      name: 'HackerRank',
      icon: FaHackerrank,
      url: info.hackerrank || "",
      username: '@OrionGD07',
      description: 'Verified technical skills, competitive coding assessments, and language proficiency certifications.',
      tags: ['Verified Skills', 'Competitions', 'Certifications', 'SQL & C++'],
      statsLabel: 'Technical Credentials'
    }
  ];

  return (
    <section id="coding-hub" className="py-12 border-t border-[#D3D3D3] bg-transparent text-black">
      <div className="container mx-auto px-6 max-w-5xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDEDED] text-black font-section-label text-[13px] font-semibold tracking-[0.08em] uppercase mb-4 shadow-[inset_2px_2px_5px_#DCDCDC,inset_-2px_-2px_5px_#ffffff]">
            Live Activity // Credentials
          </div>
          <h2 className="font-section-heading text-4xl md:text-5xl font-bold mb-4 tracking-[-0.03em] uppercase">
            Coding Ecosystem
          </h2>
          <p className="max-w-xl font-body-text text-base md:text-[18px] font-normal leading-[1.7] text-black">
            Explore my continuous algorithmic problem-solving, open-source repositories, and verified technical credentials across industry-standard platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 bg-[#EDEDED] rounded-2xl shadow-[6px_6px_12px_#DCDCDC,-6px_-6px_12px_#ffffff] hover:shadow-[inset_4px_4px_8px_#DCDCDC,inset_-4px_-4px_8px_#ffffff] hover:scale-[0.98] transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                {/* Header: Icon & Stats Label */}
                <div className="flex justify-between items-start mb-6">
                  <div className="text-black">
                    <platform.icon size={26} />
                  </div>
                  <span className="font-small-label text-[11px] font-medium uppercase tracking-[0.12em] text-black opacity-60">
                    {platform.statsLabel}
                  </span>
                </div>

                {/* Title & Username */}
                <div className="mb-4">
                  <h3 className="font-card-title text-xl font-bold uppercase tracking-[-0.03em] text-black">
                    {platform.name}
                  </h3>
                  <p className="font-card-subtitle text-xs font-normal uppercase tracking-wider text-black">
                    {platform.username}
                  </p>
                </div>

                {/* Description */}
                <p className="font-body-text text-sm sm:text-base leading-[1.7] text-black mb-6">
                  {platform.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {platform.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="font-status-badge text-[13px] font-semibold tracking-[0.06em] uppercase px-3 py-1 rounded-full glass-badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link Indicator */}
              <div className="flex items-center justify-between font-space-grotesk text-xs font-bold uppercase tracking-[0.02em] text-black mt-4">
                <span>View Profile</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300 text-xs text-black" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;