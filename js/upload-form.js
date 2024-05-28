import { isEscapeKey } from './util.js';
import { resetErrors, checkValidity } from './validation.js';
import { resetScale } from './editing-photo.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showSuccess, showError } from './upload-modal.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadButton = form.querySelector('#upload-file');
const photoEditingForm = form.querySelector('.img-upload__overlay');
const closeEditingFormButton = form.querySelector('#upload-cancel');
const hashtagsField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const submitButton = form.querySelector('#upload-submit');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const showPhotoEditingForm = () => {
  photoEditingForm.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
  const file = uploadButton.files[0];

  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
};

const hidePhotoEditingForm = () => {
  photoEditingForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  resetErrors();
  form.reset();
  resetScale();
  resetEffects();
};

const isFieldFocused = () => {
  const isActiveHashtagsField = document.activeElement === hashtagsField;
  const isActiveDescriptionField = document.activeElement === descriptionField;
  return isActiveDescriptionField || isActiveHashtagsField;
};

function onEscKeyDown (evt) {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    hidePhotoEditingForm();
  }
}

uploadButton.addEventListener('change', showPhotoEditingForm);

closeEditingFormButton.addEventListener('click', hidePhotoEditingForm);

const blocSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = checkValidity();

  if (isValid) {
    blocSubmitButton();
    const formData = new FormData(evt.target);

    sendData(
      () => {
        hidePhotoEditingForm();
        showSuccess();
        unblockSubmitButton();
      },
      () => {
        showError();
        unblockSubmitButton();
      },
      formData);
  }
});

