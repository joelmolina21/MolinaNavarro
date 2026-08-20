import React, { useState } from 'react';
import { 
  Award, 
  Terminal, 
  Shield, 
  School, 
  CheckCircle2, 
  Languages, 
  Activity, 
  Sparkles,
  Lock,
  Unlock,
  Flame
} from 'lucide-react';
import { ACHIEVEMENTS } from '../data/candidateData';
import { Achievement } from '../types';
import { sfx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface AchievementsBadgesProps {
  onShowToast: (msg: string) => void;
}

export const AchievementsBadges: React.FC<AchievementsBadgesProps> = ({ onShowToast }) => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-5 h-5 text-cyan-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-red-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-blue-400" />;
      case 'School': return <School className="w-5 h-5 text-amber-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'Languages': return <Languages className="w-5 h-5 text-purple-400" />;
      default: return <Activity className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handleClickBadge = (ach: Achievement) => {
    sfx.playLevelUp();
    setSelectedAchievement(ach);
    onShowToast(`🏆 Logro Desbloqueado: ${ach.title}`);
    try {
      confetti({
        particleCount: 30,
        spread: 55,
        origin: { y: 0.8 }
      });
    } catch {}
  };

  return (
    <section id="section-achievements" className="w-full">
      <div className="rounded-2xl bg-[#080808] border border-white/10 p-6 md:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                GAMIFICACIÓN & PROGRESIÓN
              </span>
              <span className="text-xs text-slate-400 font-mono">
                MEDALLAS Y HITOS PROFESIONALES
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Flame className="w-6 h-6 text-amber-400" />
              Medallero & Logros del SysAdmin
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Haz clic en cualquier medalla para inspeccionar los hitos y competencias demostradas por Joel.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#050505] border border-white/10 text-xs font-mono text-amber-400 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>7 / 7 LOGROS COMPLETADOS</span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              onClick={() => handleClickBadge(ach)}
              className="p-4 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-amber-500/40 hover:bg-[#121212] cursor-pointer transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-[#080808] border border-white/10 group-hover:scale-110 transition-transform">
                    {getIcon(ach.icon)}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <Unlock className="w-2.5 h-2.5" />
                    DESBLOQUEADO
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {ach.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>{ach.category}</span>
                <span className="text-cyan-400 font-bold">{ach.unlockedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
