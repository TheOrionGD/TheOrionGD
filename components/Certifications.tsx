import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CERTIFICATIONS } from '../constants';
import { FaAward, FaFileAlt } from 'react-icons/fa';

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Achievements Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.20)', color: '#4f46e5' }}>
               <FaAward /> Professional Recognition
            </div>
            <h3 className="text-3xl md:text-4xl font-black mb-10 tracking-tight uppercase flex items-center gap-4"
              style={{ color: '#0f172a' }}>
              Certifications
              <span className="h-1 w-12 rounded-full hidden md:inline-block"
                style={{ background: 'linear-gradient(90deg, #6366f1, #7c3aed)' }}></span>
            </h3>
            
            <div className="space-y-6">
              {CERTIFICATIONS.map((cert, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl relative overflow-hidden group transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(99,102,241,0.10)',
                    boxShadow: '0 2px 12px rgba(99,102,241,0.06)'
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.35)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.10)'}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-black uppercase tracking-tight transition-colors group-hover:text-indigo-600"
                      style={{ color: '#0f172a' }}>
                      {cert.title}
                    </h4>
                    {cert.year && (
                      <span className="text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ml-2 shrink-0"
                        style={{ color: '#4f46e5', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.20)' }}>
                        {cert.year}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{cert.description}</p>
                  
                  {/* Decorative left accent line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                    style={{ background: 'linear-gradient(180deg, #6366f1, #7c3aed)' }}></div>
                </motion.div>
              ))}
            </div>

            {/* Full Certificate Archive Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <Link
                to="/certificates"
                className="group inline-flex items-center gap-4 px-8 py-4 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest text-white transition-all active:scale-95 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                  boxShadow: '0 4px 20px rgba(99,102,241,0.30)'
                }}
              >
                <FaFileAlt className="text-lg group-hover:rotate-12 transition-transform" />
                Full Certificate Archive
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;