/* eslint-disable @typescript-eslint/no-unused-vars, react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInbox, FaUser, FaRobot, FaBell, FaBellSlash, FaEnvelope, FaPhone, FaTag, FaCheck, FaCog, FaTimes, FaPlus, FaSave, FaSync } from 'react-icons/fa';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ExtractedContact {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  note?: string;
}

interface ChatSession {
  _id: string;
  sessionId: string;
  visitorLabel: string;
  messages: ChatMessage[];
  leadDetected: boolean;
  leadKeywordsMatched?: string[];
  extractedContact?: ExtractedContact;
  summary?: string;
  status: 'unread' | 'read' | 'muted';
  muted: boolean;
  createdAt: string;
  lastActiveAt: string;
}

interface LeadKeywordsConfig {
  keywords: string[];
}

const ConversationsInbox: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Lead keywords modal
  const [showKeywordsModal, setShowKeywordsModal] = useState(false);
  const [keywordsConfig, setKeywordsConfig] = useState<LeadKeywordsConfig>({ keywords: [] });
  const [newKeyword, setNewKeyword] = useState('');
  const [savingKeywords, setSavingKeywords] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSessions();
    fetchKeywords();
  }, []);

  useEffect(() => {
    if (selectedId) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedId, sessions]);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/conversations');
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
        if (data.length > 0 && !selectedId) {
          setSelectedId(data[0]._id || data[0].sessionId);
        }
      } else {
        setError('Failed to fetch conversations');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchSessions();
    setTimeout(() => setRefreshing(false), 600);
  };

  const fetchKeywords = async () => {
    try {
      const res = await fetch('/api/admin/lead-keywords');
      if (res.ok) {
        const data = await res.json();
        setKeywordsConfig(data);
      }
    } catch (e) {
      console.error('Failed to load lead keywords');
    }
  };

  const handleSelectSession = async (session: ChatSession) => {
    const id = session._id || session.sessionId;
    setSelectedId(id);

    // If unread, mark read
    if (session.status === 'unread') {
      try {
        await fetch(`/api/admin/conversations/${id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'read' }),
        });
        setSessions(prev => prev.map(s => (s._id === id || s.sessionId === id) ? { ...s, status: 'read' } : s));
      } catch (e) {
        console.error('Failed to mark read');
      }
    }
  };

  const handleToggleMute = async (session: ChatSession) => {
    const id = session._id || session.sessionId;
    const nextMuted = !session.muted;
    try {
      await fetch(`/api/admin/conversations/${id}/mute`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ muted: nextMuted }),
      });
      setSessions(prev => prev.map(s => (s._id === id || s.sessionId === id) ? { ...s, muted: nextMuted } : s));
    } catch (e) {
      console.error('Failed to toggle mute');
    }
  };

  const handleSaveKeywords = async () => {
    setSavingKeywords(true);
    try {
      await fetch('/api/admin/lead-keywords', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(keywordsConfig),
      });
      setShowKeywordsModal(false);
    } catch (e) {
      console.error('Failed to save lead keywords');
    } finally {
      setSavingKeywords(false);
    }
  };

  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    setKeywordsConfig({
      keywords: [...(keywordsConfig.keywords || []), newKeyword.trim()]
    });
    setNewKeyword('');
  };

  const removeKeyword = (idx: number) => {
    setKeywordsConfig({
      keywords: (keywordsConfig.keywords || []).filter((_, i) => i !== idx)
    });
  };

  const selectedSession = sessions.find(s => (s._id === selectedId || s.sessionId === selectedId));

  if (loading && sessions.length === 0) {
    return <div className="p-8 text-center font-mono font-bold" style={{ color: '#3A3A3A' }}>LOADING CONVERSATIONS INBOX...</div>;
  }

  return (
    <div className="flex flex-col h-[750px] rounded-2xl overflow-hidden shadow-2xl relative"
      style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', boxShadow: '0 8px 32px rgba(255,99,99,0.08)' }}>
      {/* Top Bar */}
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(248,249,251,1)', borderBottom: '1px solid rgba(190,228,208,0.80)' }}>
        <div className="flex items-center gap-3">
          <FaInbox className="text-xl" style={{ color: '#7B3F00' }} />
          <h2 className="text-base font-black uppercase tracking-wider font-outfit" style={{ color: '#000000' }}>
            Visitor Conversations // Lead Intelligence
          </h2>
        </div>
        <button
          onClick={() => setShowKeywordsModal(true)}
          className="px-3.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-colors font-bold cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.90)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#7B3F00'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(190,228,208,0.80)'}
        >
          <FaCog style={{ color: '#7B3F00' }} />
          <span>Configure Lead Keywords</span>
        </button>
      </div>

      {/* 3-Pane Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* LEFT PANE: Conversation List (3 Cols) */}
        <div className="lg:col-span-3 overflow-y-auto"
          style={{ background: 'rgba(248,249,251,0.50)', borderRight: '1px solid rgba(190,228,208,0.80)' }}>
          {sessions.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono font-bold" style={{ color: '#3A3A3A' }}>No visitor conversations yet.</div>
          ) : (
            sessions.map(s => {
              const isSelected = (s._id === selectedId || s.sessionId === selectedId);
              const lastMsg = s.messages && s.messages.length > 0 ? s.messages[s.messages.length - 1].content : 'No messages';
              const timeStr = s.lastActiveAt ? new Date(s.lastActiveAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

              return (
                <div
                  key={s._id || s.sessionId}
                  onClick={() => handleSelectSession(s)}
                  className={`p-4 cursor-pointer transition-all ${s.muted ? 'opacity-50' : ''}`}
                  style={isSelected ? {
                    background: 'rgba(219,255,203,0.50)', borderLeft: '4px solid #7B3F00', borderBottom: '1px solid rgba(190,228,208,0.60)'
                  } : {
                    borderBottom: '1px solid rgba(190,228,208,0.60)'
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.80)'; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold font-mono truncate`} style={{ color: '#000000' }}>
                      {s.visitorLabel || 'Visitor'}
                    </span>
                    <span className="text-[10px] font-mono font-bold" style={{ color: '#888888' }}>{timeStr}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs truncate font-sans flex-1 font-medium" style={{ color: '#3A3A3A' }}>{lastMsg}</p>
                    {s.status === 'unread' && (
                      <span className="w-2 h-2 rounded-full shadow-sm flex-shrink-0" style={{ background: '#7B3F00' }} />
                    )}
                  </div>

                  {s.leadDetected && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono uppercase"
                        style={{ background: 'rgba(255,130,130,0.20)', color: '#7B3F00', border: '1px solid rgba(255,99,99,0.35)' }}>
                        LEAD
                      </span>
                      {s.extractedContact?.email && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold truncate max-w-[120px]"
                          style={{ background: 'rgba(219,255,203,0.80)', color: '#000000', border: '1px solid rgba(190,228,208,0.80)' }}>
                          {s.extractedContact.email}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* CENTER PANE: Chat Thread (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col overflow-hidden relative"
          style={{ background: 'rgba(255,255,255,0.95)', borderRight: '1px solid rgba(190,228,208,0.80)' }}>
          {!selectedSession ? (
            <div className="flex-1 flex items-center justify-center text-xs font-mono font-bold" style={{ color: '#3A3A3A' }}>
              Select a conversation to inspect thread log.
            </div>
          ) : (
            <>
              {/* Thread Header */}
              <div className="px-6 py-3 flex items-center justify-between"
                style={{ background: 'rgba(248,249,251,1)', borderBottom: '1px solid rgba(190,228,208,0.80)' }}>
                <div>
                  <h3 className="text-sm font-black font-mono" style={{ color: '#000000' }}>{selectedSession.visitorLabel}</h3>
                  <span className="text-[10px] font-mono font-bold" style={{ color: '#888888' }}>
                    Session ID: {selectedSession.sessionId?.slice(0, 8)}...
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedSession.leadDetected && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase"
                      style={{ background: 'rgba(255,130,130,0.20)', color: '#7B3F00', border: '1px solid rgba(255,99,99,0.35)' }}>
                      FLAGGED LEAD
                    </span>
                  )}
                  {/* Refresh chat data */}
                  <button
                    onClick={handleRefresh}
                    title="Refresh conversations"
                    className="p-2 rounded-lg text-xs font-mono transition-all cursor-pointer"
                    style={{ background: 'rgba(248,249,251,1)', color: '#3A3A3A', border: '1px solid rgba(190,228,208,0.80)' }}
                  >
                    <FaSync size={11} className={refreshing ? 'animate-spin' : ''} style={{ color: '#7B3F00' }} />
                  </button>
                  <button
                    onClick={() => handleToggleMute(selectedSession)}
                    className={`p-2 rounded-lg text-xs font-mono transition-colors cursor-pointer`}
                    style={selectedSession.muted ? {
                      background: 'rgba(255,130,130,0.15)', color: '#7B3F00'
                    } : {
                      background: 'rgba(248,249,251,1)', color: '#3A3A3A', border: '1px solid rgba(190,228,208,0.80)'
                    }}
                    title={selectedSession.muted ? 'Unmute' : 'Mute notifications'}
                  >
                    {selectedSession.muted ? <FaBellSlash /> : <FaBell />}
                  </button>
                </div>
              </div>

              {/* Chat Log */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {(selectedSession.messages || []).map((msg, idx) => {
                  const isUser = msg.role === 'user';
                  const timeStr = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
                  
                  return (
                    <div key={idx} className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}>
                      <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono font-bold" style={{ color: '#888888' }}>
                        {isUser ? <FaUser style={{ color: '#3A3A3A' }} /> : <FaRobot style={{ color: '#7B3F00' }} />}
                        <span>{isUser ? 'Visitor' : 'AI Assistant'}</span>
                        <span style={{ color: '#cbd5e1' }}>|</span>
                        <span>{timeStr}</span>
                      </div>
                      <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs font-sans leading-relaxed`}
                        style={isUser ? {
                          background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000', borderTopLeftRadius: '2px'
                        } : {
                          background: 'linear-gradient(135deg, #7B3F00, #B87333)', color: '#ffffff', boxShadow: '0 4px 12px rgba(255,99,99,0.20)', borderTopRightRadius: '2px'
                        }}>
                        {msg.content}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </>
          )}
        </div>

        {/* RIGHT PANE: Summary & Lead Panel (3 Cols) */}
        <div className="lg:col-span-3 p-6 overflow-y-auto space-y-6"
          style={{ background: 'rgba(248,249,251,0.50)' }}>
          {!selectedSession ? (
            <div className="text-center text-xs font-mono font-bold mt-12" style={{ color: '#3A3A3A' }}>No session selected.</div>
          ) : (
            <>
              {/* Status & Summary Card */}
              <div className="p-4 rounded-xl space-y-3"
                style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)' }}>
                <div className="flex items-center justify-between pb-2" style={{ borderBottom: '1px solid rgba(190,228,208,0.80)' }}>
                  <span className="text-xs font-bold font-mono uppercase" style={{ color: '#000000' }}>{"// AI Thread Summary"}</span>
                  <span className={`w-2 h-2 rounded-full`} style={{ background: selectedSession.leadDetected ? '#7B3F00' : '#cbd5e1' }} />
                </div>
                <p className="text-xs font-sans leading-relaxed italic font-medium" style={{ color: '#3A3A3A' }}>
                  &ldquo;{selectedSession.summary || 'Visitor exploring portfolio via chatbot.'}&rdquo;
                </p>
              </div>

              {/* Lead Intelligence Card */}
              <div className="p-4 rounded-xl space-y-4"
                style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)' }}>
                <h4 className="text-xs font-black font-mono uppercase tracking-wider flex items-center gap-2" style={{ color: '#7B3F00' }}>
                  <FaTag /> Lead Intelligence
                </h4>

                <div>
                  <span className="block text-[10px] font-mono font-bold uppercase mb-1.5" style={{ color: '#888888' }}>Matched Keywords</span>
                  {(!selectedSession.leadKeywordsMatched || selectedSession.leadKeywordsMatched.length === 0) ? (
                    <span className="text-xs font-mono font-bold" style={{ color: '#3A3A3A' }}>None detected</span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSession.leadKeywordsMatched.map((kw, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold"
                          style={{ background: 'rgba(255,130,130,0.15)', border: '1px solid rgba(255,99,99,0.35)', color: '#7B3F00' }}>
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Extracted Contact */}
                <div className="space-y-2 pt-3" style={{ borderTop: '1px solid rgba(190,228,208,0.80)' }}>
                  <span className="block text-[10px] font-mono font-bold uppercase" style={{ color: '#888888' }}>Captured Contact Details</span>
                  
                  <div className="flex items-center gap-2 text-xs font-mono font-bold" style={{ color: '#000000' }}>
                    <FaEnvelope className="flex-shrink-0" style={{ color: '#7B3F00' }} />
                    <span className="truncate">{selectedSession.extractedContact?.email || 'Not provided'}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono font-bold" style={{ color: '#000000' }}>
                    <FaPhone className="flex-shrink-0" style={{ color: '#7B3F00' }} />
                    <span className="truncate">{selectedSession.extractedContact?.phone || 'Not provided'}</span>
                  </div>

                  {selectedSession.extractedContact?.note && (
                    <p className="text-[11px] p-2 rounded mt-2 font-sans font-medium"
                      style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#3A3A3A' }}>
                      {selectedSession.extractedContact.note}
                    </p>
                  )}
                </div>
              </div>

              {/* Mute Action */}
              <button
                onClick={() => handleToggleMute(selectedSession)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer`}
                style={selectedSession.muted ? {
                  background: 'rgba(255,130,130,0.15)', border: '1px solid rgba(255,99,99,0.35)', color: '#7B3F00'
                } : {
                  background: 'rgba(255,255,255,0.90)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000'
                }}
              >
                {selectedSession.muted ? <FaBellSlash /> : <FaBell />}
                <span>{selectedSession.muted ? 'UNMUTE CONVERSATION' : 'MUTE THREAD'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Lead Keywords Config Modal */}
      <AnimatePresence>
        {showKeywordsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-6"
            style={{ background: 'rgba(15,23,42,0.6)' }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-6"
              style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', boxShadow: '0 20px 50px rgba(255,99,99,0.15)' }}
            >
              <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgba(190,228,208,0.80)' }}>
                <h3 className="text-base font-black uppercase font-outfit flex items-center gap-2" style={{ color: '#000000' }}>
                  <FaTag style={{ color: '#7B3F00' }} /> Lead Detection Keywords
                </h3>
                <button onClick={() => setShowKeywordsModal(false)} className="cursor-pointer" style={{ color: '#3A3A3A' }}><FaTimes /></button>
              </div>

              <p className="text-xs font-sans leading-relaxed font-medium" style={{ color: '#3A3A3A' }}>
                When a visitor message contains any of these substrings (case-insensitive), the thread is automatically flagged as a <strong style={{ color: '#7B3F00' }}>LEAD</strong> and prioritized in your inbox.
              </p>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={e => setNewKeyword(e.target.value)}
                    placeholder="Add keyword (e.g. freelance, contract)..."
                    className="flex-1 px-4 py-2 rounded-xl text-xs font-mono font-bold focus:outline-none"
                    style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addKeyword(); } }}
                  />
                  <button type="button" onClick={addKeyword} className="px-4 py-2 text-white rounded-xl text-xs flex items-center gap-1 font-mono font-bold cursor-pointer" style={{ background: 'linear-gradient(135deg, #7B3F00, #B87333)' }}><FaPlus /> ADD</button>
                </div>

                <div className="max-h-48 overflow-y-auto p-3 rounded-xl flex flex-wrap gap-2"
                  style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)' }}>
                  {(keywordsConfig.keywords || []).map((kw, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase"
                      style={{ background: 'rgba(255,130,130,0.15)', border: '1px solid rgba(255,99,99,0.35)', color: '#7B3F00' }}>
                      <span>{kw}</span>
                      <button type="button" onClick={() => removeKeyword(idx)} className="cursor-pointer" style={{ color: '#7B3F00' }}><FaTimes /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4" style={{ borderTop: '1px solid rgba(190,228,208,0.80)' }}>
                <button
                  type="button"
                  onClick={() => setShowKeywordsModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer"
                  style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#3A3A3A' }}
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  onClick={handleSaveKeywords}
                  disabled={savingKeywords}
                  className="px-5 py-2 rounded-xl text-white text-xs font-bold font-mono flex items-center gap-2 cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #7B3F00, #B87333)', boxShadow: '0 4px 12px rgba(255,99,99,0.25)' }}
                >
                  <FaSave />
                  <span>{savingKeywords ? 'SAVING...' : 'SAVE KEYWORDS'}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConversationsInbox;
