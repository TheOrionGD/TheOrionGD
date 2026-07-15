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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEDED] text-black font-space-grotesk text-[10px] font-bold tracking-widest uppercase mb-4 shadow-[inset_2px_2px_5px_#DCDCDC,inset_-2px_-2px_5px_#ffffff]">
            Live Activity // Credentials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4 tracking-tight uppercase">
            Coding Ecosystem
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-black">
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
                  <span className="text-[9px] font-space-grotesk font-bold uppercase tracking-widest text-black opacity-60">
                    {platform.statsLabel}
                  </span>
                </div>

                {/* Title & Username */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold font-space-grotesk uppercase tracking-tight text-black">
                    {platform.name}
                  </h3>
                  <p className="text-[10px] font-space-grotesk font-bold uppercase tracking-wider text-black">
                    {platform.username}
                  </p>
                </div>

                {/* Description */}
                <p className="text-black text-xs leading-relaxed mb-6">
                  {platform.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {platform.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[9px] font-space-grotesk font-bold uppercase tracking-wider px-2 py-0.5 rounded-full glass-badge"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link Indicator */}
              <div className="flex items-center justify-between text-[10px] font-bold font-space-grotesk uppercase tracking-widest text-black mt-4">
                <span>Explore Profile</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;