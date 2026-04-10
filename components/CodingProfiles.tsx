import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';
import { FaGithub, FaHackerrank, FaExternalLinkAlt } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const CodingProfiles: React.FC = () => {
  const platforms = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: PERSONAL_INFO.github,
      username: '@OrionGD',
      description: 'Repositories, open-source contributions, and technical documentation.'
    },
    {
      name: 'LeetCode',
      icon: SiLeetcode,
      url: PERSONAL_INFO.leetcode,
      username: 'OrionGD',
      description: 'Problem solving, algorithmic challenges, and data structure mastery.'
    },
    {
      name: 'HackerRank',
      icon: FaHackerrank,
      url: PERSONAL_INFO.hackerrank,
      username: '@OrionGD07',
      description: 'Verified skills, technical assessments, and competitive coding.'
    }
  ];

  return (
    <section id="coding-hub" className="py-24 bg-background-deep relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-accent-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
            Global Activity
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4">
            Coding <span className="text-gradient uppercase tracking-tighter">Ecosystem</span>
          </h2>
          <div className="w-24 h-1.5 bg-signature mx-auto rounded-full mb-10 shadow-lg shadow-accent/20"></div>
          <p className="text-text-secondary max-w-xl mx-auto text-base md:text-lg leading-relaxed px-4">
            Explore my live activity and problem-solving progress across various industry-standard platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4 md:px-0">
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="group block p-8 rounded-[2.5rem] glass-dark border border-white/5 transition-all duration-500 hover:border-accent/40 relative overflow-hidden shadow-2xl"
            >
              {/* Decorative inner glow */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
              
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 rounded-2xl bg-background-deep/50 border border-white/5 flex items-center justify-center shadow-inner text-text-muted group-hover:text-accent group-hover:border-accent/30 group-hover:scale-110 transition-all duration-500">
                  <platform.icon size={32} />
                </div>
                <div className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                  <FaExternalLinkAlt className="text-accent" size={12} />
                </div>
              </div>
              
              <h3 className="text-2xl font-black text-text-primary mb-1 uppercase tracking-tight group-hover:text-gradient transition-all duration-300">
                {platform.name}
              </h3>
              <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-6">{platform.username}</p>
              
              <p className="text-text-secondary text-sm leading-relaxed mb-8 opacity-80 line-clamp-3">
                {platform.description}
              </p>

              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-accent transition-all duration-300">
                Visit Profile 
                <span className="w-8 h-px bg-white/10 group-hover:bg-accent group-hover:w-16 transition-all duration-500"></span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;