import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { Project } from '../types';
import MarkdownModal from './MarkdownModal';

const AUTO_ADVANCE_MS = 7000;

/* ── Extended project descriptions (500+ chars each) ────────────── */
const SHORT_DESC: Record<string, string> = {
  "Aureon":
    "Aureon is a zero-rated, offline-first digital wellness companion orchestrating a network of 4 AI agents via Google ADK 2.0 and A2A protocol, featuring Presidio PII scrubbing and local SQLite cache.",
  "Walsecact":
    "Walsecact is a zero-trust decentralized security mesh for Multi-Agent Systems intercepting MCP JSON-RPC streams with hash-chained WAL logging and automated Docker container quarantine.",
  "Trifecta":
    "Trifecta is an educational AI workspace coordinating 4 sub-agents via Google Agents SDK and FastMCP, combining Presidio security gates with Human-in-the-Loop verification.",
  "Cadence":
    "Cadence is an autonomous workflow platform leveraging Google ADK and Vercel AI SDK to coordinate multi-agent work distribution, capacity matching, and execution sandboxes.",
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
    "Aureon": "MULTI-AGENT AI + PRIVACY",
    "Walsecact": "ZERO-TRUST + MAS SECURITY",
    "Trifecta": "MULTI-AGENT RAG + WORKSPACE",
    "Cadence": "AUTONOMOUS WORK ORCHESTRATION",
    "EchoCortex-Intelligence": "AI + KNOWLEDGE GRAPH",
    "FaceShield-Authentication": "AI + COMPUTER VISION",
    "EntityEase-DataPlatform": "AI + CLINICAL DATA",
    "AegisNet-IDS": "SECURITY + SIEM / SOAR",
    "FenceIN-AccessControl": "INDUSTRIAL + BIOMETRICS",
    "CodeSight-DeveloperToolkit": "AI + CODE GEN",
    "Veltrio.Suite": "AI + TRANSLATION / NLP",
  };
  return map[title] ?? (category ? category.toUpperCase() : "ENGINEERING SYSTEM");
};

const getTabLabel = (title: string) => title.split('-')[0].replace('.', ' ');

const getSystemSpecs = (project: Project) => {
  const title = project.title;
  const tech = project.tech || [];

  const specsMap: Record<string, { runtime: string; engine: string; persistence: string; security: string }> = {
    "Aureon": {
      runtime: "FastAPI / Python 3.13",
      engine: "Google ADK 2.0 (A2A)",
      persistence: "WatermelonDB + SQLite",
      security: "Presidio PII + Zero-Bandwidth",
    },
    "Walsecact": {
      runtime: "Node.js + Python FastAPI",
      engine: "MCP Sidecar / JSON-RPC",
      persistence: "SQLite WAL + MongoDB Atlas",
      security: "Zero-Trust + Docker Quarantine",
    },
    "Trifecta": {
      runtime: "Python FastAPI + React 18",
      engine: "Google Agents + FastMCP",
      persistence: "FastMCP Vector RAG",
      security: "Presidio + HITL Escort Gates",
    },
    "Cadence": {
      runtime: "Next.js 16 (React 19) / Bun",
      engine: "Google ADK + Vercel AI",
      persistence: "Prisma + PostgreSQL",
      security: "Workspace Row Isolation",
    },
    "EchoCortex-Intelligence": {
      runtime: "Whisper STT + FastEmbed",
      engine: "SentenceTransformers",
      persistence: "ChromaDB + Atlas Cloud",
      security: "Local-First Fallback Cache",
    },
    "FaceShield-Authentication": {
      runtime: "Python + OpenCV Edge",
      engine: "ArcFace ONNX Runtime",
      persistence: "Edge SQLite + Prisma Sync",
      security: "Passive Liveness + Tamper-Proof",
    },
    "EntityEase-DataPlatform": {
      runtime: "FastAPI + PyTorch Async",
      engine: "BioBERT + FAISS Dense",
      persistence: "MongoDB Audit Store",
      security: "HIPAA Safe De-Identification",
    },
    "AegisNet-IDS": {
      runtime: "Npcap / Libpcap Engine",
      engine: "Snort 3 + Isolation Forest",
      persistence: "NetworkX Graph State",
      security: "SOAR Automated IP Block",
    },
    "FenceIN-AccessControl": {
      runtime: "Flask Core + SQLite Cache",
      engine: "RFID + Fingerprint Verifier",
      persistence: "Local SQLite Offline Store",
      security: "Hardware Dual-Factor Gateway",
    },
    "CodeSight-DeveloperToolkit": {
      runtime: "Python AST + React UI",
      engine: "Semantic IR + Transformer",
      persistence: "Docker Container Sandboxes",
      security: "Automated PR CVE Scanner",
    },
    "Veltrio.Suite": {
      runtime: "Custom Coreference NLP",
      engine: "Intent-Aware Translation",
      persistence: "In-Memory Session Store",
      security: "Multi-Party Audio Scrubbing",
    },
  };

  if (specsMap[title]) return specsMap[title];

  // Dynamic fallback for any other project in portfolio
  return {
    runtime: tech[0] ? `${tech[0]} Runtime` : "Microservice Stack",
    engine: tech[1] ? `${tech[1]} Engine` : project.category || "Full-Stack Core",
    persistence: tech.find(t => /mongo|sql|db|postgres|redis|storage/i.test(t)) || "Cloud Persistence",
    security: "Production Hardened // Isolated",
  };
};

