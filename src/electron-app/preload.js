const path = require('path');

window.addEventListener('DOMContentLoaded', () => {
  const stylePath = path.join(__dirname, '..', '..', 'public', 'css', 'styles.css');
  const scriptPath = path.join(__dirname, '..', '..', 'public', 'js', 'main.js');

  const styleUrl = `file://${stylePath}`;
  const scriptUrl = `file://${scriptPath}`;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = styleUrl;
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = scriptUrl;
  document.body.appendChild(script);
});