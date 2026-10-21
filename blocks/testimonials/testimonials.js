export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('testi-card');
    const [avatar, who, rating, quote] = row.children;
    avatar?.classList.add('testi-avatar');
    who?.classList.add('testi-who');
    quote?.classList.add('testi-quote');
    if (rating) {
      rating.classList.add('testi-rating');
      const stars = document.createElement('span');
      stars.className = 'testi-stars';
      stars.textContent = '\u2606\u2606\u2606\u2606\u2606';
      rating.prepend(stars);
    }
  });
}