export default function decorate(block) {
  const items = [...block.children]
    .map((row) => row.textContent.trim())
    .filter(Boolean);

  block.textContent = '';
  const track = document.createElement('div');
  track.className = 'marquee-track';

  [0, 1].forEach((n) => {
    const group = document.createElement('div');
    group.className = 'marquee-group';
    if (n === 1) group.setAttribute('aria-hidden', 'true');
    items.forEach((text) => {
      const span = document.createElement('span');
      span.textContent = text;
      group.append(span);
    });
    track.append(group);
  });

  block.append(track);
}