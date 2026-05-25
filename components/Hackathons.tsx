import React, { useRef, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GALLERY_IMAGES } from '../constants';
import { FaTrophy, FaImages, FaCode, FaAward } from 'react-icons/fa';

const SPEED = 0.7;        
const DRAG_FRICTION = 0.88; 

const Hackathons: FC = () => {
  const trackRef   = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number>(0);
  const xRef       = useRef(0);          
  const halfRef    = useRef(0);          
  const isDragging = useRef(false);
  const dragStartX = useRef(0);          
  const dragStartScroll = useRef(0);     
  const velocityRef = useRef(0);         
  const lastDragX  = useRef(0);
  const momentumActive = useRef(false);

  const encodeUrl = (src: string) => src.replace(/ /g, '%20');

  const wrapOffset = useCallback((val: number): number => {
    const half = halfRef.current;
    if (half === 0) return val;
    let n = val % half;
    if (n > 0) n -= half;   
    return n;
  }, []);

  const applyTransform = () => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${xRef.current}px)`;
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
    };
    measure();

    const loop = () => {
      if (!isDragging.current) {
        if (momentumActive.current) {
          xRef.current += velocityRef.current;
          velocityRef.current *= DRAG_FRICTION;
          if (Math.abs(velocityRef.current) < 0.3) {
            velocityRef.current = 0;
            momentumActive.current = false;
          }
        } else {
          xRef.current -= SPEED;
        }
        xRef.current = wrapOffset(xRef.current);
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [wrapOffset]);

  const getClientX = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if ('touches' in e && e.touches.length > 0) return e.touches[0].clientX;
    if ('changedTouches' in e && e.changedTouches.length > 0) return e.changedTouches[0].clientX;
    return (e as MouseEvent).clientX;
  };

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    momentumActive.current = false;
    velocityRef.current = 0;
    dragStartX.current = getClientX(e);
    dragStartScroll.current = xRef.current;
    lastDragX.current = dragStartX.current;
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
  };

  const onDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = getClientX(e);
    const delta = clientX - dragStartX.current;
    const newX = wrapOffset(dragStartScroll.current + delta);
    velocityRef.current = clientX - lastDragX.current;
    lastDragX.current = clientX;
    xRef.current = newX;
    applyTransform();
  }, [wrapOffset]);

  const onDragEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    momentumActive.current = Math.abs(velocityRef.current) > 1;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => onDragMove(e);
    const end  = () => onDragEnd();
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup',   end);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('touchend',  end);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup',   end);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend',  end);
    };
  }, [onDragMove, onDragEnd]);

  // Hackathon Achievements Data
  const achievements = [
    {
      title: "JET Hackathon 1.0",
      role: "Core Competitor",
      desc: "Developed rapid prototypes and solved complex engineering challenges in a high-intensity time-bound hackathon.",
      icon: FaCode
    },
    {
      title: "Trash to Treasure",
      role: "Winner (1st Place)",
      desc: "Awarded first place for designing and engineering a sustainable, innovative resource reassignment mechanism.",
      icon: FaTrophy
    },
    {
      title: "Code Sprint 6.0",
      role: "Top Performer",
      desc: "Competed in high-speed algorithmic programming sprints, solving complex computational puzzles under strict time limits.",
      icon: FaAward
    }
  ];

  return (
    <section id="hackathons" className="py-24 bg-transparent relative overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
            <FaTrophy className="animate-pulse" /> Section 08
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6 tracking-tight">
            Hackathons &amp; <span className="text-gradient uppercase tracking-tighter">Competitions</span>
          </h2>
          <div className="w-24 h-1.5 bg-signature mx-auto rounded-full mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Demonstrating rapid prototyping, competitive drive, algorithmic efficiency, and fast cross-functional collaborative delivery.
          </p>
        </motion.div>
      </div>

      {/* Raw Achievement Layout (Ditched Cards) */}
      <div className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {achievements.map((ach, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col relative group pt-6 border-t border-white/10"
            >
              {/* Thin neon active top-line indicator */}
              <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[1.5px] bg-accent transition-all duration-500" />
              
              <div className="flex items-center gap-4 mb-4 select-none">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:scale-105 transition-transform duration-300">
                  <ach.icon className="text-accent text-lg" />
                </div>
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">{ach.role}</span>
              </div>

              <h3 className="text-xl font-black text-text-primary mb-4 uppercase tracking-tight group-hover:text-gradient transition-all duration-300">
                {ach.title}
              </h3>
              
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                {ach.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Drag Gallery Strip */}
      <div className="relative w-full overflow-hidden py-10 glass-dark border-y border-border shadow-inner select-none">
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 z-10 bg-gradient-to-r from-background-deep to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 z-10 bg-gradient-to-l from-background-deep to-transparent pointer-events-none" />

        <p className="text-center text-[10px] font-black text-text-muted uppercase tracking-widest opacity-60 mb-6 flex items-center justify-center gap-2">
          <span>←</span> DRAG TO EXPLORE GALLERY <span>→</span>
        </p>

        <div
          ref={trackRef}
          className="flex gap-6 md:gap-8 items-center px-4 will-change-transform cursor-grab"
          style={{ width: 'max-content' }}
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
        >
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-64 h-48 sm:w-72 sm:h-52 md:w-[26rem] md:h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/5 hover:border-accent/30 transition-all duration-500 group/item"
            >
              <img
                src={encodeUrl(img.src)}
                alt={img.alt}
                loading="lazy"
                draggable={false}   
                className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700 pointer-events-none"
              />
              <div className="absolute inset-x-3 bottom-3 p-3 glass border border-white/10 rounded-xl opacity-0 group-hover/item:opacity-100 translate-y-2 group-hover/item:translate-y-0 transition-all duration-300 pointer-events-none">
                <p className="text-text-primary text-[10px] font-black uppercase tracking-widest line-clamp-1">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Event Gallery Button */}
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
            Full Event Gallery
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hackathons;
