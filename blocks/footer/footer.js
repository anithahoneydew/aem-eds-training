import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  block.textContent = '';
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  const sections = [...fragment.children];

  const inner = document.createElement('div');
  inner.className = 'footer-inner';

  // sections 1-4 become columns, section 5 is the copyright bar
  const main = document.createElement('div');
  main.className = 'footer-main';
  ['brand', 'links', 'info', 'posts'].forEach((name, i) => {
    if (!sections[i]) return;
    sections[i].classList.add(`footer-${name}`);
    main.append(sections[i]);
  });

  const bottom = document.createElement('div');
  bottom.className = 'footer-bottom';
  if (sections[4]) bottom.append(sections[4]);

  // group each recent post: thumbnail + title + date
  const posts = main.querySelector('.footer-posts .default-content-wrapper');
  if (posts) {
    const list = document.createElement('div');
    list.className = 'footer-post-list';
    let current;
    let text;
    [...posts.children].forEach((el) => {
      if (el.querySelector('picture')) {
        current = document.createElement('div');
        current.className = 'footer-post';
        text = document.createElement('div');
        text.className = 'footer-post-text';
        current.append(el, text);
        list.append(current);
      } else if (current) {
        text.append(el);
      }
    });
    posts.append(list);
  }

  inner.append(main, bottom);
  inner.querySelectorAll('a.button').forEach((a) => {
    a.className = '';
    a.closest('.button-container')?.classList.remove('button-container');
  });
  block.append(inner);
}