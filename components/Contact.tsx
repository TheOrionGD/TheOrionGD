import type { FC } from 'react';
import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, Variants } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCopy, FaCheck, FaPaperPlane } from 'react-icons/fa';

/**
 * Magnetic element component for premium interactivity
 */
const MagneticElement: FC<{ children: React.ReactNode; strength?: number }> = ({ children, strength = 0.4 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
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
      style={{ x: springX, y: springY }}
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
    // Access key is managed in constants or hidden input, but using user's pattern here
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
    <footer id="contact" className="relative bg-background-deep pt-32 pb-12 overflow-hidden border-t border-border/10">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-20"
        >
          {/* Left: Interactive Info */}
          <div>
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest mb-6">
              Let&apos;s Connect
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black text-text-primary mb-6 tracking-tight">
              Ready to build <span className="text-gradient">the future?</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-text-secondary text-lg mb-12 max-w-md leading-relaxed">
              Whether you have a specific project in mind or just want to explore possibilities, I&apos;m always open to new adventures.
            </motion.p>

            <div className="space-y-6">
              {/* Email Card */}
              <motion.div variants={itemVariants}>
                <div
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="group relative flex items-center gap-6 p-4 rounded-3xl bg-surface/30 border border-border/20 cursor-pointer hover:border-accent/40 hover:bg-surface/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="w-14 h-14 rounded-2xl bg-background border border-border/20 flex items-center justify-center text-accent text-xl group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Send an Email</p>
                    <p className="text-text-primary font-bold">{PERSONAL_INFO.email}</p>
                  </div>
                  <div className="ml-auto pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
                  className="group relative flex items-center gap-6 p-4 rounded-3xl bg-surface/30 border border-border/20 cursor-pointer hover:border-accent/40 hover:bg-surface/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-background border border-border/20 flex items-center justify-center text-accent text-xl group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Call Me</p>
                    <p className="text-text-primary font-bold">{PERSONAL_INFO.phone}</p>
                  </div>
                  <div className="ml-auto pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedType === 'phone' ? <FaCheck className="text-accent animate-bounce" /> : <FaCopy className="text-text-muted" />}
                  </div>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div variants={itemVariants} className="flex items-center gap-6 p-4">
                <div className="w-14 h-14 rounded-2xl bg-background/50 border border-border/10 flex items-center justify-center text-text-muted text-xl">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Based In</p>
                  <p className="text-text-secondary font-medium italic">{PERSONAL_INFO.location}</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Modern Contact Form */}
          <motion.div variants={itemVariants} className="relative">
            <div className="p-8 md:p-10 rounded-[2.5rem] bg-surface/30 backdrop-blur-xl border border-border/20 shadow-2xl relative overflow-hidden group">
              {/* Animated Border Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 transition-opacity group-hover:opacity-100 opacity-50" />

              <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="subject" value="New Portfolio Message" />
                <input type="hidden" name="from_name" value="Portfolio Contact Form" />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Your Name</label>
                    <input name="name" type="text" placeholder="Bruce Wayne" required className="w-full bg-background/60 border border-border/20 rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Email Address</label>
                    <input name="email" type="email" placeholder="bruce@wayne.com" required className="w-full bg-background/60 border border-border/20 rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Message</label>
                  <textarea name="message" rows={4} placeholder="Let's build something epic..." required className="w-full bg-background/60 border border-border/20 rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none font-medium"></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className={`group relative w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all overflow-hidden ${
                    isSubmitting 
                      ? 'bg-accent/40 cursor-wait' 
                      : 'bg-signature neon-glow-red shadow-2xl shadow-accent/40'
                  }`}
                >
                  <motion.div
                    initial={false}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-white/10 opacity-0 transition-opacity rounded-2xl pointer-events-none"
                  />
                  
                  <span className="relative flex items-center justify-center gap-4 text-white">
                    {isSubmitting ? 'Processing...' : submitStatus === 'success' ? 'Message Sent!' : 'Launch Message'}
                    <FaPaperPlane className={`text-sm ${isSubmitting ? 'animate-bounce' : 'group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-500'}`} />
                  </span>
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-xs font-bold text-green-500 tracking-widest uppercase mt-4">
                    Success! Your message has been sent.
                  </motion.p>
                )}
                {submitStatus === 'error' && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-xs font-bold text-accent tracking-widest uppercase mt-4">
                    Error! Please try again later.
                  </motion.p>
                )}
              </form>
            </div>

            {/* Magnetic Socials Section */}
            <div className="mt-12 flex justify-center lg:justify-start gap-6">
              {SOCIAL_LINKS.map((social, index) => (
                <MagneticElement key={index}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-14 h-14 rounded-2xl bg-surface/50 border border-border/20 flex items-center justify-center text-text-secondary hover:border-accent/60 hover:text-accent hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 group"
                    title={social.label}
                  >
                    <social.icon size={22} className="group-hover:scale-110 transition-transform" />
                  </a>
                </MagneticElement>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <div className="pt-10 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-muted text-xs font-medium tracking-tight">
            &copy; {new Date().getFullYear()} <span className="text-text-secondary font-bold">GODFREY T R</span>. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-text-muted">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;