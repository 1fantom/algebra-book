window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[w3-include-html]').forEach(el => {
    fetch(el.getAttribute('w3-include-html'))
      .then(r => r.text())
      .then(html => el.outerHTML = html)
      .catch(console.error);
  });
});
