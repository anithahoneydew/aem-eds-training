export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('showcase-card');
    const [image, title, category] = row.children;
    image?.classList.add('showcase-image');

    const caption = document.createElement('div');
    caption.className = 'showcase-caption';
    const h3 = document.createElement('h3');
    h3.textContent = title?.textContent.trim() || '';
    const p = document.createElement('p');
    p.textContent = category?.textContent.trim() || '';
    caption.append(h3, p);

    title?.remove();
    category?.remove();
    row.append(caption);
  });
}