import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const desktop = window.matchMedia('(min-width: 900px)');

function setMenu(nav, open) {
  nav.setAttribute('aria-expanded', open ? 'true' : 'false');
  const btn = nav.querySelector('.nav-hamburger button');
  btn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.style.overflowY = open && !desktop.matches ? 'hidden' : '';
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // nav doc sections, in order: topbar, brand, sections, tools
  ['topbar', 'brand', 'sections', 'tools'].forEach((name, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${name}`);
  });

  const brandLink = nav.querySelector('.nav-brand .button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container')?.classList.remove('button-container');
  }

  const main = document.createElement('div');
  main.className = 'nav-main';
  ['brand', 'sections', 'tools'].forEach((name) => {
    const el = nav.querySelector(`.nav-${name}`);
    if (el) main.append(el);
  });

  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = '<button type="button" aria-controls="nav" aria-label="Open navigation"><span class="nav-hamburger-icon"></span></button>';
  hamburger.addEventListener('click', () => setMenu(nav, nav.getAttribute('aria-expanded') !== 'true'));
  main.append(hamburger);
  nav.append(main);

  nav.querySelectorAll('.nav-sections li').forEach((li) => {
    if (!li.querySelector('ul')) return;
    li.classList.add('nav-drop');
    li.setAttribute('aria-expanded', 'false');
    li.addEventListener('click', (e) => {
      if (desktop.matches || e.target.closest('li') !== li) return;
      e.preventDefault();
      li.setAttribute('aria-expanded', li.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
  });

  nav.setAttribute('aria-expanded', 'false');
  desktop.addEventListener('change', () => {
    setMenu(nav, false);
    nav.querySelectorAll('.nav-drop').forEach((li) => li.setAttribute('aria-expanded', 'false'));
  });

  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';
  wrapper.append(nav);
  block.append(wrapper);
}