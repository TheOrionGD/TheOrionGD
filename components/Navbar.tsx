import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Navbar: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Intersection Observer for ScrollSpy
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Adjusted to catch sections more reliably in view
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['about', 'experience', 'skills', 'projects', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Hamburger animation variants
  const topVariants: Variants = {
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: 45, translateY: 9 },
  };

  const middleVariants: Variants = {
    closed: { opacity: 1, translateX: 0 },
    opened: { opacity: 0, translateX: 20 },
  };

  const bottomVariants: Variants = {
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: -45, translateY: -9 },
  };

  const menuVariants: Variants = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeInOut' } },
    opened: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <>
      {/* Backdrop for Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[45] md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? 'bg-background/90 backdrop-blur-md border-b border-border/20 py-4 shadow-sm'
            : 'bg-background/80 backdrop-blur-sm py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/godfrey192607"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden glass border border-accent/30 shadow-2xl hover:border-accent hover:shadow-accent/20 transition-all duration-300 hover:scale-110 active:scale-95 group"
            title="Visit my LinkedIn"
          >
            <img 
              src="/assets/favicon.png" 
              alt="LinkedIn Profile" 
              className="w-full h-full object-cover"
            />
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('home');
            }}
            className="text-2xl font-bold text-gradient hover:scale-105 transition-transform hidden sm:inline-block"
          >
            OrionGD
          </a>
        </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-bold transition-all relative group uppercase tracking-widest ${
                    isActive ? 'text-accent' : 'text-text-secondary hover:text-accent'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-0.5 bg-accent transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </a>
              );
            })}
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full bg-accent hover:opacity-90 text-white font-black text-xs uppercase tracking-widest transition-all hover:scale-105 neon-glow-red"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10 rounded-xl glass border border-accent/20 transition-all focus:outline-none z-[60]"
            aria-label="Toggle menu"
          >
            <motion.span
              variants={topVariants}
              animate={isOpen ? 'opened' : 'closed'}
              className="w-6 h-0.5 bg-accent rounded-full origin-center"
            ></motion.span>
            <motion.span
              variants={middleVariants}
              animate={isOpen ? 'opened' : 'closed'}
              className="w-6 h-0.5 bg-accent rounded-full"
            ></motion.span>
            <motion.span
              variants={bottomVariants}
              animate={isOpen ? 'opened' : 'closed'}
              className="w-6 h-0.5 bg-accent rounded-full origin-center"
            ></motion.span>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/20 py-8 px-6 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col gap-6 items-center">
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.a
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-black transition-colors uppercase tracking-[0.2em] ${
                        isActive ? 'text-accent' : 'text-text-primary hover:text-accent'
                      }`}
                    >
                      {link.name}
                    </motion.a>
                  );
                })}
                <motion.a
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-4 rounded-2xl bg-signature text-white font-black text-sm uppercase tracking-[0.3em] neon-glow-red mt-4 shadow-xl"
                >
                  Get In Touch
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Scroll to Top Logic */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-full glass border border-accent/40 flex items-center justify-center text-accent hover:scale-110 active:scale-95 transition-all shadow-xl shadow-accent/20"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;