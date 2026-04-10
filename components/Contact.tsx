import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, Variants } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCopy, FaCheck, FaPaperPlane } from 'react-icons/fa';

/**
 * Magnetic element component for premium interactivity
 * Automatically disables on mobile for better UX
 */
const MagneticElement: FC<{ children: React.ReactNode; strength?: number }> = ({ children, strength = 0.4 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isMobile) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: isMobile ? 0 : springX, y: isMobile ? 0 : springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

const Contact: FC = () => {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "fc881cfb-436b-4b5b-a54f-9a135b7b07a2");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <footer id="contact" className="relative bg-background-deep pt-24 md:pt-32 pb-12 overflow-hidden border-t border-border/10">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-20"
        >
          {/* Left: Interactive Info */}
          <div>
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
              Let&apos;s Connect
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black text-text-primary mb-6 tracking-tight uppercase">
              Ready to <span className="text-gradient">Collab?</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-text-secondary text-base md:text-lg mb-12 max-w-md leading-relaxed opacity-80">
              Whether you have a specific project in mind or just want to explore possibilities, I&apos;m always open to new adventures and technical challenges.
            </motion.p>

            <div className="space-y-6">
              {/* Email Card */}
              <motion.div variants={itemVariants}>
                <div
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="group relative flex items-center gap-5 p-5 rounded-[2rem] glass border border-white/5 cursor-pointer hover:border-accent/40 transition-all duration-300 overflow-hidden"
                >
                  <div className="w-14 h-14 rounded-2xl bg-background-deep border border-white/5 flex items-center justify-center text-accent text-xl group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Direct Outreach</p>
                    <p className="text-text-primary font-black text-sm md:text-base tracking-tight">{PERSONAL_INFO.email}</p>
                  </div>
                  <div className="ml-auto pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedType === 'email' ? <FaCheck className="text-accent animate-bounce" /> : <FaCopy className="text-text-muted" />}
                  </div>

                  {/* Subtle Copied Toast */}
                  {copiedType === 'email' && (
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute right-4 bottom-2 text-[10px] font-black text-accent uppercase tracking-tighter">Copied!</motion.div>
                  )}
                </div>
              </motion.div>

              {/* Phone Card */}
              <motion.div variants={itemVariants}>
                <div
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="group relative flex items-center gap-5 p-5 rounded-[2rem] glass border border-white/5 cursor-pointer hover:border-accent/40 transition-all duration-300 overflow-hidden"
                >
                  <div className="w-14 h-14 rounded-2xl bg-background-deep border border-white/5 flex items-center justify-center text-accent text-xl group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Quick Call</p>
                    <p className="text-text-primary font-black text-sm md:text-base tracking-tight">{PERSONAL_INFO.phone}</p>
                  </div>
                  <div className="ml-auto pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedType === 'phone' ? <FaCheck className="text-accent animate-bounce" /> : <FaCopy className="text-text-muted" />}
                  </div>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div variants={itemVariants} className="flex items-center gap-5 p-5">
                <div className="w-14 h-14 rounded-2xl bg-background-deep/50 border border-white/5 flex items-center justify-center text-text-muted text-xl">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Based In</p>
                  <p className="text-text-secondary font-black text-sm md:text-base tracking-tight uppercase opacity-60">{PERSONAL_INFO.location}</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Modern Contact Form */}
          <motion.div variants={itemVariants} className="relative">
            <div className="p-8 md:p-12 rounded-[2.5rem] glass-dark border border-white/10 shadow-2xl relative overflow-hidden group">
              {/* Animated Border Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 transition-opacity group-hover:opacity-100 opacity-50" />

              <form className="relative z-10 space-y-6 md:space-y-8" onSubmit={handleSubmit}>
                <input type="hidden" name="subject" value="New Portfolio Message" />
                <input type="hidden" name="from_name" value="Portfolio Contact Form" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Identity</label>
                    <input name="name" type="text" placeholder="Full Name" required className="w-full bg-background-deep/40 border border-white/5 rounded-2xl px-6 py-4 text-text-primary focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/40 transition-all font-bold placeholder:text-white/10 uppercase text-xs" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">E-Mail</label>
                    <input name="email" type="email" placeholder="example@domain.com" required className="w-full bg-background-deep/40 border border-white/5 rounded-2xl px-6 py-4 text-text-primary focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/40 transition-all font-bold placeholder:text-white/10 uppercase text-xs" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Your Vision</label>
                  <textarea name="message" rows={4} placeholder="Describe your project or ideas..." required className="w-full bg-background-deep/40 border border-white/5 rounded-2xl px-6 py-4 text-text-primary focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/40 transition-all resize-none font-bold placeholder:text-white/10 uppercase text-xs"></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className={`group relative w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all overflow-hidden shadow-2xl ${
                    isSubmitting 
                      ? 'bg-accent/40 cursor-wait' 
                      : 'bg-signature neon-glow-red shadow-accent/40'
                  }`}
                >
                  <motion.div
                    initial={false}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-white/10 opacity-0 transition-opacity rounded-2xl pointer-events-none"
                  />
                  
                  <span className="relative flex items-center justify-center gap-4 text-white">
                    {isSubmitting ? 'Initiating...' : submitStatus === 'success' ? 'Transmission Success!' : 'Launch Mission'}
                    <FaPaperPlane className={`text-sm ${isSubmitting ? 'animate-bounce' : 'group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700'}`} />
                  </span>
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-[10px] font-black text-green-500 tracking-widest uppercase mt-4">
                    Message Received. Expect a response soon.
                  </motion.p>
                )}
                {submitStatus === 'error' && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-[10px] font-black text-accent tracking-widest uppercase mt-4">
                    Connection Error. Please retry later.
                  </motion.p>
                )}
              </form>
            </div>

            {/* Magnetic Socials Section */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 px-4 md:px-0">
              {SOCIAL_LINKS.map((social, index) => (
                <MagneticElement key={index}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-surface/20 glass border border-white/5 flex items-center justify-center text-text-muted hover:border-accent/60 hover:text-accent hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 group"
                    title={social.label}
                  >
                    <social.icon size={24} className="group-hover:scale-110 transition-transform" />
                  </a>
                </MagneticElement>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-text-muted text-[10px] font-black uppercase tracking-widest text-center md:text-left">
            &copy; {new Date().getFullYear()} <span className="text-text-secondary">OrionGD Systems</span>. Engineering Excellence.
          </p>
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-text-muted px-4">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Security</a>
            <a href="#" className="hover:text-accent transition-colors">OS Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;