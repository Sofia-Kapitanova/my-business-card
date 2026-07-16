import './styles/main.css';
import { initProjectsReveal } from './components/projects/projectsReveal';
import { initThemeToggle } from './components/header/themeToggle';
import { initEducationModal } from './components/education/educationModal.js';
import { initProjectsModal } from './components/projects/projectsModal.js';

initThemeToggle();

initEducationModal();

const openProjectModal = initProjectsModal();
// Функция открытия модалки, полученная из initProjectsModal,
// передаётся в initProjectsReveal — так клик по карточке в списке
// умеет открыть именно эту модалку с нужным индексом
initProjectsReveal(openProjectModal);
