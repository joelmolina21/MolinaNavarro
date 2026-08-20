import { CandidateProfile, Archetype, Achievement, NetworkNode } from '../types';

export const CANDIDATE_PROFILE: CandidateProfile = {
  name: 'Joel Molina Navarro',
  title: 'Administrador de Sistemas Informáticos y Redes',
  subtitle: 'SysAdmin | Network Specialist | IT Support & Infrastructure',
  location: 'Sabadell, Barcelona, España (C/ de la llanera 28)',
  email: 'joelmolinanavarro21@gmail.com',
  phone: '+34 637 663 537',
  availability: 'Incorporación Inmediata / Jornada Completa',
  summary:
    'Administrador de Sistemas y Redes apasionado por la tecnología, la infraestructura de alta disponibilidad y la resolución metódica de problemas. Con formación técnica especializada en ASIR y SMR, complementada con certificaciones de primer nivel como Cisco CCNA y Red Hat System Administration I (RH124). Experiencia práctica demostrada en soporte de sistemas críticos en la Dirección General de Tráfico (DGT), entornos educativos (Escola Estel) y servicios técnicos corporativos (AETI). Gran capacidad de aprendizaje continuo y orientación a la excelencia operativa.',
  languages: [
    { language: 'Castellano', level: 'Nativo (C2)', percent: 100 },
    { language: 'Catalán', level: 'Nativo (C2)', percent: 100 },
    { language: 'Inglés', level: 'Intermedio (B1 / B2 Técnico)', percent: 75 },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'CFGS Administración de Sistemas Informáticos en Red (ASIR)',
      institution: 'Ilerna Barcelona',
      period: '2024 - Junio 2026',
      status: 'Completado',
      description:
        'Titulado superior especializado en administración de sistemas operativos cliente-servidor (Windows Server & Linux), despliegue de servicios en red (DNS, DHCP, Web, Correo, LDAP/AD), seguridad perimetral, almacenamiento e implantación de bases de datos.',
      keyLearnings: [
        'Administración avanzada de Windows Server 2022 y Linux Ubuntu/Debian/RHEL',
        'Configuración y seguridad de servicios web (IIS, Apache, Nginx) y proxies',
        'Gestión de dominios Active Directory, GPOs corporativas y control de accesos',
        'Virtualización, monitorización de infraestructura y backups automatizados'
      ],
      badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
    },
    {
      id: 'edu-2',
      degree: 'CFGS/CFGM Sistemas Microinformáticos y Redes (SMR)',
      institution: 'Jaume Viladoms Estudis Profesionals',
      period: '2022 - 2024',
      status: 'Completado',
      description:
        'Ciclo formativo enfocado en montaje, mantenimiento preventivo y correctivo de hardware, configuración de redes locales (cableado estructurado, switches, routers), instalación de SO y soporte técnico de primer y segundo nivel a usuarios.',
      keyLearnings: [
        'Diagnóstico profundo de averías de hardware y ensamblaje de estaciones de trabajo',
        'Instalación y configuración de redes de área local (LAN) y topologías Wi-Fi',
        'Protocolos de seguridad básica, antivirus corporativos y copias de seguridad',
        'Atención técnica a usuarios y estandarización de software ofimático'
      ],
      badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
    },
    {
      id: 'edu-3',
      degree: 'Educación Secundaria Obligatoria (ESO)',
      institution: 'Institut Joan Oliver',
      period: '2018 - 2022',
      status: 'Completado',
      description: 'Formación académica base con orientación científico-tecnológica y trabajo colaborativo.',
      keyLearnings: ['Bases matemáticas y lógica algorítmica', 'Competencias lingüísticas y trabajo en equipo'],
      badgeColor: 'border-slate-700 text-slate-400 bg-slate-800/50'
    }
  ],
  coursesAndCerts: [
    {
      id: 'cert-1',
      name: 'Curso Cisco CCNA (Cisco Certified Network Associate)',
      issuer: 'Cisco Networking Academy',
      code: 'CCNA 200-301',
      status: 'Destacado',
      description:
        'Dominio exhaustivo de fundamentos de redes, direccionamiento IPv4/IPv6, subredes, VLANs, Trunking 802.1Q, protocolos de enrutamiento (OSPF, RIP, Estático), listas de control de acceso (ACLs), NAT/PAT y conmutación en switches y routers Cisco.',
      skillsGained: [
        'Configuración de Routers & Switches Cisco mediante CLI',
        'Diseño y segmentación de redes mediante VLANs y Subnetting',
        'Protocolos de Enrutamiento Dinámico & Estático',
        'Resolución y diagnóstico de problemas de conectividad con Wireshark y Packet Tracer'
      ],
      iconName: 'Network'
    },
    {
      id: 'cert-2',
      name: 'Curso Red Hat System Administration I (RH124)',
      issuer: 'Red Hat Enterprise Linux',
      code: 'RH124 - RHEL',
      status: 'Destacado',
      description:
        'Capacitación técnica en administración de sistemas empresariales Red Hat Enterprise Linux. Gestión de procesos, permisos de archivos POSIX, control de servicios con Systemd, almacenamiento LVM, bash scripting y gestión de paquetes RPM/DNF.',
      skillsGained: [
        'Línea de comandos avanzada de Linux y Bash Scripting',
        'Gestión de usuarios, grupos y políticas de permisos seguros',
        'Administración de servicios y demonios con Systemd y logs con Journalctl',
        'Configuración de red básica y cortafuegos en Linux (Firewalld)'
      ],
      iconName: 'Terminal'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Técnico de Soporte Informático & Sistemas',
      company: 'Jefatura de Dirección General De Tráfico (DGT Sabadell)',
      location: 'Sabadell, Barcelona',
      period: 'Experiencia Profesional',
      type: 'Administración Pública / Infraestructura Crítica',
      summary:
        'Responsable del soporte microinformático, mantenimiento de parque de equipos de trabajo y garantía de operatividad continua en los servicios de atención al ciudadano de la DGT.',
      responsibilities: [
        'Resolución de incidencias técnicas en tiempo real de hardware, periféricos especializados y software institucional.',
        'Mantenimiento correctivo de estaciones de trabajo, impresoras de red y lectores criptográficos.',
        'Gestión de conectividad a la red corporativa segura, validación de certificados y credenciales de usuario.',
        'Colaboración en la puesta a punto y despliegue de nuevas estaciones de examen y trámites telemáticos.'
      ],
      incidentCaseStudy: {
        title: 'Mantenimiento y Resolución de Puntos Críticos en DGT',
        scenario: 'Caída de comunicación en terminales de atención directa durante picos de afluencia.',
        actionTaken: 'Aislamiento de la incidencia en switch de planta, reconfiguración de asignación DHCP y renovación de sockets de red en puestos afectados.',
        result: 'Servicio 100% restablecido en menos de 15 minutos sin interrumpir las citas de los usuarios.',
        technologies: ['Windows 10/11 Pro', 'DHCP/DNS Corporativo', 'Switches Cisco', 'Hardware DGT']
      },
      badge: 'DGT Sabadell'
    },
    {
      id: 'exp-2',
      role: 'Técnico de Soporte Informático y Redes Educativas',
      company: 'Escola Estel',
      location: 'Sabadell, Barcelona',
      period: 'Experiencia Profesional',
      type: 'Sector Educativo / Infraestructura TI',
      summary:
        'Administración de equipos del centro educativo, soporte directo a claustro docente y alumnos, gestión de aulas informáticas y optimización de la red Wi-Fi y cableada.',
      responsibilities: [
        'Mantenimiento y clonación masiva de sistemas operativos en aulas de informática mediante imágenes.',
        'Soporte técnico directo al profesorado con suites educativas (Google Workspace, Office 365, pizarras interactivas).',
        'Resolución de incidencias de conectividad Wi-Fi, switches de acceso y cableado estructurado en las aulas.',
        'Gestión de inventario informático y sustitución proactiva de componentes de hardware averiados.'
      ],
      incidentCaseStudy: {
        title: 'Optimización de Aulas Informáticas y Pizarras Digitales',
        scenario: 'Lentitud recurrente y cortes de red durante clases con 30 puestos simultáneos.',
        actionTaken: 'Revisión de cableado Cat6, configuración de priorización QoS en el switch y limpieza de software residente en las estaciones.',
        result: 'Mejora del 80% en velocidad de carga y cero interrupciones en las sesiones lectivas.',
        technologies: ['Google Workspace', 'Clonación de SO', 'Cableado estructurado', 'Wi-Fi APs']
      },
      badge: 'Escola Estel'
    },
    {
      id: 'exp-3',
      role: 'Técnico de Soporte Informático & Atención al Cliente',
      company: 'AETI',
      location: 'Barcelona',
      period: 'Experiencia Profesional',
      type: 'Servicios TI & Helpdesk',
      summary:
        'Soporte técnico multicanal (telefónico, remoto y presencial) para clientes corporativos, gestión rigurosa de tickets bajo SLAs y resolución de averías informáticas.',
      responsibilities: [
        'Gestión integral del ciclo de vida del ticket: recepción, diagnóstico, resolución y cierre con satisfacción del cliente.',
        'Asistencia remota mediante herramientas de control seguro a usuarios con incidencias de software y correo.',
        'Montaje, testeo y benchmarking de equipos informáticos a medida en taller técnico.',
        'Asesoramiento tecnológico a clientes sobre mejoras de hardware y software para aumentar su productividad.'
      ],
      incidentCaseStudy: {
        title: 'Gestión de Incidencias de Alto Volumen con SLA 99%',
        scenario: 'Pico de tickets de configuración de correo y permisos tras migración ofimática.',
        actionTaken: 'Creación de guías de resolución rápida, atención coordinada y resolución en primera llamada (First Contact Resolution).',
        result: 'Tasa de satisfacción del cliente superior al 98% con tiempos de respuesta reducidos.',
        technologies: ['Sistemas de Ticketing', 'Asistencia Remota', 'Office 365', 'Montaje PC']
      },
      badge: 'AETI Barcelona'
    }
  ],
  functions: [
    'Resolución integral de incidencias (Hardware, Software, Redes e Impresión)',
    'Montaje, diagnóstico, sustitución y mantenimiento preventivo de Hardware',
    'Administración de servidores Windows Server (Active Directory, DNS, DHCP, IIS, GPOs)',
    'Administración de servidores Linux (Ubuntu Server, Red Hat RHEL, SSH, Bash)',
    'Configuración y troubleshooting de redes (Cisco CCNA, VLANs, Routers, Switches)',
    'Administración de Suite Microsoft 365 (Entra ID, Office 365) y Suite Google Workspace',
    'Gestión de plataformas de Ticketing (Jira, GLPI, Zendesk) y cumplimiento de SLAs',
    'Asesoramiento informático y formación de soporte a usuarios'
  ],
  skills: [
    {
      category: 'Sistemas Operativos & Servidores',
      icon: 'Server',
      items: [
        { name: 'Windows Server', level: 90, experienceYears: '2+ años', description: 'Active Directory, DNS, DHCP, IIS, Directivas GPO y permisos NTFS', highlight: true },
        { name: 'Ubuntu Server / Debian', level: 88, experienceYears: '2+ años', description: 'Gestión CLI, servicios systemd, SSH, Apache/Nginx, cron jobs', highlight: true },
        { name: 'Red Hat Enterprise Linux (RHEL)', level: 85, experienceYears: 'Cert RH124', description: 'Permisos POSIX, LVM, firewalld, package management con DNF/RPM', highlight: true },
        { name: 'Windows 10/11 Pro (Client)', level: 98, experienceYears: '4+ años', description: 'Configuración avanzada, registro, directivas locales, optimización y clonación' }
      ]
    },
    {
      category: 'Redes & Conectividad',
      icon: 'Network',
      items: [
        { name: 'Cisco Routing & Switching (CCNA)', level: 90, experienceYears: 'Cert CCNA', description: 'VLANs, Trunking 802.1Q, enrutamiento OSPF/Estático, ACLs, NAT/PAT', highlight: true },
        { name: 'Protocolos de Red (TCP/IP, DNS, DHCP)', level: 95, experienceYears: '3+ años', description: 'Subnetting IPv4/IPv6, diagnóstico con Wireshark, ping, traceroute, nslookup' },
        { name: 'Seguridad de Red & Proxies', level: 82, experienceYears: '2+ años', description: 'Filtrado de tráfico, cortafuegos perimetrales, proxies web e inspección básica' },
        { name: 'Cableado Estructurado & Wi-Fi', level: 92, experienceYears: '3+ años', description: 'Crimpadora RJ45, patch panels, puntos de acceso corporativos y racks' }
      ]
    },
    {
      category: 'Hardware, Soporte & Ticketing',
      icon: 'Cpu',
      items: [
        { name: 'Montaje & Diagnóstico de Hardware', level: 96, experienceYears: '4+ años', description: 'Ensamblaje integral de PCs/servidores, detección de averías placa/RAM/fuente', highlight: true },
        { name: 'Sistemas de Ticketing (GLPI, Jira, Zendesk)', level: 92, experienceYears: '3+ años', description: 'Gestión por prioridades, categorización precisa, escalado y SLAs', highlight: true },
        { name: 'Soporte y Asistencia Remota', level: 95, experienceYears: '3+ años', description: 'AnyDesk, TeamViewer, RDP, empatía técnica y comunicación con usuarios' },
        { name: 'Mantenimiento de Periféricos & Impresoras', level: 90, experienceYears: '3+ años', description: 'Impresoras de red, escáneres, servidores de impresión y consumibles' }
      ]
    },
    {
      category: 'Cloud, Ofimática & Automatización',
      icon: 'Cloud',
      items: [
        { name: 'Suite Microsoft 365', level: 90, experienceYears: '3+ años', description: 'Administración de usuarios, buzones Exchange, OneDrive y Sharepoint' },
        { name: 'Suite Google Workspace', level: 92, experienceYears: '3+ años', description: 'Gestión de cuentas, Classroom, Drive corporativo y políticas de seguridad' },
        { name: 'Bash Scripting', level: 80, experienceYears: '1.5 años', description: 'Automatización de tareas rutinarias, copias de seguridad y monitorización' },
        { name: 'Virtualización (VirtualBox, VMware)', level: 88, experienceYears: '2+ años', description: 'Despliegue de entornos de prueba, instantáneas (snapshots) y redes virtuales' }
      ]
    }
  ],
  softSkills: [
    'Facilidad comunicativa y trato excelente con el usuario',
    'Trabajo en equipo y coordinación ágil',
    'Responsabilidad y compromiso firme con los proyectos',
    'Capacidad de aprendizaje e investigación autónoma',
    'Organización metódica y resolución rápida bajo presión'
  ]
};

