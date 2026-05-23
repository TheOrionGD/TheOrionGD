import React from 'react';
import { motion, Variants, useMotionValue, useTransform } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS, EDUCATION, LEADERSHIP_XR } from '../constants';
import { FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const roles = [
  { prefix: "XR", suffix: " Systems Engineer" },
  { prefix: "AI", suffix: " Solutions Developer" },
  { prefix: "Full Stack", suffix: " Architect" },
  { prefix: "Creative", suffix: " Technologist" },
  { prefix: "Immersive", suffix: " Experience Designer" },
  { prefix: "Human-Centered", suffix: " Innovator" },
  { prefix: "Cyber", suffix: " Interface Engineer" },
  { prefix: "Visionary", suffix: " Problem Solver" },
  { prefix: "Next-Gen", suffix: " Software Engineer" },
  { prefix: "Interactive", suffix: " Systems Developer" }
];

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
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  const prefixLength = roles[roleIndex].prefix.length;
  const prefixPart = currentText.slice(0, prefixLength);
  const suffixPart = currentText.slice(prefixLength);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [15, -15]);
  const rotateY = useTransform(x, [-200, 200], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-32 pb-24 md:pt-24 md:pb-32 overflow-hidden w-full">
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16 lg:gap-24">

          {/* LEFT SIDE: TEXT CONTENT */}
          <motion.div
            className="flex-1 text-center lg:text-left order-2 lg:order-1 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 md:mb-8 border border-accent/20"
            >
              <div className="relative flex h-2 w-2">
                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></div>
                <div className="relative inline-flex rounded-full h-2 w-2 bg-accent shadow-[0_0_8px_rgba(252,58,69,0.8)]"></div>
              </div>
              <span className="text-[10px] md:text-sm font-bold text-text-primary uppercase tracking-widest">
                Available for Opportunities
              </span>
            </motion.div>

            {/* Name with Staggered Letter Animation */}
            <h1 className="mb-6 flex flex-wrap justify-center lg:justify-start text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-black">
              <span className="flex drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                {first_name.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    className="text-white uppercase tracking-tighter"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="mx-3 md:mx-4"></span>
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
              className="h-16 md:h-16 mb-6 flex items-center justify-center lg:justify-start"
            >
              <h2 className="text-xl md:text-3xl font-semibold tracking-tight">
                <span className="text-white">{prefixPart}</span>
                <span className="text-accent">{suffixPart}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.5]
                  }}
                  className="ml-1 text-accent inline-block shadow-[0_0_10px_rgba(252,58,69,0.8)]"
                >
                  |
                </motion.span>
              </h2>
            </motion.div>

            {/* Description & Metadata */}
            <motion.div variants={itemVariants} className="max-w-xl mb-10 space-y-6">
              <p className="text-base md:text-xl text-text-secondary leading-relaxed mx-auto lg:mx-0">
                I’m Godfrey — a Computer Science and Engineering student building scalable software, intelligent systems, and user-focused digital experiences.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-[10px] md:text-sm font-black uppercase tracking-widest">
                <span className="px-3 py-1 rounded-lg bg-accent/5 border border-accent/20 text-accent/90 shadow-[0_0_10px_rgba(252,58,69,0.1)]">{EDUCATION[0].degree}</span>
                <span className="px-3 py-1 rounded-lg bg-accent/5 border border-accent/20 text-accent/90 shadow-[0_0_10px_rgba(252,58,69,0.1)]">{LEADERSHIP_XR[0]}</span>
                <span className="flex items-center gap-2 text-text-muted">
                  <FaMapMarkerAlt className="text-accent" /> {PERSONAL_INFO.location.split(',')[0]}
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6"
            >
              <a
                href="#projects"
                className="w-full sm:w-auto group relative px-8 py-4 rounded-2xl bg-accent text-white font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(252,58,69,0.4)] overflow-hidden text-center"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  View Projects <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl border-2 border-accent/30 text-white font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_15px_rgba(252,58,69,0.2)] text-center"
              >
                Download Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex justify-center lg:justify-start gap-6 md:gap-8"
            >
              {SOCIAL_LINKS.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-text-secondary transition-all duration-300 hover:text-accent flex items-center gap-3 text-xs font-black uppercase tracking-widest group"
                >
                  <link.icon className="text-xl group-hover:scale-120 transition-transform drop-shadow-[0_0_8px_rgba(252,58,69,0)] group-hover:drop-shadow-[0_0_8px_rgba(252,58,69,0.8)]" />
                  <span className="hidden sm:inline-block">{link.label}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: 3D PROFILE IMAGE & DECORATIONS */}
          <motion.div
            className="relative order-1 lg:order-2 perspective-[1000px] w-44 h-44 xs:w-48 xs:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 z-20 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="w-full h-full relative"
            >
              {/* Holographic Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-15%] rounded-full border border-accent/30 border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-8%] rounded-full border-2 border-accent-secondary/10"
              />

              {/* Orbiting Tech Badges */}
              <motion.div
                className="absolute inset-[-25%] z-30 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              >
                {['React', 'AI', 'XR', 'Java', 'Unity', 'Python'].map((tech, index) => {
                  const angle = index * 60;
                  return (
                    <div
                      key={tech}
                      className="absolute top-0 left-1/2 w-16 h-1/2 origin-bottom -ml-8"
                      style={{ transform: `rotate(${angle}deg)` }}
                    >
                      <motion.div
                        className="w-full h-8 mt-0 flex items-center justify-center bg-[#020810]/90 backdrop-blur-md border border-accent/40 rounded-full text-[10px] md:text-xs font-black text-white shadow-[0_0_15px_rgba(252,58,69,0.4)] tracking-widest uppercase"
                        animate={{ rotate: [-angle, -360 - angle] }}
                        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                      >
                        {tech}
                      </motion.div>
                    </div>
                  )
                })}
              </motion.div>

              {/* Inner Glowing Ring */}
              <div className="absolute inset-[-4px] rounded-full bg-linear-to-tr from-accent via-accent-secondary to-accent opacity-50 shadow-[0_0_40px_rgba(252,58,69,0.6)]" />

              {/* Profile Image Container */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#020810] shadow-[0_0_50px_rgba(252,58,69,0.15)] bg-[#020810] group">
                <img
                  src="/assets/DreamGen.jpg"
                  alt="Godfrey T R"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Cyberpunk Scan-line overlay */}
                <motion.div
                  className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(252,58,69,0.15)_50%,transparent_100%)] h-[15%] w-full"
                  animate={{ top: ['-20%', '120%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Static Badges (Re-positioned slightly outward to avoid clipping with orbital ring) */}
              <motion.div
                className="absolute top-4 -left-6 sm:-left-8 md:-left-12 glass px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2 z-40 shadow-xl border-accent-secondary/30 pointer-events-none"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent-secondary shadow-[0_0_8px_#F2674A]" />
                <span className="text-[8px] md:text-xs font-bold tracking-wider text-white whitespace-nowrap uppercase">📍 Trichy, India</span>
              </motion.div>

              <motion.div
                className="absolute bottom-12 -right-6 sm:-right-8 md:-right-12 glass px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2 z-40 shadow-xl border-accent/30 pointer-events-none"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent shadow-[0_0_8px_#FC3A45]" />
                <span className="text-[8px] md:text-xs font-bold tracking-wider text-white whitespace-nowrap uppercase">B.Tech CSE &apos;27</span>
              </motion.div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;