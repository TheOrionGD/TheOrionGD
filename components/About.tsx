import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCode, FaPaintBrush, FaLayerGroup } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';

const About: React.FC = () => {
  const { data } = usePortfolioData();
  const experienceList = data.experience && data.experience.length > 0 ? data.experience : null;

  const defaultBeats = [
    {
      num: "01",
      title: "Cybersecurity",
      company: "Adaovi",
      period: "Jun–Jul 2024",
      icon: FaShieldAlt,
      text: "It started with breaking things on purpose. A password-strength checker that thinks in entropy. A keylogger built to teach, not exploit. The first lesson: every system has a weak point — the job is finding it before someone else does.",
      color: "#7B3F00" // Burnt Umber
    },
    {
      num: "02",
      title: "Web Development",
      company: "Prodigy InfoTech",
      period: "Aug–Sep 2024",
      icon: FaCode,
      text: "Then came the other side — building instead of breaking. Responsive frontends, live weather data pulled from real APIs, interfaces that respond the instant you touch them.",
      color: "#B87333" // Warm Copper
    },
    {
      num: "03",
      title: "UI/UX Design",
      company: "SkillCraft",
      period: "Feb–Mar 2025",
      icon: FaPaintBrush,
      text: "Design became the missing piece. Dark-mode workflows, mobile-first hierarchies, a homepage rebuilt around clarity instead of clutter. Understanding why a user clicks, not just how.",
      color: "#D3D3D3" // Light Gray
    },
    {
      num: "04",
      title: "Full Stack Architecture",
      company: "VDart Academy",
      period: "Jan 2026",
      icon: FaLayerGroup,
      text: "Everything converges. MERN stack, full ownership, deadlines that don't move. This is where the pieces — security, frontend, design — stop being separate skills and start being one instinct.",
      color: "#7B3F00" // Burnt Umber
    }
  ];

  const icons = [FaShieldAlt, FaCode, FaPaintBrush, FaLayerGroup];
  const colors = ["#7B3F00", "#B87333", "#D3D3D3", "#7B3F00"];

  const beats = experienceList ? experienceList.map((exp, idx) => {
    const defaultMatch = defaultBeats.find(b => b.company.toLowerCase().includes(exp.company.toLowerCase()) || exp.company.toLowerCase().includes(b.company.toLowerCase()));
    return {
      num: `0${idx + 1}`,
      title: exp.role || defaultMatch?.title || "Role",
      company: exp.company || defaultMatch?.company || "Company",
      period: exp.period || defaultMatch?.period || "",
      icon: icons[idx % icons.length],
      color: colors[idx % colors.length],
      text: Array.isArray(exp.details) ? exp.details.join(' ') : (exp.details || defaultMatch?.text || "")
    };
  }) : defaultBeats;

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 glass-badge">
            Section 02 // The Thread
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">
            The <span className="text-black">Thread</span>
          </h2>
          <p className="text-base md:text-xl font-medium leading-relaxed max-w-2xl">
            A four-beat evolution across cybersecurity, frontend engineering, UI/UX design, and full-stack architecture. Things are revealed, not listed.
          </p>
        </motion.div>

        {/* Storytelling Scroll / Timeline Sequence */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
          {beats.map((beat, idx) => {
            const Icon = beat.icon;
            return (
              <motion.div
                key={beat.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="h-full"
              >
                <div
                  className="py-6 border-b border-[#D3D3D3] flex flex-col justify-between group relative overflow-hidden h-full"
                >
                  <div>
                    {/* Top Compartment: Company & Title */}
                    <div className="pb-4 mb-4 border-b border-[#D3D3D3]">
                      <h3 className="font-space-grotesk text-[10px] tracking-widest text-black font-bold uppercase mb-1">
                        {beat.company} {"// SYSTEMS RECORD"}
                      </h3>
                      <h4 className="text-xl sm:text-2xl font-bold font-space-grotesk uppercase tracking-tight leading-tight text-black">
                        {beat.title}
                      </h4>
                    </div>

                    {/* Middle Compartment: Grid split (Date & Beat Index with Icon) */}
                    <div className="grid grid-cols-2 border-b border-[#D3D3D3] pb-4 mb-4 text-xs font-space-grotesk">
                      <div className="border-r border-[#D3D3D3] pr-4">
                        <span className="opacity-60 text-black uppercase text-[9px] block">INTERVAL</span>
                        <span className="font-bold tracking-tight text-black">{beat.period}</span>
                      </div>
                      <div className="pl-4 flex items-center justify-between">
                        <div>
                          <span className="opacity-60 text-black uppercase text-[9px] block">REF MATRIX</span>
                          <span className="font-bold text-black">{beat.num} {"// ACTIVE"}</span>
                        </div>
                        <div className="text-black/60 group-hover:text-black text-lg transition-transform group-hover:scale-110 pr-2">
                          <Icon />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Compartment: Narrative Text */}
                    <div className="pt-2">
                      <span className="font-space-grotesk text-[9px] text-black opacity-60 uppercase block mb-1">LOG ENTRY</span>
                      <p className="text-xs sm:text-sm leading-relaxed font-medium text-black group-hover:text-black transition-colors">
                        {beat.text}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Voiceover Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-16 text-center"
        >
          <div className="py-6 border-t border-[#D3D3D3] inline-block w-full">
            <p className="text-base sm:text-lg font-bold font-space-grotesk italic tracking-tight text-black leading-relaxed">
              &ldquo;Four internships. One throughline: build the thing that shouldn&apos;t be possible on the timeline you&apos;re given.&rdquo;
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;