# Adrián Barrios — Portfolio

Portfolio personal con Astro, TypeScript y Tailwind CSS. Diseño editorial oscuro, navegación responsive y casos de estudio de ingeniería. Sitio estático: sin backend, formularios ni peticiones a APIs externas para mostrar el contenido.

## Ejecutar

Node.js 22.22.3 o superior recomendado para las herramientas de lint actuales. Astro requiere Node 22.12 o superior. En Windows usa `npm.cmd` si PowerShell bloquea `npm.ps1`.

```powershell
npm.cmd ci
npm.cmd run dev
```

Abre `http://127.0.0.1:4321`. Si Astro necesita escribir su configuración fuera de tu entorno permitido, desactiva la telemetría para la sesión:

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
```

## Estructura

```text
src/
  components/            Navegación, tarjetas, timeline y elementos compartidos
  data/profile.ts        Datos personales, experiencia, formación y tecnologías
  data/projects.ts       Proyectos y secciones de sus casos de estudio
  layouts/BaseLayout.astro
  pages/index.astro
  pages/projects/[slug].astro
  scripts/interactions.ts
  styles/global.css
public/                  Favicon, Open Graph, capturas y CV
tests/                   Navegación, responsive, SEO y accesibilidad
docs/CONTENT.md          Fuentes, alcance verificado y datos pendientes
```

## Datos personales, enlaces y CV

Edita `profile` en `src/data/profile.ts`. Cambia nombre, descripción, correo y enlaces en un solo lugar. Para añadir el CV, coloca el archivo en `public/cv.pdf` y asigna `cv: '/cv.pdf'`. Mientras `cv` sea `null`, no aparece un enlace de descarga.

Los enlaces externos abren una pestaña nueva y están identificados para lectores de pantalla. El botón de contacto utiliza `mailto:`; no envía correos automáticamente.

## Añadir experiencias

Añade datos reales al array `experience` de `src/data/profile.ts`:

```typescript
{
  company: 'Nombre real de la empresa',
  role: 'Puesto real',
  period: 'Fechas verificadas',
  kind: 'Trabajo profesional', // o 'Prácticas'
  responsibilities: ['Responsabilidad o contribución real'],
  technologies: ['Tecnología utilizada'],
}
```

La lista vacía muestra un estado pendiente. `stages` permite distinguir prácticas y trabajo remunerado dentro de una misma experiencia. Rueda se presenta como desarrollo por encargo; sus fechas siguen pendientes de confirmar. Los proyectos personales permanecen en su sección propia.

## Actualizar estudios

En `education`, cambia `institution` y `period`, completados a partir del CV. Puedes añadir elementos con el mismo tipo `Education`. La experiencia internacional se describe en Cosmic Futures. Actualiza `technologies` con herramientas que puedas acreditar; el campo `context` explica en qué proyecto las utilizas.

## Añadir proyectos

Añade un objeto al array `projects` de `src/data/projects.ts`. Cada entrada genera una tarjeta y su página `/projects/<slug>/` automáticamente. Utiliza un slug único con letras minúsculas y guiones. El tipo `Project` valida los campos obligatorios.

Define resumen, problema, estado, tecnologías, arquitectura y secciones del caso. Usa IDs de sección únicos dentro de cada proyecto. `repository` y `demo` aceptan URLs verificadas o `null`; no se muestran enlaces inexistentes. `evidence` explica qué se ha comprobado. Conserva la distinción entre funciones documentadas, comprobadas y previstas.

`projectDrafts` guarda ideas pendientes de contenido; no genera tarjetas públicas.

## Sustituir capturas

Coloca capturas optimizadas en `public/images/`, preferentemente WebP o AVIF. Cambia `image: null` por:

```typescript
image: {
  src: '/images/analytio.webp',
  alt: 'Vista real del análisis de columnas de Analytio',
  width: 1440,
  height: 900,
},
```

Las dimensiones reservan espacio y las tarjetas cargan las imágenes de manera diferida. Sin captura, se muestra una composición técnica identificada como ilustrativa, no como screenshot del producto.

## Diseño y animaciones

Los tokens y breakpoints están en `src/styles/global.css`. La fuente Inter se sirve localmente. `src/scripts/interactions.ts` gestiona menú, sección activa y revelados con IntersectionObserver. Sin JavaScript, el menú móvil permanece visible y el contenido es navegable. Movimiento reducido elimina efectos y scroll suave. Las transiciones nativas entre páginas tienen fallback a navegación normal.

## Validación

```powershell
npm.cmd run check
npm.cmd run lint
npm.cmd run build
npm.cmd test
```

Las pruebas usan Playwright con Microsoft Edge instalado, en escritorio y móvil. En otros sistemas instala Chromium y selecciona el canal correspondiente:

```powershell
npx.cmd playwright install chromium
$env:PLAYWRIGHT_CHANNEL = 'chromium'
npm.cmd test
```

Cubren navegación, casos de estudio, menú y Escape, ausencia de desbordamiento de 320 a 1440 px, movimiento reducido, navegación sin JavaScript, recursos SEO y WCAG A/AA con axe. Las comprobaciones automáticas no sustituyen una revisión con lectores de pantalla ni pruebas en dispositivos físicos.

Para generar capturas de revisión, con un servidor activo:

```powershell
node scripts/capture.mjs
```

## Producción

```powershell
npm.cmd run build
npm.cmd run preview
```

`dist/` contiene HTML, CSS, JavaScript y assets listos para hosting estático. Configura `SITE_URL` con la URL final antes de compilar si cambias de dominio; se utiliza en canonical, sitemap y Open Graph:

```powershell
$env:SITE_URL = 'https://tu-dominio.example'
npm.cmd run build
```

La identidad de Sites y el directorio estático están en `.openai/hosting.json`. El sitio de revisión de Sites conserva acceso privado. Cambiar de dominio no requiere modificar los componentes.

`public/og.png` se puede reemplazar por una imagen de 1200 × 630. `scripts/generate-og.mjs` documenta la composición original y utiliza el paquete `sharp` incluido por Astro; ejecuta `node scripts/generate-og.mjs` para regenerarla.

La dependencia transitiva `unifont` está fijada a `0.7.4` para evitar introducir un requisito de Node mayor al de Astro. La web utiliza Inter local de Fontsource y no depende de proveedores de fuentes en tiempo de ejecución.

Revisa [los datos pendientes y sus fuentes](docs/CONTENT.md) antes de compartir el portfolio públicamente.
