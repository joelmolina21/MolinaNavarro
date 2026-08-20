import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Sparkles, Check, RefreshCw } from 'lucide-react';
import { CANDIDATE_PROFILE } from '../data/candidateData';
import { sfx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

interface CommandLog {
  id: number;
  command: string;
  output: string | React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 1,
      command: 'sysadmin --init',
      output: (
        <div className="space-y-1 text-slate-300">
          <div className="text-cyan-400 font-bold">
            ⚡ Terminal SysAdmin v2.4.0 — Joel Molina Navarro [ASIR / CCNA / RH124]
          </div>
          <div className="text-slate-400 text-xs">
            Escribe <span className="text-emerald-400 font-bold">help</span> para ver todos los comandos disponibles o <span className="text-amber-400 font-bold">solve-incident</span> para jugar al simulador de incidencias.
          </div>
        </div>
      )
    }
  ]);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [incidentStep, setIncidentStep] = useState<number>(0);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    sfx.playTerminal();
    setInputVal('');

    const lower = cmd.toLowerCase();

    // Incident triage challenge state handling
    if (incidentStep > 0) {
      handleIncidentTriageStep(lower, cmd);
      return;
    }

    if (lower === 'clear' || lower === 'cls') {
      setLogs([]);
      return;
    }

    let output: string | React.ReactNode = '';

    if (lower === 'help') {
      output = (
        <div className="space-y-1 text-xs text-slate-300">
          <div className="text-cyan-300 font-bold mb-1">Comandos disponibles:</div>
          <div><span className="text-emerald-400 font-mono font-bold">cat cv</span> — Ver currículum estructurado completo</div>
          <div><span className="text-emerald-400 font-mono font-bold">skills</span> — Listar competencias técnicas clave</div>
          <div><span className="text-emerald-400 font-mono font-bold">systemctl status</span> — Ver estado de servicios de Joel (Uptime, AD, CCNA)</div>
          <div><span className="text-emerald-400 font-mono font-bold">ping [ip]</span> — Realizar prueba de conectividad de red</div>
          <div><span className="text-emerald-400 font-mono font-bold">solve-incident</span> — 🎮 Iniciar reto interactivo de diagnóstico IT</div>
          <div><span className="text-emerald-400 font-mono font-bold">contact</span> — Ver email, teléfono y ubicación</div>
          <div><span className="text-emerald-400 font-mono font-bold">hire</span> — ¡Contratar a Joel o solicitar entrevista!</div>
          <div><span className="text-emerald-400 font-mono font-bold">clear</span> — Limpiar pantalla</div>
        </div>
      );
    } else if (lower === 'cat cv' || lower === 'cv') {
      output = (
        <div className="text-xs text-slate-300 space-y-1">
          <div className="text-cyan-400 font-bold">JOEL MOLINA NAVARRO — SYSADMIN & REDES</div>
          <div>📍 Sabadell (Barcelona) | ✉️ {CANDIDATE_PROFILE.email} | 📞 {CANDIDATE_PROFILE.phone}</div>
          <div className="text-slate-400 mt-2 font-bold">🎓 Formación:</div>
          <div>• CFGS Administración de Sistemas en Red (Ilerna Barcelona, 2024-2026)</div>
          <div>• CFGS Microinformática y Redes (Jaume Viladoms, 2022-2024)</div>
          <div>• Certificaciones: Cisco CCNA & Red Hat RH124</div>
          <div className="text-slate-400 mt-2 font-bold">🏢 Experiencia:</div>
          <div>• DGT Sabadell (Soporte informático y red)</div>
          <div>• Escola Estel (Infraestructura educativa y aulas)</div>
          <div>• AETI Barcelona (Helpdesk y ticketing)</div>
        </div>
      );
    } else if (lower === 'skills') {
      output = (
        <div className="text-xs text-slate-300 space-y-1">
          <div className="text-cyan-400 font-bold">STACK TÉCNICO VERIFICADO:</div>
          <div>• <span className="text-emerald-400">Sistemas:</span> Windows Server (AD, DNS, DHCP, GPOs), Ubuntu Server, Red Hat RHEL RH124</div>
          <div>• <span className="text-cyan-400">Redes:</span> Cisco Routing & Switching CCNA, VLANs, Subnetting, Wireshark, TCP/IP</div>
          <div>• <span className="text-amber-400">Soporte:</span> Montaje y reparación de Hardware, Ticketing (Jira, GLPI), Helpdesk L2</div>
          <div>• <span className="text-purple-400">Cloud & Tools:</span> Suite Microsoft 365, Google Workspace, Bash Scripting</div>
        </div>
      );
    } else if (lower === 'systemctl status' || lower === 'status') {
      output = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <div className="text-emerald-400 font-bold">● joel-molina.service - Administrador de Sistemas y Redes</div>
          <div>Loaded: loaded (/etc/systemd/system/joel.service; enabled; vendor preset: enabled)</div>
          <div>Active: <span className="text-emerald-400 font-bold">active (running)</span> since Mon 2024-09-01 08:00:00 CEST</div>
          <div>Memory: 16.0G (Optimal Load)</div>
          <div>CGroup: /system.slice/joel-molina.service</div>
          <div>        ├─1024 /usr/bin/cisco-ccna-engine --routing=ospf</div>
          <div>        ├─1025 /usr/bin/redhat-rh124 --kernel=rhel9</div>
          <div>        └─1026 /usr/bin/activedirectory-controller --gpo=enforced</div>
          <div className="text-cyan-400 mt-1">Status: "Disponible para incorporación inmediata en Barcelona / Vallès."</div>
        </div>
      );
    } else if (lower.startsWith('ping')) {
      const target = cmd.split(' ')[1] || '192.168.1.1';
      output = (
        <div className="text-xs font-mono space-y-1 text-emerald-400">
          <div>PING {target} ({target}) 56(84) bytes of data.</div>
          <div>64 bytes from {target}: icmp_seq=1 ttl=64 time=1.18 ms</div>
          <div>64 bytes from {target}: icmp_seq=2 ttl=64 time=1.22 ms</div>
          <div>64 bytes from {target}: icmp_seq=3 ttl=64 time=1.05 ms</div>
          <div className="text-slate-300">--- {target} ping statistics ---</div>
          <div>3 packets transmitted, 3 received, 0% packet loss, time 2002ms</div>
        </div>
      );
    } else if (lower === 'solve-incident' || lower === 'incident') {
      setIncidentStep(1);
      output = (
        <div className="p-3 rounded-lg bg-slate-900 border border-amber-500/40 text-xs space-y-2">
          <div className="text-amber-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            🎮 RETO DE TRIAGE IT: Paso 1 de 3
          </div>
          <div className="text-slate-200">
            <strong>Incidencia Reportada:</strong> Los usuarios de la planta 2 no pueden acceder a la carpeta compartida corporativa <span className="text-cyan-400">\\servidor-ad\recursos</span>.
          </div>
          <div className="text-slate-400">
            ¿Cuál es el primer diagnóstico que debe realizar Joel?
          </div>
          <div className="space-y-1 font-mono text-cyan-300">
            <div>[A] <span className="text-white">nslookup servidor-ad</span> (Verificar resolución DNS del controlador)</div>
            <div>[B] Reiniciar todos los ordenadores de la planta</div>
            <div>[C] Desactivar el cortafuegos de toda la red</div>
          </div>
          <div className="text-[11px] text-slate-500">
            Escribe <span className="text-amber-300 font-bold">A</span>, <span className="text-amber-300 font-bold">B</span> o <span className="text-amber-300 font-bold">C</span>:
          </div>
        </div>
      );
    } else if (lower === 'hire' || lower === 'hire joel') {
      sfx.playLevelUp();
      try {
        confetti({ particleCount: 50, spread: 70 });
      } catch {}
      output = (
        <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-xs space-y-1 text-emerald-300">
          <div className="font-bold text-emerald-200 text-sm">🎉 ¡Excelente decisión de contratación!</div>
          <div>Joel Molina Navarro está listo para sumarse a tu equipo de IT.</div>
          <div>✉️ Email: <a href="mailto:joelmolinanavarro21@gmail.com" className="underline font-bold text-white">joelmolinanavarro21@gmail.com</a></div>
          <div>📞 Teléfono: <a href="tel:+34637663537" className="underline font-bold text-white">+34 637 663 537</a></div>
        </div>
      );
    } else if (lower === 'contact' || lower === 'email' || lower === 'tel') {
      output = (
        <div className="text-xs text-slate-300 space-y-1 font-mono">
          <div>👤 Nombre: {CANDIDATE_PROFILE.name}</div>
          <div>✉️ Email: {CANDIDATE_PROFILE.email}</div>
          <div>📞 Teléfono: {CANDIDATE_PROFILE.phone}</div>
          <div>📍 Ubicación: Sabadell, Barcelona</div>
          <div>🟢 Disponibilidad: Inmediata</div>
        </div>
      );
    } else {
      output = (
        <div className="text-xs text-red-400 font-mono">
          Comando no reconocido: "{cmd}". Escribe <span className="text-cyan-400 underline">help</span> para ver la lista de comandos.
        </div>
      );
    }

    setLogs((prev) => [...prev, { id: Date.now(), command: cmd, output }]);
  };

  const handleIncidentTriageStep = (lower: string, originalCmd: string) => {
    let nextStep = incidentStep;
    let output: React.ReactNode = '';

    if (incidentStep === 1) {
      if (lower === 'a' || lower.includes('nslookup')) {
        sfx.playSuccess();
        nextStep = 2;
        output = (
          <div className="p-3 rounded-lg bg-slate-900 border border-cyan-500/40 text-xs space-y-2">
            <div className="text-emerald-400 font-bold">✅ ¡Correcto! Paso 1 superado (+150 XP).</div>
            <div className="text-slate-300 font-mono text-[11px]">
              $ nslookup servidor-ad<br />
              Server: 192.168.1.1 (DNS local)<br />
              ** server can't find servidor-ad: NXDOMAIN
            </div>
            <div className="text-slate-200 mt-2">
              <strong>Diagnóstico:</strong> El registro DNS de la zona interna ha sido modificado.
            </div>
            <div className="text-slate-300">
              <strong>Paso 2:</strong> ¿Qué comando ejecutas en los clientes Windows tras corregir la IP en el servidor DNS?
            </div>
            <div className="font-mono text-cyan-300">
              <div>[A] ipconfig /flushdns</div>
              <div>[B] format c:</div>
              <div>[C] ping localhost</div>
            </div>
            <div className="text-[11px] text-slate-500">
              Escribe <span className="text-cyan-300 font-bold">A</span>, <span className="text-cyan-300 font-bold">B</span> o <span className="text-cyan-300 font-bold">C</span>:
            </div>
          </div>
        );
      } else {
        output = <div className="text-xs text-red-400">❌ Respuesta incorrecta. Vuelve a intentarlo eligiendo A, B o C.</div>;
      }
    } else if (incidentStep === 2) {
      if (lower === 'a' || lower.includes('flushdns')) {
        sfx.playLevelUp();
        nextStep = 0;
        try {
          confetti({ particleCount: 40, spread: 60 });
        } catch {}
        output = (
          <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-xs space-y-2 text-emerald-300">
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              🏆 ¡INCIDENCIA RESUELTA CON ÉXITO! (+500 XP)
            </div>
            <div className="text-slate-300">
              Has vaciado la caché DNS con éxito y los usuarios vuelven a acceder a las carpetas de red sin interrupción de su jornada laboral.
            </div>
            <div className="text-cyan-300 font-mono text-[11px]">
              ¡Demostrada la metodología de resolución rápida de Joel Molina Navarro!
            </div>
          </div>
        );
      } else {
        output = <div className="text-xs text-red-400">❌ La opción correcta es [A] ipconfig /flushdns. Inténtalo de nuevo.</div>;
      }
    }

    setIncidentStep(nextStep);
    setLogs((prev) => [...prev, { id: Date.now(), command: originalCmd, output }]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        id="terminal-window"
        className={`w-full ${isMaximized ? 'h-full max-w-none' : 'max-w-3xl h-[520px]'} bg-[#050505] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200`}
      >
        {/* Terminal Title Bar */}
        <div className="px-4 py-3 bg-[#080808] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <div className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5 ml-2">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>joel@sysadmin-node: ~</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3 bg-[#050505]">
          {logs.map((log) => (
            <div key={log.id} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="text-emerald-400">joel@sysadmin:~$</span>
                <span className="text-white font-semibold">{log.command}</span>
              </div>
              <div className="pl-4">{log.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <form onSubmit={handleCommand} className="p-3 bg-[#080808] border-t border-white/10 flex items-center gap-2 font-mono text-xs">
          <span className="text-emerald-400 shrink-0">joel@sysadmin:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Escribe un comando (ej: help, cat cv, solve-incident, hire)..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600"
          />
          <button
            type="submit"
            className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] transition-colors"
          >
            Ejecutar
          </button>
        </form>
      </div>
    </div>
  );
};
