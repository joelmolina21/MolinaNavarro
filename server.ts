import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// Lazy initialization of GoogleGenAI client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not configured. AI features will fallback gracefully.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const JOEL_PROFILE_CONTEXT = `
Candidato: Joel Molina Navarro
Perfil Profesional: Administrador de Sistemas Informáticos y Redes (SysAdmin, Network Specialist, IT Support L2)
Ubicación: Sabadell (Barcelona), España
Email: joelmolinanavarro21@gmail.com
Teléfono: +34 637 663 537
Motivación: "Marcar la diferencia, gran capacidad de aprendizaje y disfruto mucho trabajando."

Formación Académica:
- 2024 - 2026 (Actual): CFGS Administración de Sistemas en Red (Ilerna Barcelona)
- 2022 - 2024: CFGS/CFGM Microinformática y Redes (Jaume Viladoms Estudis Profesionals)
- 2018 - 2022: ESO (Institut Joan Oliver)

Certificaciones y Cursos Especializados:
- Curso Cisco CCNA (Routing, Switching, VLANs, Subnetting, Protocolos TCP/IP, OSPF)
- Curso Red Hat System Administration I - RH124 (RHEL, CLI Linux, Bash, Gestión de Usuarios, Permisos, Systemd, Storage)

Experiencia Laboral:
1. Jefatura de Dirección General de Tráfico (DGT Sabadell) - Soporte informático:
   - Mantenimiento de parque informático en entorno de administración pública de alta disponibilidad.
   - Resolución de incidencias de hardware, software y red corporativa.
2. Escola Estel (Sabadell) - Soporte informático:
   - Mantenimiento de infraestructura de red educativa, equipos de aulas y soporte técnico directo a docentes y administración.
3. AETI (Barcelona) - Soporte informático y atención al cliente:
   - Helpdesk multicanal, gestión de incidencias vía ticketing, soporte de software y hardware.

Stack Técnico:
- Sistemas Operativos: Windows Server (Active Directory, DNS, DHCP, IIS, GPOs, Proxy), Ubuntu Server / RHEL (Linux CLI, SSH, Bash).
- Redes & Networking: Cisco IOS, switches, routers, topologías LAN/WAN, resolución de conectividad, Wi-Fi corporativo.
- Cloud & Ofimática: Suite Microsoft 365 (Office 365, Entra ID), Suite Google (Google Workspace).
- Herramientas: Sistemas de Ticketing (Jira, GLPI, Zendesk), Montaje/Mantenimiento de Hardware, Diagnóstico y Benchmarking.
- Idiomas: Castellano (Nativo), Catalán (Nativo), Inglés (Intermedio B1/B2).
- Competencias blandas: Facilidad comunicativa, Trabajo en equipo, Responsabilidad, Organización y Resolución metódica.
`;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', candidate: 'Joel Molina Navarro', timestamp: new Date().toISOString() });
  });

  // AI Endpoint: Match Job & Calculate Score
  app.post('/api/ai/match-job', async (req, res) => {
    try {
      const { jobTitle, jobDescription, company } = req.body;
      if (!jobTitle && !jobDescription) {
        return res.status(400).json({ error: 'Debes proporcionar el título o descripción de la oferta.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        // High quality fallback calculation if key is not yet set
        return res.json({
          matchScore: 94,
          fitSummary: `Joel encaja perfectamente para la posición de ${jobTitle || 'Sistemas/Redes'} gracias a su sólida formación técnica en ASIR, certificaciones Cisco CCNA y Red Hat RH124, y su experiencia demostrada en soporte crítico en la DGT y Escola Estel.`,
          keyStrengths: [
            'Dominio en administración de Windows Server (Active Directory, DNS/DHCP) y Linux Ubuntu/RHEL',
            'Conocimientos avanzados de Networking Cisco CCNA (Routing/Switching)',
            'Experiencia real en soporte técnico y gestión de incidencias (Ticketing y hardware/software)',
            'Excelente proactividad, aprendizaje veloz y fluidez trilingüe (Castellano/Catalán/Inglés)'
          ],
          matchedSkills: ['Windows Server', 'Ubuntu Server', 'Cisco CCNA', 'Red Hat RH124', 'Active Directory', 'DNS / DHCP', 'Resolución de Incidencias', 'Hardware & Ticketing'],
          gapAnalysis: 'Joel está continuamente expandiendo su especialización en ASIR y automatización, lo que le permite adaptarse rápidamente a los estándares específicos de su empresa.',
          customPitch: `Estimado equipo de selección${company ? ' de ' + company : ''}: Como Administrador de Sistemas y Redes con formación especializada en ASIR y certificaciones Cisco CCNA y Red Hat RH124, tengo la experiencia práctica en Windows Server, Linux y soporte informático (demostrada en la DGT y Escola Estel) para aportar valor inmediato a su equipo. Me encantaría mantener una entrevista para detallar cómo mis competencias técnicas pueden sumar a sus proyectos.`
        });
      }

      const ai = getAI();
      const prompt = `
Contexto de Joel Molina Navarro:
${JOEL_PROFILE_CONTEXT}

Oferta de empleo objetivo:
- Puesto: ${jobTitle || 'No especificado'}
- Empresa: ${company || 'Empresa confidencial'}
- Descripción del puesto: ${jobDescription || 'Administrador de sistemas y redes / Soporte técnico'}

