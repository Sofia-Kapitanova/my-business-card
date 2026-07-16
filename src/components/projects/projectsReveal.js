import { projects } from '../../data/project';

function renderProjectCards(container, onCardClick) {
  // ИЗМЕНИЛИ: renderProjectCards принимает второй параметр —
  // функцию-колбэк, которая будет вызываться при клике на карточку
  const grid = document.createElement('div');
  grid.className = 'projects__grid';

  projects.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-card__thumb-wrap">
        <img class="project-card__thumb" src="${project.thumbnail}" alt="${project.name}" />
      </div>
      <p class="project-card__name">${project.name}</p>
      <p class="project-card__description">${project.description}</p>
    `;
    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    card.addEventListener('click', () => {
      if (!isMobile()) {
        onCardClick(index);
      }
    });
    // ДОБАВИЛИ: клик по карточке передаёт свой индекс в колбэк —
    // так модалка узнаёт, какой именно проект нужно открыть
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

export function initProjectsReveal(onCardClick) {
  const trigger = document.getElementById('projectsTrigger');
  const cardsContainer = document.getElementById('projectsCards');
  const hint = document.getElementById('projectsHint');

  if (!trigger || !cardsContainer) return;

  renderProjectCards(cardsContainer, onCardClick);

  function toggle() {
    const isOpen = cardsContainer.classList.toggle('is-open');
    trigger.classList.toggle('is-open');

    if (hint) {
      hint.textContent = isOpen ? 'свернуть' : 'нажми, чтобы посмотреть';
    }
  }

  trigger.addEventListener('click', toggle);
}
