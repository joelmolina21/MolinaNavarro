export interface CandidateProfile {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  summary: string;
  languages: { language: string; level: string; percent: number }[];
  education: EducationItem[];
  coursesAndCerts: CertificationItem[];
  experience: ExperienceItem[];
  functions: string[];
  skills: SkillCategory[];
  softSkills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  status: 'Completado' | 'En curso' | 'Actual';
  description: string;
  keyLearnings: string[];
  badgeColor?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  code?: string;
  status: 'Completado' | 'En curso' | 'Destacado';
  description: string;
  skillsGained: string[];
  iconName: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  responsibilities: string[];
  incidentCaseStudy: {
    title: string;
    scenario: string;
    actionTaken: string;
    result: string;
    technologies: string[];
  };
  badge: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  items: {
    name: string;
    level: number; // 0 - 100
    experienceYears: string;
    description: string;
    highlight?: boolean;
  }[];
}

export type ArchetypeId = 'sysadmin_guardian' | 'network_vanguard' | 'incident_slayer' | 'devops_explorer';

export interface Archetype {
  id: ArchetypeId;
  name: string;
  rpgTitle: string;
  level: number;
  xp: number;
  maxXP: number;
  icon: string;
  color: string;
  badge: string;
  description: string;
  primaryStats: {
    defenseServer: number; // Fiabilidad & AD
    networkSpeed: number;  // CCNA & Routing
    triagePower: number;   // Soporte & Hardware
    learningAgility: number;// Adaptación & Cursos
  };
  signatureAbility: string;
  recommendedRoleMatches: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'Certs' | 'Experience' | 'Systems' | 'Gamification';
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  unlockedDate?: string;
}

export interface NetworkNode {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'server_win' | 'server_linux' | 'client';
  ip: string;
  status: 'online' | 'busy' | 'alert' | 'offline';
  services: string[];
  latencyMs: number;
  trafficKbps: number;
  description: string;
}

export interface JobMatchResult {
  matchScore: number;
  fitSummary: string;
  keyStrengths: string[];
  matchedSkills: string[];
  gapAnalysis: string;
  customPitch: string;
}

export interface InterviewQuestion {
  question: string;
  category: string;
  joelResponseHighlights: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
}
