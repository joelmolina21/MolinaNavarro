import React from 'react';
import { 
  ShieldCheck, 
  Network, 
  Wrench, 
  Cpu, 
  Sparkles, 
  Award, 
  Zap, 
  Flame, 
  CheckCircle,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { CANDIDATE_PROFILE, ARCHETYPES } from '../data/candidateData';
import { ArchetypeId } from '../types';
import { sfx } from '../utils/audio';

interface GamifiedProfileCardProps {
  currentArchetype: ArchetypeId;
  onSelectArchetype: (id: ArchetypeId) => void;
  onOpenClipboard: () => void;
}

export const GamifiedProfileCard: React.FC<GamifiedProfileCardProps> = ({
  currentArchetype,
  onSelectArchetype,
  onOpenClipboard
}) => {
  const archetype = ARCHETYPES[currentArchetype];

  return (
    <section id="section-profile" className="w-full">
      <div className="relative rounded-2xl bg-[#080808] border border-white/10 p-6 md:p-8 shadow-2xl overflow-hidden">
        {/* Subtle decorative background ambient glow */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Avatar, Identity & RPG Level */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
              {/* Gamified Avatar Container with Animated Level Ring */}
              <div className="relative group">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl p-1 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 shadow-xl shadow-cyan-500/10">
                  <div className="w-full h-full rounded-[14px] bg-[#050505] overflow-hidden relative flex items-center justify-center border border-white/10">
                    {/* Stylized high-tech avatar */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent z-10"></div>
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-cyan-400 z-20">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mb-1">
                        <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-white">JOEL MOLINA</span>
                      <span className="text-[9px] font-mono text-cyan-400">SYSADMIN // NOC</span>
                    </div>
                  </div>
                </div>

                {/* Level Badge Pill */}
                <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-lg bg-white text-black font-black text-xs shadow-lg flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>LVL {archetype.level}</span>
                </div>
              </div>

              {/* Name, Role & Status */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] font-semibold">
                    SYSADMIN & REDES
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono text-[11px]">
                    CFGS ASIR (ILERNA)
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {CANDIDATE_PROFILE.name}
                </h1>
                <p className="text-sm font-medium text-cyan-400 mt-0.5">
                  {CANDIDATE_PROFILE.title}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    Sabadell, Barcelona
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    Disp. Inmediata
                  </span>
                </div>
              </div>
            </div>

            {/* XP Progress to Next Level */}
            <div className="w-full mt-5 p-3.5 rounded-xl bg-[#0d0d0d] border border-white/5">
              <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Experiencia RPG
                </span>
                <span className="text-amber-400 font-semibold">
                  {archetype.xp} / {archetype.maxXP} XP (84.5%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-400 rounded-full transition-all duration-700"
                  style={{ width: `${(archetype.xp / archetype.maxXP) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1.5 font-mono">
                <span>Rango Actual: SysAdmin L2</span>
                <span className="text-cyan-400">Siguiente: Lead Architect</span>
              </div>
            </div>

            {/* Quick Contact & Action Buttons */}
            <div className="w-full mt-4 flex flex-wrap gap-2">
              <button
                id="btn-profile-open-clipboard"
                onClick={() => {
                  sfx.playClick();
                  onOpenClipboard();
                }}
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-lg shadow-cyan-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Copiar Ficha RRHH</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                id="btn-profile-direct-mail"
                href={`mailto:${CANDIDATE_PROFILE.email}?subject=Contacto%20Laboral%20-%20Administrador%20de%20Sistemas`}
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-xs transition-all hover:border-cyan-500/40"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Contactar por Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive RPG Archetype Stats & Perks */}
          <div className="lg:col-span-7 space-y-4">
            {/* Archetype Selector Tabs */}
            <div className="p-1 rounded-xl bg-[#0d0d0d] border border-white/5 flex flex-wrap gap-1">
              {Object.values(ARCHETYPES).map((arch) => {
                const isActive = arch.id === currentArchetype;
                return (
                  <button
                    key={arch.id}
                    onClick={() => {
                      sfx.playClick();
                      onSelectArchetype(arch.id);
                    }}
                    className={`flex-1 min-w-[110px] py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-white/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <span>{arch.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Archetype Highlight Box */}
            <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/10 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {archetype.badge}
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      {archetype.rpgTitle}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {archetype.description}
                  </p>
                </div>
              </div>

              {/* RPG Primary Stats Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {/* Stat 1: Defense / Server Reliability */}
                <div className="p-2.5 rounded-lg bg-[#080808] border border-white/5">
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      Fiabilidad Servidores (AD/DNS)
                    </span>
                    <span className="text-blue-400 font-bold">{archetype.primaryStats.defenseServer}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${archetype.primaryStats.defenseServer}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stat 2: Network Speed / CCNA */}
                <div className="p-2.5 rounded-lg bg-[#080808] border border-white/5">
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Network className="w-3.5 h-3.5 text-cyan-400" />
                      Velocidad Redes (Cisco CCNA)
                    </span>
                    <span className="text-cyan-400 font-bold">{archetype.primaryStats.networkSpeed}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div 
                      className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${archetype.primaryStats.networkSpeed}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stat 3: Triage Power / SLA Helpdesk */}
                <div className="p-2.5 rounded-lg bg-[#080808] border border-white/5">
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Wrench className="w-3.5 h-3.5 text-amber-400" />
                      Poder de Triage (Hardware & SLA)
                    </span>
                    <span className="text-amber-400 font-bold">{archetype.primaryStats.triagePower}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${archetype.primaryStats.triagePower}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stat 4: Learning Agility */}
                <div className="p-2.5 rounded-lg bg-[#080808] border border-white/5">
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                      Agilidad de Aprendizaje & RH124
                    </span>
                    <span className="text-emerald-400 font-bold">{archetype.primaryStats.learningAgility}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${archetype.primaryStats.learningAgility}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Signature Ability */}
              <div className="mt-3 p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex items-start gap-2.5 text-xs text-cyan-200">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-cyan-300">Habilidad Pasiva Especial: </span>
                  <span>{archetype.signatureAbility}</span>
                </div>
              </div>
            </div>

            {/* Equipped Legendary Perks & Certifications */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded-xl bg-[#0d0d0d] border border-white/5 flex items-center gap-2">
                <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400">
                  <Network className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Cert 1</div>
                  <div className="text-xs font-bold text-white">Cisco CCNA</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0d0d0d] border border-white/5 flex items-center gap-2">
                <div className="p-1.5 rounded bg-red-500/10 text-red-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Cert 2</div>
                  <div className="text-xs font-bold text-white">Red Hat RH124</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0d0d0d] border border-white/5 flex items-center gap-2">
                <div className="p-1.5 rounded bg-blue-500/10 text-blue-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Infra</div>
                  <div className="text-xs font-bold text-white">Win Server / AD</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0d0d0d] border border-white/5 flex items-center gap-2">
                <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Práctica</div>
                  <div className="text-xs font-bold text-white">DGT & Estel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
