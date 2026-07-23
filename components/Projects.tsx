import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import MarkdownModal from './MarkdownModal';

const AUTO_ADVANCE_MS = 7000;

/* ── Extended project descriptions (500+ chars each) ────────────── */
const SHORT_DESC: Record<string, string> = {
  "EchoCortex-Intelligence":
    "EchoCortex is a decentralized intelligence platform that captures verbal knowledge. It transcribes audio via OpenAI Whisper and generates semantic vector embeddings to search MongoDB indices.",
  "FaceShield-Authentication":
    "FaceShield is an edge-AI biometric security gateway for NHAI tolls. It runs offline ArcFace face checks via ONNX, cross-references SQLite cache, and audits hard-hat compliance.",
  "EntityEase-DataPlatform":
    "EntityEase clinical analyzer uses BioBERT to map medical reports to 17,000+ ICD-11 classifications. FAISS indexing matches concepts dynamically to speed up audit processes.",
  "AegisNet-IDS":
    "AegisNet integrates Snort 3 signature checks and Isolation Forest anomaly models. Telemetry correlates in NetworkX graph structures, executing sub-second firewall mitigations.",
  "FenceIN-AccessControl":
    "FenceIN is an industrial dual-factor physical gateway verifying RFID and fingerprint logs offline. Operates on Flask with local SQLite cache to keep gates running during WAN outages.",
  "CodeSight-DeveloperToolkit":
    "CodeSight is an AST analyzer scanning pull request changes for cyclomatic code complexity, SQL vulnerabilities, and hardcoded keys, outputting feedback straight into VS Code.",
  "Veltrio.Suite":
    "Veltrio.Suite is an intent-aware translation overlay for multi-speaker channels, utilizing custom NLP models to ensure pronoun and register coherence across 40+ language pairs.",
};

const getSubLabel = (title: string, category: string) => {
  const map: Record<string, string> = {
    "EchoCortex-Intelligence": "AI + KNOWLEDGE GRAPH",
    "FaceShield-Authentication": "AI + COMPUTER VISION",
    "EntityEase-DataPlatform": "AI + CLINICAL DATA",
    "AegisNet-IDS": "SECURITY + SIEM / SOAR",
    "FenceIN-AccessControl": "INDUSTRIAL + BIOMETRICS",
    "CodeSight-DeveloperToolkit": "AI + CODE GEN",
    "Veltrio.Suite": "AI + TRANSLATION / NLP",
  };
  return map[title] ?? category.toUpperCase();
};

const getTabLabel = (title: string) => title.split('-')[0].replace('.', ' ');

