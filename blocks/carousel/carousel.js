export default function decorate(block) {
  const rows = [...block.children];
  const total = rows.length;
  const track = document.createElement('div');
  track.className = 'carousel-track';

  rows.forEach((row, i) => {
    const [imgCol, contentCol] = [...row.children];

    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${i + 1} of ${total}`);

    // background image
    const bg = document.createElement('div');
    bg.className = 'carousel-bg';
    const pic = imgCol?.querySelector('picture');
    if (pic) {
      bg.append(pic);
      if (i === 0) pic.querySelector('img')?.setAttribute('loading', 'eager');
    }

    // content: split links into buttons and social icons
    const body = document.createElement('div');
    body.className = 'carousel-body';
    const actions = document.createElement('div');
    actions.className = 'carousel-actions';
    const social = document.createElement('div');
    social.className = 'carousel-social';

    if (contentCol) {
      contentCol.querySelectorAll('a').forEach((a) => {
        const parent = a.closest('p');
        a.className = '';
        if (a.querySelector('.icon')) {
          social.append(a);
        } else {
          a.classList.add('carousel-btn');
          actions.append(a);
        }
        if (parent && !parent.querySelector('a, img') && !parent.textContent.trim()) {
          parent.remove();
        }
      });
      body.append(...contentCol.children);
    }
    if (actions.children.length) body.append(actions);
    if (social.children.length) body.append(social);

    const content = document.createElement('div');
    content.className = 'carousel-content';
    content.append(body);

    slide.append(bg, content);
    track.append(slide);
  });

  block.textContent = '';
  block.append(track);
  if (total < 2) return;

  const slides = [...track.children];
  let current = 0;
  let timer;

  function show(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((s, i) => s.toggleAttribute('inert', i !== current));
  }

  function makeArrow(dir) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `carousel-arrow carousel-${dir}`;
    btn.setAttribute('aria-label', dir === 'prev' ? 'Previous slide' : 'Next slide');
    btn.addEventListener('click', () => {
      show(dir === 'prev' ? current - 1 : current + 1);
      // eslint-disable-next-line no-use-before-define
      restart();
    });
    return btn;
  }
  block.append(makeArrow('prev'), makeArrow('next'));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function stop() { clearInterval(timer); }
  function start() {
    if (reduceMotion) return;
    stop();
    timer = setInterval(() => show(current + 1), 5000);
  }
  function restart() { stop(); start(); }

  block.addEventListener('mouseenter', stop);
  block.addEventListener('mouseleave', start);
  block.addEventListener('focusin', stop);
  block.addEventListener('focusout', start);

  show(0);
  start();
}