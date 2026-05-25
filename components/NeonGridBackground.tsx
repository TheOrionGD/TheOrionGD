import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';

// ── Particle interface ──────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  speedMultiplier: number;
}

const NeonGridBackground: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean | null>(null);

  // Detect mobile viewport once on mount and check on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileState(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Spawn dynamic stardust particles
  const spawnParticles = (w: number, h: number, count: number) => {
    const arr: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const radius = 1 + Math.random() * 2.2;
      const baseAlpha = 0.2 + Math.random() * 0.55;
      arr.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        alpha: baseAlpha,
        baseAlpha,
        speedMultiplier: 0.8 + Math.random() * 0.6
      });
    }
    particles.current = arr;
  };

  useEffect(() => {
    // If mobile state is null, wait for client-side viewport check
    if (isMobileState === null) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const isMobile = isMobileState;
    const PARTICLE_COUNT = isMobile ? 35 : 110;
    const CONNECTION_LIMIT = isMobile ? 65 : 100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      spawnParticles(canvas.width, canvas.height, PARTICLE_COUNT);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    // ── Animation Loop ───────────────────────────────────────────────────────
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      ctx.clearRect(0, 0, w, h);

      // ── 1. Pitch-Black Gradient Safeguard ──────────────────────────────────
      // Instead of flat pitch black, we draw an ultra-rich deep burgundy radial glow
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.35, 0, w * 0.5, h * 0.35, Math.max(w, h) * 0.9);
      bg.addColorStop(0, '#220000'); // Inner deep warm crimson glow
      bg.addColorStop(0.5, '#0e0000'); // Midway transition
      bg.addColorStop(1, '#060000'); // Elegant near-black bounds
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // ── 2. Ambient Mouse Glow spotlight ───────────────────────────────────
      if (mx > 0) {
        const spotlight = ctx.createRadialGradient(mx, my, 0, mx, my, 220);
        spotlight.addColorStop(0, 'rgba(255, 0, 0, 0.08)'); // Pure brand red ambient flare
        spotlight.addColorStop(1, 'transparent');
        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, w, h);
      }

      const pts = particles.current;

      // ── 3. Particle Movement & Constellations ──────────────────────────────
      // Update particles first
      pts.forEach((p) => {
        // Move particle
        p.x += p.vx * p.speedMultiplier;
        p.y += p.vy * p.speedMultiplier;

        // Bounce off screen boundaries
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Keep inside bounds
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));

        // Magnetic attraction when mouse is near
        if (mx > 0) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.hypot(dx, dy);
          const pullRadius = 180;

          if (dist < pullRadius) {
            // Smoothly pull particles toward the cursor
            const force = (pullRadius - dist) / pullRadius;
            p.x += (dx / dist) * force * 0.5;
            p.y += (dy / dist) * force * 0.5;
            p.alpha = Math.min(1, p.baseAlpha + force * 0.45);
          } else {
            p.alpha = p.baseAlpha;
          }
        } else {
          p.alpha = p.baseAlpha;
        }
      });

      // Draw constellation connections between close particles
      ctx.lineWidth = 0.55;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const p1 = pts[i];
          const p2 = pts[j];
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

          if (dist < CONNECTION_LIMIT) {
            const opacity = (1 - dist / CONNECTION_LIMIT) * 0.12 * Math.min(p1.alpha, p2.alpha);
            ctx.strokeStyle = `rgba(255, 51, 51, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw individual neural particles
      ctx.save();
      pts.forEach((p) => {
        ctx.fillStyle = `rgba(255, 102, 102, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Very soft outer blur shadow for the larger particles
        if (p.radius > 1.8) {
          ctx.shadowColor = 'rgba(255, 0, 0, 0.4)';
          ctx.shadowBlur = 5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [isMobileState]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ display: 'block' }}
    />
  );
};

export default NeonGridBackground;
