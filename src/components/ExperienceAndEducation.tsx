import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ShieldCheck, 
  Terminal, 
  Network, 
  Calendar, 
  MapPin,
  Sparkles,
  Layers,
  Clock
} from 'lucide-react';
import { CANDIDATE_PROFILE } from '../data/candidateData';
import { sfx } from '../utils/audio';

export const ExperienceAndEducation: React.FC = () => {
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>('exp-1');

  const toggleCase = (id: string) => {
    sfx.playClick();
    setExpandedCaseId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-10">
      {/* 1. Professional Work Experience Section */}
      <section id="section-experience" className="w-full">
        <div className="rounded-2xl bg-[#080808] border border-white/10 p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  HISTORIAL PROFESIONAL
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  SOPORTE & ADMINISTRACIÓN DE SISTEMAS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-cyan-400" />
                Experiencia Laboral Verificada
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              3 Entornos Corporativos & Públicos
            </span>
          </div>

          {/* Timeline Cards */}
          <div className="mt-6 space-y-6">
            {CANDIDATE_PROFILE.experience.map((exp, idx) => {
              const isExpanded = expandedCaseId === exp.id;
              return (
                <div 
                  key={exp.id}
                  className="p-5 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-white/20 transition-all shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
                          {exp.badge}
                        </span>
                        <span className="text-xs text-slate-400">
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5 font-medium">
                        <span className="text-slate-300 font-semibold">{exp.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleCase(exp.id)}
                      className="self-start lg:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-400 text-xs font-semibold transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isExpanded ? 'Ocultar Caso de Éxito' : 'Ver Caso Técnico Resuelto'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* Responsibilities list */}
                  <div className="space-y-1.5 mb-3">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Case Study Drawer */}
                  {isExpanded && (
                    <div className="mt-4 p-4 rounded-xl bg-[#050505] border border-cyan-500/30 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/20">
                          CASO DE RESOLUCIÓN TÉCNICA
                        </span>
                        <h4 className="text-xs font-bold text-white">
                          {exp.incidentCaseStudy.title}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-3">
                        <div className="p-2.5 rounded-lg bg-[#0d0d0d] border border-white/5">
                          <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block mb-1">
                            ⚠️ Escenario / Incidencia:
                          </span>
                          <p className="text-slate-300 leading-relaxed">
                            {exp.incidentCaseStudy.scenario}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-lg bg-[#0d0d0d] border border-white/5">
                          <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                            🛠️ Acción y Solución:
                          </span>
                          <p className="text-slate-300 leading-relaxed">
                            {exp.incidentCaseStudy.actionTaken}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-lg bg-[#0d0d0d] border border-white/5">
                          <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                            ✅ Resultado & SLA:
                          </span>
                          <p className="text-slate-300 leading-relaxed">
                            {exp.incidentCaseStudy.result}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono text-slate-500 mr-1">Tecnologías:</span>
                        {exp.incidentCaseStudy.technologies.map((t, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded bg-[#0d0d0d] border border-white/10 text-[10px] text-slate-300 font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Education & Certifications Section */}
      <section id="section-education" className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Education Column */}
          <div className="lg:col-span-7 rounded-2xl bg-[#080808] border border-white/10 p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  FORMACIÓN ACADÉMICA
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 mt-1">
                  <GraduationCap className="w-5 h-5 text-emerald-400" />
                  Titulaciones Oficiales
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              {CANDIDATE_PROFILE.education.map((edu) => (
                <div 
                  key={edu.id}
                  className="p-4 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-white/20 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold ${edu.badgeColor}`}>
                      {edu.status}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {edu.period}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {edu.degree}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-400 mb-2">
                    {edu.institution}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {edu.description}
                  </p>

                  <div className="space-y-1">
                    {edu.keyLearnings.map((learn, lIdx) => (
                      <div key={lIdx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                        <span className="text-emerald-400">•</span>
                        <span>{learn}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Courses Column */}
          <div className="lg:col-span-5 rounded-2xl bg-[#080808] border border-white/10 p-6 md:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    CERTIFICACIONES OFICIALES
                  </span>
                  <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 mt-1">
                    <Award className="w-5 h-5 text-cyan-400" />
                    Cursos Especializados
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                {CANDIDATE_PROFILE.coursesAndCerts.map((cert) => (
                  <div 
                    key={cert.id}
                    className="p-4 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-cyan-500/40 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/20">
                        {cert.code}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {cert.issuer}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
                      {cert.id === 'cert-1' ? <Network className="w-4 h-4 text-cyan-400" /> : <Terminal className="w-4 h-4 text-red-400" />}
                      {cert.name}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {cert.description}
                    </p>

                    <div className="space-y-1">
                      {cert.skillsGained.map((sk, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                          <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{sk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Widget */}
            <div className="mt-6 p-4 rounded-xl bg-[#0d0d0d] border border-white/10">
              <span className="text-[11px] font-mono text-slate-400 uppercase block mb-2 font-bold">
                🌐 Idiomas:
              </span>
              <div className="grid grid-cols-3 gap-2 text-center">
                {CANDIDATE_PROFILE.languages.map((lang, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-[#080808] border border-white/10">
                    <div className="text-xs font-bold text-white">{lang.language}</div>
                    <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{lang.level}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
