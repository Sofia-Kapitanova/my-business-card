export function initEducationModal() {
  const modal = document.getElementById('educationModal');
  const backdrop = document.getElementById('modalBackdrop');
  const closeButton = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const cards = document.querySelectorAll('.education__card');

  if (!modal) return;

  function openModal(imageSrc, title) {
    modalImage.src = imageSrc;
    modalImage.alt = title;
    modalTitle.textContent = title;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const imageSrc = card.getAttribute('data-image');
      const title = card.getAttribute('data-title');
      openModal(imageSrc, title);
    });
  });

  closeButton.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  // Закрытие по клавише Escape — важно для доступности
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}