/* ── Dynamic Generic SVG Architecture Diagram for any project ── */
const DynamicArchitectureDiagram: React.FC<{ project: Project }> = ({ project }) => {
  const tech = project.tech && project.tech.length > 0 ? project.tech : ['React', 'Node.js', 'PostgreSQL'];
  const node1 = tech[0] || 'CLIENT_LAYER';
  const node2 = tech[1] || 'CORE_ENGINE';
  const node3 = tech[2] || 'DISPATCH_SVC';
  const node4 = tech[3] || 'DATA_STORE';

  return (
    <svg className="w-full h-full p-2" viewBox="50 70 400 250" fill="none">
      <defs>
        <pattern id="grid-dyn" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#D3D3D3" strokeWidth="0.5" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-dyn)" />

      {/* Pathways */}
      <path d="M 80 190 H 200" stroke="#475569" strokeWidth="1.8" />
      <path d="M 200 190 L 320 130" stroke="#475569" strokeWidth="1.5" />
      <path d="M 200 190 L 320 250" stroke="#475569" strokeWidth="1.5" />
      <path d="M 320 130 H 410" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 320 250 H 410" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Nodes */}
      <circle cx="80" cy="190" r="18" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
      <text x="80" y="194" textAnchor="middle" fill="#475569" className="text-[10px]">🌐</text>
      <text x="80" y="222" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider uppercase truncate max-w-[60px]">{node1.slice(0, 10)}</text>

      <circle cx="200" cy="190" r="22" fill="#EDEDED" stroke="#475569" strokeWidth="2" />
      <circle cx="200" cy="190" r="8" fill="#B87333" />
      <text x="200" y="228" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider uppercase">{node2.slice(0, 10)}</text>

      <circle cx="320" cy="130" r="17" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
      <text x="320" y="134" textAnchor="middle" fill="#475569" className="text-[10px]">⚙️</text>
      <text x="320" y="105" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider uppercase">{node3.slice(0, 10)}</text>

      <circle cx="320" cy="250" r="17" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
      <text x="320" y="254" textAnchor="middle" fill="#475569" className="text-[10px]">💾</text>
      <text x="320" y="280" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider uppercase">{node4.slice(0, 10)}</text>

      <circle cx="410" cy="190" r="18" fill="#EDEDED" stroke="#10B981" strokeWidth="2" />
      <text x="410" y="194" textAnchor="middle" fill="#10B981" className="text-[10px]">✓</text>
      <text x="410" y="222" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">DEPLOYED</text>

      {/* Pulses */}
      <circle cx="140" cy="190" r="3" fill="#B87333">
        <animate attributeName="cx" values="80;200" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="260" cy="160" r="3" fill="#10B981">
        <animate attributeName="cx" values="200;320" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="cy" values="190;130" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="260" cy="220" r="3" fill="#B87333">
        <animate attributeName="cx" values="200;320" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="cy" values="190;250" dur="2.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

/* ── Interactive SVG Tech Diagrams ── */
const InteractiveDiagram: React.FC<{ projectTitle: string; project?: Project }> = ({ projectTitle, project }) => {
  switch (projectTitle) {
    case "Aureon":
      return (
        <svg className="w-full h-full p-2" viewBox="40 50 420 280" fill="none">
          <defs>
            <pattern id="grid-aureon" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D3D3D3" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-aureon)" />

          {/* Connection Pathways */}
          <path d="M 80 180 H 160" stroke="#475569" strokeWidth="2" />
          <path d="M 160 180 H 240" stroke="#475569" strokeWidth="2" />
          <path d="M 240 180 L 370 100" stroke="#475569" strokeWidth="1.5" />
          <path d="M 240 180 L 370 150" stroke="#475569" strokeWidth="1.5" />
          <path d="M 240 180 L 370 210" stroke="#475569" strokeWidth="1.5" />
          <path d="M 240 180 L 370 260" stroke="#E11D48" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 160 180 V 270 H 240" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Nodes */}
          {/* 1. Client App */}
          <circle cx="80" cy="180" r="18" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="80" y="184" textAnchor="middle" fill="#475569" className="text-[10px]">📱</text>
          <text x="80" y="210" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">REACT_NATIVE</text>

          {/* 2. Presidio PII Gate */}
          <circle cx="160" cy="180" r="18" fill="#EDEDED" stroke="#10B981" strokeWidth="2" />
          <text x="160" y="184" textAnchor="middle" fill="#10B981" className="text-[10px]">🛡️</text>
          <text x="160" y="152" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">PRESIDIO_PII</text>

          {/* 3. Core Multi-Agent Gateway */}
          <circle cx="240" cy="180" r="24" fill="#EDEDED" stroke="#475569" strokeWidth="2" />
          <circle cx="240" cy="180" r="8" fill="#B87333" />
          <text x="240" y="220" textAnchor="middle" fill="#000000" className="text-[9px] font-mono font-black tracking-wider">ADK_A2A_CORE</text>

          {/* 4. Agents Stack */}
          <circle cx="370" cy="100" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="370" y="104" textAnchor="middle" fill="#475569" className="text-[9px]">🩺</text>
          <text x="370" y="80" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">TRIAGE_AGENT</text>

          <circle cx="370" cy="150" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="370" y="154" textAnchor="middle" fill="#475569" className="text-[9px]">💬</text>
          <text x="370" y="132" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">CBT_COMPANION</text>

          <circle cx="370" cy="210" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="370" y="214" textAnchor="middle" fill="#475569" className="text-[9px]">📍</text>
          <text x="370" y="235" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">RESOURCE_MATCH</text>

          <circle cx="370" cy="260" r="16" fill="#EDEDED" stroke="#E11D48" strokeWidth="1.5" />
          <text x="370" y="264" textAnchor="middle" fill="#E11D48" className="text-[9px]">🚨</text>
          <text x="370" y="285" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">ESCALATION_GATE</text>

          {/* 5. Offline Storage */}
          <circle cx="240" cy="270" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="240" y="274" textAnchor="middle" fill="#475569" className="text-[9px]">💾</text>
          <text x="240" y="298" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">SQLITE_OFFLINE</text>

          {/* Animated Pulses */}
          <circle cx="120" cy="180" r="3" fill="#10B981">
            <animate attributeName="cx" values="80;160" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="180" r="3" fill="#B87333">
            <animate attributeName="cx" values="160;240" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="140" r="3" fill="#B87333">
            <animate attributeName="cx" values="240;370" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="cy" values="180;100" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="165" r="3" fill="#B87333">
            <animate attributeName="cx" values="240;370" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="cy" values="180;150" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      );

    case "Walsecact":
      return (
        <svg className="w-full h-full p-2" viewBox="40 50 420 280" fill="none">
          <defs>
            <pattern id="grid-walsec" width="22" height="22" patternUnits="userSpaceOnUse">
              <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#D3D3D3" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-walsec)" />

          {/* Network Paths */}
          <path d="M 80 150 H 170" stroke="#475569" strokeWidth="2" />
          <path d="M 170 150 H 260" stroke="#475569" strokeWidth="2" />
          <path d="M 260 150 L 370 100" stroke="#E11D48" strokeWidth="1.8" />
          <path d="M 260 150 L 370 180" stroke="#475569" strokeWidth="1.8" />
          <path d="M 260 150 L 370 250" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 170 150 V 240 H 240" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Nodes */}
          <circle cx="80" cy="150" r="18" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="80" y="154" textAnchor="middle" fill="#475569" className="text-[10px]">🤖</text>
          <text x="80" y="180" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">MCP_HOST</text>

          <circle cx="170" cy="150" r="20" fill="#EDEDED" stroke="#475569" strokeWidth="2" />
          <text x="170" y="154" textAnchor="middle" fill="#B87333" className="text-[10px]">⚡</text>
          <text x="170" y="122" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">SIDECAR_PROXY</text>

          <circle cx="260" cy="150" r="24" fill="#EDEDED" stroke="#E11D48" strokeWidth="2" />
          <circle cx="260" cy="150" r="8" fill="#E11D48" />
          <text x="260" y="190" textAnchor="middle" fill="#000000" className="text-[9px] font-mono font-black tracking-wider">ZERO_TRUST_MESH</text>

          {/* Attack Containment Box */}
          <circle cx="370" cy="100" r="16" fill="#EDEDED" stroke="#E11D48" strokeWidth="2" className="animate-[pulse_1.5s_infinite]" />
          <text x="370" y="104" textAnchor="middle" fill="#E11D48" className="text-[9px]">📦</text>
          <text x="370" y="78" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">DOCKER_QUARANTINE</text>

          <circle cx="370" cy="180" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="370" y="184" textAnchor="middle" fill="#475569" className="text-[9px]">🔗</text>
          <text x="370" y="204" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">WAL_HASH_CHAIN</text>

          <circle cx="370" cy="250" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="370" y="254" textAnchor="middle" fill="#475569" className="text-[9px]">☁️</text>
          <text x="370" y="275" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">MONGODB_ATLAS</text>

          <circle cx="240" cy="240" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="240" y="244" textAnchor="middle" fill="#475569" className="text-[9px]">📊</text>
          <text x="240" y="268" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">SIEM_SOCKETIO</text>

          {/* Telemetry Pulses */}
          <circle cx="125" cy="150" r="3" fill="#B87333">
            <animate attributeName="cx" values="80;170" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="315" cy="125" r="3.5" fill="#E11D48">
            <animate attributeName="cx" values="260;370" dur="1.7s" repeatCount="indefinite" />
            <animate attributeName="cy" values="150;100" dur="1.7s" repeatCount="indefinite" />
          </circle>
        </svg>
      );

    case "Trifecta":
      return (
        <svg className="w-full h-full p-2" viewBox="40 50 420 280" fill="none">
          <defs>
            <pattern id="grid-tri" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D3D3D3" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-tri)" />

          {/* Connections */}
          <path d="M 80 170 H 160" stroke="#475569" strokeWidth="2" />
          <path d="M 160 170 H 250" stroke="#475569" strokeWidth="2" />
          <path d="M 250 170 L 370 100" stroke="#475569" strokeWidth="1.5" />
          <path d="M 250 170 L 370 170" stroke="#475569" strokeWidth="1.5" />
          <path d="M 250 170 L 370 240" stroke="#475569" strokeWidth="1.5" />
          <path d="M 250 170 V 260 H 330" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 160 170 V 260 H 190" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Nodes */}
          <circle cx="80" cy="170" r="18" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="80" y="174" textAnchor="middle" fill="#475569" className="text-[10px]">🎓</text>
          <text x="80" y="200" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">STUDENT_UI</text>

          <circle cx="160" cy="170" r="18" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="160" y="174" textAnchor="middle" fill="#475569" className="text-[10px]">🛡️</text>
          <text x="160" y="142" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">PRESIDIO_GATE</text>

          <circle cx="250" cy="170" r="22" fill="#EDEDED" stroke="#475569" strokeWidth="2" />
          <circle cx="250" cy="170" r="8" fill="#B87333" />
          <text x="250" y="208" textAnchor="middle" fill="#000000" className="text-[9px] font-mono font-black tracking-wider">FASTMCP_ENGINE</text>

          <circle cx="370" cy="100" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="370" y="104" textAnchor="middle" fill="#475569" className="text-[9px]">❓</text>
          <text x="370" y="78" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">GROQ_QUIZ_AGENT</text>

          <circle cx="370" cy="170" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="370" y="174" textAnchor="middle" fill="#475569" className="text-[9px]">🎯</text>
          <text x="370" y="148" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">WEAKNESS_MAP</text>

          <circle cx="370" cy="240" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="370" y="244" textAnchor="middle" fill="#475569" className="text-[9px]">📅</text>
          <text x="370" y="265" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">7D_PLANNER</text>

          <circle cx="330" cy="260" r="16" fill="#EDEDED" stroke="#10B981" strokeWidth="1.5" />
          <text x="330" y="264" textAnchor="middle" fill="#10B981" className="text-[9px]">👤</text>
          <text x="330" y="285" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">HITL_APPROVAL</text>

          <circle cx="190" cy="260" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="190" y="264" textAnchor="middle" fill="#475569" className="text-[9px]">📚</text>
          <text x="190" y="285" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">LOCAL_RAG</text>

          {/* Pulses */}
          <circle cx="205" cy="170" r="3" fill="#B87333">
            <animate attributeName="cx" values="160;250" dur="1.9s" repeatCount="indefinite" />
          </circle>
          <circle cx="310" cy="135" r="3" fill="#B87333">
            <animate attributeName="cx" values="250;370" dur="2.3s" repeatCount="indefinite" />
            <animate attributeName="cy" values="170;100" dur="2.3s" repeatCount="indefinite" />
          </circle>
        </svg>
      );

    case "Cadence":
      return (
        <svg className="w-full h-full p-2" viewBox="40 50 420 280" fill="none">
          <defs>
            <pattern id="grid-cadence" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D3D3D3" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-cadence)" />

          {/* Work Stream Pathways */}
          <path d="M 80 170 H 180" stroke="#475569" strokeWidth="2" />
          <path d="M 180 170 L 290 100" stroke="#475569" strokeWidth="1.5" />
          <path d="M 180 170 L 290 170" stroke="#475569" strokeWidth="1.5" />
          <path d="M 180 170 L 290 240" stroke="#475569" strokeWidth="1.5" />
          <path d="M 290 100 L 400 130" stroke="#475569" strokeWidth="1.5" />
          <path d="M 290 170 L 400 130" stroke="#475569" strokeWidth="1.5" />
          <path d="M 290 240 L 400 220" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Nodes */}
          <circle cx="80" cy="170" r="18" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="80" y="174" textAnchor="middle" fill="#475569" className="text-[10px]">📋</text>
          <text x="80" y="200" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">SHEETJS_INGEST</text>

          <circle cx="180" cy="170" r="22" fill="#EDEDED" stroke="#475569" strokeWidth="2" />
          <circle cx="180" cy="170" r="8" fill="#B87333" />
          <text x="180" y="208" textAnchor="middle" fill="#000000" className="text-[9px] font-mono font-black tracking-wider">ADK_ALLOCATOR</text>

          <circle cx="290" cy="100" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="290" y="104" textAnchor="middle" fill="#475569" className="text-[9px]">🧩</text>
          <text x="290" y="78" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">CLAUDE_REASON</text>

          <circle cx="290" cy="170" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="290" y="174" textAnchor="middle" fill="#475569" className="text-[9px]">⚡</text>
          <text x="290" y="148" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">GROQ_SCORER</text>

          <circle cx="290" cy="240" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="290" y="244" textAnchor="middle" fill="#475569" className="text-[9px]">👁️</text>
          <text x="290" y="265" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">GEMINI_MULTI</text>

          <circle cx="400" cy="130" r="18" fill="#EDEDED" stroke="#10B981" strokeWidth="2" />
          <text x="400" y="134" textAnchor="middle" fill="#10B981" className="text-[9px]">🧪</text>
          <text x="400" y="160" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">CODE_SANDBOX</text>

          <circle cx="400" cy="220" r="16" fill="#EDEDED" stroke="#475569" strokeWidth="1.5" />
          <text x="400" y="224" textAnchor="middle" fill="#475569" className="text-[9px]">🗄️</text>
          <text x="400" y="245" textAnchor="middle" fill="#000000" className="text-[8px] font-mono font-black tracking-wider">PRISMA_POSTGRES</text>

          {/* Pulses */}
          <circle cx="130" cy="170" r="3" fill="#B87333">
            <animate attributeName="cx" values="80;180" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="235" cy="135" r="3" fill="#B87333">
            <animate attributeName="cx" values="180;290" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="cy" values="170;100" dur="2.4s" repeatCount="indefinite" />
          </circle>
        </svg>
      );

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
      return project ? <DynamicArchitectureDiagram project={project} /> : null;
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

  /* 
   * Tabs container ref for horizontal scrolling ONLY.
   * NEVER uses scrollIntoView() which scrolls the window vertically and hijacks the page!
   */
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartXRef = useRef<number | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const container = tabsContainerRef.current;
    const activeTab = tabRefs.current[activeIndex];
    if (container && activeTab) {
      // Smoothly scroll ONLY the horizontal tabs container
      const scrollOffset = (activeTab.offsetLeft - container.offsetLeft) - (container.clientWidth / 2) + (activeTab.clientWidth / 2);
      container.scrollTo({
        left: Math.max(0, scrollOffset),
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    touchStartXRef.current = null;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleSelect((activeIndex + 1) % projectsList.length);
      } else {
        handleSelect((activeIndex - 1 + projectsList.length) % projectsList.length);
      }
    }
  };

  /* Start timer on mount */
  useEffect(() => {
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
  const specs = getSystemSpecs(active);

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
        <div className="container mx-auto px-5 sm:px-6 md:px-10 pt-6 sm:pt-8 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div>
              <div className="font-section-label text-xs sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-black/70 mb-1.5 sm:mb-2">
                Section 04 // Works
              </div>

              <h2 className="font-section-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-[-0.03em] leading-tight text-black">
                {projectsList.length} engineering systems, one portfolio.
              </h2>
            </div>

            <a
              href="https://catlogtheoriongd.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-black/75 backdrop-blur-md text-white font-space-grotesk font-bold text-xs tracking-[0.02em] uppercase py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl shadow-lg hover:bg-black/90 active:scale-95 transition-all duration-200 cursor-pointer self-start sm:self-auto shrink-0 border border-white/20 group"
            >
              <span>View Entire Catalog</span>
              <svg className="w-3.5 h-3.5 text-[#B87333] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Material Tabs (Google M3 Style) with smooth horizontal scroll container ONLY */}
          <div
            ref={tabsContainerRef}
            className="overflow-x-auto scrollbar-none -mx-5 px-5 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
          >
            <div className="flex gap-2 min-w-max pb-3 border-t border-[#E5E5E5]/40 pt-3 sm:pt-4">
              {projectsList.map((project, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    ref={(el) => { tabRefs.current[idx] = el; }}
                    onClick={() => handleSelect(idx)}
                    className={`text-left px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all duration-200 cursor-pointer focus:outline-none flex items-center gap-2.5 sm:gap-3 border shrink-0 ${isActive
                        ? 'bg-black/85 backdrop-blur-md border-white/30 shadow-md text-white'
                        : 'bg-black/40 backdrop-blur-sm border-white/10 text-white/80 hover:bg-black/70 hover:text-white'
                      }`}
                  >
                    <span className={`font-number-display text-[11px] sm:text-xs font-bold tracking-widest ${isActive ? 'text-white' : 'text-white/60'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-space-grotesk text-[11px] sm:text-xs font-bold tracking-[0.02em] text-white whitespace-nowrap">
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
        <div className="h-auto lg:h-full container mx-auto px-5 sm:px-6 md:px-10 py-5 sm:py-6">
          <div className="h-auto lg:h-full flex flex-col lg:flex-row gap-6 lg:gap-8">

            {/* ── LEFT: The Canvas (Left 62%) with Live Architecture Data ── */}
            <div className="hidden lg:flex lg:w-[62%] xl:w-[64%] h-full rounded-3xl bg-white/40 backdrop-blur-xl border border-white/50 relative flex-col justify-between overflow-hidden shadow-xl p-5 md:p-6">
              
              {/* Header Overlay: System ID + Live Node Status */}
              <div className="flex items-center justify-between z-10 w-full pb-3 border-b border-black/10 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                  <span className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase text-black">
                    SYS_NODE // {active.title.toUpperCase().replace(/[^A-Z0-9]/g, '_')}
                  </span>
                  <span className="font-mono text-[9px] font-semibold text-black/70 px-2 py-0.5 rounded-md bg-black/5 border border-black/10">
                    LIVE TOPOLOGY
                  </span>
                </div>
                <div className="font-mono text-[10px] font-bold text-black/70 tracking-widest uppercase">
                  {subLabel}
                </div>
              </div>

              {/* Center: The Interactive Diagram */}
              <div className="flex-1 w-full flex items-center justify-center relative min-h-0 py-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.title}
                    className="w-full h-full flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45 }}
                  >
                    <InteractiveDiagram projectTitle={active.title} project={active} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Overlay: Telemetry Metrics Deck */}
              <div className="z-10 w-full pt-3 border-t border-black/10 grid grid-cols-4 gap-2 text-black shrink-0">
                <div className="px-3 py-2 rounded-xl bg-white/70 border border-black/5 shadow-xs flex flex-col">
                  <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-black/50">Core Runtime</span>
                  <span className="font-space-grotesk text-[11px] font-bold truncate text-black">{specs.runtime}</span>
                </div>
                <div className="px-3 py-2 rounded-xl bg-white/70 border border-black/5 shadow-xs flex flex-col">
                  <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-black/50">Engine / AI</span>
                  <span className="font-space-grotesk text-[11px] font-bold truncate text-black">{specs.engine}</span>
                </div>
                <div className="px-3 py-2 rounded-xl bg-white/70 border border-black/5 shadow-xs flex flex-col">
                  <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-black/50">Data Layer</span>
                  <span className="font-space-grotesk text-[11px] font-bold truncate text-black">{specs.persistence}</span>
                </div>
                <div className="px-3 py-2 rounded-xl bg-white/70 border border-black/5 shadow-xs flex flex-col">
                  <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-black/50">Security / Mesh</span>
                  <span className="font-space-grotesk text-[11px] font-bold truncate text-black">{specs.security}</span>
                </div>
              </div>

            </div>

            {/* ── RIGHT: The Info Card (Right 38%) ── */}
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="h-auto lg:h-full flex-1 flex flex-col justify-between bg-[#EDEDED] rounded-2xl sm:rounded-3xl shadow-[8px_8px_16px_#DCDCDC,-8px_-8px_16px_#ffffff] border border-[#E5E5E5]/20 lg:overflow-hidden relative z-10"
            >
              <div className="flex-1 lg:overflow-y-auto scrollbar-none p-5 sm:p-7 md:p-8">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={rightVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col justify-between min-h-full gap-5 sm:gap-6"
                  >
                    {/* Content */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-small-label text-[10px] sm:text-[11px] font-medium tracking-[0.12em] text-black uppercase">
                          {caseLabel}
                        </p>
                        <span className="lg:hidden font-mono text-[9px] text-black/50 font-bold">
                          SWIPE ↔
                        </span>
                      </div>

                      <h3 className="font-card-title text-xl sm:text-2xl md:text-[34px] font-bold tracking-[-0.03em] leading-[1.15] text-black mb-3 sm:mb-4 uppercase">
                        {active.title.replace(/-/g, ' ')}
                      </h3>

                      {/* Mobile Compact Interactive Diagram Preview */}
                      <div className="lg:hidden w-full rounded-2xl bg-white/60 backdrop-blur-md border border-[#D3D3D3]/80 overflow-hidden mb-4 relative flex flex-col shadow-inner p-3">
                        <div className="w-full flex items-center justify-between font-mono text-[9px] font-bold text-black/70 uppercase tracking-wider mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                            <span>SYS_NODE // {active.title.split('-')[0]}</span>
                          </div>
                          <span className="text-[8px] bg-black/10 px-2 py-0.5 rounded-full font-bold">TOPOLOGY</span>
                        </div>
                        <div className="w-full h-44 sm:h-52 flex items-center justify-center">
                          <InteractiveDiagram projectTitle={active.title} project={active} />
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 mt-2 pt-2 border-t border-black/10">
                          <div className="px-2 py-1 rounded bg-black/5 text-[9px] font-mono">
                            <span className="text-black/50 block text-[7px] uppercase font-bold">RUNTIME</span>
                            <span className="font-bold truncate block">{specs.runtime}</span>
                          </div>
                          <div className="px-2 py-1 rounded bg-black/5 text-[9px] font-mono">
                            <span className="text-black/50 block text-[7px] uppercase font-bold">ENGINE</span>
                            <span className="font-bold truncate block">{specs.engine}</span>
                          </div>
                        </div>
                      </div>

                      <p className="font-body-text text-sm sm:text-base md:text-[18px] leading-[1.65] text-black mb-4 sm:mb-6">
                        {shortDesc}
                      </p>

                      <div className="mb-4 sm:mb-5">
                        <span className="font-card-subtitle text-sm sm:text-[17px] font-normal text-black uppercase">
                          {subLabel}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {active.tech.map((t, i) => (
                          <span key={i} className="font-status-badge text-xs sm:text-[13px] font-semibold tracking-[0.06em] uppercase px-2.5 sm:px-3 py-1 rounded-full glass-badge">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom: CTAs + Up/Down & Prev/Next arrows */}
                    <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-[#E5E5E5] gap-2">
                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <button
                          onClick={() => { setDocTitle(active.title); setIsDocOpen(true); }}
                          className="min-h-[40px] inline-flex items-center bg-black/85 backdrop-blur-md text-white font-space-grotesk font-bold text-[11px] sm:text-xs tracking-[0.02em] uppercase py-2 sm:py-2.5 px-4 sm:px-5 rounded-xl border border-white/20 shadow-md hover:bg-black/95 active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                          <span className="text-[#B87333] mr-1.5 text-[8px]">▪</span>
                          View Case
                        </button>
                        {active.github && active.github !== '#' && (
                          <a href={active.github} target="_blank" rel="noreferrer"
                            className="min-h-[40px] inline-flex items-center bg-black/85 backdrop-blur-md text-white font-space-grotesk font-bold text-[11px] sm:text-xs tracking-[0.02em] uppercase py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-xl border border-white/20 shadow-md hover:bg-black/95 active:scale-95 transition-all duration-200">
                            Source
                          </a>
                        )}
                        {active.demo && active.demo !== '#' && (
                          <a href={active.demo} target="_blank" rel="noreferrer"
                            className="min-h-[40px] inline-flex items-center bg-black/85 backdrop-blur-md text-white font-space-grotesk font-bold text-[11px] sm:text-xs tracking-[0.02em] uppercase py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-xl border border-white/20 shadow-md hover:bg-black/95 active:scale-95 transition-all duration-200">
                            Live
                          </a>
                        )}
                      </div>

                      {/* Mobile Prev / Next Arrows */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleSelect((activeIndex - 1 + projectsList.length) % projectsList.length)}
                          aria-label="Previous project"
                          className="w-9 h-9 rounded-xl bg-black/5 hover:bg-black/10 active:scale-95 flex items-center justify-center text-black border border-black/10 cursor-pointer transition-all"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleSelect((activeIndex + 1) % projectsList.length)}
                          aria-label="Next project"
                          className="w-9 h-9 rounded-xl bg-black/5 hover:bg-black/10 active:scale-95 flex items-center justify-center text-black border border-black/10 cursor-pointer transition-all"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
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