/* ── Interactive SVG Tech Diagrams ── */
const InteractiveDiagram: React.FC<{ projectTitle: string }> = ({ projectTitle }) => {
  switch (projectTitle) {
    case "EchoCortex-Intelligence":
      return (
        <svg className="w-full h-full p-2" viewBox="70 80 360 250" fill="none">
          <defs>
            <pattern id="grid-ec" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D3D3D3" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-ec)" />

          {/* Lattice paths */}
          <path d="M 250 200 L 150 120" stroke="#475569" strokeWidth="1.5" />
          <path d="M 250 200 L 350 120" stroke="#475569" strokeWidth="1.5" />
          <path d="M 250 200 L 150 280" stroke="#475569" strokeWidth="1.5" />
          <path d="M 250 200 L 350 280" stroke="#475569" strokeWidth="1.5" />
          <path d="M 150 120 L 150 280" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 350 120 L 350 280" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Nodes */}
          <circle cx="250" cy="200" r="24" fill="#EDEDED" stroke="#475569" strokeWidth="2" />
          <circle cx="250" cy="200" r="8" fill="#B87333" />
          <text x="250" y="240" textAnchor="middle" fill="#000000" className="text-[9px] font-mono font-black tracking-wider">WHISPER_CORE</text>

          <circle cx="150" cy="120" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="150" y="124" textAnchor="middle" fill="#475569" className="text-[9px]">🎙️</text>
          <text x="150" y="150" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">AUDIO_REC</text>

          <circle cx="350" cy="120" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="350" y="124" textAnchor="middle" fill="#475569" className="text-[9px]">📦</text>
          <text x="350" y="150" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">CHROMADB</text>

          <circle cx="150" cy="280" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="150" y="284" textAnchor="middle" fill="#475569" className="text-[9px]">☁️</text>
          <text x="150" y="310" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">ATLAS_CLOUD</text>

          <circle cx="350" cy="280" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="350" y="284" textAnchor="middle" fill="#475569" className="text-[9px]">🕸️</text>
          <text x="350" y="310" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">LATTICE_3D</text>

          {/* Pulse animation */}
          <circle cx="200" cy="160" r="3.5" fill="#B87333">
            <animate attributeName="cx" values="150;250" dur="2s" repeatCount="indefinite" />
            <animate attributeName="cy" values="120;200" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="160" r="3.5" fill="#B87333">
            <animate attributeName="cx" values="250;350" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="cy" values="200;120" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      );

    case "FaceShield-Authentication":
      return (
        <svg className="w-full h-full p-2" viewBox="50 140 400 200" fill="none">
          <defs>
            <pattern id="grid-fs" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D3D3D3" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-fs)" />

          <path d="M 90 200 H 410" stroke="#475569" strokeWidth="2" />
          <path d="M 250 200 V 290 H 370" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />

          <circle cx="90" cy="200" r="18" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="90" y="204" textAnchor="middle" fill="#475569" className="text-[10px]">📷</text>
          <text x="90" y="230" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">CAM_FEED</text>

          <circle cx="250" cy="200" r="22" fill="#EDEDED" stroke="#475569" strokeWidth="2" />
          <text x="250" y="204" textAnchor="middle" fill="#475569" className="text-[10px]">🧠</text>
          <text x="250" y="235" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">ONNX_EDGE</text>

          <circle cx="410" cy="200" r="18" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="410" y="204" textAnchor="middle" fill="#475569" className="text-[10px]">🔌</text>
          <text x="410" y="230" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">GATEWAY_API</text>

          <circle cx="370" cy="290" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="370" y="294" textAnchor="middle" fill="#475569" className="text-[9px]">💾</text>
          <text x="370" y="316" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">SQLITE_CACHE</text>

          <rect x="235" y="185" width="30" height="30" rx="3" fill="none" stroke="#E11D48" strokeWidth="1.5" className="animate-[pulse_1.5s_infinite]" />
        </svg>
      );

    case "EntityEase-DataPlatform":
      return (
        <svg className="w-full h-full p-2" viewBox="50 90 400 230" fill="none">
          <defs>
            <pattern id="grid-ee" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D3D3D3" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-ee)" />

          <path d="M 90 200 C 180 120, 220 120, 310 200" stroke="#475569" strokeWidth="2" />
          <path d="M 90 200 C 180 280, 220 280, 310 200" stroke="#475569" strokeWidth="2" />
          <path d="M 310 200 H 420" stroke="#475569" strokeWidth="2" />

          <circle cx="90" cy="200" r="18" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="90" y="204" textAnchor="middle" fill="#475569" className="text-[10px]">📝</text>
          <text x="90" y="230" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">RAW_EHR</text>

          <circle cx="200" cy="130" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="200" y="134" textAnchor="middle" fill="#475569" className="text-[9px]">🧬</text>
          <text x="200" y="156" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">BIOBERT_NER</text>

          <circle cx="200" cy="270" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="200" y="274" textAnchor="middle" fill="#475569" className="text-[9px]">🔍</text>
          <text x="200" y="296" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">FAISS_VECTOR</text>

          <circle cx="310" cy="200" r="20" fill="#EDEDED" stroke="#475569" strokeWidth="2" />
          <text x="310" y="204" textAnchor="middle" fill="#B87333" className="text-[10px]">🏷️</text>
          <text x="310" y="232" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">ICD11_TAX</text>

          <circle cx="420" cy="200" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="420" y="204" textAnchor="middle" fill="#475569" className="text-[9px]">👥</text>
          <text x="420" y="230" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">AUDIT_PORTAL</text>
        </svg>
      );

    case "AegisNet-IDS":
      return (
        <svg className="w-full h-full p-2" viewBox="50 70 400 260" fill="none">
          <defs>
            <pattern id="grid-an" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#D3D3D3" strokeWidth="0.5" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-an)" />

          {/* Connection Lines (Slate Gray) */}
          <path d="M 80 200 L 200 120" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 80 200 L 200 280" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 200 120 L 320 200" stroke="#475569" strokeWidth="2" />
          <path d="M 200 280 L 320 200" stroke="#475569" strokeWidth="2" />
          <path d="M 320 200 L 420 200" stroke="#475569" strokeWidth="2" />

          {/* Attack Vectors (Coral-Red) */}
          <path d="M 80 200 H 200" stroke="#E11D48" strokeWidth="2.5" className="animate-[pulse_2s_infinite]">
            <animate attributeName="stroke-dasharray" values="0,500;500,0" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M 200 120 V 280" stroke="#E11D48" strokeWidth="1.5" strokeDasharray="5 5" />

          {/* Nodes */}
          <circle cx="80" cy="200" r="16" fill="#E5E5E5" stroke="#E11D48" strokeWidth="2.5" />
          <circle cx="80" cy="200" r="6" fill="#E11D48" />
          <text x="80" y="232" textAnchor="middle" fill="#000000" className="text-[9px] font-mono font-black tracking-wider">ATTACK_SRC</text>

          <circle cx="200" cy="120" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <rect x="194" y="114" width="12" height="12" fill="#475569" />
          <text x="200" y="92" textAnchor="middle" fill="#000000" className="text-[9px] font-mono font-black tracking-wider">SNORT_IDS</text>

          <circle cx="200" cy="280" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <polygon points="200,272 208,286 192,286" fill="#475569" />
          <text x="200" y="312" textAnchor="middle" fill="#000000" className="text-[9px] font-mono font-black tracking-wider">SIEM_TELEMETRY</text>

          <circle cx="320" cy="200" r="20" fill="#EDEDED" stroke="#475569" strokeWidth="2" />
          <circle cx="320" cy="200" r="8" fill="#B87333" />
          <text x="320" y="168" textAnchor="middle" fill="#000000" className="text-[9px] font-mono font-black tracking-wider">ANOMALY_DET</text>

          <circle cx="420" cy="200" r="16" fill="#E5E5E5" stroke="#E11D48" strokeWidth="2" />
          <path d="M 414 194 L 426 206 M 426 194 L 414 206" stroke="#E11D48" strokeWidth="2.5" />
          <text x="420" y="232" textAnchor="middle" fill="#000000" className="text-[9px] font-mono font-black tracking-wider">SOAR_BLOCK</text>

          {/* Pulses */}
          <circle cx="140" cy="160" r="3" fill="#475569">
            <animate attributeName="cx" values="80;200" dur="2s" repeatCount="indefinite" />
            <animate attributeName="cy" values="200;120" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="140" cy="240" r="3" fill="#475569">
            <animate attributeName="cx" values="80;200" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="cy" values="200;280" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      );

    case "FenceIN-AccessControl":
      return (
        <svg className="w-full h-full p-2" viewBox="70 100 360 250" fill="none">
          <defs>
            <pattern id="grid-fi" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D3D3D3" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-fi)" />

          <path d="M 120 150 H 380 V 270 H 120 Z" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 250 150 V 270" stroke="#475569" strokeWidth="1.5" />

          <circle cx="120" cy="150" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="120" y="154" textAnchor="middle" fill="#475569" className="text-[10px]">💳</text>
          <text x="120" y="124" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">RFID_READER</text>

          <circle cx="380" cy="150" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="380" y="154" textAnchor="middle" fill="#475569" className="text-[10px]">☝️</text>
          <text x="380" y="124" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">BIOMETRIC</text>

          <circle cx="250" cy="210" r="20" fill="#EDEDED" stroke="#475569" strokeWidth="2" />
          <text x="250" y="214" textAnchor="middle" fill="#B87333" className="text-[11px]">🎛️</text>
          <text x="250" y="244" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">FLASK_CORE</text>

          <circle cx="250" cy="310" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="250" y="314" textAnchor="middle" fill="#475569" className="text-[10px]">🚧</text>
          <text x="250" y="336" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">GATE_REL</text>
        </svg>
      );

    case "CodeSight-DeveloperToolkit":
      return (
        <svg className="w-full h-full p-2" viewBox="50 80 400 240" fill="none">
          <defs>
            <pattern id="grid-cs" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D3D3D3" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-cs)" />

          <path d="M 80 200 H 420" stroke="#475569" strokeWidth="2" />
          <path d="M 250 120 V 280" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />

          <circle cx="80" cy="200" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="80" y="204" textAnchor="middle" fill="#475569" className="text-[10px]">📋</text>
          <text x="80" y="228" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">GIT_DIFF</text>

          <circle cx="250" cy="120" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="250" y="124" textAnchor="middle" fill="#475569" className="text-[10px]">🌳</text>
          <text x="250" y="96" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">AST_PARSE</text>

          <circle cx="250" cy="200" r="20" fill="#EDEDED" stroke="#475569" strokeWidth="2" />
          <text x="250" y="204" textAnchor="middle" fill="#B87333" className="text-[11px]">🤖</text>
          <text x="250" y="234" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">TRANSFORMER</text>

          <circle cx="250" cy="280" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="250" y="284" textAnchor="middle" fill="#475569" className="text-[10px]">🛡️</text>
          <text x="250" y="306" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">SEC_AUDIT</text>

          <circle cx="420" cy="200" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="420" y="204" textAnchor="middle" fill="#475569" className="text-[10px]">🖥️</text>
          <text x="420" y="228" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">VSCODE_IDE</text>
        </svg>
      );

    case "Veltrio.Suite":
      return (
        <svg className="w-full h-full p-2" viewBox="50 100 400 210" fill="none">
          <defs>
            <pattern id="grid-vs" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D3D3D3" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-vs)" />

          <path d="M 80 200 Q 250 80 420 200" stroke="#475569" strokeWidth="1.5" />
          <path d="M 80 200 Q 250 320 420 200" stroke="#475569" strokeWidth="1.5" />
          <path d="M 80 200 H 420" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />

          <circle cx="80" cy="200" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="80" y="204" textAnchor="middle" fill="#475569" className="text-[10px]">🗣️</text>
          <text x="80" y="226" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">SPEECH_IN</text>

          <circle cx="250" cy="140" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="250" y="144" textAnchor="middle" fill="#475569" className="text-[10px]">🔗</text>
          <text x="250" y="168" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">COREF_MODEL</text>

          <circle cx="250" cy="260" r="20" fill="#EDEDED" stroke="#475569" strokeWidth="2" />
          <text x="250" y="264" textAnchor="middle" fill="#B87333" className="text-[11px]">🔀</text>
          <text x="250" y="292" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">INTENT_TRANS</text>

          <circle cx="420" cy="200" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="420" y="204" textAnchor="middle" fill="#475569" className="text-[10px]">💬</text>
          <text x="420" y="226" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">TRANSCRIPT</text>
        </svg>
      );

    default:
      return null;
  }
};

