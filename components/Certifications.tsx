import React from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATIONS, LEADERSHIP_XR } from '../constants';
import { FaAward, FaUsers } from 'react-icons/fa';

const Certifications: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Achievements Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-3">
              <FaAward className="text-accent" />
              Certifications & Achievements
            </h3>
            
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, index) => (
                <div 
                  key={index}
                  className="bg-surface/60 border-l-4 border-accent p-6 rounded-r-xl hover:bg-surface/80 transition-colors shadow-sm"
                >
                  <h4 className="text-lg font-bold text-text-primary mb-2">{cert.title}</h4>
                  {cert.year && <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded mb-2 inline-block">{cert.year}</span>}
                  <p className="text-text-secondary text-sm mt-1">{cert.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Leadership Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-3">
              <FaUsers className="text-accent" />
              Leadership & XR
            </h3>
            
            <div className="grid gap-4">
              {LEADERSHIP_XR.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 bg-surface/60 p-5 rounded-xl border border-border hover:border-accent transition-all shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent flex items-center justify-center text-accent font-bold shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-text-secondary font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;