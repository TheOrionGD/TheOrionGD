import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMG_FAVICON } from '../assets';

gsap.registerPlugin(ScrollTrigger);

// ─── Milestone data ────────────────────────────────────────────────────────────
interface Milestone {
  year: string;
  title: string;
  subtitle: string;
  type: 'edu' | 'work' | 'award';
  icon: string;
  color: string;
  accent: string;
  detail: string;
}

const MILESTONES: Milestone[] = [
  {
    year: '2022',
    title: 'The Spark — B.Tech CSE Begins',
    subtitle: 'K. Ramakrishnan College of Technology',
    type: 'edu',
    icon: '🏫',
    color: 'rgba(190,228,208,0.18)',
    accent: '#D3D3D3',
    detail: 'Enrolled at K. Ramakrishnan College of Technology. First lines of code in C & Python ignited a curiosity for building systems from the ground up.',
  },
  {
    year: '2023',
    title: 'First Real Project — FenceIN',
    subtitle: 'React + Node.js Geofencing',
    type: 'work',
    icon: '💻',
    color: 'rgba(255,99,99,0.10)',
    accent: '#7B3F00',
    detail: 'Built FenceIN, a geo-fenced access-control system using React + Node.js. First taste of full-stack architecture, REST APIs, and real deployment challenges.',
  },
  {
    year: '2023',
    title: 'Hackathon Wins & Field Experience',
    subtitle: 'Competed & Shipped Under Pressure',
    type: 'award',
    icon: '🏆',
    color: 'rgba(255,130,130,0.12)',
    accent: '#B87333',
    detail: 'Competed in JET Hackathon 1.0, Oasys IT Hackathon 2.0, and Code Sprint 6.0. Awarded Best Performance and 1st Place (Trash to Treasure). Learned to ship under pressure.',
  },
  {
    year: '2024',
    title: 'Industry Exposure — Internships',
    subtitle: 'Real Client Dashboards & ML Tasks',
    type: 'work',
    icon: '⚡',
    color: 'rgba(219,255,203,0.22)',
    accent: '#22c55e',
    detail: 'Completed internships at Prodigy InfoTech, SkillCraft Tech, VDart Academy & Adaovi. Worked on real client dashboards, cybersecurity pipelines, and ML classification tasks.',
  },
  {
    year: '2024',
    title: 'Patent Filed — Android TV via IR Sensor',
    subtitle: 'Patent No. 202441033032A',
    type: 'award',
    icon: '📄',
    color: 'rgba(255,99,99,0.10)',
    accent: '#7B3F00',
    detail: 'Filed Indian Patent No. 202441033032A for a novel hardware-software integration — controlling Android TV using IR remote signal mapping. Research milestone.',
  },
  {
    year: '2025',
    title: 'Full-Stack Portfolio & AI Systems',
    subtitle: 'React, TS, MongoDB, Vite & AI',
    type: 'work',
    icon: '🌐',
    color: 'rgba(190,228,208,0.18)',
    accent: '#D3D3D3',
    detail: 'Built this portfolio from scratch using React, TypeScript, MongoDB, and Vite — with a live AI chatbot, CMS admin panel, and 3D visual effects. Pursuing MERN + AI specialisation.',
  },
  {
    year: 'Now',
    title: 'Open to Opportunities',
    subtitle: 'Seeking Full-Time Roles',
    type: 'award',
    icon: '🚀',
    color: 'rgba(255,99,99,0.08)',
    accent: '#7B3F00',
    detail: 'Seeking full-time roles or internships in Full-Stack Development, Cybersecurity, or AI/ML. Ready to contribute to impactful engineering teams.',
  },
];

