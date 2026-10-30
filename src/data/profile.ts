export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  kind: 'Trabajo profesional' | 'Prácticas' | 'Prácticas y trabajo remunerado' | 'Desarrollo por encargo';
  stages?: string[];
  responsibilities: string[];
  technologies: string[];
}

export interface Education {
  title: string;
  kind: string;
  institution: string | null;
  period: string | null;
  description: string;
}

export const profile = {
  name: 'Adrián Barrios',
  role: 'Desarrollador de software junior',
  focus: 'Aplicaciones web · Multiplataforma · APIs',
  introduction: 'Soy Adrián Barrios, desarrollador de software junior de Málaga. Construyo aplicaciones con Python, TypeScript y Flutter, con experiencia internacional en desarrollo web y en proyectos por encargo.',
  email: 'adribarrios3205@gmail.com',
  github: 'https://github.com/adribarrios05',
  linkedin: 'https://www.linkedin.com/in/adribarrios05',
  cv: '/cv.pdf' as string | null,
  about: [
    'Soy Técnico Superior en Desarrollo de Aplicaciones Multiplataforma y he completado el Curso de Especialización en Inteligencia Artificial y Big Data.',
    'En Cosmic Futures fui el único desarrollador de una plataforma B2B con Angular y Firebase. Desde marzo de 2026 desarrollo y mantengo por encargo la aplicación de Rueda Representaciones.',
    'Busco una oportunidad junior en Málaga, presencial o híbrida, o en remoto desde España. También valoro oportunidades en otras ciudades.',
  ],
};

// Add only verified professional roles. An empty list renders an honest pending state.
export const experience: Experience[] = [
  {
    company: 'Rueda Representaciones',
    role: 'Desarrollador de software',
    period: 'Marzo 2026 – actualidad',
    kind: 'Desarrollo por encargo',
    responsibilities: [
      'Desarrollo y mantenimiento de una aplicación comercial con Flutter y Firebase para gestionar catálogos, variantes de producto, tarifas, cesta y pedidos.',
      'Implementación de administración de usuarios, permisos, operaciones transaccionales y automatización de correos con Cloud Functions y Resend.',
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'Cloud Firestore', 'Cloud Functions', 'Resend'],
  },
  {
    company: 'Cosmic Futures',
    role: 'Desarrollador Web / Full-Stack',
    period: 'Marzo 2025 – agosto 2025',
    location: 'Barreiro, Portugal',
    kind: 'Prácticas y trabajo remunerado',
    stages: ['Prácticas: marzo–junio de 2025.', 'Trabajo remunerado: junio–agosto de 2025.'],
    responsibilities: [
      'Único desarrollador de una plataforma B2B para conectar profesionales, empresas y proveedores del sector aeroespacial.',
      'Implementación con Angular, TypeScript y Firebase de perfiles profesionales, ofertas de empleo, servicios, foro y flujos entre usuarios y empresas.',
      'Integración de SendGrid, diseño de interfaces con Figma y despliegue con Firebase Hosting.',
    ],
    technologies: ['Angular', 'TypeScript', 'Firebase', 'SendGrid', 'Figma', 'Git', 'GitHub'],
  },
];
export const experiencePending = {
  title: 'Una trayectoria por documentar.',
  description: 'Los datos de experiencia profesional están pendientes de completar. Mientras tanto, los proyectos personales muestran mi forma de abordar problemas y desarrollar software.',
  fields: ['Empresa y puesto', 'Fechas', 'Responsabilidades y contribuciones'],
};

export const education: Education[] = [
  {
    title: 'Desarrollo de Aplicaciones Multiplataforma',
    kind: 'Grado Superior · DAM',
    institution: 'CPIFP Alan Turing · Málaga',
    period: '2023 – 2025',
    description: 'Formación en desarrollo de aplicaciones y fundamentos de software.',
  },
  {
    title: 'Inteligencia Artificial y Big Data',
    kind: 'Curso de especialización',
    institution: 'Digitech FP · Málaga',
    period: '2025 – 2026',
    description: 'Especialización orientada al trabajo con datos e inteligencia artificial. Finalizada.',
  },
];

// Select technologies used in the inspected applications and declared work.
export const technologies = [
  { category: 'Lenguajes', items: ['Python', 'TypeScript', 'JavaScript', 'Dart', 'SQL'], context: 'Experiencia y proyectos personales' },
  { category: 'Backend y APIs', items: ['FastAPI', 'Firebase', 'Cloud Functions'], context: 'Analytio · Cosmic Futures · Rueda' },
  { category: 'Web y aplicaciones', items: ['Angular', 'React', 'Flutter', 'PySide6'], context: 'Experiencia · Analytio · Simple Calendar · Parkify' },
  { category: 'Procesamiento de datos', items: ['pandas', 'Parquet'], context: 'Analytio · Pipeline de Parkify' },
  { category: 'Persistencia', items: ['SQLite', 'Drift', 'Cloud Firestore'], context: 'Simple Calendar · Aplicaciones con Firebase' },
  { category: 'Herramientas y pruebas', items: ['Git', 'Docker', 'pytest', 'Playwright'], context: 'Desarrollo, pruebas y distribución' },
];

export const navigation = [
  { id: 'about', label: 'Sobre mí' },
  { id: 'experience', label: 'Experiencia' },
  { id: 'education', label: 'Formación' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'contact', label: 'Contacto' },
];
