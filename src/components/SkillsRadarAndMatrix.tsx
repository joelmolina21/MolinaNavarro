import React, { useState } from 'react';
import { 
  Server, 
  Network, 
  Cpu, 
  Cloud, 
  CheckCircle2, 
  Zap, 
  Sparkles,
  Layers,
  Search
} from 'lucide-react';
import { CANDIDATE_PROFILE } from '../data/candidateData';
import { sfx } from '../utils/audio';

export const SkillsRadarAndMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Todas las Competencias', icon: Layers },
    { id: 'Sistemas Operativos & Servidores', label: 'Sistemas & Servidores', icon: Server },
    { id: 'Redes & Conectividad', label: 'Redes & Cisco CCNA', icon: Network },
    { id: 'Hardware, Soporte & Ticketing', label: 'Hardware & Soporte', icon: Cpu },
    { id: 'Cloud, Ofimática & Automatización', label: 'Cloud & Automatización', icon: Cloud },
  ];

  const filteredCategories = CANDIDATE_PROFILE.skills.filter((cat) => {
    if (selectedCategory === 'all') return true;
    return cat.category === selectedCategory;
  });

  return (
    <section id="section-skills" className="w-full">
      <div className="rounded-2xl bg-[#080808] border border-white/10 p-6 md:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                MATRIZ DE COMPETENCIAS
              </span>
              <span className="text-xs text-slate-400 font-mono">
                STACK TÉCNICO & EXPERIENCIA
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Cpu className="w-6 h-6 text-cyan-400" />
              Dominio Tecnológico & Habilidades
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Evaluación detallada de competencias en administración de sistemas, redes Cisco, Linux y soporte.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar tecnología (ej: CCNA, AD, Linux...)"
              className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#050505] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto my-6 pb-2 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sfx.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-white/15 text-white border border-white/20 shadow-md'
                    : 'bg-[#0d0d0d] text-slate-400 border border-white/5 hover:text-white hover:border-white/15'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCategories.map((category, catIdx) => {
            const visibleItems = category.items.filter((item) => {
              if (!searchQuery) return true;
              const q = searchQuery.toLowerCase();
              return (
                item.name.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q)
              );
            });

            if (visibleItems.length === 0) return null;

            return (
              <div
                key={catIdx}
                className="p-5 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-white/20 transition-all space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    {category.category}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500">
                    {visibleItems.length} módulos
                  </span>
                </div>

                <div className="space-y-4">
                  {visibleItems.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-200">{skill.name}</span>
                          {skill.highlight && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                              Core
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-[10px] text-slate-400">{skill.experienceYears}</span>
                          <span className="font-bold text-cyan-400">{skill.level}%</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-2 rounded-full bg-[#050505] border border-white/5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-normal">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Soft Skills Banner */}
        <div className="mt-6 p-4 rounded-xl bg-[#0d0d0d] border border-white/10">
          <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold block mb-2">
            ⭐ Competencias Personales & Profesionales:
          </span>
          <div className="flex flex-wrap gap-2">
            {CANDIDATE_PROFILE.softSkills.map((soft, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-[#080808] border border-white/10 text-xs text-slate-200 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{soft}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
