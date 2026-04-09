import React from 'react';
import { motion, Variants } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS, EDUCATION, LEADERSHIP_XR } from '../constants';
import { FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.5 + i * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const first_name = PERSONAL_INFO.name.split(' ')[0];
  const last_name = PERSONAL_INFO.name.split(' ').slice(1).join(' ');

  // Typewriter Logic
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  const roles = [
    { prefix: "AI Systems", suffix: " Engineer" },
    { prefix: "XR", suffix: " & Intelligent Interfaces" },
    { prefix: "Full Stack", suffix: " Developer" }
  ];

  useEffect(() => {
    const fullRole = roles[roleIndex].prefix + roles[roleIndex].suffix;

    const handleType = () => {
      if (!isDeleting) {
        if (currentText !== fullRole) {
          setCurrentText(fullRole.substring(0, currentText.length + 1));
          setTypingSpeed(70);
        } else {
          // Pause at the end
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        if (currentText !== '') {
          setCurrentText(fullRole.substring(0, currentText.length - 1));
          setTypingSpeed(40);
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(500); // Pause before next role
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, roles, typingSpeed]);

  const prefixLength = roles[roleIndex].prefix.length;
  const prefixPart = currentText.slice(0, prefixLength);
  const suffixPart = currentText.slice(prefixLength);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-32 overflow-hidden bg-background">
      {/* Background Cinematic Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-secondary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

          {/* LEFT SIDE: TEXT CONTENT */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <div className="relative flex h-2 w-2">
                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></div>
                <div className="relative inline-flex rounded-full h-2 w-2 bg-accent"></div>
              </div>
              <span className="text-sm font-medium text-text-primary tracking-wide">
                Available for New Adventures
              </span>
            </motion.div>

            {/* Name with Staggered Letter Animation */}
            <h1 className="mb-6 flex flex-wrap justify-center lg:justify-start">
              <span className="flex">
                {first_name.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    className="text-text-primary uppercase tracking-tighter"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="mx-4"></span>
              <span className="flex">
                {last_name.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i + first_name.length}
                    variants={letterVariants}
                    className="text-gradient uppercase tracking-tighter"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Role Text with Typewriter Effect */}
            <motion.div
              variants={itemVariants}
              className="h-16 mb-6 flex items-center justify-center lg:justify-start"
            >
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                <span className="text-accent-secondary">{prefixPart}</span>
                <span className="text-text-secondary">{suffixPart}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    ease: "linear",
                    times: [0, 0.5] 
                  }}
                  className="ml-1 text-accent inline-block"
                >
                  |
                </motion.span>
              </h2>
            </motion.div>

            {/* Description & Metadata */}
            <motion.div variants={itemVariants} className="max-w-xl mb-10 space-y-4">
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                Hi, I'm Godfrey. I bridge the gap between complex engineering and intuitive design to build AI-powered applications that make a real-world impact.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm font-medium text-text-secondary">
                <span className="px-3 py-1 rounded-md glass-dark">{EDUCATION[0].degree}</span>
                <span className="px-3 py-1 rounded-md glass-dark">{LEADERSHIP_XR[0]}</span>
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-accent-secondary" /> {PERSONAL_INFO.location.split(',')[0]}
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
            >
              <a
                href="#projects"
                className="group relative px-8 py-4 rounded-full bg-accent text-white font-bold text-lg transition-all duration-300 hover:scale-105 neon-glow-red overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  View My Work <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a
                href="/assets/resume.pdf"
                className="px-8 py-4 rounded-full border-2 border-accent/30 text-accent font-bold text-lg transition-all duration-300 hover:bg-accent/10 hover:border-accent/60"
              >
                Download CV
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex justify-center lg:justify-start gap-8"
            >
              {SOCIAL_LINKS.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-text-secondary transition-colors duration-300 hover:text-accent flex items-center gap-2 text-sm font-semibold group"
                >
                  <link.icon className="text-xl group-hover:scale-120 transition-transform" />
                  <span className="hidden sm:inline">{link.label}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: PROFILE IMAGE & DECORATIONS */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Layered Glow Rings */}
            <div className="absolute inset-[-5%] rounded-full bg-linear-to-tr from-accent via-accent-secondary to-accent opacity-20 blur-3xl animate-pulse-glow" />

            <div className="relative animate-float">
              {/* Inner Ring */}
              <div className="absolute inset-[-4px] rounded-full bg-linear-to-tr from-accent via-accent-secondary to-accent opacity-50" />

              {/* Profile Image Container */}
              <div className="relative aspect-square w-64 md:w-80 lg:w-96 rounded-full overflow-hidden border-4 border-surface shadow-2xl z-10 bg-surface">
                <img
                  src="/assets/DreamGen.jpg"
                  alt="Godfrey T R"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badges */}
              <motion.div
                className="absolute top-0 -left-8 glass px-4 py-2 rounded-xl flex items-center gap-2 z-20 shadow-xl border-accent-secondary/30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-2 h-2 rounded-full bg-accent-secondary shadow-[0_0_8px_#F2674A]" />
                <span className="text-xs font-bold tracking-wider text-text-primary">📍 TRICHY, INDIA</span>
              </motion.div>

              <motion.div
                className="absolute bottom-12 -right-8 glass px-4 py-2 rounded-xl flex items-center gap-2 z-20 shadow-xl border-accent/30"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#FC3A45]" />
                <span className="text-xs font-bold tracking-wider text-text-primary">B.TECH CSE &apos;27</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;