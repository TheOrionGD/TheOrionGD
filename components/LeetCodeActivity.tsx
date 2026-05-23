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
      case 4: return 'bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.5)]';
      case 3: return 'bg-[#22C55E]/80';
      case 2: return 'bg-[#22C55E]/60';
      case 1: return 'bg-[#22C55E]/30';
      default: return 'bg-[#0F172A] border border-[#1F2937] hover:bg-[#1F2937] transition-colors';
    }
  };

  const statsBreakdown = [
    { label: 'Easy', value: liveStats.easySolved, total: liveStats.totalEasy, color: 'text-[#22C55E]', barColor: 'bg-[#22C55E]', bg: 'bg-[#22C55E]/10' },
    { label: 'Medium', value: liveStats.mediumSolved, total: liveStats.totalMedium, color: 'text-[#16A34A]', barColor: 'bg-[#16A34A]', bg: 'bg-[#16A34A]/10' },
    { label: 'Hard', value: liveStats.hardSolved, total: liveStats.totalHard, color: 'text-[#15803d]', barColor: 'bg-[#15803d]', bg: 'bg-[#15803d]/10' }
  ];

  return (
    <section id="leetcode" className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-[#0F172A]/60 backdrop-blur-3xl border border-[#1F2937] rounded-[2rem] md:rounded-[3rem] p-5 sm:p-8 md:p-14 shadow-2xl relative overflow-hidden"
        >
          {/* Background blurred blob removed */}
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 md:mb-20 relative z-10">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-[#22C55E] p-0.5 shadow-2xl shadow-[#22C55E]/20 group cursor-pointer hover:rotate-3 transition-transform flex-shrink-0">
                <div className="w-full h-full rounded-[1rem] md:rounded-[1.4rem] bg-[#020617] flex items-center justify-center">
                  <SiLeetcode size={32} className="md:hidden text-[#22C55E]" />
                  <SiLeetcode size={48} className="hidden md:block text-[#22C55E] group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="text-left">
                <h2 className="text-2xl md:text-4xl font-black text-[#E2E8F0] tracking-tight mb-2">Algorithm Forge</h2>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-[#0F172A] border border-[#1F2937] shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                    <span className="text-[10px] md:text-[11px] font-black text-[#94A3B8] uppercase tracking-widest">
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
              className="group self-start sm:self-auto flex items-center gap-3 px-6 sm:px-12 py-4 md:py-5 bg-[#22C55E] hover:bg-[#16A34A] text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#22C55E]/20 transition-all"
            >
              Analyze Profile <FaExternalLinkAlt size={10} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 md:p-12 bg-[#020617] rounded-[2rem] md:rounded-[3rem] border border-[#1F2937] shadow-inner">
              <div className="relative w-40 h-40 md:w-56 md:h-56 mb-8 md:mb-10">
                <svg className="w-full h-full transform -rotate-90 relative">
                  <circle cx="80" cy="80" r="72" className="block md:hidden stroke-[#1F2937] fill-none" strokeWidth="12" />
                  <motion.circle
                    cx="80" cy="80" r="72"
                    initial={{ strokeDasharray: "0 452" }}
                    whileInView={{ strokeDasharray: `${(liveStats.totalSolved / Math.max(1, liveStats.totalQuestions)) * 452} 452` }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.2, ease: "circOut" }}
                    className="block md:hidden stroke-[#22C55E] fill-none"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <circle cx="112" cy="112" r="104" className="hidden md:block stroke-[#1F2937] fill-none" strokeWidth="14" />
                  <motion.circle
                    cx="112" cy="112" r="104"
                    initial={{ strokeDasharray: "0 653" }}
                    whileInView={{ strokeDasharray: `${(liveStats.totalSolved / Math.max(1, liveStats.totalQuestions)) * 653} 653` }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.2, ease: "circOut" }}
                    className="hidden md:block stroke-[#22C55E] fill-none"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-6xl font-black text-[#E2E8F0] mb-1">
                    {liveStats.loading ? '...' : liveStats.totalSolved}
                  </span>
                  <span className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em]">Mastered</span>
                </div>
              </div>
              <div className="w-full space-y-4">
                 <div className="flex justify-between items-center px-8 py-5 rounded-2xl bg-[#0F172A] border border-[#1F2937] shadow-sm">
                   <div className="flex items-center gap-3">
                     <FaBrain className="text-[#22C55E]" />
                     <span className="text-[11px] font-black text-[#64748B] uppercase tracking-widest">Accuracy</span>
                   </div>
                   <span className="text-lg font-black text-[#E2E8F0]">{liveStats.acceptanceRate}%</span>
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
                    className="p-8 rounded-[2.5rem] bg-[#0F172A]/60 border border-[#1F2937] flex flex-col group hover:border-[#22C55E] transition-all shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-5">
                      <span className="text-[11px] font-black text-[#64748B] uppercase tracking-widest">{stat.label}</span>
                      <div className={`w-10 h-10 rounded-2xl ${stat.bg} border border-[#22C55E] flex items-center justify-center ${stat.color} shadow-lg group-hover:scale-110 transition-transform`}>
                        <FaLightbulb size={16} />
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-5">
                      <span className={`text-4xl font-black ${stat.color}`}>{liveStats.loading ? '...' : stat.value}</span>
                      <span className="text-sm font-bold text-[#64748B]">/ {stat.total}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-[#020617] p-4 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-[#1F2937] group relative shadow-inner overflow-hidden">
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