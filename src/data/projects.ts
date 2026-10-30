export interface CaseSection {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
}

export interface Project {
  slug: string;
  number: string;
  name: string;
  category: string;
  summary: string;
  problem: string;
  status: string;
  technologies: string[];
  visual: 'data' | 'parking';
  image: { src: string; alt: string; width: number; height: number } | null;
  repository: string | null;
  demo: string | null;
  demoLabel?: string;
  sourceNotice?: string;
  evidence: string;
  architecture: { name: string; detail: string }[];
  sections: CaseSection[];
}

export const projects: Project[] = [
  {
    slug: 'analytio', number: '01', name: 'Analytio',
    category: 'Análisis de datos',
    summary: 'Entender un dataset antes de trabajar con él.',
    problem: 'Una herramienta para explorar la estructura, los tipos y la calidad de archivos tabulares desde distintas interfaces.',
    status: 'En desarrollo',
    technologies: ['Python', 'FastAPI', 'React', 'pandas', 'PySide6', 'Docker'],
    visual: 'data', image: null, repository: null, demo: null,
    sourceNotice: 'Código privado',
    evidence: 'Herramienta personal en desarrollo. El alcance actual se centra en CSV; Excel, Parquet y detección de información sensible no forman parte de las funciones disponibles.',
    architecture: [
      { name: 'Interfaces', detail: 'Web · CLI · Escritorio' },
      { name: 'API HTTP', detail: 'FastAPI · validación' },
      { name: 'Motor compartido', detail: 'Análisis · estadísticas' },
      { name: 'Datos tabulares', detail: 'CSV · pandas' },
    ],
    sections: [
      { id: 'problem', title: 'El problema', paragraphs: ['Antes de analizar datos, hay que saber qué contienen. Analytio reúne tipos, valores ausentes, estadísticas y frecuencias de un CSV para facilitar esa primera exploración.'] },
      { id: 'goals', title: 'Objetivos', items: ['Facilitar la inspección de datasets tabulares.', 'Compartir el motor de análisis entre varias interfaces.', 'Permitir revisar tipos, estadísticas y frecuencias sin modificar el CSV original.'] },
      { id: 'solution', title: 'Mi contribución', paragraphs: ['Desarrollo el motor de análisis en Python y sus interfaces web, de escritorio y CLI. La web utiliza React y una API FastAPI; la aplicación de escritorio utiliza PySide6.'] },
      { id: 'architecture', title: 'Arquitectura técnica', paragraphs: ['El frontend y la API son servicios independientes. Nginx sirve la aplicación React; FastAPI expone los endpoints de análisis. La URL de la API y los orígenes autorizados se configuran por separado.', 'Esta separación permite ejecutar las interfaces de manera independiente y mantener el análisis fuera de la capa visual.'] },
      { id: 'implemented', title: 'Qué permite hacer', items: ['Importar CSV con separador y codificación configurables.', 'Explorar columnas, tipos, valores ausentes y frecuencias.', 'Cambiar la interpretación de tipos y restaurar el modo automático.', 'Crear gráficos de barras, líneas y dispersión.', 'Exportar resultados JSON y gráficos.'] },
      { id: 'decisions', title: 'Decisiones técnicas', paragraphs: ['El procesamiento se comparte entre interfaces para evitar duplicar las reglas de análisis.', 'Una conversión fallida conserva el resultado anterior y no modifica el archivo original. Las pruebas también cubren cabeceras ambiguas, nulos y enteros grandes cuya precisión debe conservarse.'] },
      { id: 'media', title: 'Vista del proyecto', paragraphs: ['La composición técnica que acompaña este caso es ilustrativa. Las capturas reales y una demostración pública están pendientes de incorporar.'] },
      { id: 'next', title: 'Estado actual', paragraphs: ['En preparación de una beta privada para Windows. La aplicación web y el escritorio comparten el motor; sus recorridos y límites de uso son distintos. El código se mantiene privado.'] },
    ],
  },
  {
    slug: 'parkify', number: '03', name: 'Parkify',
    category: 'Movilidad y aplicaciones',
    summary: 'Explorar el aparcamiento desde los datos.',
    problem: 'Un proyecto de movilidad urbana que conecta una aplicación con predicciones de aparcamiento por tramos de calle.',
    status: 'En desarrollo',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Python', 'pandas', 'Parquet'],
    visual: 'parking', image: null, repository: null, demo: null,
    sourceNotice: 'Código privado',
    evidence: 'Aplicación en desarrollo y validación. Las estimaciones no garantizan plazas libres y no se presentan como mediciones de ocupación real.',
    architecture: [
      { name: 'Datos de entrada', detail: 'Datos urbanos · geografía' },
      { name: 'Pipeline', detail: 'parkify-predictions' },
      { name: 'Tramos de calle', detail: 'Assets JSON · GeoJSON' },
      { name: 'Aplicación', detail: 'Flutter · mapa' },
    ],
    sections: [
      { id: 'problem', title: 'El problema', paragraphs: ['Encontrar aparcamiento en la vía pública implica incertidumbre. Parkify explora cómo utilizar datos para ofrecer información sobre disponibilidad por tramos de calle.', 'El objetivo es abordar un problema real de movilidad sin confundir una predicción con una plaza libre garantizada.'] },
      { id: 'goals', title: 'Objetivos', items: ['Comparar estimaciones por tramos de calle.', 'Separar el procesamiento de datos de la interfaz móvil.', 'Gestionar una sesión de aparcamiento para recordar la posición del vehículo.'] },
      { id: 'solution', title: 'Mi contribución', paragraphs: ['Desarrollo la aplicación Flutter y el pipeline Python que prepara las capas geográficas. El procesamiento actual utiliza pandas y Parquet, separado del cliente móvil.'] },
      { id: 'architecture', title: 'Arquitectura técnica', paragraphs: ['La aplicación se encuentra separada de parkify-predictions. Los pipelines, los datos brutos y los scripts de modelos viven en ese proyecto adyacente.', 'La aplicación declara assets JSON de tramos de calle y datos GeoJSON. El README documenta servicios de búsqueda y rutas mediante Cloud Functions y protección con App Check.'] },
      { id: 'implemented', title: 'Qué permite hacer', items: ['Buscar un destino y consultar estimaciones en el mapa.', 'Filtrar y comparar tramos cercanos.', 'Consultar rutas y gestionar una sesión de aparcamiento.', 'Consumir capas geográficas preparadas por un pipeline independiente.'] },
      { id: 'decisions', title: 'Retos y decisiones', paragraphs: ['Una interfaz de movilidad necesita expresar la incertidumbre de los datos con claridad. El caso evita prometer disponibilidad en tiempo real o una precisión que no se haya medido.', 'La separación del pipeline permite evolucionar la generación de predicciones sin mezclarla con la presentación del mapa.', 'El README indica que la simulación de sensores virtuales está desactivada por defecto. No equivale a una red de sensores físicos desplegada.'] },
      { id: 'media', title: 'Vista del proyecto', paragraphs: ['El mapa monocromático es una composición conceptual de calles y tramos. No es una captura de la aplicación ni representa disponibilidad real.'] },
      { id: 'next', title: 'Estado actual', paragraphs: ['La validación de dispositivos, la automatización operativa y la evaluación de las estimaciones siguen en desarrollo. Las métricas de tráfico no equivalen a precisión sobre plazas libres.'] },
    ],
  },
];

