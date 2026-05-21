import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CERTIFICATIONS, LEADERSHIP_XR } from '../constants';
import { FaAward, FaUsers, FaCheckCircle, FaFileAlt } from 'react-icons/fa';

const Certifications: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Achievements Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
               <FaAward /> Professional Recognition
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-10 tracking-tight uppercase flex items-center gap-4">
              Certifications
              <span className="h-1 w-12 bg-accent rounded-full hidden md:inline-block"></span>
            </h3>
            
            <div className="space-y-6">
              {CERTIFICATIONS.map((cert, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass p-6 rounded-2xl border border-white/5 hover:border-accent/40 group transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-black text-text-primary uppercase tracking-tight group-hover:text-accent transition-colors">{cert.title}</h4>
                    {cert.year && (
                      <span className="text-[9px] font-black text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full uppercase tracking-widest">
                        {cert.year}
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed opacity-80">{cert.description}</p>
                  
                  {/* Decorative line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/0 group-hover:bg-accent transition-all duration-500"></div>
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
                className="group inline-flex items-center gap-4 px-8 py-4 bg-signature text-white rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest hover:shadow-2xl hover:shadow-accent/30 transition-all active:scale-95"
              >
                <FaFileAlt className="text-lg group-hover:rotate-12 transition-transform" />
                Full Certificate Archive
              </Link>
            </motion.div>
          </motion.div>

          {/* Leadership Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary text-[10px] font-black uppercase tracking-widest mb-6">
               <FaUsers /> Community & Impact
            </div>
             <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-10 tracking-tight uppercase flex items-center gap-4">
              Leadership
              <span className="h-1 w-12 bg-accent-secondary rounded-full hidden md:inline-block"></span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {LEADERSHIP_XR.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ x: 10 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-5 glass-dark p-6 rounded-2xl border border-white/10 hover:border-accent-secondary/40 transition-all duration-300 group shadow-lg shadow-black/20"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-secondary/10 border border-accent-secondary/20 flex items-center justify-center text-accent-secondary shadow-inner group-hover:scale-110 transition-transform">
                    <FaCheckCircle size={18} />
                  </div>
                  <span className="text-text-primary text-[11px] md:text-sm font-black uppercase tracking-wider leading-tight">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;