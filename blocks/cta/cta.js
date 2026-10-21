export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;
  const [bgCol, textCol, btnCol] = row.children;

  const pic = bgCol?.querySelector('picture');
  if (pic) {
    const bg = document.createElement('div');
    bg.className = 'cta-bg';
    bg.append(pic);
    block.prepend(bg);
  }
  bgCol?.remove();

  textCol?.classList.add('cta-text');
  btnCol?.classList.add('cta-action');
  btnCol?.querySelectorAll('a').forEach((a) => {
    a.className = 'cta-btn';
    a.closest('p')?.classList.remove('button-container');
  });
}