// ─── Blueprint Tech Graphics ───────────────────────────────────────────────────
const BlueprintGraphic: React.FC<{ milestone: Milestone }> = ({ milestone }) => {
  const accentColor = milestone.accent;

  switch (milestone.year) {
    case '2022': // Code Spark
      return (
        <div className="blueprint-box">
          <div className="blueprint-header">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <span className="window-title font-mono text-[9px] opacity-60 ml-2">spark.py</span>
          </div>
          <div className="blueprint-content font-mono text-[10px] p-3 text-black/95 leading-relaxed text-left">
            <div><span>import</span> systems</div>
            <div><span>def</span> <span>ignite</span>():</div>
            <div className="pl-4">code = <span>&ldquo;C + Python&rdquo;</span></div>
            <div className="pl-4">curiosity = <span>True</span></div>
            <div className="pl-4"><span>return</span> systems.build(code)</div>
          </div>
        </div>
      );

    case '2023': // FenceIN or Hackathons
      if (milestone.title.includes('FenceIN')) {
        return (
          <div className="blueprint-box flex items-center justify-center p-4 min-h-[110px]">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Geofence Radar Rings */}
              <div className="absolute inset-0 rounded-full border border-dashed" style={{ borderColor: `${accentColor}30`, animation: 'spin-slow 20s linear infinite' }} />
              <div className="absolute inset-2 rounded-full border border-solid" style={{ borderColor: `${accentColor}40`, animation: 'pulse-slow 2.5s ease-in-out infinite' }} />
              <div className="absolute inset-5 rounded-full border border-dashed" style={{ borderColor: `${accentColor}50` }} />
              {/* Radiating Pulse */}
              <div className="absolute w-2 h-2 rounded-full" style={{ background: accentColor, boxShadow: `0 0 14px ${accentColor}` }} />
              {/* Connected node */}
              <div className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
              <div className="absolute bottom-2 left-1 w-1.5 h-1.5 rounded-full" style={{ background: '#B87333' }} />
              <span className="font-mono text-[8px] absolute top-10 right-0 opacity-40 uppercase tracking-widest">[G_FENCE]</span>
            </div>
          </div>
        );
      } else { // Hackathons
        return (
          <div className="blueprint-box p-3 font-mono text-[9px] text-black text-left">
            <div className="flex justify-between border-b border-[#D3D3D3] pb-1.5 mb-1.5 font-bold uppercase tracking-wider text-[8px]">
              <span>HACK_GRID</span>
              <span style={{ color: '#000000' }}>LIVE_ACTIVE</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span>JET HACK 1.0</span>
                <span className="font-bold text-emerald-500">✓ DELIVERED</span>
              </div>
              <div className="flex items-center justify-between">
                <span>OASYS IT 2.0</span>
                <span className="font-bold text-emerald-500">✓ 1ST PLACE</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CODE SPRINT 6.0</span>
                <span className="font-bold text-emerald-500">✓ BEST_PERF</span>
              </div>
            </div>
          </div>
        );
      }

    case '2024': // Internships or Patent
      if (milestone.title.includes('Internships')) {
        return (
          <div className="blueprint-box p-3 flex flex-col justify-between min-h-[110px]">
            <div className="flex justify-between border-b border-[#D3D3D3] pb-1 font-mono text-[8px] uppercase tracking-wider text-left">
              <span>SYS_NETWORKS</span>
              <span className="text-emerald-500">● 4 SITES</span>
            </div>
            <div className="flex items-center justify-around gap-1 py-2 relative">
              {/* Nodes layout representing internships */}
              {['SEC', 'API', 'UI', 'MERN'].map((node, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-lg flex flex-col items-center justify-center border font-mono text-[8px] font-bold z-10 transition-colors bg-white/90"
                  style={{ borderColor: i === 3 ? '#22c55e' : `${accentColor}30`, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}
                >
                  <span style={{ color: i === 3 ? '#22c55e' : '#000000' }}>{node}</span>
                </div>
              ))}
              {/* Connection link path line */}
              <div className="absolute left-4 right-4 h-0.5 bg-[#D3D3D3]" style={{ zIndex: 0 }} />
            </div>
          </div>
        );
      } else { // Patent Android TV
        return (
          <div className="blueprint-box p-3 min-h-[110px] flex flex-col justify-between font-mono text-[9px] text-black text-left">
            <div className="flex justify-between border-b border-[#D3D3D3] pb-1 text-[8px] uppercase font-bold tracking-wider">
              <span>IR_SIGNAL_WAVE</span>
              <span style={{ color: '#000000' }}>202441033032A</span>
            </div>
            {/* Waveform Drawing SVG */}
            <div className="py-2.5">
              <svg viewBox="0 0 180 30" width="100%" height="24" style={{ display: 'block' }}>
                <path
                  d="M0,15 L20,15 L25,5 L30,25 L35,15 L60,15 L65,2 L70,28 L75,15 L100,15 L105,5 L110,25 L115,15 L140,15 L145,2 L150,28 L155,15 L180,15"
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex justify-between text-[7px] border-t border-[#D3D3D3] pt-1">
              <span>FREQ: 38KHZ</span>
              <span>STATE: ACTIVE_MAPPED</span>
            </div>
          </div>
        );
      }

    case '2025': // Full-Stack Portfolio & AI
      return (
        <div className="blueprint-box p-3 min-h-[110px] flex flex-col justify-between text-left">
          <div className="flex justify-between border-b border-[#D3D3D3] pb-1 font-mono text-[8px] uppercase tracking-wider text-black">
            <span>AI_AGENT_WIDGET</span>
            <span style={{ color: '#000000' }}>MERN_SYS</span>
          </div>
          <div className="flex flex-col gap-1 py-1.5">
            <div className="flex items-center gap-1.5 self-start bg-[#EDEDED] border border-[#D3D3D3] px-2 py-0.5 rounded text-[8px] font-mono text-black">
              <span>User: How was it built?</span>
            </div>
            <div className="flex items-center gap-1.5 self-end bg-gradient-to-r from-[#7B3F00] to-[#B87333] text-white px-2 py-0.5 rounded text-[8px] font-mono shadow-sm">
              <span>AI: React, TS, MongoDB.</span>
            </div>
          </div>
        </div>
      );

    default: // Now (Opportunities)
      return (
        <div className="blueprint-box flex items-center justify-center p-3 min-h-[110px]">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Pulsing Radar Ring */}
            <div className="absolute inset-0 rounded-full border" style={{ borderColor: `${accentColor}30`, animation: 'radar-pulse 2.5s ease-out infinite' }} />
            <div className="absolute inset-3 rounded-full border border-dashed" style={{ borderColor: `${accentColor}50` }} />
            <div className="absolute w-2 h-2 rounded-full" style={{ background: accentColor, boxShadow: `0 0 10px ${accentColor}` }} />
            <span className="font-mono text-[8px] font-bold text-black mt-10 uppercase tracking-widest">ACTIVE_SCAN</span>
          </div>
        </div>
      );
  }
};

