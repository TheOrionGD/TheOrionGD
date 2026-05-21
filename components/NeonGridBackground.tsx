import { useEffect, useRef } from 'react';
import type { FC } from 'react';

// ── Streak particle ──────────────────────────────────────────────────────────
interface Streak {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
  hue: number; // cyan=185, magenta=300, purple=265
  width: number;
  life: number;
  maxLife: number;
}

// ── Spark particle ───────────────────────────────────────────────────────────
interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  size: number;
}

// ── Mouse tail point ─────────────────────────────────────────────────────────
interface TailPoint {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

// ── Grid Point ─────────────────────────────────────────────────────────────
interface GridPoint {
  x: number;
  y: number;
  originX: number;
  originY: number;
  angle: number;
  speed: number;
  radius: number;
}

const GRID_SIZE = 70; // px between grid lines
const GRID_COLOR = 'rgba(252, 58, 69, 0.12)'; // Red signature base
const GRID_ACCENT = 'rgba(242, 103, 74, 0.4)'; // Orange-red accent
const MAX_STREAKS = 18;
const TAIL_LENGTH = 35;

const NeonGridBackground: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const tail = useRef<TailPoint[]>([]);
  const streaks = useRef<Streak[]>([]);
  const sparks = useRef<Spark[]>([]);
  const gridPoints = useRef<GridPoint[][]>([]);
  const rafRef = useRef<number>(0);