projects.splice(1, 0, {
  slug: 'simple-calendar', number: '02', name: 'Simple Calendar',
  category: 'Aplicación de escritorio',
  summary: 'Organizar rutinas con horarios fijos y flexibles.',
  problem: 'Un calendario local para Windows que planifica actividades respetando la disponibilidad y los bloques protegidos.',
  status: 'Beta pública',
  technologies: ['Flutter', 'Dart', 'Riverpod', 'Drift', 'SQLite'],
  visual: 'data',
  image: { src: '/images/simple-calendar-week.png', alt: 'Vista semanal de Simple Calendar con actividades fijas y flexibles', width: 1266, height: 683 },
  repository: 'https://github.com/adribarrios05/simple-calendar',
  demo: 'https://github.com/adribarrios05/simple-calendar/releases/tag/v1.0.0-beta.1',
  demoLabel: 'Descargar beta',
  evidence: 'Aplicación para Windows con beta pública. Funciona localmente, sin cuentas ni sincronización en la nube.',
  architecture: [
    { name: 'Interfaz', detail: 'Flutter · vistas de calendario' },
    { name: 'Aplicación', detail: 'Casos de uso · Riverpod' },
    { name: 'Planificador', detail: 'Dart puro · reloj inyectable' },
    { name: 'Persistencia', detail: 'Drift · SQLite · copias JSON' },
  ],
  sections: [
    { id: 'problem', title: 'El problema', paragraphs: ['Las rutinas combinan actividades con horario fijo y otras que pueden adaptarse al tiempo disponible. Reorganizar el día debe respetar lo ya empezado, los bloqueos y el historial.'] },
    { id: 'solution', title: 'Mi contribución', paragraphs: ['Desarrollé la aplicación de escritorio, el modelo de actividades, el planificador y la persistencia local. Incluye vistas de calendario, recurrencias, etiquetas y copias de seguridad.'] },
    { id: 'architecture', title: 'Arquitectura', paragraphs: ['El dominio y el planificador son independientes de Flutter y SQLite. La capa de aplicación coordina las operaciones y el repositorio conserva definiciones, ocurrencias e historial.'] },
    { id: 'implemented', title: 'Qué permite hacer', items: ['Crear actividades fijas y flexibles con recurrencias.', 'Planificar dentro de la disponibilidad y mostrar conflictos.', 'Conservar progreso, excepciones y bloques protegidos.', 'Exportar e importar copias de seguridad.', 'Utilizar la interfaz en español o inglés.'] },
    { id: 'decisions', title: 'Decisiones y pruebas', paragraphs: ['El planificador utiliza una política determinista de primer hueco. Cuando una actividad no cabe, lo indica en lugar de mover silenciosamente un bloque protegido.', 'Las migraciones y la restauración se prueban con bases temporales, incluyendo fallos de escritura y recuperación sin perder el estado anterior.'] },
    { id: 'next', title: 'Estado actual', paragraphs: ['Beta pública para Windows. El repositorio incluye instalación, arquitectura, pruebas e instrucciones de actualización. La captura muestra la aplicación real.'] },
  ],
});

// Drafts stay out of public project cards until there is verifiable content.
export const projectDrafts = [
  { name: 'Backend & APIs', status: 'Pendiente de documentar', published: false },
  { name: 'Mobile applications', status: 'Pendiente de documentar', published: false },
  { name: 'Homelab & Infrastructure', status: 'Pendiente de documentar', published: false },
];
