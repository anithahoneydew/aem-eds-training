export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;
  const [imageCol, textCol] = row.children;
  imageCol?.classList.add('about-image');
  textCol?.classList.add('about-text');
  textCol?.querySelectorAll('p > a:only-child').forEach((a) => {
    a.className = 'about-btn';
    a.closest('p').classList.remove('button-container');
  });
}