export const ARCHETYPES: Record<string, Archetype> = {
  sysadmin_guardian: {
    id: 'sysadmin_guardian',
    name: 'SysAdmin Guardian',
    rpgTitle: 'Guardián de Servidores & Active Directory',
    level: 42,
    xp: 8450,
    maxXP: 10000,
    icon: 'ShieldCheck',
    color: 'from-blue-600 to-cyan-500',
    badge: 'Servidores & RHEL / AD',
    description: 'Especialista en estabilidad de sistemas, políticas de seguridad en Active Directory, administración de Windows Server y Linux Red Hat RH124.',
    primaryStats: {
      defenseServer: 95,
      networkSpeed: 88,
      triagePower: 92,
      learningAgility: 96,
    },
    signatureAbility: 'Escudo de Disponibilidad: 99.98% Uptime en servicios DNS, DHCP y controladores de dominio.',
    recommendedRoleMatches: [
      'Administrador de Sistemas Windows / Linux',
      'SysAdmin Junior / Middle',
      'Administrador de Active Directory & Directorio Activo',
      'Técnico de Infraestructura y Servidores'
    ]
  },
  network_vanguard: {
    id: 'network_vanguard',
    name: 'Network Vanguard',
    rpgTitle: 'Comandante de Redes & Cisco CCNA',
    level: 40,
    xp: 7800,
    maxXP: 10000,
    icon: 'Network',
    color: 'from-cyan-500 to-emerald-500',
    badge: 'Cisco CCNA & Routing',
    description: 'Dominio de enrutamiento, conmutación en switches Cisco, segmentación VLAN, subnetting y diagnóstico de tráfico en capas 2 y 3 del modelo OSI.',
    primaryStats: {
      defenseServer: 86,
      networkSpeed: 98,
      triagePower: 90,
      learningAgility: 94,
    },
    signatureAbility: 'Canalización Óptima: Detección y resolución instantánea de cuellos de botella y fallos de subred.',
    recommendedRoleMatches: [
      'Técnico de Redes & Conectividad',
      'Operador NOC (Network Operations Center)',
      'Especialista Cisco Routing & Switching',
      'Técnico de Redes y Comunicaciones'
    ]
  },
  incident_slayer: {
    id: 'incident_slayer',
    name: 'Incident Slayer',
    rpgTitle: 'Héroe de Soporte Técnico & SLA',
    level: 45,
    xp: 9200,
    maxXP: 10000,
    icon: 'Wrench',
    color: 'from-amber-500 to-orange-500',
    badge: 'Helpdesk L2 & Hardware',
    description: 'Experto en resolución ultra rápida de tickets, diagnóstico de averías físicas en hardware y asistencia técnica de máxima calidad a usuarios.',
    primaryStats: {
      defenseServer: 90,
      networkSpeed: 87,
      triagePower: 99,
      learningAgility: 98,
    },
    signatureAbility: 'Resolución Relámpago: Triage y solución de incidencias críticas en menos de 15 minutos en DGT y AETI.',
    recommendedRoleMatches: [
      'Técnico de Soporte Informático L2',
      'Técnico Microinformático de Campo / Presencial',
      'Helpdesk & Atención Técnica a Clientes',
      'Especialista en Mantenimiento de Hardware'
    ]
  },
  devops_explorer: {
    id: 'devops_explorer',
    name: 'Infrastructure Explorer',
    rpgTitle: 'Explorador de Cloud & Automatización',
    level: 38,
    xp: 7100,
    maxXP: 10000,
    icon: 'Terminal',
    color: 'from-purple-500 to-indigo-500',
    badge: 'Linux Scripting & Cloud 365',
    description: 'Enfocado en la automatización de tareas con Bash, gestión de identidades en Microsoft 365 / Google Workspace y entornos de virtualización.',
    primaryStats: {
      defenseServer: 91,
      networkSpeed: 89,
      triagePower: 88,
      learningAgility: 99,
    },
    signatureAbility: 'Scripting Automatizado: Despliegues y mantenimientos programados sin intervención manual.',
    recommendedRoleMatches: [
      'Junior DevOps / Cloud Operator',
      'Administrador de Google Workspace & M365',
      'Técnico de Virtualización y Backups',
      'Junior Linux Systems Specialist'
    ]
  }
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Certificado Cisco CCNA',
    description: 'Completada formación en enrutamiento, conmutación y topologías de red complejas.',
    category: 'Certs',
    icon: 'Award',
    unlocked: true,
    progress: 100,
    maxProgress: 100,
    unlockedDate: 'Certificado Activo'
  },
  {
    id: 'ach-2',
    title: 'Red Hat RH124 Mastery',
    description: 'Dominio de la línea de comandos, servicios Systemd y almacenamiento en Linux RHEL.',
    category: 'Certs',
    icon: 'Terminal',
    unlocked: true,
    progress: 100,
    maxProgress: 100,
    unlockedDate: 'Certificado Activo'
  },
  {
    id: 'ach-3',
    title: 'Misión Crítica DGT',
    description: 'Mantenimiento de infraestructura de soporte para la Dirección General de Tráfico.',
    category: 'Experience',
    icon: 'Shield',
    unlocked: true,
    progress: 100,
    maxProgress: 100,
    unlockedDate: 'Experiencia Verificada'
  },
  {
    id: 'ach-4',
    title: 'Especialista en Aulas Escola Estel',
    description: 'Despliegue y optimización de redes e infraestructura tecnológica educativa.',
    category: 'Experience',
    icon: 'School',
    unlocked: true,
    progress: 100,
    maxProgress: 100,
    unlockedDate: 'Experiencia Verificada'
  },
  {
    id: 'ach-5',
    title: 'Resolutor de 500+ Incidencias',
    description: 'Resolución de tickets de hardware, software y redes en AETI y DGT.',
    category: 'Systems',
    icon: 'CheckCircle2',
    unlocked: true,
    progress: 500,
    maxProgress: 500,
    unlockedDate: 'Logro Desbloqueado'
  },
  {
    id: 'ach-6',
    title: 'Trilingüe Técnico',
    description: 'Fluidez nativa en Castellano y Catalán, con Inglés técnico para documentación y redes.',
    category: 'Gamification',
    icon: 'Languages',
    unlocked: true,
    progress: 3,
    maxProgress: 3,
    unlockedDate: 'C2 / C2 / B2'
  },
  {
    id: 'ach-7',
    title: 'Zero Downtime Keeper',
    description: 'Historial de mantenimiento preventivo y respuesta rápida ante incidencias críticas.',
    category: 'Systems',
    icon: 'Activity',
    unlocked: true,
    progress: 99,
    maxProgress: 100,
    unlockedDate: '99.98% Fiabilidad'
  }
];

