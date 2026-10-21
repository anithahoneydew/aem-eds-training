export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('team-card');
    const [photo, who, text, social] = row.children;
    photo?.classList.add('team-photo');
    who?.classList.add('team-who');
    text?.classList.add('team-text');
    social?.classList.add('team-social');
    social?.querySelectorAll('a').forEach((a) => {
      a.className = '';
      a.closest('p')?.classList.remove('button-container');
    });
  });
}