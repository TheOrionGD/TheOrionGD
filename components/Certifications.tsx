import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CERTIFICATIONS } from '../constants';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { FaAward, FaFileAlt } from 'react-icons/fa';

const Certifications: React.FC = () => {
  const { data } = usePortfolioData();
  const certsList = data.certifications || CERTIFICATIONS;

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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 glass-badge">
               <FaAward /> Section 05 // Proof
            </div>
            <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tight uppercase flex items-center gap-4">
              Proof <span className="text-black">Vault</span>
            </h3>
            
            <div className="mb-10">
              <div className="p-6 rounded-2xl bg-[#EDEDED] shadow-[inset_3px_3px_6px_#DCDCDC,inset_-3px_-3px_6px_#ffffff]">
                <div>
                  <span className="font-space-grotesk text-[9px] font-bold uppercase block mb-2 text-black">PROVING SYSTEMS STATUS // ACTIVE</span>
                  <p className="text-sm md:text-base font-bold font-space-grotesk italic tracking-tight text-black leading-relaxed">
                    &ldquo;Forty certifications across Azure, GenAI, and cybersecurity. A credential is a checkpoint — what matters is what you build with the knowledge after you pass.&rdquo;
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {certsList.map((cert, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <div
                    className="p-6 bg-[#EDEDED] rounded-2xl shadow-[6px_6px_12px_#DCDCDC,-6px_-6px_12px_#ffffff] hover:shadow-[inset_4px_4px_8px_#DCDCDC,inset_-4px_-4px_8px_#ffffff] hover:scale-[0.99] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="pb-3 mb-3 flex justify-between items-start">
                        <div>
                          <span className="font-space-grotesk text-[8px] text-black opacity-60 uppercase block mb-1">PROVED CREDENTIAL</span>
                          <h4 className="text-lg font-bold font-space-grotesk uppercase tracking-tight text-black">
                            {cert.title}
                          </h4>
                        </div>
                        {cert.year && (
                           <span className="font-space-grotesk text-[9px] font-bold px-2.5 py-1 tracking-wider select-none shrink-0 ml-4 rounded-full glass-badge">
                             {cert.year} {"// PASS"}
                          </span>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed text-black">{cert.description}</p>
                    </div>
                  </div>
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
                className="group inline-flex items-center gap-4 px-8 py-4 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest text-black transition-all bg-[#EDEDED] shadow-[4px_4px_8px_#DCDCDC,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#DCDCDC,inset_-2px_-2px_4px_#ffffff] active:scale-95"
              >
                <FaFileAlt className="text-lg group-hover:rotate-12 transition-transform" />
                The Archive // Field Records
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;