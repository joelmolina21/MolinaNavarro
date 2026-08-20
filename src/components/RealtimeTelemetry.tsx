import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Server, 
  Wifi, 
  HardDrive, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  Radio, 
  RefreshCw, 
  Terminal, 
  Zap,
  ArrowRight,
  ShieldAlert,
  Layers
} from 'lucide-react';
import { INITIAL_NETWORK_NODES } from '../data/candidateData';
import { NetworkNode } from '../types';
import { sfx } from '../utils/audio';

interface RealtimeTelemetryProps {
  onShowToast: (msg: string) => void;
}

export const RealtimeTelemetry: React.FC<RealtimeTelemetryProps> = ({ onShowToast }) => {
  const [nodes, setNodes] = useState<NetworkNode[]>(INITIAL_NETWORK_NODES);
  const [selectedNode, setSelectedNode] = useState<NetworkNode>(INITIAL_NETWORK_NODES[0]);
  const [cpuUsage, setCpuUsage] = useState<number>(24);
  const [ramUsage, setRamUsage] = useState<number>(4.2);
  const [networkTraffic, setNetworkTraffic] = useState<number>(480);
  const [pingHistory, setPingHistory] = useState<string[]>([
    '64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=1.24 ms',
    '64 bytes from 192.168.30.10 (WinServer AD): icmp_seq=2 ttl=128 time=1.48 ms',
    '64 bytes from 192.168.30.20 (RHEL Linux): icmp_seq=3 ttl=64 time=1.12 ms'
  ]);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'topology' | 'telemetry'>('topology');

  // Real-time simulated telemetry oscillations
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage((prev) => {
        const delta = (Math.random() - 0.5) * 6;
        const next = Math.max(12, Math.min(48, prev + delta));
        return Math.round(next);
      });
      setRamUsage((prev) => {
        const delta = (Math.random() - 0.5) * 0.2;
        const next = Math.max(3.8, Math.min(6.2, prev + delta));
        return parseFloat(next.toFixed(1));
      });
      setNetworkTraffic((prev) => {
        const delta = (Math.random() - 0.5) * 40;
        const next = Math.max(320, Math.min(780, prev + delta));
        return Math.round(next);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handlePingNode = (node: NetworkNode) => {
    sfx.playPing();
    setSelectedNode(node);
    setIsPinging(true);

    const timestamp = new Date().toLocaleTimeString();
    const newLog = `[${timestamp}] PING ${node.ip} (${node.name}): 64 bytes, time=${(node.latencyMs + Math.random() * 0.4).toFixed(2)} ms (TTL=64, Status=ACTIVE)`;

    setTimeout(() => {
      setPingHistory((prev) => [newLog, ...prev.slice(0, 5)]);
      setIsPinging(false);
      onShowToast(`Ping exitoso a ${node.name} (${node.ip})`);
    }, 400);
  };

  return (
    <section id="section-telemetry" className="w-full">
      <div className="rounded-2xl bg-[#080808] border border-white/10 p-6 md:p-8 shadow-2xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                LIVE TELEMETRY & NOC
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                SISTEMAS OPERATIVOS 100%
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Monitor de Red & Servidores en Tiempo Real
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Demostración interactiva de topología corporativa, servicios Active Directory, RHEL y diagnóstico de latencia.
            </p>
          </div>

          {/* Switcher view */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0d0d0d] border border-white/10 self-start md:self-auto">
            <button
              onClick={() => {
                sfx.playClick();
                setActiveTab('topology');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'topology'
                  ? 'bg-white/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Topología de Red</span>
            </button>
            <button
              onClick={() => {
                sfx.playClick();
                setActiveTab('telemetry');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'telemetry'
                  ? 'bg-white/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Métricas de Servidores</span>
            </button>
          </div>
        </div>

        {/* Live Gauges Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          {/* Gauge 1: CPU Load */}
          <div className="p-3.5 rounded-xl bg-[#0d0d0d] border border-white/5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1 font-mono">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                Carga CPU Core
              </span>
              <span className="font-bold text-cyan-300 font-mono">{cpuUsage}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div 
                className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${cpuUsage}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-slate-500 mt-1 font-mono">RHEL / Windows Host</div>
          </div>

          {/* Gauge 2: RAM */}
          <div className="p-3.5 rounded-xl bg-[#0d0d0d] border border-white/5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1 font-mono">
                <HardDrive className="w-3.5 h-3.5 text-blue-400" />
                Memoria RAM
              </span>
              <span className="font-bold text-blue-300 font-mono">{ramUsage} GB / 16 GB</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${(ramUsage / 16) * 100}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-slate-500 mt-1 font-mono">26.3% Ocupación</div>
          </div>

          {/* Gauge 3: Network Throughput */}
          <div className="p-3.5 rounded-xl bg-[#0d0d0d] border border-white/5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1 font-mono">
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                Tráfico de Red
              </span>
              <span className="font-bold text-emerald-300 font-mono">{networkTraffic} Mbps</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div 
                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${(networkTraffic / 1000) * 100}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-slate-500 mt-1 font-mono">Packet Loss: 0.00%</div>
          </div>

          {/* Gauge 4: Uptime & SLA */}
          <div className="p-3.5 rounded-xl bg-[#0d0d0d] border border-white/5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                SLA Disponibilidad
              </span>
              <span className="font-bold text-amber-300 font-mono">99.98%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full w-[99.98%]"></div>
            </div>
            <div className="text-[10px] text-slate-500 mt-1 font-mono">142 días continuos</div>
          </div>
        </div>

        {/* Interactive Topology View */}
        {activeTab === 'topology' ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/10">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                  Topología de Infraestructura Interactiva (Haz clic en un nodo para diagnosticar)
                </span>
                <span className="text-slate-500 font-mono text-[11px]">5 Nodos Activos</span>
              </div>

              {/* Node Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {nodes.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => handlePingNode(node)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#141414] border-cyan-500/50 shadow-lg shadow-cyan-500/5 scale-[1.02]'
                          : 'bg-[#080808] border-white/5 hover:border-white/20 hover:bg-[#111111]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-lg ${
                          node.type === 'router' ? 'bg-cyan-500/10 text-cyan-400' :
                          node.type === 'switch' ? 'bg-blue-500/10 text-blue-400' :
                          node.type === 'server_win' ? 'bg-indigo-500/10 text-indigo-400' :
                          node.type === 'server_linux' ? 'bg-red-500/10 text-red-400' :
                          'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          <Server className="w-4 h-4" />
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          ONLINE
                        </span>
                      </div>

                      <div className="text-xs font-bold text-white truncate">{node.name}</div>
                      <div className="text-[11px] font-mono text-cyan-400 mt-0.5">{node.ip}</div>
                      <div className="text-[10px] text-slate-500 mt-2 font-mono flex items-center justify-between">
                        <span>RTT: {node.latencyMs}ms</span>
                        <span className="text-cyan-300 underline font-sans text-[10px]">Ping</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Node Inspector Details & Live Ping Terminal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Node Inspector */}
              <div className="lg:col-span-6 p-4 rounded-xl bg-[#0d0d0d] border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/20">
                      INSPECTOR
                    </span>
                    <h3 className="text-sm font-bold text-white">{selectedNode.name}</h3>
                  </div>
                  <button
                    onClick={() => handlePingNode(selectedNode)}
                    disabled={isPinging}
                    className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${isPinging ? 'animate-spin' : ''}`} />
                    <span>Lanzar Ping</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  {selectedNode.description}
                </p>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Servicios Activos:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.services.map((srv, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg bg-[#080808] border border-white/10 text-slate-300 text-[11px] font-mono">
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ping Terminal Output */}
              <div className="lg:col-span-6 p-4 rounded-xl bg-[#0d0d0d] border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    ICMP Diagnostics Stream
                  </span>
                  <span className="text-[10px] text-slate-500">Live Socket</span>
                </div>
                <div className="p-3 rounded-lg bg-[#050505] border border-white/5 text-[11px] font-mono text-emerald-400 space-y-1 min-h-[90px] overflow-y-auto">
                  {pingHistory.map((line, idx) => (
                    <div key={idx} className="leading-tight">
                      <span className="text-slate-600 mr-1">$</span>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Detailed Telemetry Stats View */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                Windows Server & Active Directory
              </h3>
              <ul className="text-xs space-y-2 text-slate-300">
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Servicio AD DS:</span>
                  <span className="text-emerald-400 font-mono">En ejecución (0 errores)</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">DNS Primario / Secundario:</span>
                  <span className="text-emerald-400 font-mono">100% Resolviendo</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Ámbito DHCP (Scope 10.0.0.0/24):</span>
                  <span className="text-cyan-400 font-mono">184 Asignadas / 70 Libres</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">Directivas GPO Corporativas:</span>
                  <span className="text-emerald-400 font-mono">12 Políticas Aplicadas</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-red-400" />
                Linux RHEL / Ubuntu Services (RH124)
              </h3>
              <ul className="text-xs space-y-2 text-slate-300">
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Demonio SSH (Port 22):</span>
                  <span className="text-emerald-400 font-mono">Active (Key-based)</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Firewalld / UFW:</span>
                  <span className="text-emerald-400 font-mono">Filtrado Estricto</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Storage LVM:</span>
                  <span className="text-cyan-400 font-mono">420GB / 1TB (Healthy)</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">Scripts Bash Programados:</span>
                  <span className="text-emerald-400 font-mono">Cron Activo (Backups 03:00)</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                Métricas de Soporte & Ticketing
              </h3>
              <ul className="text-xs space-y-2 text-slate-300">
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Tickets Resueltos (DGT & AETI):</span>
                  <span className="text-amber-400 font-bold font-mono">500+ Casos</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Tiempo Medio de Respuesta (MTTR):</span>
                  <span className="text-emerald-400 font-mono">&lt; 15 minutos</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Satisfacción Usuario (CSAT):</span>
                  <span className="text-emerald-400 font-mono">98.4% Positivo</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">Resolución Primer Contacto (FCR):</span>
                  <span className="text-cyan-400 font-mono">89% Sin escalado</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
