const form = document.querySelector('.img-upload__form');
const smallerScaleButton = form.querySelector('.scale__control--smaller');
const largerScaleButton = form.querySelector('.scale__control--bigger');
const scaleValue = form.querySelector('.scale__control--value');
const previewPhoto = form.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scalePhoto = (value) => {
  previewPhoto.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

const onSmallerScaleButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  let newValue = currentValue - SCALE_STEP;

  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }

  scalePhoto(newValue);
};

const onLargerScaleButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  let newValue = currentValue + SCALE_STEP;

  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }

  scalePhoto(newValue);
};

const resetScale = () => {
  scalePhoto(DEFAULT_SCALE);
};

smallerScaleButton.addEventListener('click', onSmallerScaleButtonClick);
largerScaleButton.addEventListener('click', onLargerScaleButtonClick);

export { resetScale };