export const INITIAL_NETWORK_NODES: NetworkNode[] = [
  {
    id: 'node-router',
    name: 'Cisco Core Router (R1)',
    type: 'router',
    ip: '192.168.1.1',
    status: 'online',
    services: ['OSPF', 'NAT/PAT', 'ACLs', 'Gateway'],
    latencyMs: 1.2,
    trafficKbps: 4500,
    description: 'Router de cabecera con configuración Cisco IOS, rutas dinámicas y firewall perimetral.'
  },
  {
    id: 'node-switch',
    name: 'Cisco Catalyst Switch (SW-Core)',
    type: 'switch',
    ip: '192.168.1.2',
    status: 'online',
    services: ['VLAN 10 (Admin)', 'VLAN 20 (Users)', 'VLAN 30 (Servers)', 'Trunk 802.1Q'],
    latencyMs: 0.8,
    trafficKbps: 8200,
    description: 'Switch troncal gestionado con segmentación de tráfico por departamento y spanning tree.'
  },
  {
    id: 'node-win-server',
    name: 'WinServer2022 (DC01)',
    type: 'server_win',
    ip: '192.168.30.10',
    status: 'online',
    services: ['Active Directory DS', 'DNS Server', 'DHCP Scope', 'GPO Engine', 'IIS Web'],
    latencyMs: 1.5,
    trafficKbps: 2400,
    description: 'Controlador de Dominio principal con replicación de usuarios, directivas de seguridad y DNS interno.'
  },
  {
    id: 'node-linux-server',
    name: 'RHEL / Ubuntu Server (SRV-LNX)',
    type: 'server_linux',
    ip: '192.168.30.20',
    status: 'online',
    services: ['SSH Daemon', 'Proxy Squid', 'Systemd Services', 'Firewalld', 'Bash Automations'],
    latencyMs: 1.4,
    trafficKbps: 3100,
    description: 'Servidor Linux empresarial configurado bajo estándares Red Hat RH124 para servicios web y proxy seguro.'
  },
  {
    id: 'node-workstation',
    name: 'Workstation Puesto DGT / Estel',
    type: 'client',
    ip: '192.168.20.105',
    status: 'online',
    services: ['Win 11 Pro', 'M365 Suite', 'Ticketing Client', 'Antivirus EDR'],
    latencyMs: 2.1,
    trafficKbps: 1200,
    description: 'Puesto de trabajo estandarizado para atención a usuarios con soporte de nivel 2.'
  }
];