const Projects: React.FC = () => {
  const { data } = usePortfolioData();
  const projectsList = (data.projects || []).slice(0, 4);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0); // 0–100 for the auto-advance bar
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [docTitle, setDocTitle] = useState('');

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Clear and restart the auto-advance timer */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);

    // Progress bar ticks every 70ms → 100 ticks over 7s
    const TICK_MS = 70;
    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(p + (TICK_MS / AUTO_ADVANCE_MS) * 100, 100));
    }, TICK_MS);

    timerRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex(p => (p + 1) % projectsList.length);
      setProgress(0);
    }, AUTO_ADVANCE_MS);
  }, [projectsList.length]);

  /* Manual navigation — also resets the timer */
  const handleSelect = useCallback((i: number) => {
    if (i === activeIndex) return;
    setDirection(i > activeIndex ? 1 : -1);
    setActiveIndex(i);
    startTimer();
  }, [activeIndex, startTimer]);


  /* Start timer on mount */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [startTimer]);

  if (projectsList.length === 0) {
    return (
      <section id="projects" className="h-screen flex items-center justify-center bg-[#EDEDED]">
        <div className="text-center font-mono text-xs uppercase tracking-widest text-black/60 animate-pulse">
          INITIALIZING PROJECTS CANVAS...
        </div>
      </section>
    );
  }

  const active = projectsList[activeIndex] ?? projectsList[0];
  const subLabel = active ? getSubLabel(active.title, active.category) : "";
  const shortDesc = active ? (SHORT_DESC[active.title] ?? active.description.slice(0, 200) + '…') : "";
  const caseLabel = `PROJECT USE CASE_ ${String(activeIndex + 1).padStart(3, '0')}/${String(projectsList.length).padStart(3, '0')}`;

  /* Right-panel slides vertically with smoother spring easing */
  const rightVariants = {
    enter: (d: number) => ({ y: d > 0 ? '18%' : '-18%', opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (d: number) => ({ y: d > 0 ? '-18%' : '18%', opacity: 0 }),
  };

  return (
    <section id="projects" className="bg-transparent relative min-h-screen lg:h-screen flex flex-col lg:overflow-hidden">

      {/* ── MATERIAL DESIGN LIGHT HEADER BAND ── */}
      <div className="bg-white/40 backdrop-blur-xl text-black shrink-0 border-b border-white/40 shadow-xs">
        <div className="container mx-auto px-6 md:px-10 pt-8 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="font-section-label text-[13px] font-semibold uppercase tracking-[0.08em] text-black/70 mb-2">
                Section 04 // Works
              </div>

              <h2 className="font-section-heading text-2xl md:text-3xl font-bold tracking-[-0.03em] leading-tight text-black">
                {projectsList.length} engineering systems, one portfolio.
              </h2>
            </div>

            <a
              href="https://catlogtheoriongd.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-black/75 backdrop-blur-md text-white font-space-grotesk font-bold text-xs tracking-[0.02em] uppercase py-3 px-6 rounded-xl shadow-lg hover:bg-black/90 active:scale-95 transition-all duration-200 cursor-pointer self-start sm:self-auto shrink-0 border border-white/20 group"
            >
              <span>View Entire Catalog</span>
              <svg className="w-3.5 h-3.5 text-[#B87333] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Material Tabs (Google M3 Style) */}
          <div className="overflow-x-auto scrollbar-none -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex gap-2 min-w-[560px] pb-3 border-t border-[#E5E5E5]/40 pt-4">
              {projectsList.map((project, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`text-left px-4 py-2.5 rounded-full transition-all duration-200 cursor-pointer focus:outline-none flex items-center gap-3 border ${isActive
                        ? 'bg-black/80 backdrop-blur-md border-white/30 shadow-md text-white'
                        : 'bg-black/40 backdrop-blur-sm border-white/10 text-white/80 hover:bg-black/70 hover:text-white'
                      }`}
                  >
                    <span className={`font-number-display text-xs font-bold tracking-widest ${isActive ? 'text-white' : 'text-white/60'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-space-grotesk text-xs font-bold tracking-[0.02em] text-white">
                      {getTabLabel(project.title)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ── SPLIT CONTENT PANEL ── */}
      <div className="flex-1 lg:overflow-hidden bg-transparent">
        <div className="h-auto lg:h-full container mx-auto px-6 md:px-10 py-6">
          <div className="h-auto lg:h-full flex flex-col lg:flex-row gap-8">

            {/* ── LEFT: The Canvas (Left 62%) ── */}
            <div className="hidden lg:flex lg:w-[62%] xl:w-[64%] h-full rounded-3xl bg-white/30 backdrop-blur-xl border border-white/40 relative items-center justify-center overflow-hidden shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.title}
                  className="w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45 }}
                >
                  <InteractiveDiagram projectTitle={active.title} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── RIGHT: The Info Card (Right 38%) ── */}
            <div className="h-auto lg:h-full flex-1 flex flex-col justify-between bg-[#EDEDED] rounded-3xl shadow-[8px_8px_16px_#DCDCDC,-8px_-8px_16px_#ffffff] border border-[#E5E5E5]/20 lg:overflow-hidden relative z-10">
              <div className="flex-1 lg:overflow-y-auto scrollbar-none p-8">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={rightVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col justify-between min-h-full gap-6"
                  >
                    {/* Content */}
                    <div>
                      <p className="font-small-label text-[11px] font-medium tracking-[0.12em] text-black mb-4 uppercase">
                        {caseLabel}
                      </p>

                      <h3 className="font-card-title text-2xl md:text-[34px] font-bold tracking-[-0.03em] leading-[1.15] text-black mb-4 uppercase">
                        {active.title.replace(/-/g, ' ')}
                      </h3>

                      <p className="font-body-text text-base md:text-[18px] leading-[1.7] text-black mb-6">
                        {shortDesc}
                      </p>

                      <div className="mb-5">
                        <span className="font-card-subtitle text-[17px] font-normal text-black uppercase">
                          {subLabel}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {active.tech.map((t, i) => (
                          <span key={i} className="font-status-badge text-[13px] font-semibold tracking-[0.06em] uppercase px-3 py-1 rounded-full glass-badge">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom: CTAs + Up/Down arrows */}
                    <div className="flex items-end justify-between pt-6 border-t border-[#E5E5E5]">
                      <div className="flex items-center gap-3 flex-wrap">
                        <button
                          onClick={() => { setDocTitle(active.title); setIsDocOpen(true); }}
                          className="inline-flex items-center bg-black/80 backdrop-blur-md text-white font-space-grotesk font-bold text-xs tracking-[0.02em] uppercase py-2.5 px-5 rounded-xl border border-white/20 shadow-md hover:bg-black/95 active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                          <span className="text-[#B87333] mr-2 text-[8px]">▪</span>
                          View Case
                        </button>
                        {active.github && active.github !== '#' && (
                          <a href={active.github} target="_blank" rel="noreferrer"
                            className="inline-flex items-center bg-black/80 backdrop-blur-md text-white font-space-grotesk font-bold text-xs tracking-[0.02em] uppercase py-2.5 px-5 rounded-xl border border-white/20 shadow-md hover:bg-black/95 active:scale-95 transition-all duration-200">
                            Source
                          </a>
                        )}
                        {active.demo && active.demo !== '#' && (
                          <a href={active.demo} target="_blank" rel="noreferrer"
                            className="inline-flex items-center bg-black/80 backdrop-blur-md text-white font-space-grotesk font-bold text-xs tracking-[0.02em] uppercase py-2.5 px-5 rounded-xl border border-white/20 shadow-md hover:bg-black/95 active:scale-95 transition-all duration-200">
                            Live
                          </a>
                        )}
                      </div>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Auto-advance progress bar */}
              <div className="h-[3px] bg-[#EDEDED] w-full shrink-0">
                <div
                  className="h-full bg-[#B87333] transition-none"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── BOTTOM RULE ── */}
      <div className="w-full h-px bg-[#E5E5E5] shrink-0" />

      <MarkdownModal isOpen={isDocOpen} onClose={() => setIsDocOpen(false)} projectTitle={docTitle} />
    </section>
  );
};

export default Projects;