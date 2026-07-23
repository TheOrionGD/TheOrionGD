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
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-section-label text-[13px] font-semibold uppercase tracking-[0.08em] mb-6 glass-badge">
            <FaUsers className="animate-pulse" /> Section 09
          </div>
          <h2 className="font-section-heading text-4xl md:text-5xl font-bold mb-6 tracking-[-0.03em]">
            Leadership &amp; <span className="text-black uppercase tracking-tighter">Community Impact</span>
          </h2>
          <div className="w-24 h-1.5 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg, #7B3F00, #B87333)', boxShadow: '0 2px 12px rgba(255,99,99,0.25)' }}></div>
          <p className="max-w-2xl mx-auto font-body-text text-base md:text-[18px] font-normal leading-[1.7]">
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
              className="flex flex-col relative group pt-6"
              style={{ borderTop: '1px solid rgba(190,228,208,0.80)' }}
            >
              {/* Thin neon active top-line indicator */}
              <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[1.5px] transition-all duration-500 rounded-full"
                style={{ background: 'linear-gradient(90deg, #7B3F00, #B87333)' }} />

              <div className="flex justify-between items-center mb-4 select-none">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                    style={{ background: 'rgba(219,255,203,0.80)', border: '1px solid rgba(255,130,130,0.40)' }}>
                    <lead.icon className="text-accent text-lg" />
                  </div>
                  <span className="font-status-badge text-[13px] font-semibold uppercase tracking-[0.06em]">{lead.badge}</span>
                </div>
              </div>

              <h3 className="font-card-title text-xl font-bold mb-4 uppercase tracking-[-0.03em] transition-all duration-300">
                {lead.title}
              </h3>
              
              <p className="font-body-text text-sm md:text-base leading-[1.7]">
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
