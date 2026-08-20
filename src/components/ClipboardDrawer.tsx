import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  FileText, 
  Mail, 
  Phone, 
  Sparkles, 
  Code, 
  MessageSquare, 
  ExternalLink,
  Download,
  Share2
} from 'lucide-react';
import { CANDIDATE_PROFILE } from '../data/candidateData';
import { 
  copyToClipboard, 
  generateHRBioSnippet, 
  generateTechStackMarkdown, 
  generateMarkdownCV, 
  generateLinkedInPitch 
} from '../utils/clipboardHelper';
import { sfx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ClipboardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ClipboardDrawer: React.FC<ClipboardDrawerProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [customRecipient, setCustomRecipient] = useState<string>('');

  if (!isOpen) return null;

  const handleCopy = async (key: string, content: string, label: string) => {
    sfx.playSuccess();
    const ok = await copyToClipboard(content);
    if (ok) {
      setCopiedKey(key);
      onShowToast(`¡Copiado al portapapeles: ${label}!`);
      try {
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch {}
      setTimeout(() => {
        setCopiedKey(null);
      }, 2500);
    }
  };

  const hrBio = generateHRBioSnippet();
  const techStack = generateTechStackMarkdown();
  const markdownCV = generateMarkdownCV();
  const linkedInMsg = generateLinkedInPitch(customRecipient || 'Responsable de Selección');
  const jsonProfile = JSON.stringify(CANDIDATE_PROFILE, null, 2);

  const contactOnly = `Nombre: ${CANDIDATE_PROFILE.name}
Rol: ${CANDIDATE_PROFILE.title}
Email: ${CANDIDATE_PROFILE.email}
Teléfono: ${CANDIDATE_PROFILE.phone}
Ubicación: ${CANDIDATE_PROFILE.location}
Disponibilidad: ${CANDIDATE_PROFILE.availability}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-opacity">
      <div 
        id="clipboard-drawer-panel"
        className="w-full max-w-2xl h-full bg-[#080808] border-l border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 bg-[#050505] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Copy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Portapapeles Rápido para Empleo & RRHH
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  1-Click Ready
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Formatos preconfigurados de Joel Molina Navarro listos para pegar en ATS, emails o informes.
              </p>
            </div>
          </div>
          <button
            id="btn-close-clipboard"
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Contact Bar */}
        <div className="p-4 bg-[#050505]/70 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${CANDIDATE_PROFILE.email}?subject=Oportunidad%20Laboral%20-%20Administrador%20de%20Sistemas`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Enviar Email a Joel</span>
            </a>
            <a
              href={`https://wa.me/34637663537?text=Hola%20Joel,%20hemos%20visto%20tu%20perfil%20de%20SysAdmin%20y%20nos%20gustar%C3%ADa%20hablar`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>

          <button
            id="btn-copy-raw-contact"
            onClick={() => handleCopy('contact_card', contactOnly, 'Datos de Contacto')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
          >
            {copiedKey === 'contact_card' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>Copiar Teléfono & Email</span>
          </button>
        </div>

        {/* Scrollable Clipboard Cards */}
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          {/* Card 1: Executive HR Summary */}
          <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-blue-500/10 text-blue-400 font-bold text-xs border border-blue-500/20">HR / ATS</span>
                <h3 className="text-sm font-semibold text-slate-200">Resumen Ejecutivo para Reclutador</h3>
              </div>
              <button
                id="btn-copy-hr-bio"
                onClick={() => handleCopy('hr_bio', hrBio, 'Ficha Resumen RRHH')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow transition-colors"
              >
                {copiedKey === 'hr_bio' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'hr_bio' ? '¡Copiado!' : 'Copiar Ficha'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-[#050505] border border-white/5 text-[11px] text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
              {hrBio}
            </pre>
          </div>

          {/* Card 2: Custom LinkedIn / Email Intro Pitch */}
          <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-purple-500/10 text-purple-400 font-bold text-xs border border-purple-500/20">PITCH</span>
                <h3 className="text-sm font-semibold text-slate-200">Mensaje de Presentación / LinkedIn</h3>
              </div>
              <button
                id="btn-copy-pitch"
                onClick={() => handleCopy('linkedin_pitch', linkedInMsg, 'Pitch de Presentación')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow transition-colors"
              >
                {copiedKey === 'linkedin_pitch' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'linkedin_pitch' ? '¡Copiado!' : 'Copiar Pitch'}</span>
              </button>
            </div>
            <div className="mb-2">
              <input
                type="text"
                value={customRecipient}
                onChange={(e) => setCustomRecipient(e.target.value)}
                placeholder="Nombre del reclutador o empresa (ej: Carlos de TechCorp)..."
                className="w-full px-3 py-1.5 rounded-lg bg-[#050505] border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <pre className="p-3 rounded-lg bg-[#050505] border border-white/5 text-[11px] text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
              {linkedInMsg}
            </pre>
          </div>

          {/* Card 3: Tech Stack in Markdown */}
          <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/20">MD</span>
                <h3 className="text-sm font-semibold text-slate-200">Stack Tecnológico Formateado</h3>
              </div>
              <button
                id="btn-copy-stack"
                onClick={() => handleCopy('tech_stack', techStack, 'Stack Tecnológico')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition-colors"
              >
                {copiedKey === 'tech_stack' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'tech_stack' ? '¡Copiado!' : 'Copiar Stack'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-[#050505] border border-white/5 text-[11px] text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
              {techStack}
            </pre>
          </div>

          {/* Card 4: Full CV in Markdown & Structured JSON */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#0d0d0d] border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  CV Completo (Markdown)
                </h4>
                <button
                  id="btn-copy-md-cv"
                  onClick={() => handleCopy('md_cv', markdownCV, 'CV Completo en Markdown')}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium border border-white/10"
                >
                  {copiedKey === 'md_cv' ? '¡Listo!' : 'Copiar'}
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Estructura limpia en texto plano con encabezados, fechas y detalles de DGT y certificaciones.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#0d0d0d] border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-amber-400" />
                  Perfil en JSON (ATS)
                </h4>
                <button
                  id="btn-copy-json"
                  onClick={() => handleCopy('json_cv', jsonProfile, 'JSON estructurado')}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium border border-white/10"
                >
                  {copiedKey === 'json_cv' ? '¡Listo!' : 'Copiar'}
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Objeto JSON listo para importar en bases de datos de talento o plataformas ATS.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#050505] flex items-center justify-between text-xs text-slate-400">
          <span>Joel Molina Navarro • Sabadell, Barcelona</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 font-medium border border-white/10"
          >
            Cerrar Portapapeles
          </button>
        </div>
      </div>
    </div>
  );
};
