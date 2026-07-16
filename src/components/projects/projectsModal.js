import { projects } from '../../data/project';

export function initProjectsModal() {
  const modal = document.getElementById('projectsModal');
  const backdrop = document.getElementById('projectsModalBackdrop');
  const closeButton = document.getElementById('projectsModalClose');
  const image = document.getElementById('projectsModalImage');
  const name = document.getElementById('projectsModalName');
  const description = document.getElementById('projectsModalDescription');
  const prevButton = document.getElementById('projectsModalPrev');
  const nextButton = document.getElementById('projectsModalNext');

  if (!modal) return null;

  let currentIndex = 0;

  function renderProject(index) {
    const project = projects[index];
    image.src = project.thumbnail;
    image.alt = project.name;
    name.textContent = project.name;
    description.innerHTML = project.description || ''; /* заменила textContent на innerHTML для отображения спец символов */
  }

  function openModal(index) {
    currentIndex = index;
    renderProject(currentIndex);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  function showNext() {
    // Остаток от деления зацикливает переход — после последней
    // карточки (index = projects.length - 1) снова показывается первая
    currentIndex = (currentIndex + 1) % projects.length;
    renderProject(currentIndex);
  }

  function showPrev() {
    // Прибавляем длину массива перед остатком от деления, чтобы
    // избежать отрицательного индекса при переходе с первой карточки
    // на последнюю (например: (0 - 1 + 3) % 3 = 2, а не -1)
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    renderProject(currentIndex);
  }

  closeButton.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  nextButton.addEventListener('click', showNext);
  prevButton.addEventListener('click', showPrev);

  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowRight') showNext();
    if (event.key === 'ArrowLeft') showPrev();
  });

  // Возвращаем openModal наружу — этой функцией будем открывать
  // модалку из projectsReveal.js по клику на конкретную карточку
  return openModal;
}
