/* eslint-disable @typescript-eslint/no-unused-vars, react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaCircle } from 'react-icons/fa';
import { IMG_FAVICON } from '../assets';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [botName, setBotName] = useState('Orion Concierge // AI');
  const [sessionId, setSessionId] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchGreeting = async () => {
    try {
      const res = await fetch('/api/public/bot-persona');
      if (res.ok) {
        const data = await res.json();
        if (data.botName) setBotName(data.botName);
        const greetingMsg: Message = {
          role: 'assistant',
          content: data.greeting || "Hey there! I'm Godfrey's AI assistant. You can ask me anything about his projects, technical stack, internships, or certifications!",
          timestamp: new Date().toISOString(),
        };
        setMessages([greetingMsg]);
      } else {
        setMessages([{
          role: 'assistant',
          content: "Hey there! I'm Godfrey's AI assistant. Ask me anything about his projects, technical stack, or internships!",
          timestamp: new Date().toISOString(),
        }]);
      }
    } catch (e) {
      setMessages([{
        role: 'assistant',
        content: "Hey there! I'm Godfrey's AI assistant. Ask me anything about his projects, technical stack, or internships!",
        timestamp: new Date().toISOString(),
      }]);
    }
  };

  useEffect(() => {
    // Generate a unique per-tab session ID using crypto.randomUUID().
    // We intentionally DO NOT use localStorage so two concurrent viewers
    // (different tabs/browsers) always get separate sessions.
    const generateSessionId = () => {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return `orion-${crypto.randomUUID()}`;
      }
      // Fallback for environments without crypto.randomUUID
      return `orion-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 11)}-${Math.random().toString(36).substring(2, 11)}`;
    };

    // Use sessionStorage (tab-scoped) so each tab always gets its own session.
    // Unlike localStorage, sessionStorage is NOT shared between tabs.
    let sid = sessionStorage.getItem('orion_chat_session_id');
    if (!sid) {
      sid = generateSessionId();
      sessionStorage.setItem('orion_chat_session_id', sid);
    }
    setSessionId(sid);

    // Retrieve saved chat history for this tab-session or fetch greeting
    const saved = sessionStorage.getItem(`orion_chat_msgs_${sid}`);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        fetchGreeting();
      }
    } else {
      fetchGreeting();
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0 && sessionId) {
      // Persist to sessionStorage (tab-scoped) to isolate concurrent viewers
      sessionStorage.setItem(`orion_chat_msgs_${sessionId}`, JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages, isThinking]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);



  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userText = input.trim();
    setInput('');

    const newMsg: Message = {
      role: 'user',
      content: userText,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMsg]);
    setIsThinking(true);
    setIsSpeaking(false);

    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: userText }),
      });

      const data = await res.json();
      setIsThinking(false);

      if (res.ok && data.reply) {
        const replyMsg: Message = {
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, replyMsg]);
        
        // Trigger speaking animation
        setIsSpeaking(true);
        const speakDuration = Math.min(Math.max(data.reply.length * 50, 2000), 6000);
        setTimeout(() => setIsSpeaking(false), speakDuration);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.error || "I'm having a little trouble connecting to my neural core right now. Please try again in a moment!",
          timestamp: new Date().toISOString(),
        }]);
      }
    } catch (err) {
      setIsThinking(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Network glitch detected. Please check your connection or try again shortly!",
        timestamp: new Date().toISOString(),
      }]);
    }
  };

  return (
    <>
      {/* Invisible overlay for viewport-wide drag constraints boundary */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-40 overflow-hidden" />

      {/* Floating Draggable Toggle Button */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.05}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setTimeout(() => {
            setIsDragging(false);
          }, 80);
        }}
        className="fixed bottom-6 left-6 z-50 pointer-events-auto cursor-grab active:cursor-grabbing"
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            if (!isDragging) {
              setIsOpen(!isOpen);
            }
          }}
          className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl p-0.5 focus:outline-none"
          style={{
            background: 'linear-gradient(135deg, #7B3F00, #B87333, #E5E5E5)',
            boxShadow: '0 8px 32px rgba(255,99,99,0.45), 0 0 20px rgba(190,228,208,0.3)',
          }}
          aria-label="Toggle Personalized AI Bot"
        >
          {/* Outer glow pulse */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#7B3F00] via-[#B87333] to-[#E5E5E5] opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none" />
          
          {/* Tooltip on hover */}
          {!isOpen && (
            <span className="absolute left-full ml-3.5 px-3 py-1.5 rounded-2xl bg-slate-900/95 text-white font-mono text-[9px] font-bold tracking-wider whitespace-nowrap shadow-2xl border border-white/15 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none flex items-center gap-1.5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EDEDED] animate-ping" />
              TALK TO GODFREY // AI
            </span>
          )}

          {/* Button content */}
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-slate-950 shadow-inner z-10">
            {isOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#7B3F00] to-[#B87333] text-white"
              >
                <FaTimes className="text-lg sm:text-xl" />
              </motion.div>
            ) : (
              <motion.div
                key="bot-icon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                className="w-full h-full relative"
              >
                <img
                  src={IMG_FAVICON}
                  alt="Godfrey AI Bot"
                  className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            )}
          </div>

          {/* Online Notification Dot */}
          {!isOpen && (
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5 z-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#22c55e]"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#22c55e] border-2 border-white shadow-sm"></span>
            </span>
          )}
        </motion.button>
      </motion.div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 left-4 sm:left-6 w-[calc(100vw-2rem)] sm:w-[350px] h-[480px] max-h-[calc(100vh-6.5rem)] z-50 rounded-2xl flex flex-col overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', boxShadow: '0 20px 50px rgba(255,99,99,0.15), 0 0 30px rgba(190,228,208,0.3)', backdropFilter: 'blur(24px)' }}
          >
            {/* Compact Header */}
            <div
              className="flex-none flex items-center justify-between px-3.5 py-2.5"
              style={{ background: 'linear-gradient(135deg, rgba(255,99,99,0.08), rgba(190,228,208,0.12))', borderBottom: '1px solid rgba(190,228,208,0.60)' }}
            >
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center">
                  <img src={IMG_FAVICON} alt="Godfrey AI" className="w-6 h-6 rounded-full object-cover border border-[#7B3F00]/60 shadow-sm" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.8)' }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider leading-none">{botName}</span>
                  <span className="text-[8px] font-mono mt-0.5 leading-none">Online · AI Assistant</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.90)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#7B3F00'; e.currentTarget.style.borderColor = '#7B3F00'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#000000'; e.currentTarget.style.borderColor = 'rgba(190,228,208,0.80)'; }}
              >
                <FaTimes className="text-[10px]" />
              </button>
            </div>


            {/* Message Log */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(248,249,251,0.50))' }}>
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                const timeStr = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1 mb-1 text-[8px] font-mono px-1">
                      {isUser ? <FaUser /> : <img src={IMG_FAVICON} alt="AI" className="w-3 h-3 rounded-full object-cover border border-[#7B3F00]/50 shadow-xs inline-block" />}
                      <span className="font-bold">{isUser ? 'YOU' : 'GODFREY AI'}</span>
                      <span>•</span>
                      <span>{timeStr}</span>
                    </div>

                    <div
                      className={`max-w-[88%] p-3 rounded-2xl text-xs font-sans leading-relaxed shadow-md`}
                      style={isUser ? {
                        background: 'linear-gradient(135deg, #7B3F00, #B87333)',
                        color: '#000000',
                        border: '1px solid rgba(255,99,99,0.40)',
                        boxShadow: '0 4px 12px rgba(255,99,99,0.20)',
                        borderTopRightRadius: '2px'
                      } : {
                        background: 'rgba(255,255,255,0.95)',
                        color: '#000000',
                        border: '1px solid rgba(190,228,208,0.80)',
                        boxShadow: '0 2px 8px rgba(190,228,208,0.20)',
                        borderTopLeftRadius: '2px'
                      }}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                );
              })}

              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-start"
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[8px] font-mono px-1 font-bold">
                    <img src={IMG_FAVICON} alt="AI" className="w-3 h-3 rounded-full object-cover animate-spin border border-[#7B3F00]/50 inline-block" />
                    <span>NEURAL CORE SYNTHESIZING...</span>
                  </div>
                  <div className="p-2.5 rounded-2xl rounded-tl-xs flex items-center gap-1.5"
                    style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#7B3F00', animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#B87333', animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#E5E5E5', animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-2.5 space-y-1.5 backdrop-blur-lg"
              style={{ background: 'rgba(255,255,255,0.95)', borderTop: '1px solid rgba(190,228,208,0.80)' }}>
              <div className="relative flex items-center">
                <span className="absolute left-3 pointer-events-none">
                  <FaRobot className="text-[10px]" />
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, skills, or hire..."
                  disabled={isThinking}
                  className="w-full pl-8 pr-9 py-2 rounded-lg text-xs focus:outline-none font-mono transition-all disabled:opacity-50"
                  style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#7B3F00'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,99,99,0.15)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(190,228,208,0.80)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isThinking}
                  className="absolute right-1 p-1.5 rounded-md text-white disabled:opacity-30 transition-all cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #7B3F00, #B87333)', boxShadow: '0 4px 12px rgba(255,99,99,0.25)' }}
                  title="Send message"
                >
                  <FaPaperPlane className="text-[10px]" />
                </button>
              </div>

              <div className="text-[8px] text-center font-mono tracking-wider">
                {"// AI assistant trained on Godfrey T R's portfolio & experience"}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
