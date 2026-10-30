# Contenido y datos pendientes

## Estado vigente — 29 de octubre de 2026

- Esta aplicación Astro es la plantilla del nuevo portfolio. El enlace del CV lleva a un portfolio antiguo distinto; no se ha sustituido ni publicado esta versión.
- Proyectos visibles: Analytio, Simple Calendar y Parkify. Simple Calendar utiliza una captura real de `Simple Calendar/docs/screenshots/week-en.png`, copiada a `public/images/`.
- Experiencia: Rueda Representaciones (desarrollo y mantenimiento por encargo, marzo de 2026–actualidad) y Cosmic Futures (prácticas marzo–junio de 2025 y trabajo remunerado junio–agosto de 2025), en orden cronológico inverso. Fechas confirmadas por el usuario.
- Conference-or-interpol, ESP32-logger y CHIP-8 no forman parte de la presentación profesional. No se preparan para publicar.
- Analytio se presenta como herramienta CSV con código privado. Excel/Parquet y detección sensible no se anuncian como capacidades disponibles.
- El bloque Erasmus con datos pendientes se ha retirado de la interfaz; la experiencia internacional confirmada aparece en Cosmic Futures.
- El PDF `public/cv.pdf` sigue siendo el original anterior. Su actualización se hará desde el contenido aprobado de `../../CAREER_PROFILE_CONTENT.md` (en la raíz del espacio de proyectos).

Los apartados siguientes conservan las fuentes históricas de la plantilla. Las decisiones anteriores sustituyen cualquier dato pendiente o selección incompatible.

## Fuentes consultadas

- Encargo del usuario: nombre, perfil, formación DAM, especialización en IA y Big Data, Erasmus en Portugal y objetivos de los proyectos.
- Respuesta del usuario: correo, GitHub y LinkedIn.
- CV facilitado por el usuario, consultado el 12 de octubre de 2026: experiencia en Cosmic Futures (Barreiro, marzo–agosto de 2025), DAM en CPIFP Alan Turing (Málaga, 2023–2025) y especialización en Digitech FP (Málaga, 2025–2026, finalizada). El PDF original se incorpora sin modificaciones en `public/cv.pdf`.
- `data-inspector/README.md` y `pyproject.toml`, consultados localmente el 12 de octubre de 2026: interfaces, capacidades documentadas y dependencias.
- `Parkify/parkify/README.md` y `pubspec.yaml`, consultados localmente el 12 de octubre de 2026: aplicación Flutter, separación del pipeline, assets geográficos y dependencias.

La documentación acredita lo descrito por el proyecto; no prueba su funcionamiento en esta sesión. No se han ejecutado las aplicaciones ni evaluado las predicciones de Parkify. Las páginas de detalle explicitan ese límite.

## Pendientes centralizados

| Información | Archivo | Comportamiento |
| --- | --- | --- |
| Empresas, puestos, fechas y responsabilidades | `src/data/profile.ts`, `experience` | Completados a partir del CV. Un empleo documentado. |
| Instituciones y fechas de formación | `src/data/profile.ts`, `education` | Completadas a partir del CV. |
| Institución y fechas Erasmus | `src/data/profile.ts`, `erasmus` | `null`, se muestran etiquetas pendientes. |
| CV | `src/data/profile.ts`, `profile.cv` | `/cv.pdf`, descarga disponible. |
| Repositorios públicos y demos | `src/data/projects.ts` | `null`, no se crean enlaces rotos. |
| Capturas reales | `src/data/projects.ts`, `image` | `null`, composición conceptual etiquetada. |
| Otros proyectos / homelab | `projectDrafts` | Borradores sin publicación, hasta documentar contenido real. |

No se publican logros, métricas, experiencia laboral ni fechas inventadas. Las integraciones futuras de sensores y la detección de datos sensibles se mantienen como trabajo por documentar, fuera de la lista de capacidades activas.

El CV no identifica la estancia Erasmus por separado. Se conserva la referencia a Portugal aportada en el encargo, pero no se equipara automáticamente con el empleo en Cosmic Futures ni se le asignan sus fechas.

## Sistema visual

Negro `#080808`, superficie `#111111`, texto `#f2f2f2`, texto secundario `#a2a2a2` y bordes `#292929`. Inter variable alojada localmente; etiquetas en fuente monoespaciada del sistema. Contenedor de 1200 px y espaciado adaptable. Tarjetas alternadas y composiciones SVG/CSS monocromáticas.

Revelado de 650 ms al entrar en viewport; movimiento de 22 px. Stagger de hasta 140 ms para tecnologías. Hover de 200–300 ms. Sin scroll hijacking ni parallax continuo. `prefers-reduced-motion` elimina animaciones y scroll suave. Las transiciones entre documentos utilizan la API nativa View Transitions, con navegación normal como fallback.
