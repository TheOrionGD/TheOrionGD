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
    if (particles.current.length > 0) return;
    const arr: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const radius = 1 + Math.random() * 2.2;
      const baseAlpha = 0.15 + Math.random() * 0.40;
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

    if (!isMobile) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseleave', onLeave);
    }

    // ── Animation Loop ───────────────────────────────────────────────────────
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      ctx.clearRect(0, 0, w, h);

      // ── 1. Light Pearl-White Background Gradient ───────────────────────────
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.3, 0, w * 0.5, h * 0.3, Math.max(w, h) * 0.95);
      bg.addColorStop(0,   '#f0f4ff'); // soft lavender-white center
      bg.addColorStop(0.5, '#f5f7fb'); // neutral off-white mid
      bg.addColorStop(1,   '#f8f9fb'); // clean canvas edge
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // ── 2. Ambient Mouse Glow (soft indigo spotlight) ─────────────────────
      if (mx > 0) {
        const spotlight = ctx.createRadialGradient(mx, my, 0, mx, my, 260);
        spotlight.addColorStop(0, 'rgba(99,102,241,0.07)');
        spotlight.addColorStop(1, 'transparent');
        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, w, h);
      }

      const pts = particles.current;

      // ── 3. Particle Movement & Constellations ─────────────────────────────
      pts.forEach((p) => {
        p.x += p.vx * p.speedMultiplier;
        p.y += p.vy * p.speedMultiplier;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));

        if (mx > 0) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.hypot(dx, dy);
          const pullRadius = 180;

          if (dist < pullRadius) {
            const force = (pullRadius - dist) / pullRadius;
            p.x += (dx / dist) * force * 0.5;
            p.y += (dy / dist) * force * 0.5;
            p.alpha = Math.min(0.75, p.baseAlpha + force * 0.4);
          } else {
            p.alpha = p.baseAlpha;
          }
        } else {
          p.alpha = p.baseAlpha;
        }
      });

      // Draw constellation connections — subtle indigo lines
      ctx.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const p1 = pts[i];
          const p2 = pts[j];
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

          if (dist < CONNECTION_LIMIT) {
            const opacity = (1 - dist / CONNECTION_LIMIT) * 0.18 * Math.min(p1.alpha, p2.alpha);
            ctx.strokeStyle = `rgba(99,102,241,${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw individual particles — soft indigo dots
      ctx.save();
      pts.forEach((p) => {
        ctx.fillStyle = `rgba(99,102,241,${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.radius > 1.8) {
          ctx.shadowColor = 'rgba(99,102,241,0.3)';
          ctx.shadowBlur = 4;
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
      if (!isMobile) {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseleave', onLeave);
      }
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
