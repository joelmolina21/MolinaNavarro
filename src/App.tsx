import React, { useState } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { GamifiedProfileCard } from './components/GamifiedProfileCard';
import { RealtimeTelemetry } from './components/RealtimeTelemetry';
import { ExperienceAndEducation } from './components/ExperienceAndEducation';
import { SkillsRadarAndMatrix } from './components/SkillsRadarAndMatrix';
import { AchievementsBadges } from './components/AchievementsBadges';
import { ClipboardDrawer } from './components/ClipboardDrawer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { RecruiterAssistantModal } from './components/RecruiterAssistantModal';
import { PrintableView } from './components/PrintableView';
import { ArchetypeId } from './types';
import { sfx } from './utils/audio';
import { 
  Clipboard, 
  Terminal as TerminalIcon, 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle,
  ArrowUp,
  ExternalLink
} from 'lucide-react';
import { CANDIDATE_PROFILE } from './data/candidateData';

export default function App() {
  const [currentArchetype, setCurrentArchetype] = useState<ArchetypeId>('sysadmin_guardian');
  const [isClipboardOpen, setIsClipboardOpen] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('section-profile');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sfx.setEnabled(next);
    if (next) sfx.playSuccess();
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrintCV = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-cyan-500 selection:text-black font-sans antialiased">
      {/* Printable version for standard printers / PDF output */}
      <PrintableView />

      {/* Main interactive screen container */}
      <div className="no-print flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <HeaderNav
          currentArchetype={currentArchetype}
          onSelectArchetype={setCurrentArchetype}
          onOpenClipboard={() => setIsClipboardOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onPrintCV={handlePrintCV}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="px-4 py-2.5 rounded-xl bg-[#0a0a0a] border border-cyan-500/40 text-cyan-300 font-semibold text-xs shadow-2xl flex items-center gap-2 backdrop-blur-md">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Main Content Sections */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          {/* 1. Hero Gamified Profile Card */}
          <GamifiedProfileCard
            currentArchetype={currentArchetype}
            onSelectArchetype={setCurrentArchetype}
            onOpenClipboard={() => setIsClipboardOpen(true)}
          />

          {/* 2. Real-time Telemetry & Live Topology Rack */}
          <RealtimeTelemetry onShowToast={showToast} />

          {/* 3. Experience & Education with Case Studies */}
          <ExperienceAndEducation />

          {/* 4. Skills Radar and Proficiency Matrix */}
          <SkillsRadarAndMatrix />

          {/* 5. Achievements & Badges */}
          <AchievementsBadges onShowToast={showToast} />

          {/* Call to Action Contact Footer Banner */}
          <section className="w-full rounded-2xl bg-[#080808] border border-white/10 p-8 shadow-2xl text-center relative overflow-hidden">
            {/* Subtle background ambient glow */}
            <div className="absolute top-0 right-1/4 -mt-12 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/4 -mb-12 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono font-bold inline-block">
                ⚡ DISPONIBLE PARA INCORPORACIÓN INMEDIATA
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                ¿Buscando un Administrador de Sistemas y Redes Proactivo?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Joel Molina Navarro cuenta con las certificaciones (Cisco CCNA, Red Hat RH124), la formación en ASIR y la experiencia real para sumar valor desde el primer día.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${CANDIDATE_PROFILE.email}?subject=Oferta%20de%20Empleo%20-%20Administrador%20de%20Sistemas`}
                  id="btn-footer-email"
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-black font-bold text-xs shadow-lg transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-black" />
                  <span>Enviar Correo a Joel</span>
                </a>

                <a
                  href="tel:+34637663537"
                  id="btn-footer-tel"
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold text-xs transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Llamar al 637 663 537</span>
                </a>

                <button
                  onClick={() => setIsClipboardOpen(true)}
                  id="btn-footer-clipboard"
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/20 transition-all flex items-center gap-2"
                >
                  <Clipboard className="w-4 h-4" />
                  <span>Abrir Portapapeles RRHH</span>
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-white/10 bg-[#080808] py-6 px-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-300">Joel Molina Navarro</span>
              <span>•</span>
              <span>Administrador de Sistemas Informáticos y Redes</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Sabadell (Barcelona)</span>
              <span>•</span>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-cyan-400 hover:underline flex items-center gap-1 font-mono"
              >
                <ArrowUp className="w-3 h-3" />
                Volver arriba
              </button>
            </div>
          </div>
        </footer>

        {/* Floating Quick Action Hub */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
          <button
            onClick={() => {
              sfx.playClick();
              setIsAIAssistantOpen(true);
            }}
            className="p-3 rounded-full bg-[#111111] hover:bg-[#1a1a1a] text-purple-400 border border-purple-500/30 shadow-2xl transition-transform hover:scale-110 active:scale-95 group relative"
            title="Asistente Virtual IA & Preguntas de Entrevista"
          >
            <Sparkles className="w-5 h-5 text-purple-400 animate-spin-slow" />
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0a0a0a] border border-white/10 text-slate-200 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              Asistente IA & Entrevista
            </span>
          </button>

          <button
            onClick={() => {
              sfx.playTerminal();
              setIsTerminalOpen(true);
            }}
            className="p-3 rounded-full bg-[#111111] hover:bg-[#1a1a1a] text-emerald-400 border border-white/10 shadow-2xl transition-transform hover:scale-110 active:scale-95 group relative"
            title="Abrir Terminal SysAdmin"
          >
            <TerminalIcon className="w-5 h-5" />
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0a0a0a] border border-white/10 text-slate-200 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              Terminal CLI
            </span>
          </button>

          <button
            onClick={() => {
              sfx.playClick();
              setIsClipboardOpen(true);
            }}
            className="p-3.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white shadow-xl shadow-cyan-600/30 transition-transform hover:scale-110 active:scale-95 group relative"
            title="Abrir Portapapeles de Empleo"
          >
            <Clipboard className="w-5 h-5 text-cyan-100" />
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0a0a0a] border border-white/10 text-slate-200 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              Portapapeles RRHH
            </span>
          </button>
        </div>

        {/* Modals and Drawers */}
        <ClipboardDrawer
          isOpen={isClipboardOpen}
          onClose={() => setIsClipboardOpen(false)}
          onShowToast={showToast}
        />

        <InteractiveTerminal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          onShowToast={showToast}
        />

        <RecruiterAssistantModal
          isOpen={isAIAssistantOpen}
          onClose={() => setIsAIAssistantOpen(false)}
          currentArchetype={currentArchetype}
          onShowToast={showToast}
        />
      </div>
    </div>
  );
}
