import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const successModal = document.querySelector('#success')
  .content
  .querySelector('.success')
  .cloneNode(true);
const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error')
  .cloneNode(true);

const closeModal = () => {
  body.lastChild.remove();
  document.removeEventListener('keydown', onEscKeyDown);
  body.removeEventListener('click', onBodyClick);
};


const showModal = (modal) => {
  const successCloseButton = modal.querySelector('button');
  successCloseButton.addEventListener('click', closeModal);
  body.append(modal);
  document.addEventListener('keydown', onEscKeyDown);
  body.addEventListener('click', onBodyClick);
};

function onEscKeyDown (evt) {
  if (isEscapeKey(evt)) {
    closeModal();
  }
}

function onBodyClick(evt) {
  const clickedElement = evt.target.matches('.success') || evt.target.matches('.error');
  if (clickedElement) {
    closeModal();
  }
}

const showSuccess = () => {
  showModal(successModal);
};

const showError = () => {
  showModal(errorMessage);
};

export { showSuccess, showError };
