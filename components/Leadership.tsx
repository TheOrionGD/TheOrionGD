import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaGraduationCap, FaVrCardboard, FaHandHoldingHeart, FaCalendarAlt } from 'react-icons/fa';

const Leadership: React.FC = () => {
  const leadershipDetails = [
    {
      title: "XR Club Vice President",
      desc: "Directing student initiatives, organizing workshops, and facilitating interactive immersive experience creations at K. Ramakrishnan College of Technology.",
      icon: FaVrCardboard,
      badge: "Visionary Lead"
    },
    {
      title: "AR Workshops Facilitator",
      desc: "Spearheading immersive developer bootcamps. Instructed over 100+ students on Unity engine mechanics, C# spatial mathematics, and ARCore camera tracking.",
      icon: FaGraduationCap,
      badge: "Knowledge Transfer"
    },
    {
      title: "Mentoring Juniors",
      desc: "Advising junior engineering students on full-stack web architectures, applied AI API integrations, and robust database design principles.",
      icon: FaUsers,
      badge: "Peer Mentorship"
    },
    {
      title: "Active NSS Volunteer",
      desc: "Coordinating community impact camps, social awareness programs, and civic service activities representing the National Service Scheme.",
      icon: FaHandHoldingHeart,
      badge: "Civic Duty"
    },
    {
      title: "Events Coordination",
      desc: "Managing high-impact technical symposiums and hackathons, coordinating speaker sessions, venue logistics, and code challenge criteria.",
      icon: FaCalendarAlt,
      badge: "Strategic Operations"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="leadership" className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
            <FaUsers className="animate-pulse" /> Section 09
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6 tracking-tight">
            Leadership &amp; <span className="text-gradient uppercase tracking-tighter">Community Impact</span>
          </h2>
          <div className="w-24 h-1.5 bg-signature mx-auto rounded-full mb-6 shadow-lg shadow-accent/20"></div>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Fostering technical ecosystems, mentoring next-generation engineers, and executing civic service initiatives.
          </p>
        </motion.div>

        {/* Asymmetric Details Layout (Ditched Cards) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto"
        >
          {leadershipDetails.map((lead, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex flex-col relative group pt-6 border-t border-white/10"
            >
              {/* Thin neon active top-line indicator */}
              <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[1.5px] bg-accent transition-all duration-500" />

              <div className="flex justify-between items-center mb-4 select-none">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:scale-105 transition-transform duration-300">
                    <lead.icon className="text-accent text-lg" />
                  </div>
                  <span className="text-[10px] font-black text-accent uppercase tracking-widest">{lead.badge}</span>
                </div>
              </div>

              <h3 className="text-xl font-black text-text-primary mb-4 uppercase tracking-tight group-hover:text-gradient transition-all duration-300">
                {lead.title}
              </h3>
              
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                {lead.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Leadership;
