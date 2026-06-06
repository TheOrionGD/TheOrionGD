import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CERTIFICATIONS } from '../constants';
import { FaAward, FaFileAlt } from 'react-icons/fa';

const Certifications: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Achievements Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
        </div>
      </div>
    </section>
  );
};

export default Certifications;