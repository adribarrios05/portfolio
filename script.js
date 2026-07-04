const root = document.documentElement;
const theme = document.querySelector('.theme-btn');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const toast = document.querySelector('.toast');

function applyTheme(value, persist = false) {
  root.dataset.theme = value;
  const nextTheme = value === 'dark' ? 'claro' : 'oscuro';
  theme?.setAttribute('aria-label', `Cambiar a tema ${nextTheme}`);
  if (theme) theme.title = `Cambiar a tema ${nextTheme}`;
  if (persist) localStorage.setItem('theme', value);
}

const saved = localStorage.getItem('theme');
applyTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

theme?.addEventListener('click', () => {
  applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
});

function setMenu(open) {
  menu?.classList.toggle('open', open);
  menuBtn?.setAttribute('aria-expanded', String(open));
  const label = menuBtn?.querySelector('.menu-label');
  if (label) label.textContent = open ? 'Cerrar menú' : 'Abrir menú';
}

menuBtn?.addEventListener('click', () => setMenu(!menu?.classList.contains('open')));
menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

document.querySelector('.copy-email')?.addEventListener('click', async (event) => {
  const email = event.currentTarget.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    show('Email copiado');
  } catch {
    show(email);
  }
});

function show(text) {
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2200);
}

const elements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  elements.forEach((element) => observer.observe(element));
} else {
  elements.forEach((element) => element.classList.add('visible'));
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
