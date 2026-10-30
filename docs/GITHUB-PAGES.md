# Publicar en GitHub Pages

El proyecto usa Astro. GitHub Pages debe compilarlo mediante el workflow
`.github/workflows/deploy.yml`, en lugar de ejecutar Jekyll sobre el código fuente.

1. En `adribarrios05/portfolio`, abre **Settings → Pages → Build and deployment**.
2. Selecciona **GitHub Actions** como **Source**.
3. Sube el workflow y los cambios de rutas a la rama `main` del repositorio que
   conserva el historial del portfolio antiguo.
4. Comprueba en **Actions → Deploy to GitHub Pages** que finalizan `build` y `deploy`.
   Si los cambios ya estaban subidos antes de cambiar Source, ejecuta **Run workflow**.

La dirección esperada sin dominio personalizado es
<https://adribarrios05.github.io/portfolio/>.

El workflow define `SITE_URL=https://adribarrios05.github.io` y
`SITE_BASE=/portfolio`. El desarrollo local conserva la ruta `/`.
Si se configura un dominio personalizado, ajusta ambas variables según ese dominio
y su ruta de publicación.

Si trabajas en una copia distinta del repositorio, transfiere el workflow,
`astro.config.mjs`, `src/utils/urls.ts` y los cambios de enlaces en
`Header.astro`, `SocialLinks.astro`, `ProjectCard.astro`, `BaseLayout.astro`,
`pages/projects/[slug].astro`, `pages/404.astro`, `pages/sitemap.xml.ts` y `pages/robots.txt.ts`.
Conserva el directorio `.git` del repositorio con el historial antiguo.
