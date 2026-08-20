import { CANDIDATE_PROFILE } from '../data/candidateData';

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => fallbackCopy(text));
  }
  return Promise.resolve(fallbackCopy(text));
}

function fallbackCopy(text: string): boolean {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback copy failed', err);
    return false;
  }
}

export function generateHRBioSnippet(): string {
  return `👤 CANDIDATO: Joel Molina Navarro
💼 ROL: Administrador de Sistemas Informáticos y Redes (SysAdmin / Redes / Soporte L2)
📍 UBICACIÓN: Sabadell, Barcelona (Disponibilidad inmediata)
📧 CONTACTO: ${CANDIDATE_PROFILE.email} | 📞 ${CANDIDATE_PROFILE.phone}

🎓 FORMACIÓN:
• CFGS Administración de Sistemas en Red (Ilerna Barcelona, 2024 - Junio 2026 - Graduado)
• CFGS/CFGM Microinformática y Redes (Jaume Viladoms, 2022 - 2024)
• Certificaciones: Cisco CCNA + Red Hat RH124

🏢 EXPERIENCIA DESTACADA:
• Jefatura DGT Sabadell (Soporte informático a puestos y red en administración pública)
• Escola Estel Sabadell (Mantenimiento de infraestructura educativa y salas de ordenadores)
• AETI Barcelona (Soporte multicanal y resolución de tickets bajo SLA)

🛠️ TECNOLOGÍAS CLAVE:
Windows Server (Active Directory, DNS/DHCP, IIS, GPO), Linux (Ubuntu/RHEL, Bash), Cisco Routing/Switching, M365, Google Workspace, Montaje y Mantenimiento de Hardware.`;
}

export function generateTechStackMarkdown(): string {
  return `### 🛠️ Stack Tecnológico de Joel Molina Navarro

**Sistemas Operativos & Servidores:**
- Windows Server (Active Directory, DNS, DHCP, IIS, GPOs, Proxy)
- Linux Ubuntu Server / Red Hat Enterprise Linux (RHEL RH124, Bash CLI, Systemd, SSH)
- Windows 10/11 Pro (Gestión avanzada, imágenes, clonación, troubleshooting)

**Redes & Conectividad (Cisco CCNA):**
- Routing & Switching Cisco (VLANs, 802.1Q, OSPF, ACLs, NAT/PAT)
- Protocolos de red (TCP/IP, IPv4/IPv6, Subnetting, Wireshark, DNS/DHCP)
- Cableado estructurado Cat6, Patch Panels y Wi-Fi corporativo

**Soporte, Hardware & Productividad:**
- Montaje, testeo y sustitución de hardware
- Gestión de incidencias vía Ticketing (Jira, GLPI, Zendesk)
- Suite Microsoft 365 (Entra ID / Office 365) & Google Workspace
- Asistencia remota segura y atención a usuarios`;
}

export function generateMarkdownCV(): string {
  return `# Joel Molina Navarro
**Administrador de Sistemas Informáticos y Redes**
- 📍 Sabadell (Barcelona), España
- ✉️ ${CANDIDATE_PROFILE.email}
- 📞 ${CANDIDATE_PROFILE.phone}

---

## 🎯 Perfil Profesional
${CANDIDATE_PROFILE.summary}

---

## 🎓 Formación Académica
- **CFGS Administración de Sistemas en Red** | Ilerna Barcelona (2024 - Junio 2026 - Graduado)
- **CFGS Microinformática y Redes** | Jaume Viladoms Estudis Profesionals (2022 - 2024)
- **Educación Secundaria Obligatoria** | Institut Joan Oliver (2018 - 2022)

---

## 📜 Cursos y Certificaciones
- **Curso Cisco CCNA** (Routing, Switching, VLANs, Subredes, Protocolos de red)
- **Curso Red Hat System Administration I (RH124)** (RHEL, CLI Linux, Bash, Systemd)

---

## 💼 Experiencia Laboral
1. **Jefatura de Dirección General de Tráfico (DGT Sabadell)** - Soporte Informático
   - Mantenimiento preventivo y correctivo de puestos de trabajo y red corporativa.
   - Resolución de incidencias críticas en tiempo real para trámites ciudadanos.

2. **Escola Estel (Sabadell)** - Soporte Informático
   - Gestión de red educativa, aulas informáticas y soporte a docentes con Google Workspace/M365.

3. **AETI (Barcelona)** - Soporte Informático y Atención al Cliente
   - Helpdesk técnico multicanal, gestión de tickets y montaje de hardware a medida.

---

## 🌐 Idiomas
- Castellano: Nativo (C2)
- Catalán: Nativo (C2)
- Inglés: Intermedio (B1/B2 Técnico)
`;
}

export function generateLinkedInPitch(recruiterName: string = 'Estimado/a responsable de selección'): string {
  return `Hola ${recruiterName},

Espero que te encuentres muy bien. Te escribo tras revisar las oportunidades en tu equipo de TI/Sistemas.

Soy Joel Molina Navarro, Administrador de Sistemas y Redes con formación en ASIR y certificaciones Cisco CCNA y Red Hat RH124. Cuento con experiencia práctica demostrada en soporte técnico de infraestructura crítica en la DGT y entornos corporativos/educativos (Active Directory, Windows Server, Linux, Networking y ticketing).

Estoy disponible para incorporación inmediata en la provincia de Barcelona / Vallès Occidental (o modalidad híbrida/remota). ¿Podríamos coordinar una breve llamada para comentar cómo puedo sumar a vuestros objetivos técnicos?

¡Muchas gracias por tu tiempo!
Joel Molina Navarro
✉️ ${CANDIDATE_PROFILE.email} | 📞 ${CANDIDATE_PROFILE.phone}`;
}