// ─── Main Component ───────────────────────────────────────────────────────────
const HorizontalJourney: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progressFill = progressFillRef.current;
    if (!section || !track || !progressFill) return;

    const cards = gsap.utils.toArray<HTMLElement>('.journey-card');

    // Horizontal scroll distance calculation
    const totalWidth = track.scrollWidth - section.clientWidth;

    const ctx = gsap.context(() => {
      // 1. Pinned horizontal timeline scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth + window.innerHeight}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(progressFill, { scaleX: self.progress });
          },
        },
      });

      tl.to(track, { x: -totalWidth, ease: 'none' });

      // 2. Animate cards reveal relative to horizontal scrolling viewport
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: 'left right-=60', // starts entering
              end: 'left center', // fully settles in center
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <style>{`
        /* Styled Blueprint Box */
        .blueprint-box {
          background: #EDEDED;
          border: 1px solid #D3D3D3;
          border-radius: 12px;
          overflow: hidden;
          width: 100%;
          min-height: 105px;
          margin-top: 14px;
          position: relative;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
          background-image: radial-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px);
          background-size: 10px 10px;
        }
        .blueprint-header {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          border-bottom: 1px solid #D3D3D3;
          background: rgba(255, 255, 255, 0.6);
        }
        .blueprint-header .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          margin-right: 4px;
          display: inline-block;
        }
        .dot-red { background: #7B3F00; }
        .dot-yellow { background: #f59e0b; }
        .dot-green { background: #22c55e; }

        /* Animation Keyframes */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.08); opacity: 0.8; }
        }
        @keyframes radar-pulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        /* Hover Cards Flat Design Style */
        .journey-card {
          flex: 0 0 auto;
          width: 320px;
          transition: transform 0.2s ease;
        }
        .journey-card:hover {
          transform: translateY(-4px);
        }
        .card-inner {
          background: #EDEDED;
          border: 2px solid #000000;
          border-radius: 12px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s ease;
        }
        .journey-card:hover .card-inner {
          border-color: #B87333;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="journey"
        style={{
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
          background: 'transparent',
        }}
      >
        {/* ── Section Header (sticky inside pin) ── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            padding: '32px 48px 0',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 14px',
                  borderRadius: 20,
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#000000',
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}
              >
                Developer Journey
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  color: '#000000',
                  lineHeight: 1.05,
                }}
              >
                The Road{' '}
                <span
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    backgroundImage: 'linear-gradient(135deg, #B87333, #7B3F00)',
                    display: 'inline',
                  }}
                >
                  So Far
                </span>
              </h2>
              <p style={{ margin: '10px 0 0', color: '#000000', fontSize: 13, fontWeight: 500 }}>
                Scroll to travel through milestones →
              </p>
            </div>

            {/* Milestone count */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 4,
              }}
            >
              <span style={{ fontSize: 48, fontWeight: 900, color: '#000000', lineHeight: 1, letterSpacing: '-0.04em' }}>
                {MILESTONES.length}
              </span>
              <span style={{ fontSize: 11, color: '#000000', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Milestones
              </span>
            </div>
          </div>
        </div>

        {/* ── Progress Bar (Horizontal spine line) ── */}
        <div
          ref={progressLineRef}
          style={{
            position: 'absolute',
            bottom: 56,
            left: 48,
            right: 48,
            height: 3,
            background: 'rgba(229, 234, 242, 0.6)',
            borderRadius: 4,
            overflow: 'hidden',
            zIndex: 20,
          }}
        >
          <div
            ref={progressFillRef}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, #B87333, #7B3F00, #22c55e)',
              borderRadius: 4,
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
              boxShadow: '0 0 12px rgba(30,144,255,0.6)',
            }}
          />
        </div>

        {/* ── Track Wrapper ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            paddingTop: 80,
            paddingBottom: 40,
          }}
        >
          {/* Continuous connecting timeline track line */}
          <div
            style={{
              position: 'absolute',
              bottom: 120,
              left: 0,
              height: 2.5,
              width: `${MILESTONES.length * 380 + 200}px`,
              background: '#000000',
              zIndex: 1,
            }}
          />

          {/* Scrollable track */}
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 60,
              paddingLeft: 80,
              paddingRight: 120,
              paddingBottom: 40,
              willChange: 'transform',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {MILESTONES.map((milestone, index) => {
              return (
                <div key={index} className="journey-card">
                  {/* Single-row Layout: Vertical block sitting on the timeline */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 20,
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    {/* Content card */}
                    <div className="card-inner" style={{ width: '100%' }}>
                      {/* Top line mapping to milestone category theme */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 3,
                          background: milestone.accent,
                        }}
                      />

                      {/* Header row with badges */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span
                          style={{
                            fontFamily: '"Space Grotesk", monospace',
                            fontSize: 12,
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            color: '#000000',
                          }}
                        >
                          {"//"} {milestone.year}
                        </span>

                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            padding: '3px 8px',
                            borderRadius: 4,
                            background: `rgba(${milestone.type === 'edu' ? '190,228,208' : milestone.type === 'work' ? '184,115,51' : '123,63,0'}, 0.25)`,
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: `1px solid ${milestone.accent}40`,
                            color: '#000000',
                            fontSize: 8,
                            fontWeight: 800,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {milestone.type === 'edu' ? 'Education' : milestone.type === 'work' ? 'Experience' : 'Milestone'}
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        style={{
                          margin: '0 0 4px',
                          fontSize: 16,
                          fontWeight: 800,
                          color: '#000000',
                          letterSpacing: '-0.02em',
                          lineHeight: 1.25,
                          textAlign: 'left',
                        }}
                      >
                        {milestone.title}
                      </h3>

                      {/* Detail */}
                      <p
                        style={{
                          margin: '0 0 14px',
                          fontSize: 12,
                          color: '#000000',
                          lineHeight: 1.6,
                          textAlign: 'left',
                        }}
                      >
                        {milestone.detail}
                      </p>

                      {/* Tech Graphic illustration inside the card */}
                      <BlueprintGraphic milestone={milestone} />

                      {/* Monospace index label */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 12,
                          right: 16,
                          fontSize: 8,
                          fontWeight: 700,
                          fontFamily: '"Space Grotesk", monospace',
                          opacity: 0.35,
                          color: '#000000',
                        }}
                      >
                        SYS_M-{String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Vertical trace indicator pointing to progress track line */}
                    <div
                      style={{
                        width: 2,
                        height: 48,
                        background: '#000000',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: '#000000',
                          position: 'absolute',
                          bottom: -5,
                          left: -4,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* End Card */}
            <div
              style={{
                flexShrink: 0,
                width: 220,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                paddingBottom: 68,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #000000',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={IMG_FAVICON}
                  alt="Favicon"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#000000',
                  textAlign: 'center',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  lineHeight: 1.4,
                }}
              >
                Seeking New<br />Challenges
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HorizontalJourney;
