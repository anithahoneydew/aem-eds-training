export default function decorate(block) {
  const grid = document.createElement('div');
  grid.className = 'gallery-grid';
  const cats = new Set();

  [...block.children].forEach((row) => {
    const [imgCol, titleCol, catCol] = row.children;
    const tags = (catCol?.textContent || '').split(',').map((t) => t.trim()).filter(Boolean);
    tags.forEach((t) => cats.add(t));

    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.tags = tags.join('|');

    const pic = imgCol?.querySelector('picture');
    if (pic) item.append(pic);

    const caption = document.createElement('div');
    caption.className = 'gallery-caption';
    const h3 = document.createElement('h3');
    h3.textContent = titleCol?.textContent.trim() || '';
    const p = document.createElement('p');
    p.textContent = tags.join(', ');
    caption.append(h3, p);
    item.append(caption);
    grid.append(item);
  });

  const filters = document.createElement('div');
  filters.className = 'gallery-filters';
  ['All Work', ...[...cats].sort()].forEach((label, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => {
      filters.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b === btn));
      grid.querySelectorAll('.gallery-item').forEach((item) => {
        item.hidden = i !== 0 && !item.dataset.tags.split('|').includes(label);
      });
    });
    filters.append(btn);
  });

  block.textContent = '';
  block.append(filters, grid);
}