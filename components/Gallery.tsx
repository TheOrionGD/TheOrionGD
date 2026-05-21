import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GALLERY_IMAGES } from '../constants';
import { FaImages } from 'react-icons/fa';

const Gallery: FC = () => {
  const getImageUrl = (src: string) => src.replace(/ /g, '%20');

  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      {/* Section header */}
      <div className="container mx-auto px-6 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black text-text-primary mb-4 tracking-tight">Gallery & Honors</h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto">
            A glimpse into my journey: hackathons, prize distributions, and technical events.
          </p>
        </motion.div>
      </div>

      {/* ── Right-to-left infinite marquee ── */}
      <div className="relative w-full flex overflow-hidden py-12 glass-dark border-y border-border shadow-inner">
        {/* Edge fade masks */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 z-10 bg-gradient-to-r from-background-deep to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 z-10 bg-gradient-to-l from-background-deep to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-8 items-center px-4 will-change-transform"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 70, ease: 'linear', repeat: Infinity }}
        >
          {/* Doubled for seamless loop */}
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-72 h-52 md:w-[26rem] md:h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/5 hover:border-accent/30 transition-all duration-500 group/item"
            >
              <img
                src={getImageUrl(img.src)}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  if (!t.dataset.tried) { t.dataset.tried = 'true'; t.src = `./${getImageUrl(img.src)}`; }
                }}
              />
              {/* Caption on hover */}
              <div className="absolute inset-x-3 bottom-3 p-3 glass border border-white/10 rounded-xl opacity-0 group-hover/item:opacity-100 translate-y-2 group-hover/item:translate-y-0 transition-all duration-400">
                <p className="text-text-primary text-[10px] font-black uppercase tracking-widest line-clamp-1">{img.alt}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Archive button */}
      <div className="container mx-auto px-6 mt-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-4 px-12 py-5 bg-signature text-white rounded-full font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:shadow-accent/30 transition-all active:scale-95"
          >
            <FaImages className="text-lg group-hover:rotate-12 transition-transform" />
            Full Event Archive
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;