/* eslint-disable @typescript-eslint/no-unused-vars, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-expressions, no-empty, react-hooks/set-state-in-effect, react-hooks/preserve-manual-memoization */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSignOutAlt, FaInbox, FaRobot, FaUser, FaProjectDiagram,
  FaTools, FaBriefcase, FaGraduationCap, FaCertificate,
  FaArchive, FaExternalLinkAlt, FaSearch, FaKeyboard, FaChevronRight, FaSync
} from 'react-icons/fa';
import ConversationsInbox from './ConversationsInbox';
import BotPersonaTab from './BotPersonaTab';
import GenericCrudTab, { FieldDef } from './GenericCrudTab';

const tabs = [
  { id: 'conversations', label: 'Conversations Inbox',      icon: FaInbox,          badge: 'LIVE',  shortcut: '1' },
  { id: 'persona',       label: 'Bot Persona',               icon: FaRobot,                          shortcut: '2' },
  { id: 'personal',      label: 'Personal Info',             icon: FaUser,                           shortcut: '3' },
  { id: 'projects',      label: 'Featured Projects',         icon: FaProjectDiagram,                 shortcut: '4' },
  { id: 'skills',        label: 'Technical Arsenal',         icon: FaTools,                          shortcut: '5' },
  { id: 'experience',    label: 'Experience Log',            icon: FaBriefcase,                      shortcut: '6' },
  { id: 'education',     label: 'Education',                 icon: FaGraduationCap,                  shortcut: '7' },
  { id: 'certifications',label: 'Certifications',            icon: FaCertificate,                    shortcut: '8' },
  { id: 'archive',       label: 'Certificate Archive',       icon: FaArchive,                        shortcut: '9' },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab]       = useState('conversations');
  const [authChecking, setAuthChecking] = useState(true);
  const [operator, setOperator]         = useState<string>('godfreytr');
  const [paletteOpen, setPaletteOpen]   = useState(false);
  const [query, setQuery]               = useState('');
  const [highlighted, setHighlighted]   = useState(0);
  const [spinning, setSpinning]         = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // ── Auth ───────────────────────────────────────────────────────────────────
  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setOperator(data.user?.username || 'godfreytr');
        setAuthChecking(false);
      } else { navigate('/admin/login'); }
    } catch { navigate('/admin/login'); }
  };

  useEffect(() => { checkAuth(); }, []);

  const handleLogout = async () => {
    try { await fetch('/api/auth/logout', { method: 'POST' }); } catch {}
    navigate('/');
  };

  // ── Command Palette ────────────────────────────────────────────────────────
  const openPalette = useCallback(() => {
    setPaletteOpen(true);
    setQuery('');
    setHighlighted(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const closePalette = useCallback(() => {
    setPaletteOpen(false);
    setQuery('');
  }, []);

  const allCommands = [
    ...tabs.map(t => ({ ...t, type: 'tab' as const })),
    { id: 'logout',   label: 'Logout',        icon: FaSignOutAlt,      type: 'action' as const, shortcut: '' },
    { id: 'preview',  label: 'Preview Site',   icon: FaExternalLinkAlt, type: 'action' as const, shortcut: '' },
  ];

  const filtered = allCommands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const runCommand = useCallback((cmd: typeof allCommands[0]) => {
    if (cmd.type === 'tab') { setActiveTab(cmd.id); }
    else if (cmd.id === 'logout') { handleLogout(); }
    else if (cmd.id === 'preview') { window.open('/', '_blank'); }
    closePalette();
  }, [closePalette]);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Cmd/Ctrl+K → open palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        paletteOpen ? closePalette() : openPalette();
        return;
      }
      if (!paletteOpen) return;
      if (e.key === 'Escape') { closePalette(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
      if (e.key === 'Enter' && filtered[highlighted]) { runCommand(filtered[highlighted]); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen, openPalette, closePalette, filtered, highlighted, runCommand]);

  // Reset highlight when query changes
  useEffect(() => { setHighlighted(0); }, [query]);

  // ── Field Definitions ──────────────────────────────────────────────────────
  const personalFields: FieldDef[] = [
    { name: 'name',       label: 'Full Name',          type: 'text' },
    { name: 'role',       label: 'Primary Role',        type: 'text' },
    { name: 'tagline',    label: 'Tagline',             type: 'textarea' },
    { name: 'email',      label: 'Contact Email',       type: 'text' },
    { name: 'phone',      label: 'Contact Phone',       type: 'text' },
    { name: 'location',   label: 'Location',            type: 'text' },
    { name: 'github',     label: 'GitHub URL',          type: 'text' },
    { name: 'linkedin',   label: 'LinkedIn URL',        type: 'text' },
    { name: 'leetcode',   label: 'LeetCode URL',        type: 'text' },
    { name: 'hackerrank', label: 'HackerRank URL',      type: 'text' },
    { name: 'profileImage', label: 'Profile Image Path',  type: 'text' },
  ];
  const projectFields: FieldDef[] = [
    { name: 'title',            label: 'Project Title',      type: 'text' },
    { name: 'category',         label: 'Category',           type: 'text' },
    { name: 'tech',             label: 'Tech Stack (Array)', type: 'array' },
    { name: 'description',      label: 'Description',        type: 'textarea' },
    { name: 'github',           label: 'GitHub URL',         type: 'text' },
    { name: 'demo',             label: 'Live Demo URL',      type: 'text' },
    { name: 'problemStatement', label: 'Problem Statement',  type: 'text' },
    { name: 'hook',             label: 'Hook',               type: 'text' },
    { name: 'deliverables',     label: 'Deliverables',       type: 'array' },
    { name: 'order',            label: 'Display Order',      type: 'number' },
  ];
  const skillFields: FieldDef[] = [
    { name: 'category', label: 'Category',      type: 'text' },
    { name: 'skills',   label: 'Skills',        type: 'array' },
    { name: 'order',    label: 'Display Order', type: 'number' },
  ];
  const experienceFields: FieldDef[] = [
    { name: 'role',    label: 'Role / Title',  type: 'text' },
    { name: 'company', label: 'Company',       type: 'text' },
    { name: 'period',  label: 'Period',        type: 'text' },
    { name: 'details', label: 'Achievements',  type: 'array' },
    { name: 'order',   label: 'Display Order', type: 'number' },
  ];
  const educationFields: FieldDef[] = [
    { name: 'degree',      label: 'Degree',        type: 'text' },
    { name: 'institution', label: 'Institution',   type: 'text' },
    { name: 'period',      label: 'Period',         type: 'text' },
    { name: 'order',       label: 'Display Order',  type: 'number' },
  ];
  const certFields: FieldDef[] = [
    { name: 'title',       label: 'Certificate Title', type: 'text' },
    { name: 'year',        label: 'Year/Period',       type: 'text' },
    { name: 'description', label: 'Description',        type: 'textarea' },
    { name: 'order',       label: 'Display Order',     type: 'number' },
  ];
  const archiveFields: FieldDef[] = [
    { name: 'name',     label: 'Certificate Name',  type: 'text' },
    { name: 'file',     label: 'File Path',         type: 'text' },
    { name: 'fileType', label: 'File Type',         type: 'text' },
    { name: 'category', label: 'Category',          type: 'text' },
    { name: 'issuer',   label: 'Issuer',            type: 'text' },
    { name: 'tag',      label: 'Badge Tag',         type: 'text' },
    { name: 'summary',  label: 'Summary',           type: 'textarea' },
  ];

  const activeTabDef = tabs.find(t => t.id === activeTab);

  // ── Auth Loading State ─────────────────────────────────────────────────────
  if (authChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 font-mono text-xs font-bold"
        style={{ background: '#f3fef0', color: '#3A3A3A' }}>
        <span className="w-6 h-6 border-2 rounded-full animate-spin"
          style={{ borderColor: '#7B3F00', borderTopColor: 'transparent' }} />
        <span>VERIFYING SECURITY CREDENTIALS...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans flex flex-col" style={{ background: '#f3fef0', color: '#000000' }}>



      {/* ── Breadcrumb Tab Pills (quick nav, no sidebar) ────────────────────── */}
      <div className="px-6 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-wrap"
        style={{ borderBottom: '1px solid rgba(190,228,208,0.5)', background: 'rgba(255,255,255,0.5)' }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase whitespace-nowrap transition-all cursor-pointer flex-shrink-0"
              style={active ? {
                background: 'linear-gradient(135deg, #7B3F00, #B87333)',
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(255,99,99,0.25)'
              } : {
                background: 'rgba(219,255,203,0.5)',
                border: '1px solid rgba(190,228,208,0.6)',
                color: '#3A3A3A'
              }}>
              <Icon size={10} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1 py-px rounded text-[8px]"
                  style={active ? { background: 'rgba(255,255,255,0.25)', color: '#fff' }
                    : { background: 'rgba(255,99,99,0.1)', color: '#7B3F00' }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Refresh button */}
        <button
          onClick={() => { setSpinning(true); setTimeout(() => { window.location.reload(); }, 300); }}
          title="Refresh"
          className="ml-auto flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all cursor-pointer"
          style={{ background: 'rgba(219,255,203,0.5)', border: '1px solid rgba(190,228,208,0.6)', color: '#3A3A3A' }}
        >
          <FaSync size={11} className={spinning ? 'animate-spin' : ''} style={{ color: '#7B3F00' }} />
        </button>
      </div>

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}>
            {activeTab === 'conversations' && <ConversationsInbox />}
            {activeTab === 'persona'       && <BotPersonaTab />}
            {activeTab === 'personal'      && <GenericCrudTab collection="personal_info"      title="Personal Info"            isSingleObject={true} fields={personalFields}   />}
            {activeTab === 'projects'      && <GenericCrudTab collection="projects"            title="Featured Works"                                 fields={projectFields}    />}
            {activeTab === 'skills'        && <GenericCrudTab collection="skills"              title="Technical Arsenal"                              fields={skillFields}      />}
            {activeTab === 'experience'    && <GenericCrudTab collection="experience"          title="Experience Log"                                 fields={experienceFields} />}
            {activeTab === 'education'     && <GenericCrudTab collection="education"           title="Academic Foundations"                           fields={educationFields}  />}
            {activeTab === 'certifications'&& <GenericCrudTab collection="certifications"      title="Proof (Certifications)"                         fields={certFields}       />}
            {activeTab === 'archive'       && <GenericCrudTab collection="certificate_archive" title="Full Certificate Archive"                       fields={archiveFields}    />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Command Palette Overlay ───────────────────────────────────────── */}
      <AnimatePresence>
        {paletteOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 cursor-pointer"
              style={{ background: 'rgba(15,23,42,0.35)', backdropFilter: 'blur(4px)' }}
              onClick={closePalette}
            />

            {/* Palette Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -10 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 z-50 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.97)', border: '1px solid rgba(190,228,208,0.8)' }}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3.5"
                style={{ borderBottom: '1px solid rgba(219,255,203,0.8)' }}>
                <FaSearch size={13} style={{ color: '#888888' }} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-sm font-mono font-bold outline-none placeholder-slate-400"
                  style={{ color: '#000000' }}
                />
                <div className="flex items-center gap-1 text-[9px] font-mono" style={{ color: '#888888' }}>
                  <FaKeyboard size={10} />
                  <span>ESC to close</span>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[360px] overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <p className="text-center py-8 text-xs font-mono" style={{ color: '#888888' }}>No commands found</p>
                ) : (
                  filtered.map((cmd, i) => {
                    const Icon = cmd.icon;
                    const isHL = i === highlighted;
                    return (
                      <button key={cmd.id} onClick={() => runCommand(cmd)}
                        onMouseEnter={() => setHighlighted(i)}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors cursor-pointer group"
                        style={{ background: isHL ? 'rgba(219,255,203,0.6)' : 'transparent' }}>
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              background: isHL ? 'linear-gradient(135deg, #7B3F00, #B87333)' : 'rgba(219,255,203,0.7)',
                              color: isHL ? '#ffffff' : '#7B3F00'
                            }}>
                            <Icon size={12} />
                          </div>
                          <span className="text-sm font-bold font-mono" style={{ color: '#000000' }}>{cmd.label}</span>
                          {'badge' in cmd && cmd.badge && (
                            <span className="text-[8px] font-black px-1.5 py-0.5 rounded"
                              style={{ background: 'rgba(255,99,99,0.1)', color: '#7B3F00', border: '1px solid rgba(255,99,99,0.2)' }}>
                              {cmd.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {cmd.shortcut && (
                            <kbd className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                              style={{ background: 'rgba(190,228,208,0.4)', border: '1px solid rgba(190,228,208,0.6)', color: '#3A3A3A' }}>
                              {cmd.shortcut}
                            </kbd>
                          )}
                          <FaChevronRight size={9} style={{ color: isHL ? '#7B3F00' : '#cbd5e1' }} />
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 flex items-center gap-4 text-[9px] font-mono"
                style={{ background: 'rgba(219,255,203,0.3)', borderTop: '1px solid rgba(190,228,208,0.5)', color: '#888888' }}>
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>ESC dismiss</span>
                <span className="ml-auto">THEORIONGD // CMS</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
