export default function decorate(block) {
  [...block.children].forEach((row) => {
    const [image, category, title, text] = row.children;
    row.classList.add('news-card');
    image?.classList.add('news-image');

    const tag = document.createElement('span');
    tag.className = 'news-tag';
    tag.textContent = category?.textContent.trim() || '';
    image?.append(tag);

    const body = document.createElement('div');
    body.className = 'news-body';
    const h3 = document.createElement('h3');
    h3.textContent = title?.textContent.trim() || '';
    const p = document.createElement('p');
    p.textContent = text?.textContent.trim() || '';
    const btn = document.createElement('a');
    btn.className = 'news-btn';
    btn.href = title?.querySelector('a')?.href || '#';
    btn.textContent = 'Read More';
    body.append(h3, p, btn);

    category?.remove();
    title?.remove();
    text?.remove();
    row.append(body);
  });
}