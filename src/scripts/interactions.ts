// Progressive enhancement: content and navigation remain usable without JS.
const menu = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('#primary-nav');

if (menu && nav) {
  document.documentElement.classList.add('has-menu');
  const closeMenu = (restoreFocus = false) => {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
    if (restoreFocus) menu.focus();
  };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
  });
  nav.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (!nav.contains(document.activeElement) && document.activeElement !== menu) closeMenu();
    });
  });
  matchMedia('(min-width: 900px)').addEventListener('change', () => closeMenu());
}

const motion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  if (!motion.matches) {
    elements.forEach((element) => {
      // Only hide content outside the initial viewport, after JS is ready.
      if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add('will-reveal');
      revealObserver.observe(element);
    });
  }
  motion.addEventListener('change', (event) => {
    if (event.matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
      revealObserver.disconnect();
    }
  });

  const sections = [...document.querySelectorAll<HTMLElement>('section[data-section]')];
  const updateActiveSection = () => {
    const boundary = window.innerHeight * 0.4;
    let active: HTMLElement | undefined;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= boundary) active = section;
    }
    document.querySelectorAll<HTMLAnchorElement>('[data-nav]').forEach((link) => {
      const selected = link.dataset.nav === active?.id;
      link.classList.toggle('is-active', selected);
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  let scheduled = false;
  addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { updateActiveSection(); scheduled = false; });
  }, { passive: true });
  addEventListener('resize', updateActiveSection);
  updateActiveSection();
}
