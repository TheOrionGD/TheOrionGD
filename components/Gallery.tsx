import { useRef, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GALLERY_IMAGES } from '../constants';
import { FaImages } from 'react-icons/fa';

// ── Interactive Marquee ───────────────────────────────────────────────────────
// Default: auto-scrolls right→left continuously.
// User can grab and drag in EITHER direction to override the scroll position.
// When the user lets go, auto-scroll resumes from the current position.

const SPEED = 0.7;        // px per animation frame (auto-scroll speed)
const DRAG_FRICTION = 0.88; // momentum damping after drag release (0–1)

const Gallery: FC = () => {
  const trackRef   = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number>(0);
  const xRef       = useRef(0);          // current translate-X in pixels
  const halfRef    = useRef(0);          // half-width of track (one full set)
  const isDragging = useRef(false);
  const dragStartX = useRef(0);          // pointer X at drag start
  const dragStartScroll = useRef(0);     // xRef value at drag start
  const velocityRef = useRef(0);         // drag momentum velocity
  const lastDragX  = useRef(0);
  const momentumActive = useRef(false);

  // Encode spaces/special chars in src
  const encodeUrl = (src: string) => src.replace(/ /g, '%20');

  // ── Wrap offset to stay within [−halfWidth, 0) for seamless looping ────────
  const wrapOffset = useCallback((val: number): number => {
    const half = halfRef.current;
    if (half === 0) return val;
    // Normalize to negative range (scrolling left)
    let n = val % half;
    if (n > 0) n -= half;   // ensure negative
    return n;
  }, []);

  // ── Apply current xRef to the DOM element ──────────────────────────────────
  const applyTransform = () => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${xRef.current}px)`;
    }
  };

  // ── Main rAF loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Measure after first render so we know one-set width
    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
    };
    measure();

    const loop = () => {
      if (!isDragging.current) {
        if (momentumActive.current) {
          // Apply momentum from drag release
          xRef.current += velocityRef.current;
          velocityRef.current *= DRAG_FRICTION;
          if (Math.abs(velocityRef.current) < 0.3) {
            velocityRef.current = 0;
            momentumActive.current = false;
          }
        } else {
          // Default auto-scroll: move left
          xRef.current -= SPEED;
        }
        // Seamless loop wrap
        xRef.current = wrapOffset(xRef.current);
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [wrapOffset]);

  // ── Pointer / Touch event handlers ────────────────────────────────────────
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
    // Track velocity for momentum
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

  // Attach window-level listeners so drag works even when pointer leaves the track
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

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section id="gallery" className="py-20 relative overflow-hidden">

      {/* Section header */}
      <div className="container mx-auto px-6 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black text-text-primary mb-4 tracking-tight">Gallery &amp; Honors</h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto">
            A glimpse into my journey: hackathons, prize distributions, and technical events.
          </p>
          {/* Drag hint */}
          <p className="mt-3 text-[10px] font-black text-text-muted uppercase tracking-widest opacity-60 flex items-center justify-center gap-2">
            <span>←</span> drag to explore <span>→</span>
          </p>
        </motion.div>
      </div>

      {/* ── Marquee strip ── */}
      <div className="relative w-full overflow-hidden py-10 glass-dark border-y border-border shadow-inner select-none">

        {/* Left edge fade */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 z-10 bg-gradient-to-r from-background-deep to-transparent pointer-events-none" />
        {/* Right edge fade */}
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 z-10 bg-gradient-to-l from-background-deep to-transparent pointer-events-none" />

        {/*
          Inner track: doubled images for seamless infinite loop.
          rAF loop drives translateX; pointer events enable drag.
        */}
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
                draggable={false}   // prevent browser native image drag interfering
                className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700 pointer-events-none"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  if (!t.dataset.tried) {
                    t.dataset.tried = 'true';
                    t.src = `./${encodeUrl(img.src)}`;
                  }
                }}
              />
              {/* Caption on hover */}
              <div className="absolute inset-x-3 bottom-3 p-3 glass border border-white/10 rounded-xl opacity-0 group-hover/item:opacity-100 translate-y-2 group-hover/item:translate-y-0 transition-all duration-300 pointer-events-none">
                <p className="text-text-primary text-[10px] font-black uppercase tracking-widest line-clamp-1">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
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