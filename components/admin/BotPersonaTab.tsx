/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FaRobot, FaSave, FaCheck, FaTimes, FaPlus, FaEye } from 'react-icons/fa';

interface SpeakingStyle {
  tone?: string;
  sentenceRhythm?: string;
  signaturePhrases?: string[];
  avoid?: string[];
}

interface BotPersona {
  _id?: string;
  botName: string;
  avatarSourceType: string;
  avatarModelUrl: string;
  brandLogoSourceUrl: string;
  greeting: string;
  systemPrompt: string;
  speakingStyle: SpeakingStyle;
  idleAnimations?: string[];
}

const BotPersonaTab: React.FC = () => {
  const [persona, setPersona] = useState<BotPersona | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');

  // Temporary tag input states
  const [newPhrase, setNewPhrase] = useState('');
  const [newAvoid, setNewAvoid] = useState('');

  useEffect(() => {
    fetchPersona();
  }, []);

  const fetchPersona = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/bot-persona');
      if (res.ok) {
        const data = await res.json();
        setPersona(data);
      } else {
        setError('Failed to load bot persona');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!persona) return;
    setSaving(true);
    setError('');
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/admin/bot-persona', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(persona),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save persona');
      }
    } catch (err) {
      setError('Error saving persona');
    } finally {
      setSaving(false);
    }
  };

  const addPhrase = () => {
    if (!newPhrase.trim() || !persona) return;
    const current = persona.speakingStyle.signaturePhrases || [];
    setPersona({
      ...persona,
      speakingStyle: {
        ...persona.speakingStyle,
        signaturePhrases: [...current, newPhrase.trim()],
      },
    });
    setNewPhrase('');
  };

  const removePhrase = (idx: number) => {
    if (!persona) return;
    const current = persona.speakingStyle.signaturePhrases || [];
    setPersona({
      ...persona,
      speakingStyle: {
        ...persona.speakingStyle,
        signaturePhrases: current.filter((_, i) => i !== idx),
      },
    });
  };

  const addAvoid = () => {
    if (!newAvoid.trim() || !persona) return;
    const current = persona.speakingStyle.avoid || [];
    setPersona({
      ...persona,
      speakingStyle: {
        ...persona.speakingStyle,
        avoid: [...current, newAvoid.trim()],
      },
    });
    setNewAvoid('');
  };

  const removeAvoid = (idx: number) => {
    if (!persona) return;
    const current = persona.speakingStyle.avoid || [];
    setPersona({
      ...persona,
      speakingStyle: {
        ...persona.speakingStyle,
        avoid: current.filter((_, i) => i !== idx),
      },
    });
  };

  if (loading) {
    return <div className="p-8 text-center font-mono font-bold" style={{ color: '#3A3A3A' }}>LOADING BOT PERSONA CONFIGURATION...</div>;
  }

  if (!persona) {
    return <div className="p-8 text-center font-mono font-bold" style={{ color: '#7B3F00' }}>ERROR: UNABLE TO LOAD PERSONA DATA</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Edit Form (2 Columns) */}
      <form onSubmit={handleSave} className="lg:col-span-2 space-y-6 p-6 rounded-2xl shadow-sm"
        style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', boxShadow: '0 4px 16px rgba(255,99,99,0.06)' }}>
        <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgba(190,228,208,0.80)' }}>
          <div className="flex items-center gap-3">
            <FaRobot className="text-2xl" style={{ color: '#7B3F00' }} />
            <div>
              <h2 className="text-lg font-black uppercase font-outfit" style={{ color: '#000000' }}>AI Concierge Persona</h2>
              <p className="text-xs font-mono font-bold" style={{ color: '#3A3A3A' }}>{"// Configure voice, tone, and system prompt"}</p>
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-xl text-white text-xs font-bold font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #7B3F00, #B87333)', boxShadow: '0 4px 12px rgba(255,99,99,0.25)' }}
          >
            {saving ? <span className="animate-spin">⌛</span> : <FaSave />}
            <span>{saving ? 'SAVING...' : 'SAVE CONFIG'}</span>
          </button>
        </div>

        {error && <div className="p-3 text-xs font-mono font-bold rounded-lg" style={{ background: 'rgba(255,130,130,0.15)', border: '1px solid rgba(255,99,99,0.40)', color: '#7B3F00' }}>{error}</div>}
        {saveSuccess && <div className="p-3 text-xs font-mono font-bold rounded-lg flex items-center gap-2" style={{ background: 'rgba(219,255,203,0.80)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}><FaCheck style={{ color: '#7B3F00' }} /> Persona configuration updated successfully!</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1" style={{ color: '#000000' }}>Bot Name</label>
            <input
              type="text"
              value={persona.botName}
              onChange={e => setPersona({ ...persona, botName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none font-mono font-bold"
              style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
              onFocus={e => { e.currentTarget.style.borderColor = '#7B3F00'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,99,99,0.15)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(190,228,208,0.80)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1" style={{ color: '#000000' }}>3D Model GLB Path</label>
            <input
              type="text"
              value={persona.avatarModelUrl}
              onChange={e => setPersona({ ...persona, avatarModelUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none font-mono font-bold"
              style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
              onFocus={e => { e.currentTarget.style.borderColor = '#7B3F00'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,99,99,0.15)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(190,228,208,0.80)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1" style={{ color: '#000000' }}>Greeting Message</label>
          <input
            type="text"
            value={persona.greeting}
            onChange={e => setPersona({ ...persona, greeting: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none font-mono font-bold"
            style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
            onFocus={e => { e.currentTarget.style.borderColor = '#7B3F00'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,99,99,0.15)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(190,228,208,0.80)'; e.currentTarget.style.boxShadow = 'none'; }}
          />
          <p className="text-[10px] font-mono mt-1 font-bold" style={{ color: '#888888' }}>{"// Displayed when visitor opens the chat widget"}</p>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1" style={{ color: '#000000' }}>System Prompt (Instructions)</label>
          <textarea
            rows={5}
            value={persona.systemPrompt}
            onChange={e => setPersona({ ...persona, systemPrompt: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none font-mono font-bold"
            style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
            onFocus={e => { e.currentTarget.style.borderColor = '#7B3F00'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,99,99,0.15)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(190,228,208,0.80)'; e.currentTarget.style.boxShadow = 'none'; }}
          />
        </div>

        <div className="pt-4 space-y-4" style={{ borderTop: '1px solid rgba(190,228,208,0.80)' }}>
          <h3 className="text-sm font-bold uppercase font-mono" style={{ color: '#7B3F00' }}>{"// Speaking Style Reference"}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase mb-1" style={{ color: '#000000' }}>Tone</label>
              <input
                type="text"
                value={persona.speakingStyle?.tone || ''}
                onChange={e => setPersona({ ...persona, speakingStyle: { ...persona.speakingStyle, tone: e.target.value } })}
                className="w-full px-4 py-2 rounded-xl text-xs focus:outline-none font-mono font-bold"
                style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                onFocus={e => { e.currentTarget.style.borderColor = '#7B3F00'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,99,99,0.15)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(190,228,208,0.80)'; e.currentTarget.style.boxShadow = 'none'; }}
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase mb-1" style={{ color: '#000000' }}>Sentence Rhythm</label>
              <input
                type="text"
                value={persona.speakingStyle?.sentenceRhythm || ''}
                onChange={e => setPersona({ ...persona, speakingStyle: { ...persona.speakingStyle, sentenceRhythm: e.target.value } })}
                className="w-full px-4 py-2 rounded-xl text-xs focus:outline-none font-mono font-bold"
                style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                onFocus={e => { e.currentTarget.style.borderColor = '#7B3F00'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,99,99,0.15)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(190,228,208,0.80)'; e.currentTarget.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {/* Signature Phrases Tag Input */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase mb-1" style={{ color: '#000000' }}>Signature Phrases</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newPhrase}
                onChange={e => setNewPhrase(e.target.value)}
                placeholder="Add signature phrase..."
                className="flex-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold"
                style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addPhrase(); } }}
              />
              <button type="button" onClick={addPhrase} className="px-3 py-1.5 text-white rounded-lg text-xs flex items-center gap-1 cursor-pointer" style={{ background: 'linear-gradient(135deg, #7B3F00, #B87333)' }}><FaPlus /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(persona.speakingStyle?.signaturePhrases || []).map((phrase, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold"
                  style={{ background: 'rgba(219,255,203,0.80)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}>
                  <span>{phrase}</span>
                  <button type="button" onClick={() => removePhrase(idx)} className="cursor-pointer" style={{ color: '#7B3F00' }}><FaTimes /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Avoid Phrasing Tag Input */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase mb-1" style={{ color: '#000000' }}>Phrases / Habits to Avoid</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newAvoid}
                onChange={e => setNewAvoid(e.target.value)}
                placeholder="Add phrase to avoid..."
                className="flex-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold"
                style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addAvoid(); } }}
              />
              <button type="button" onClick={addAvoid} className="px-3 py-1.5 text-white rounded-lg text-xs flex items-center gap-1 cursor-pointer" style={{ background: '#7B3F00' }}><FaPlus /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(persona.speakingStyle?.avoid || []).map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold"
                  style={{ background: 'rgba(255,130,130,0.15)', border: '1px solid rgba(255,99,99,0.35)', color: '#7B3F00' }}>
                  <span>{item}</span>
                  <button type="button" onClick={() => removeAvoid(idx)} className="cursor-pointer" style={{ color: '#7B3F00' }}><FaTimes /></button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </form>

      {/* Live Preview Panel (1 Column) */}
      <div className="space-y-6">
        <div className="p-6 rounded-2xl shadow-xl relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', boxShadow: '0 8px 24px rgba(255,99,99,0.08)' }}>
          <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5"
            style={{ background: 'rgba(219,255,203,0.80)', borderBottom: '1px solid rgba(190,228,208,0.80)', borderLeft: '1px solid rgba(190,228,208,0.80)', color: '#7B3F00' }}>
            <FaEye /> Live Preview
          </div>

          <div className="flex items-center gap-3 mb-4 mt-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-mono"
              style={{ background: 'rgba(219,255,203,0.80)', border: '1px solid rgba(255,99,99,0.35)', color: '#7B3F00' }}>
              OGD
            </div>
            <div>
              <h4 className="text-sm font-black uppercase font-outfit" style={{ color: '#000000' }}>{persona.botName}</h4>
              <span className="text-[10px] font-mono font-bold flex items-center gap-1" style={{ color: '#7B3F00' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#7B3F00' }} />
                AI Concierge Online
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl text-sm font-sans leading-relaxed relative font-bold"
            style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}>
            <div className="text-[10px] font-mono mb-1 font-bold" style={{ color: '#7B3F00' }}>{"// SYSTEM GREETING"}</div>
            <p>&ldquo;{persona.greeting}&rdquo;</p>
          </div>

          <div className="mt-4 p-3 rounded-lg text-xs font-mono font-bold space-y-1"
            style={{ background: 'rgba(219,255,203,0.40)', border: '1px solid rgba(190,228,208,0.80)', color: '#3A3A3A' }}>
            <div><span style={{ color: '#7B3F00' }}>Tone:</span> {persona.speakingStyle?.tone}</div>
            <div><span style={{ color: '#7B3F00' }}>Rhythm:</span> {persona.speakingStyle?.sentenceRhythm}</div>
            <div><span style={{ color: '#7B3F00' }}>Signature:</span> {(persona.speakingStyle?.signaturePhrases || []).slice(0, 2).join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotPersonaTab;
