import React from 'react';
import { CANDIDATE_PROFILE } from '../data/candidateData';

export const PrintableView: React.FC = () => {
  return (
    <div className="print-only hidden font-sans text-slate-900 bg-white p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-4 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            {CANDIDATE_PROFILE.name}
          </h1>
          <p className="text-sm font-bold text-slate-700 mt-0.5">
            {CANDIDATE_PROFILE.title}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            📍 {CANDIDATE_PROFILE.location} • Disponibilidad Inmediata
          </p>
        </div>

        <div className="text-right text-xs text-slate-700 space-y-0.5 font-mono">
          <div>✉️ {CANDIDATE_PROFILE.email}</div>
          <div>📞 {CANDIDATE_PROFILE.phone}</div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
          Sobre Mí & Perfil Profesional
        </h2>
        <p className="text-xs text-slate-700 leading-relaxed">
          {CANDIDATE_PROFILE.summary}
        </p>
      </div>

      {/* Grid: Experience & Education */}
      <div className="grid grid-cols-12 gap-6 mb-4">
        {/* Left Column: Experience */}
        <div className="col-span-7 space-y-3">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
            Experiencia Laboral
          </h2>

          {CANDIDATE_PROFILE.experience.map((exp) => (
            <div key={exp.id} className="text-xs">
              <div className="flex justify-between items-baseline font-bold text-slate-900">
                <span>{exp.role}</span>
                <span className="text-[10px] text-slate-500 font-normal">{exp.location}</span>
              </div>
              <div className="text-[11px] font-semibold text-slate-700">{exp.company}</div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-normal">
                {exp.summary}
              </p>
            </div>
          ))}
        </div>

        {/* Right Column: Education & Certifications */}
        <div className="col-span-5 space-y-3">
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Formación Académica
            </h2>
            <div className="space-y-2 text-xs">
              {CANDIDATE_PROFILE.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-[11px] text-slate-600">{edu.institution} ({edu.period})</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Cursos y Certificaciones
            </h2>
            <div className="space-y-1.5 text-xs">
              {CANDIDATE_PROFILE.coursesAndCerts.map((cert) => (
                <div key={cert.id}>
                  <div className="font-bold text-slate-900">{cert.name}</div>
                  <div className="text-[10px] text-slate-600">{cert.issuer}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Idiomas
            </h2>
            <div className="text-xs text-slate-700 space-y-0.5">
              <div>• Castellano: Nativo</div>
              <div>• Catalán: Nativo</div>
              <div>• Inglés: Intermedio (B1/B2 Técnico)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Summary */}
      <div>
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
          Competencias Técnicas Clave
        </h2>
        <p className="text-xs text-slate-700 leading-normal">
          <strong>Sistemas:</strong> Windows Server (Active Directory, DNS, DHCP, IIS, GPO), Ubuntu Server, Red Hat Enterprise Linux (RH124).<br />
          <strong>Redes:</strong> Cisco CCNA (Routing & Switching, VLANs, Subnetting, OSPF, ACLs, NAT).<br />
          <strong>Herramientas:</strong> Ticketing (Jira, GLPI), Microsoft 365, Google Workspace, Montaje y Mantenimiento de Hardware.
        </p>
      </div>
    </div>
  );
};
