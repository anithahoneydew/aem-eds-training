export default function decorate(block) {
  const [intro, ...items] = [...block.children];
  const [imageCol, introCol] = intro.children;

  const list = document.createElement('div');
  list.className = 'faq-list';

  items.forEach((row, i) => {
    const [question, answer] = row.children;
    const details = document.createElement('details');
    details.className = 'faq-item';
    if (i === 0) details.open = true;

    const summary = document.createElement('summary');
    summary.textContent = question.textContent.trim();

    const body = document.createElement('div');
    body.className = 'faq-answer';
    body.innerHTML = answer.innerHTML;

    details.append(summary, body);
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      list.querySelectorAll('details[open]').forEach((d) => {
        if (d !== details) d.open = false;
      });
    });
    list.append(details);
  });

  const text = document.createElement('div');
  text.className = 'faq-text';
  text.append(...introCol.childNodes, list);

  const image = document.createElement('div');
  image.className = 'faq-image';
  image.append(...imageCol.childNodes);

  block.textContent = '';
  block.append(image, text);
}