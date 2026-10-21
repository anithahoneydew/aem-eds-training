export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('pricing-card');
    const [name, price, list, action] = row.children;
    name?.classList.add('pricing-name');
    list?.classList.add('pricing-list');
    action?.classList.add('pricing-action');

    if (price) {
      price.classList.add('pricing-price');
      const m = price.textContent.trim().match(/^\$?\s*(\d+)\s*(.*)$/);
      if (m) {
        price.textContent = '';
        const circle = document.createElement('div');
        circle.className = 'pricing-circle';
        const amount = document.createElement('div');
        amount.className = 'pricing-amount';
        const cur = document.createElement('span');
        cur.className = 'pricing-cur';
        cur.textContent = '$';
        const num = document.createElement('span');
        num.className = 'pricing-num';
        num.textContent = m[1];
        amount.append(cur, num);
        const label = document.createElement('div');
        label.className = 'pricing-label';
        label.textContent = m[2];
        circle.append(amount, label);
        price.append(circle);
      }
    }

    action?.querySelectorAll('a').forEach((a) => {
      a.className = 'pricing-btn';
      a.closest('p')?.classList.remove('button-container');
    });
  });
}