  // Spawn a new neon streak
  const spawnStreak = (W: number, H: number): Streak => {
    const hues = [350, 355, 0, 5, 10, 15]; // Red / Crimson / Orange spectrum
    const hue = hues[Math.floor(Math.random() * hues.length)];
    const edge = Math.floor(Math.random() * 4); // 0=top,1=right,2=bottom,3=left
    let x = 0, y = 0, vx = 0, vy = 0;
    const speed = 1.8 + Math.random() * 2.8;
    if (edge === 0) { x = Math.random() * W; y = 0; vy = speed; vx = (Math.random() - 0.5) * 0.6; }
    if (edge === 1) { x = W; y = Math.random() * H; vx = -speed; vy = (Math.random() - 0.5) * 0.6; }
    if (edge === 2) { x = Math.random() * W; y = H; vy = -speed; vx = (Math.random() - 0.5) * 0.6; }
    if (edge === 3) { x = 0; y = Math.random() * H; vx = speed; vy = (Math.random() - 0.5) * 0.6; }
    const maxLife = 120 + Math.random() * 140;
    return { x, y, vx, vy, length: 60 + Math.random() * 120, alpha: 0, hue, width: 1.5 + Math.random() * 2.5, life: 0, maxLife };
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    // Initialize morphing grid points
    const initPoints = (w: number, h: number) => {
      const cols = Math.ceil(w / GRID_SIZE) + 1;
      const rows = Math.ceil(h / GRID_SIZE) + 1;
      const newPoints: GridPoint[][] = [];
      for (let i = 0; i < cols; i++) {
        newPoints[i] = [];
        for (let j = 0; j < rows; j++) {
          newPoints[i][j] = {
            x: i * GRID_SIZE,
            y: j * GRID_SIZE,
            originX: i * GRID_SIZE,
            originY: j * GRID_SIZE,
            angle: Math.random() * Math.PI * 2,
            speed: 0.005 + Math.random() * 0.015,
            radius: 5 + Math.random() * 15,
          };
        }
      }
      gridPoints.current = newPoints;
    };

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    // Seed streaks
    const W = () => canvas.width;
    const H = () => canvas.height;
    for (let i = 0; i < MAX_STREAKS; i++) {
      const s = spawnStreak(W(), H());
      s.life = Math.random() * s.maxLife; // stagger starts
      streaks.current.push(s);
    }

    // ── Draw loop ──────────────────────────────────────────────────────────
    const draw = () => {
      const w = W(), h = H();
      const mx = mouse.current.x, my = mouse.current.y;
      ctx.clearRect(0, 0, w, h);

      // ── 1. Deep background ───────────────────────────────────────────────
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, Math.max(w, h) * 0.85);
      bg.addColorStop(0, '#040A15');
      bg.addColorStop(0.6, '#02060D');
      bg.addColorStop(1, '#000103');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // ── 2. Dynamic Geometrical Mesh Grid ─────────────────────────────────
      const pts = gridPoints.current;
      const cols = pts.length;
      const rows = cols > 0 ? pts[0].length : 0;

      // Update point positions
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const p = pts[i][j];
          p.angle += p.speed;
          
          let offsetX = 0;
          let offsetY = 0;

          // Mouse repel physics
          if (mx > 0) {
            const dx = p.originX - mx;
            const dy = p.originY - my;
            const dist = Math.hypot(dx, dy);
            const repelRadius = 180;
            
            if (dist < repelRadius && dist > 0) {
              const force = (repelRadius - dist) / repelRadius;
              offsetX = (dx / dist) * force * 40;
              offsetY = (dy / dist) * force * 40;
            }
          }

          p.x = p.originX + Math.cos(p.angle) * p.radius + offsetX;
          p.y = p.originY + Math.sin(p.angle) * p.radius + offsetY;
        }
      }

      ctx.lineWidth = 0.8;
      ctx.strokeStyle = GRID_COLOR;
      ctx.beginPath();
      
      // Draw interconnected triangulated lines
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const p = pts[i][j];
          
          if (i < cols - 1) {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pts[i+1][j].x, pts[i+1][j].y);
          }
          if (j < rows - 1) {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pts[i][j+1].x, pts[i][j+1].y);
          }
          if (i < cols - 1 && j < rows - 1) {
            if ((i + j) % 2 === 0) {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(pts[i+1][j+1].x, pts[i+1][j+1].y);
            } else {
              ctx.moveTo(pts[i+1][j].x, pts[i+1][j].y);
              ctx.lineTo(pts[i][j+1].x, pts[i][j+1].y);
            }
          }
        }
      }
      ctx.stroke();

      // Draw glowing nodes at intersections
      ctx.fillStyle = GRID_ACCENT;
      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const p = pts[i][j];
          // Check proximity to mouse to light up nodes
          let glow = 1.2;
          if (mx > 0) {
            const dist = Math.hypot(p.x - mx, p.y - my);
            if (dist < 150) {
              glow = 1.2 + ((150 - dist) / 150) * 2;
              ctx.shadowColor = '#FC3A45'; // Red glow
              ctx.shadowBlur = glow * 5;
            } else {
              ctx.shadowBlur = 0;
            }
          }
          
          ctx.moveTo(p.x, p.y);
          ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
        }
      }
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow

      // ── 3. Neon streaks ──────────────────────────────────────────────────
      streaks.current.forEach((s, i) => {
        s.life++;
        const progress = s.life / s.maxLife;
        // Fade in/out
        s.alpha = progress < 0.15
          ? progress / 0.15
          : progress > 0.75
            ? 1 - (progress - 0.75) / 0.25
            : 1;

        const tailX = s.x - s.vx * (s.length / Math.hypot(s.vx, s.vy));
        const tailY = s.y - s.vy * (s.length / Math.hypot(s.vx, s.vy));

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `hsla(${s.hue}, 100%, 70%, 0)`);
        grad.addColorStop(0.4, `hsla(${s.hue}, 100%, 70%, ${s.alpha * 0.35})`);
        grad.addColorStop(1, `hsla(${s.hue}, 100%, 88%, ${s.alpha * 0.95})`);

        ctx.save();
        ctx.shadowColor = `hsla(${s.hue}, 100%, 70%, ${s.alpha * 0.9})`;
        ctx.shadowBlur = 18;
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        ctx.restore();

        // Move
        s.x += s.vx;
        s.y += s.vy;

        // Respawn when off-screen or life ended
        if (s.life >= s.maxLife || s.x < -200 || s.x > w + 200 || s.y < -200 || s.y > h + 200) {
          streaks.current[i] = spawnStreak(w, h);
        }
      });

      // Keep streak count stable
      while (streaks.current.length < MAX_STREAKS) {
        streaks.current.push(spawnStreak(w, h));
      }

      // ── 4. Mouse glow halo & Tail ──────────────────────────────────────────

      // Update and draw sparks
      for (let i = sparks.current.length - 1; i >= 0; i--) {
        const sp = sparks.current[i];
        sp.life++;
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.05; // slight gravity

        const spT = 1 - sp.life / sp.maxLife;
        if (spT <= 0) {
          sparks.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = spT;
        ctx.fillStyle = `hsla(${sp.hue}, 100%, 75%, ${spT})`;
        ctx.shadowBlur = 8 * spT;
        ctx.shadowColor = `hsla(${sp.hue}, 100%, 65%, ${spT})`;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * spT, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (mx > 0) {
        // Distance check for physics logic
        const dx = tail.current.length > 0 ? mx - tail.current[0].x : 0;
        const dy = tail.current.length > 0 ? my - tail.current[0].y : 0;
        const dist = Math.hypot(dx, dy);

        // Update tail
        tail.current.unshift({ x: mx, y: my, alpha: 1, size: 7 });
        if (tail.current.length > TAIL_LENGTH) tail.current.length = TAIL_LENGTH;

        // Spawn sparks when moving fast
        if (dist > 5 && Math.random() > 0.4) {
          sparks.current.push({
            x: mx + (Math.random() - 0.5) * 10,
            y: my + (Math.random() - 0.5) * 10,
            vx: -dx * 0.12 + (Math.random() - 0.5) * 3,
            vy: -dy * 0.12 + (Math.random() - 0.5) * 3,
            life: 0,
            maxLife: 20 + Math.random() * 25,
            hue: 350 + Math.random() * 25, // Red to Orange sparks
            size: 1.5 + Math.random() * 2
          });
        }

        // Draw segmented tapering tail
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        for (let i = 0; i < tail.current.length - 1; i++) {
          const p0 = i === 0 ? tail.current[0] : tail.current[i - 1];
          const p1 = tail.current[i];
          const p2 = tail.current[i + 1];
          const t = 1 - i / TAIL_LENGTH;
          const hue = 350 + i * 1.5; // Red to Orange fading tail

          ctx.beginPath();
          if (i === 0) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
          } else {
            const startX = (p0.x + p1.x) / 2;
            const startY = (p0.y + p1.y) / 2;
            const endX = (p1.x + p2.x) / 2;
            const endY = (p1.y + p2.y) / 2;
            ctx.moveTo(startX, startY);
            ctx.quadraticCurveTo(p1.x, p1.y, endX, endY);
          }

          ctx.save();
          // Core bright laser line
          ctx.lineWidth = 0.5 + (t * 3.5);
          ctx.strokeStyle = `hsla(${hue}, 100%, 80%, ${t})`;
          ctx.shadowBlur = 12 * t;
          ctx.shadowColor = `hsla(${hue}, 100%, 60%, ${t})`;
          ctx.stroke();

          // Outer glowing ambient trail
          ctx.lineWidth = 3 + (t * 8);
          ctx.strokeStyle = `hsla(${hue}, 100%, 65%, ${t * 0.15})`;
          ctx.shadowBlur = 0;
          ctx.stroke();
          ctx.restore();
        }

        // Draw cursor core dot
        ctx.save();
        ctx.shadowColor = 'rgba(252, 58, 69, 0.9)'; // Signature red shadow
        ctx.shadowBlur = 20;
        const coreGrd = ctx.createRadialGradient(mx, my, 0, mx, my, 8);
        coreGrd.addColorStop(0, 'rgba(255, 255, 255, 1)');
        coreGrd.addColorStop(0.3, 'rgba(252, 58, 69, 0.8)'); // Red glow
        coreGrd.addColorStop(1, 'rgba(252, 58, 69, 0)');
        ctx.beginPath();
        ctx.arc(mx, my, 8, 0, Math.PI * 2);
        ctx.fillStyle = coreGrd;
        ctx.fill();
        ctx.restore();

        // Mouse ambient halo on grid
        const halo = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        halo.addColorStop(0, 'rgba(252, 58, 69, 0.08)'); // Signature red subtle halo
        halo.addColorStop(1, 'transparent');
        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, w, h);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ display: 'block' }}
    />
  );
};

export default NeonGridBackground;
