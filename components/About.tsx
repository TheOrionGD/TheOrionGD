import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 relative bg-surface">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-accent rounded-full"></span>
              About Me
            </h3>
            <div className="bg-background/80 backdrop-blur-sm border border-border/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <p className="text-text-secondary leading-relaxed text-lg">
                I build intelligent, user centric software systems using full stack development, AI integration, and strong UX principles. A concise, high impact statement that immediately communicates your core value.
              </p>
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
             <h3 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-accent rounded-full"></span>
              Education
            </h3>
            <div className="space-y-6">
              {EDUCATION.map((edu, _index) => (
                <div key={edu.degree} className="relative pl-8 border-l-2 border-border/30">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-accent"></div>
                  <h4 className="text-xl font-semibold text-text-primary">{edu.degree}</h4>
                  <p className="text-accent text-sm mb-1">{edu.institution}</p>
                  <p className="text-text-secondary text-xs">{edu.period}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;