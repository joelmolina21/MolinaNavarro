import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  HelpCircle, 
  CheckCircle2, 
  Briefcase, 
  Terminal, 
  RefreshCw, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { CANDIDATE_PROFILE, ARCHETYPES } from '../data/candidateData';
import { InterviewQuestion, ArchetypeId } from '../types';
import { sfx } from '../utils/audio';

interface RecruiterAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentArchetype: ArchetypeId;
  onShowToast: (msg: string) => void;
}

export const RecruiterAssistantModal: React.FC<RecruiterAssistantModalProps> = ({
  isOpen,
  onClose,
  currentArchetype,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'interview'>('chat');
  const [chatInput, setChatInput] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: `¡Hola! Soy el Asistente Virtual del Portapapeles de Joel Molina Navarro. Puedo responder a cualquier duda sobre sus conocimientos en Windows Server, Linux Red Hat, Cisco CCNA, su trabajo en la DGT o Escola Estel, o su disponibilidad. ¿Qué te gustaría saber?`
    }
  ]);

  const [questions, setQuestions] = useState<InterviewQuestion[]>([
    {
      question: '¿Cómo diagnosticarías y resolverías un fallo en la asignación de direcciones IP en una subred corporativa?',
      category: 'Redes (Cisco CCNA & DHCP)',
      joelResponseHighlights: 'Joel comprobaría el estado del servicio DHCP en Windows/Linux Server, revisaría el ámbito (pool de IPs libres), verificaría la conectividad física y VLAN en el switch Cisco, y validaría con `ipconfig /release` y `/renew` en los clientes.',
      difficulty: 'Intermedio'
    },
    {
      question: '¿Qué procedimiento sigues para crear un nuevo usuario con permisos específicos en Active Directory y asignarle políticas GPO?',
      category: 'Windows Server & SysAdmin',
      joelResponseHighlights: 'Joel accede a Usuarios y Equipos de Active Directory (ADUC), ubica la Unidad Organizativa (OU) correcta, define directivas de contraseñas, grupos de seguridad pertinentes y vincula las GPOs requeridas.',
      difficulty: 'Intermedio'
    },
    {
      question: 'En un entorno RHEL/Ubuntu, ¿cómo gestionarías un servicio web caído y revisarías sus logs de error?',
      category: 'Linux (Red Hat RH124)',
      joelResponseHighlights: 'Utilizaría `systemctl status <servicio>`, `journalctl -xeu <servicio>`, revisaría permisos en `/var/log/` y verificaría la configuración de firewall con `firewalld` o `ufw`.',
      difficulty: 'Avanzado'
    }
  ]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = chatInput.trim();
    if (!query || isSending) return;

    sfx.playClick();
    setChatInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setIsSending(true);

    try {
      const res = await fetch('/api/ai/recruiter-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'ai', text: data.reply || 'Joel cuenta con excelentes habilidades técnicas.' }]);
      sfx.playSuccess();
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Joel Molina Navarro cuenta con formación especializada en ASIR y certificaciones Cisco CCNA y Red Hat RH124. Ha demostrado gran solvencia resolviendo incidencias en la DGT y Escola Estel, y está disponible de inmediato en Sabadell / Barcelona.`
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleGenerateQuestions = async () => {
    sfx.playClick();
    setIsLoadingQuestions(true);
    try {
      const res = await fetch('/api/ai/interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archetype: ARCHETYPES[currentArchetype].name })
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        onShowToast('¡Nuevas preguntas técnicas generadas!');
        sfx.playSuccess();
      }
    } catch (err) {
      onShowToast('Preguntas generadas por el banco técnico.');
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        id="recruiter-assistant-modal"
        className="w-full max-w-3xl h-[600px] bg-[#080808] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[#050505] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Asistente Virtual para Reclutadores
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Gemini 3.7 Flash
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Consulta dudas técnicas sobre Joel o simula preguntas de entrevista.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-3 pb-2 bg-[#050505]/70 border-b border-white/10 flex gap-2">
          <button
            onClick={() => {
              sfx.playClick();
              setActiveTab('chat');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'chat'
                ? 'bg-white/15 text-white border border-white/20 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat con Asistente de Joel</span>
          </button>

          <button
            onClick={() => {
              sfx.playClick();
              setActiveTab('interview');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'interview'
                ? 'bg-white/15 text-white border border-white/20 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Simulador de Preguntas Técnicas</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'chat' ? (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]/40">
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-br-none'
                        : 'bg-[#0d0d0d] border border-white/5 text-slate-200 rounded-bl-none shadow'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-[#050505] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Pregunta algo (ej: ¿Tiene experiencia con Active Directory? ¿Cuál es su nivel de inglés?)..."
                className="flex-1 px-3 py-2 rounded-lg bg-[#0d0d0d] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                disabled={isSending}
                className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#050505]/40">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs text-slate-400 font-mono">
                Preguntas generadas para: <strong className="text-white">{ARCHETYPES[currentArchetype].name}</strong>
              </span>
              <button
                onClick={handleGenerateQuestions}
                disabled={isLoadingQuestions}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
              >
                <RefreshCw className={`w-3 h-3 ${isLoadingQuestions ? 'animate-spin' : ''}`} />
                <span>Generar Otras Preguntas</span>
              </button>
            </div>

            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#0d0d0d] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-mono text-[10px] font-bold border border-purple-500/20">
                      {q.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Dificultad: {q.difficulty}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white">
                    {idx + 1}. {q.question}
                  </h4>

                  <div className="p-2.5 rounded-lg bg-[#050505] border border-white/5 text-[11px] text-slate-300">
                    <span className="font-bold text-cyan-400 block mb-1">
                      💡 Cómo respondería Joel con su experiencia real:
                    </span>
                    <p className="leading-relaxed">{q.joelResponseHighlights}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
