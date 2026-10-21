export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('service-card');
    const [icon, title, text] = row.children;
    icon?.classList.add('service-icon');
    title?.classList.add('service-title');
    text?.classList.add('service-text');
  });
}