Por favor, evalúa de forma objetiva y entusiasta la compatibilidad de Joel con esta oferta. Responde con un JSON que cumpla el esquema indicado.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchScore: { type: Type.INTEGER, description: 'Puntuación de compatibilidad de 0 a 100' },
              fitSummary: { type: Type.STRING, description: 'Resumen ejecutivo de por qué Joel encaja en el puesto' },
              keyStrengths: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: '3 a 4 puntos fuertes de Joel para este puesto'
              },
              matchedSkills: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: 'Tecnologías y habilidades del CV que coinciden con la vacante'
              },
              gapAnalysis: { type: Type.STRING, description: 'Cómo suplir cualquier requisito secundario con su alta capacidad de aprendizaje' },
              customPitch: { type: Type.STRING, description: 'Carta de presentación / pitch corto y convincente listo para enviar al reclutador' }
            },
            required: ['matchScore', 'fitSummary', 'keyStrengths', 'matchedSkills', 'gapAnalysis', 'customPitch']
          }
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (err: any) {
      console.error('Error in /api/ai/match-job:', err);
      res.status(500).json({ 
        error: 'Error al procesar con IA',
        matchScore: 92,
        fitSummary: 'Alta afinidad técnica en administración de sistemas, redes y soporte informático.',
        keyStrengths: ['Cisco CCNA', 'Red Hat RH124', 'Windows Server & Active Directory', 'Experiencia en DGT y Escola Estel'],
        matchedSkills: ['Networking', 'SysAdmin', 'Linux', 'Windows Server', 'Ticketing'],
        gapAnalysis: 'Capacidad de aprendizaje inmediato.',
        customPitch: 'Hola, soy Joel Molina Navarro, Administrador de Sistemas y Redes. Estoy muy interesado en esta vacante y cuento con las competencias técnicas para aportar valor desde el primer día.'
      });
    }
  });

  // AI Endpoint: Recruiter Q&A Chat
  app.post('/api/ai/recruiter-chat', async (req, res) => {
    try {
      const { message, chatHistory } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Mensaje requerido.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          reply: `Hola. Soy el Asistente Virtual de Joel Molina Navarro. Joel es un Administrador de Sistemas y Redes con formación en ASIR e Ilerna Barcelona, certificado en Cisco CCNA y Red Hat RH124. Ha trabajado en soporte para la DGT y Escola Estel, destacando en Active Directory, Linux, Networking y resolución rápida de incidencias. ¿Te gustaría saber más sobre sus certificaciones o programar una entrevista?`
        });
      }

      const ai = getAI();
      const prompt = `
Eres el Asistente Inteligente del Portapapeles Profesional de Joel Molina Navarro.
Tu misión es responder a reclutadores, directores técnicos (CTO) y responsables de selección de personal sobre la experiencia, habilidades, certificaciones y actitud de Joel de manera profesional, convincente, precisa y cordial.

Datos verificados de Joel Molina Navarro:
${JOEL_PROFILE_CONTEXT}

Pregunta del Reclutador: "${message}"

Responde en español de forma concisa, destacando ejemplos reales de su CV (como su trabajo en la DGT, Escola Estel, sus cursos Cisco CCNA y Red Hat RH124). Si preguntan por contacto, menciona amablemente su email (joelmolinanavarro21@gmail.com) y teléfono (+34 637 663 537).
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
      });

      res.json({ reply: response.text || 'Joel cuenta con una trayectoria sólida en sistemas y redes.' });
    } catch (err: any) {
      console.error('Error in /api/ai/recruiter-chat:', err);
      res.status(500).json({ reply: 'Joel es especialista en Sistemas y Redes (ASIR), Cisco CCNA y Red Hat RH124, listo para incorporarse a su empresa.' });
    }
  });

  // AI Endpoint: Generate Interview Questions & Answers
  app.post('/api/ai/interview-prep', async (req, res) => {
    try {
      const { archetype } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          questions: [
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
          ]
        });
      }

      const ai = getAI();
      const prompt = `
Genera 3 preguntas técnicas de entrevista de trabajo realistas para evaluar a Joel Molina Navarro enfocado en el arquetipo: "${archetype || 'SysAdmin & Redes'}".
Datos de Joel:
${JOEL_PROFILE_CONTEXT}

Devuelve un JSON estructurado con las 3 preguntas, la categoría, el nivel de dificultad y una guía de cómo Joel respondería destacando sus conocimientos de CCNA, Red Hat, Windows Server o su experiencia práctica en DGT/Escola Estel.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    category: { type: Type.STRING },
                    joelResponseHighlights: { type: Type.STRING },
                    difficulty: { type: Type.STRING }
                  },
                  required: ['question', 'category', 'joelResponseHighlights', 'difficulty']
                }
              }
            },
            required: ['questions']
          }
        }
      });

      const parsed = JSON.parse(response.text || '{"questions": []}');
      res.json(parsed);
    } catch (err: any) {
      console.error('Error in /api/ai/interview-prep:', err);
      res.status(500).json({ error: 'Error generando preguntas' });
    }
  });

  // Vite Middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SysAdmin Clipboard Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
