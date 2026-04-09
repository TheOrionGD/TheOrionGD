import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-text-primary mb-4">Professional Experience</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="mb-12 relative pl-8 md:pl-0"
            >
              {/* Timeline Line for Desktop */}
              <div className="hidden md:block absolute left-[50%] top-0 bottom-[-48px] w-px bg-border -translate-x-1/2"></div>
              
              <div className={`md:flex items-center justify-between ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className="md:w-5/12"></div>
                
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 w-8 h-8 rounded-full bg-background border-4 border-accent z-10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-text-primary rounded-full"></div>
                </div>

                <div className="md:w-5/12 bg-surface/60 backdrop-blur-sm border border-border p-6 rounded-xl hover:border-accent transition-all hover:shadow-lg hover:shadow-accent/10">
                  <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs rounded-full mb-3">
                    {exp.period}
                  </span>
                  <h3 className="text-xl font-bold text-text-primary mb-1">{exp.role}</h3>
                  <h4 className="text-text-secondary text-sm mb-4">{exp.company}</h4>
                  <ul className="space-y-2">
                    {exp.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-text-secondary text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;