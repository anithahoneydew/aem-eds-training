function animate(el) {
  const target = Number(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = `${Math.round(target * progress)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

export default function decorate(block) {
  const numbers = [];

  [...block.children].forEach((row) => {
    row.classList.add('counter-card');
    const [icon, number, label] = row.children;
    icon?.classList.add('counter-icon');
    label?.classList.add('counter-label');
    if (!number) return;
    number.classList.add('counter-number');
    const match = number.textContent.trim().match(/^(\d+)(.*)$/);
    if (match) {
      number.dataset.target = match[1];
      number.dataset.suffix = match[2];
      numbers.push(number);
    }
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  numbers.forEach((n) => { n.textContent = `0${n.dataset.suffix}`; });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      animate(entry.target);
    });
  }, { threshold: 0.4 });
  numbers.forEach((n) => observer.observe(n));
}