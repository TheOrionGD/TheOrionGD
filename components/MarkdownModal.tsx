import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaFileAlt } from 'react-icons/fa';

interface MarkdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

const MarkdownModal: React.FC<MarkdownModalProps> = ({ isOpen, onClose, projectTitle }) => {
  const [content, setContent] = useState<string>('Loading documentation...');

  useEffect(() => {
    if (!isOpen || !projectTitle) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setContent('Loading documentation...');
    fetch(`/github-export/readmes/${projectTitle}_README.md`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load README.md for ${projectTitle}`);
        return res.text();
      })
      .then(text => {
        setContent(text.trim());
      })
      .catch(err => {
        console.error(err);
        setContent(`# ${projectTitle}\n\nError loading documentation: ${err.message}`);
      });
  }, [isOpen, projectTitle]);

  const renderMarkdown = (md: string) => {
    const codeBlocks: string[] = [];
    let html = md;

    // 1. Extract fenced code blocks and replace with placeholders
    html = html.replace(/```(?:\w+)?\n([\s\S]*?)\n```/g, (match, code) => {
      const escaped = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      const placeholder = `__CODE_BLOCK_PLACEHOLDER_${codeBlocks.length}__`;
      codeBlocks.push(`<pre class="p-4 rounded-xl font-mono text-xs overflow-x-auto my-4 font-bold" style="background: rgba(248,249,251,1); color: #000000; border: 1px solid rgba(190,228,208,0.80)"><code>${escaped}</code></pre>`);
      return `\n\n${placeholder}\n\n`;
    });

    // 2. Headings, Links, Lists, Bold & Italic, Inline Code, Horizontal Rules
    html = html
      .replace(/^#\s+(.+)$/gm, '<h1 class="text-3xl font-black mt-8 mb-4 uppercase pb-2 tracking-tight" style="color: #000000; border-bottom: 1px solid rgba(190,228,208,0.80)">$1</h1>')
      .replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-black mt-6 mb-4 uppercase pb-2 tracking-tight" style="color: #000000; border-bottom: 1px solid rgba(190,228,208,0.80)">$1</h2>')
      .replace(/^###\s+(.+)$/gm, '<h3 class="text-lg font-black mt-6 mb-3 uppercase tracking-tight" style="color: #000000">$1</h3>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-black" style="color: #7B3F00">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded text-xs font-mono font-bold" style="background: rgba(219,255,203,0.80); border: 1px solid rgba(190,228,208,0.80); color: #000000">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="hover:underline font-bold" style="color: #7B3F00" target="_blank" rel="noreferrer">$1</a>')
      .replace(/^-\s+(.+)$/gm, '<li class="ml-5 list-disc text-sm mb-2 leading-relaxed font-medium" style="color: #000000">$1</li>')
      .replace(/^\*\s+(.+)$/gm, '<li class="ml-5 list-disc text-sm mb-2 leading-relaxed font-medium" style="color: #000000">$1</li>')
      .replace(/^---\s*$/gm, '<hr class="my-6" style="border-color: rgba(190,228,208,0.80)" />');

    // 3. Wrap paragraphs around double newlines (excluding structural tags)
    const blocks = html.split(/\n\s*\n/);
    const parsedBlocks = blocks.map(block => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (
        trimmed.startsWith('<h1') ||
        trimmed.startsWith('<h2') ||
        trimmed.startsWith('<h3') ||
        trimmed.startsWith('<li') ||
        trimmed.startsWith('<hr') ||
        trimmed.startsWith('__CODE_BLOCK_PLACEHOLDER_')
      ) {
        return trimmed;
      }
      return `<p class="text-sm leading-relaxed mb-4 font-medium" style="color: #000000">${trimmed}</p>`;
    });

    let finalHtml = parsedBlocks.join('\n');

    // 4. Restore the code blocks from placeholders
    codeBlocks.forEach((codeHtml, idx) => {
      finalHtml = finalHtml.replace(`<p class="text-sm leading-relaxed mb-4 font-medium" style="color: #000000">__CODE_BLOCK_PLACEHOLDER_${idx}__</p>`, codeHtml);
      finalHtml = finalHtml.replace(`__CODE_BLOCK_PLACEHOLDER_${idx}__`, codeHtml);
    });

    return finalHtml;
  };

  // Close modal on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center backdrop-blur-md p-4"
          style={{ background: 'rgba(15,23,42,0.6)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-3xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            style={{ background: '#ffffff', border: '1px solid rgba(190,228,208,0.80)', boxShadow: '0 20px 50px rgba(255,99,99,0.15)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between"
              style={{ background: 'rgba(248,249,251,1)', borderBottom: '1px solid rgba(190,228,208,0.80)' }}>
              <div className="flex items-center gap-3">
                <FaFileAlt className="text-lg" />
                <span className="text-sm font-black uppercase tracking-widest">
                  Project Documentation
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer font-bold border border-white/20 text-white shadow-md hover:bg-black/90"
                style={{ background: 'rgba(20,20,20,0.75)', backdropFilter: 'blur(12px)' }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Content */}
            <div 
              className="flex-1 overflow-y-auto p-6 md:p-8"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MarkdownModal;
