const STORAGE_KEY = 'theme';

export function initThemeToggle() {
  const toggleButton = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');

  if (!toggleButton || !icon) return;

  const html = document.documentElement;

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  function getCurrentTheme() {
    return html.getAttribute('data-theme') || 'light';
  }

  toggleButton.addEventListener('click', () => {
    const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  applyTheme(getCurrentTheme());
}
