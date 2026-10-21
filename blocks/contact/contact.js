const FIELDS = [
  ['name', 'Name', 'text', true],
  ['phone', 'Phone', 'tel', false],
  ['email', 'Email', 'email', true],
  ['subject', 'Subject', 'text', false],
];

export default function decorate(block) {
  const rows = [...block.children];
  const formRow = rows.pop();

  const info = document.createElement('div');
  info.className = 'contact-info';
  rows.forEach((row) => {
    const [icon, text] = row.children;
    const card = document.createElement('div');
    card.className = 'contact-card';
    const badge = document.createElement('div');
    badge.className = 'contact-icon';
    badge.innerHTML = icon?.innerHTML || '';
    const body = document.createElement('div');
    body.className = 'contact-text';
    body.innerHTML = text?.innerHTML || '';
    card.append(badge, body);
    info.append(card);
  });

  const [headingCell, buttonCell] = formRow.children;
  const wrap = document.createElement('div');
  wrap.className = 'contact-form-wrap';

  const h3 = document.createElement('h3');
  h3.textContent = headingCell?.textContent.trim() || '';

  const form = document.createElement('form');
  form.className = 'contact-form';

  FIELDS.forEach(([name, label, type, required]) => {
    const input = document.createElement('input');
    input.name = name;
    input.type = type;
    input.placeholder = label;
    input.setAttribute('aria-label', label);
    input.required = required;
    form.append(input);
  });

  const message = document.createElement('textarea');
  message.name = 'message';
  message.rows = 5;
  message.placeholder = 'Message';
  message.setAttribute('aria-label', 'Message');
  message.required = true;
  message.className = 'contact-message';
  form.append(message);

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'contact-submit';
  submit.textContent = buttonCell?.textContent.trim() || 'Submit Request';
  form.append(submit);

  const status = document.createElement('p');
  status.className = 'contact-status';
  status.setAttribute('role', 'status');

  // mock form: nothing is sent anywhere
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    status.textContent = 'Thank you! Your request has been submitted.';
  });

  wrap.append(h3, form, status);
  block.textContent = '';
  block.append(info, wrap);
}