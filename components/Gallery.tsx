import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GALLERY_IMAGES } from '../constants';
import { FaImages } from 'react-icons/fa';

const Gallery: FC = () => {
  // Enhanced encoding for filenames with spaces and parentheses
  // Uses encodeURI for the whole string but ensures spaces are specifically handled
  const getImageUrl = (src: string) => {
    return src.replace(/ /g, '%20');
  };

  return (
    <section id="gallery" className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black text-text-primary mb-4 tracking-tight">Gallery & Honors</h2>
           <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-6"></div>
           <p className="text-text-secondary max-w-2xl mx-auto">
             A glimpse into my journey: hackathons, prize distributions, and technical events.
           </p>
        </motion.div>
      </div>

      <div className="relative w-full flex overflow-hidden py-12 group bg-background-deep border-y border-border shadow-inner">
        
        {/* Decorative mask fades */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 z-10 bg-gradient-to-r from-background-deep to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 z-10 bg-gradient-to-l from-background-deep to-transparent pointer-events-none"></div>
        
        <motion.div
          className="flex gap-10 items-center px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 80, 
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          {/* Render images twice for continuous looping */}
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, index) => (
            <div 
              key={index} 
              className="relative w-80 h-56 md:w-[28rem] md:h-72 flex-shrink-0 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-[#0F172A] transition-all duration-700 hover:scale-105 hover:-rotate-1 group/item"
            >
              <img 
                src={getImageUrl(img.src)} 
                alt={img.alt} 
                className="w-full h-full object-cover grayscale-[0.2] group-hover/item:grayscale-0 transition-all duration-700"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;

                  // Phase 1: Try without the 'assets/' prefix if it's there
                  if (img.src.startsWith('assets/') && !target.dataset.triedNoAssets) {
                    target.dataset.triedNoAssets = "true";
                    target.src = getImageUrl(img.src.replace('assets/', ''));
                    return;
                  }

                  // Phase 2: Try adding './' prefix
                  if (!target.dataset.triedRelative) {
                    target.dataset.triedRelative = "true";
                    target.src = `./${getImageUrl(img.src)}`;
                    return;
                  }

                  // Phase 3: Final fallback to a high-quality relevant Unsplash image
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = "true";
                    // Using a query that matches tech/hackathon themes
                    const fallbackQueries = ['coding', 'tech', 'hackathon', 'office', 'robot', 'future'];
                    const fallbackQuery = fallbackQueries[index % fallbackQueries.length];
                    target.src = `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop&query=${fallbackQuery}&sig=${index}`;
                    target.className = "w-full h-full object-cover opacity-60 mix-blend-overlay bg-slate-800";
                  }
                }}
              />
              {/* Refined Glass Overlay */}
              <div className="absolute inset-x-4 bottom-4 p-4 bg-surface/80 backdrop-blur-md border border-border rounded-2xl opacity-0 group-hover/item:opacity-100 translate-y-4 group-hover/item:translate-y-0 transition-all duration-500">
                 <p className="text-text-primary text-xs font-black uppercase tracking-widest">{img.alt}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 mt-16 text-center">
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
  )
}

export default Gallery;