import React from 'react';
import { 
  Clipboard, 
  Terminal, 
  Sparkles, 
  Printer, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Network, 
  Wrench, 
  Cpu, 
  Download,
  Share2,
  Mail,
  Phone
} from 'lucide-react';
import { ARCHETYPES } from '../data/candidateData';
import { ArchetypeId } from '../types';
import { sfx } from '../utils/audio';

interface HeaderNavProps {
  currentArchetype: ArchetypeId;
  onSelectArchetype: (id: ArchetypeId) => void;
  onOpenClipboard: () => void;
  onOpenTerminal: () => void;
  onPrintCV: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentArchetype,
  onSelectArchetype,
  onOpenClipboard,
  onOpenTerminal,
  onPrintCV,
  soundEnabled,
  onToggleSound,
  activeSection,
  onNavigate,
}) => {
  const archetype = ARCHETYPES[currentArchetype];

  const handleArchetypeClick = (id: ArchetypeId) => {
    sfx.playClick();
    onSelectArchetype(id);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#080808]/90 backdrop-blur-md">
      {/* Top micro bar for status and quick actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-white/5 text-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            DISPONIBLE PARA INCORPORACIÓN INMEDIATA
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
            📍 Sabadell / Barcelona
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            id="btn-sound-toggle"
            onClick={onToggleSound}
            title={soundEnabled ? 'Silenciar efectos sonoros' : 'Activar efectos sonoros'}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          <a
            href="mailto:joelmolinanavarro21@gmail.com"
            id="btn-quick-email"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Mail className="w-3 h-3 text-cyan-400" />
            <span>joelmolinanavarro21@gmail.com</span>
          </a>

          <a
            href="tel:+34637663537"
            id="btn-quick-phone"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>637 663 537</span>
          </a>

          <button
            id="btn-print-cv"
            onClick={onPrintCV}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-black font-semibold hover:bg-slate-200 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-black" />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/10 flex items-center justify-center">
            <div className="w-full h-full bg-[#050505] rounded-[10px] flex items-center justify-center font-black text-cyan-400 text-base">
              JM
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-tight">
                Joel Molina Navarro
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 font-mono">
                ASIR / CCNA / RH124
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Administrador de Sistemas Informáticos & Redes • Portapapeles Profesional
            </p>
          </div>
        </div>

        {/* Gamified Archetype Switcher */}
        <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-[#0d0d0d] border border-white/10">
          <button
            id="tab-archetype-sysadmin"
            onClick={() => handleArchetypeClick('sysadmin_guardian')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentArchetype === 'sysadmin_guardian'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SysAdmin</span>
          </button>

          <button
            id="tab-archetype-network"
            onClick={() => handleArchetypeClick('network_vanguard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentArchetype === 'network_vanguard'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Redes CCNA</span>
          </button>

          <button
            id="tab-archetype-incident"
            onClick={() => handleArchetypeClick('incident_slayer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentArchetype === 'incident_slayer'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Soporte L2</span>
          </button>

          <button
            id="tab-archetype-devops"
            onClick={() => handleArchetypeClick('devops_explorer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentArchetype === 'devops_explorer'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Linux & Cloud</span>
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Interactive Terminal Trigger */}
          <button
            id="btn-header-terminal"
            onClick={() => {
              sfx.playTerminal();
              onOpenTerminal();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors text-xs font-mono"
            title="Abrir consola de comandos SysAdmin"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">CLI</span>
          </button>

          {/* Master Smart Clipboard Drawer Trigger */}
          <button
            id="btn-header-clipboard"
            onClick={() => {
              sfx.playClick();
              onOpenClipboard();
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-lg shadow-cyan-600/20 transition-all hover:scale-105 active:scale-95"
          >
            <Clipboard className="w-4 h-4 text-cyan-100" />
            <span>Portapapeles RRHH</span>
          </button>
        </div>
      </div>

      {/* Quick In-Page Section Anchor Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center gap-4 overflow-x-auto text-xs text-slate-400 border-t border-white/5 no-scrollbar">
        <button
          onClick={() => onNavigate('section-profile')}
          className={`whitespace-nowrap transition-colors ${activeSection === 'section-profile' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'}`}
        >
          Perfil & RPG
        </button>
        <span className="text-slate-700">•</span>
        <button
          onClick={() => onNavigate('section-telemetry')}
          className={`whitespace-nowrap transition-colors ${activeSection === 'section-telemetry' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'}`}
        >
          Telemetría & Red En Vivo
        </button>
        <span className="text-slate-700">•</span>
        <button
          onClick={() => onNavigate('section-experience')}
          className={`whitespace-nowrap transition-colors ${activeSection === 'section-experience' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'}`}
        >
          Experiencia (DGT, Estel, AETI)
        </button>
        <span className="text-slate-700">•</span>
        <button
          onClick={() => onNavigate('section-skills')}
          className={`whitespace-nowrap transition-colors ${activeSection === 'section-skills' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'}`}
        >
          Matriz de Competencias
        </button>
        <span className="text-slate-700">•</span>
        <button
          onClick={() => onNavigate('section-education')}
          className={`whitespace-nowrap transition-colors ${activeSection === 'section-education' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'}`}
        >
          Formación & Certificaciones
        </button>
        <span className="text-slate-700">•</span>
        <button
          onClick={() => onNavigate('section-achievements')}
          className={`whitespace-nowrap transition-colors ${activeSection === 'section-achievements' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'}`}
        >
          Logros Gamificados
        </button>
      </div>
    </header>
  );
};
