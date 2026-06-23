import type { FC } from 'react';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';
import { SiLeetcode } from 'react-icons/si';
import { FaLightbulb, FaExternalLinkAlt, FaBrain } from 'react-icons/fa';

interface SubmissionData {
  [timestamp: string]: number;
}

const LeetCodeActivity: FC = () => {
  const [liveStats, setLiveStats] = useState({
    totalSolved: 0,
    totalQuestions: 0,
    easySolved: 0,
    totalEasy: 0,
    mediumSolved: 0,
    totalMedium: 0,
    hardSolved: 0,
    totalHard: 0,
    acceptanceRate: 0,
    ranking: 0,
    submissionCalendar: "{}" as string,
    loading: true,
    error: false
  });

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/OrionGD`);
        if (response.ok) {
          const data = await response.json();
          if (data.status === 'success') {
            setLiveStats({
              totalSolved: data.totalSolved || 0,
              totalQuestions: data.totalQuestions || 3300,
              easySolved: data.easySolved || 0,
              totalEasy: data.totalEasy || 800,
              mediumSolved: data.mediumSolved || 0,
              totalMedium: data.totalMedium || 1600,
              hardSolved: data.hardSolved || 0,
              totalHard: data.totalHard || 900,
              acceptanceRate: data.acceptanceRate || 0,
              ranking: data.ranking || 0,
              submissionCalendar: data.submissionCalendar || "{}",
              loading: false,
              error: false
            });
          }
        }
      } catch {
        setLiveStats(prev => ({ ...prev, loading: false, error: true }));
      }
    };
    fetchLeetCodeData();
  }, []);

  const heatmapData = useMemo(() => {
    try {
      const submissions: SubmissionData = JSON.parse(liveStats.submissionCalendar || "{}");
      const grid = [];
      const now = new Date();
      const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - (52 * 7) - endDate.getDay());

      for (let i = 0; i < 53 * 7; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + i);
        const dayStart = Math.floor(new Date(d.setHours(0,0,0,0)).getTime() / 1000);
        const dayEnd = dayStart + 86400;
        let count = 0;
        Object.keys(submissions).forEach(ts => {
          const val = parseInt(ts);
          if (val >= dayStart && val < dayEnd) count += submissions[ts];
        });
        grid.push({
          date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          count: count,
          level: count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 7 ? 3 : 4
        });
      }
      return grid;
    } catch {
      return Array(53 * 7).fill({ count: 0, level: 0, date: '' });
    }
  }, [liveStats.submissionCalendar]);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 4: return 'bg-[#6366f1] shadow-[0_0_8px_rgba(99,102,241,0.5)]';
      case 3: return 'bg-[#6366f1]/80';
      case 2: return 'bg-[#6366f1]/60';
      case 1: return 'bg-[#6366f1]/30';
      default: return 'bg-slate-100 border border-slate-200/60 hover:bg-slate-200 transition-colors';
    }
  };

  const statsBreakdown = [
    { label: 'Easy', value: liveStats.easySolved, total: liveStats.totalEasy, color: 'text-emerald-600', barColor: 'bg-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Medium', value: liveStats.mediumSolved, total: liveStats.totalMedium, color: 'text-amber-600', barColor: 'bg-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Hard', value: liveStats.hardSolved, total: liveStats.totalHard, color: 'text-rose-600', barColor: 'bg-rose-500', bg: 'bg-rose-500/10' }
  ];

  return (
    <section id="leetcode" className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-[2rem] md:rounded-[3rem] p-5 sm:p-8 md:p-14 shadow-2xl relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.90)', border: '1px solid rgba(99,102,241,0.12)', boxShadow: '0 8px 32px rgba(99,102,241,0.10)', backdropFilter: 'blur(16px)' }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 md:mb-20 relative z-10">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl p-0.5 group cursor-pointer hover:rotate-3 transition-transform flex-shrink-0"
                style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.20)', boxShadow: '0 4px 12px rgba(99,102,241,0.06)' }}>
                <div className="w-full h-full rounded-[1rem] md:rounded-[1.4rem] bg-white flex items-center justify-center">
                  <SiLeetcode size={32} className="md:hidden text-[#ffa116]" />
                  <SiLeetcode size={48} className="hidden md:block text-[#ffa116] group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="text-left">
                <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-2" style={{ color: '#0f172a' }}>Algorithm Forge</h2>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.80)', border: '1px solid rgba(99,102,241,0.15)' }}>
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#ffa116' }} />
                    <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest" style={{ color: '#64748b' }}>
                      Rank: {liveStats.loading ? '...' : liveStats.ranking.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <motion.a
              href={PERSONAL_INFO.leetcode}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group self-start sm:self-auto flex items-center gap-3 px-6 sm:px-12 py-4 md:py-5 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
              style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)', boxShadow: '0 4px 16px rgba(99,102,241,0.30)' }}
            >
              Analyze Profile <FaExternalLinkAlt size={10} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-inner"
              style={{ background: 'rgba(248,249,251,0.90)', border: '1px solid rgba(99,102,241,0.08)' }}>
              <div className="relative w-40 h-40 md:w-56 md:h-56 mb-8 md:mb-10">
                <svg className="w-full h-full transform -rotate-90 relative">
                  <circle cx="80" cy="80" r="72" className="block md:hidden stroke-[#e2e8f0] fill-none" strokeWidth="12" />
                  <motion.circle
                    cx="80" cy="80" r="72"
                    initial={{ strokeDasharray: "0 452" }}
                    whileInView={{ strokeDasharray: `${(liveStats.totalSolved / Math.max(1, liveStats.totalQuestions)) * 452} 452` }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.2, ease: "circOut" }}
                    className="block md:hidden stroke-[#6366f1] fill-none"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <circle cx="112" cy="112" r="104" className="hidden md:block stroke-[#e2e8f0] fill-none" strokeWidth="14" />
                  <motion.circle
                    cx="112" cy="112" r="104"
                    initial={{ strokeDasharray: "0 653" }}
                    whileInView={{ strokeDasharray: `${(liveStats.totalSolved / Math.max(1, liveStats.totalQuestions)) * 653} 653` }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.2, ease: "circOut" }}
                    className="hidden md:block stroke-[#6366f1] fill-none"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-6xl font-black mb-1" style={{ color: '#0f172a' }}>
                    {liveStats.loading ? '...' : liveStats.totalSolved}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#94a3b8' }}>Mastered</span>
                </div>
              </div>
              <div className="w-full space-y-4">
                 <div className="flex justify-between items-center px-8 py-5 rounded-2xl shadow-sm"
                   style={{ background: 'rgba(255,255,255,0.80)', border: '1px solid rgba(99,102,241,0.15)' }}>
                   <div className="flex items-center gap-3">
                     <FaBrain style={{ color: '#6366f1' }} />
                     <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#64748b' }}>Accuracy</span>
                   </div>
                   <span className="text-lg font-black" style={{ color: '#0f172a' }}>{liveStats.acceptanceRate}%</span>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {statsBreakdown.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-[2.5rem] flex flex-col group hover:border-[#6366f1] transition-all shadow-sm"
                    style={{ background: 'rgba(255,255,255,0.80)', border: '1px solid rgba(99,102,241,0.12)' }}
                  >
                    <div className="flex justify-between items-center mb-5">
                      <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#64748b' }}>{stat.label}</span>
                      <div className={`w-10 h-10 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-lg group-hover:scale-110 transition-transform`}
                        style={{ border: '1px solid rgba(99,102,241,0.15)' }}>
                        <FaLightbulb size={16} />
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-5">
                      <span className={`text-4xl font-black ${stat.color}`}>{liveStats.loading ? '...' : stat.value}</span>
                      <span className="text-sm font-bold" style={{ color: '#94a3b8' }}>/ {stat.total}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 md:p-10 rounded-[2rem] md:rounded-[3rem] group relative shadow-inner overflow-hidden"
                style={{ background: 'rgba(248,249,251,0.90)', border: '1px solid rgba(99,102,241,0.08)' }}>
                {/* Horizontally scrollable on mobile */}
                <div className="overflow-x-auto -mx-2 px-2">
                  <div className="flex gap-[3px] justify-start md:justify-center" style={{ minWidth: 'max-content' }}>
                    {Array.from({ length: 53 }).map((_, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[3px]">
                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                          const data = heatmapData[weekIndex * 7 + dayIndex];
                          return (
                            <motion.div
                              key={dayIndex}
                              className={`w-3 h-3 md:w-4 md:h-4 rounded-[3px] ${getLevelColor(data?.level || 0)} cursor-crosshair transition-all duration-300 hover:scale-125`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeetCodeActivity;