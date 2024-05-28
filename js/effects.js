const form = document.querySelector('.img-upload__form');
const slider = form.querySelector('.effect-level__slider');
const photoPreview = form.querySelector('.img-upload__preview img');
const effectLevel = form.querySelector('.effect-level__value');

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  slider.classList.remove('hidden');
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.max,
    step: chosenEffect.step,
  });

  if (isDefault()) {
    slider.classList.add('hidden');
  }
};

const onFormChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider();
};

const onSliderUpdate = () => {
  if (isDefault()) {
    photoPreview.style.filter = 'none';
    effectLevel.value = '';
    return;
  }
  const sliderValue = slider.noUiSlider.get();
  photoPreview.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  photoPreview.className = `effects__preview--${chosenEffect.name}`;
  effectLevel.value = sliderValue;
};

noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

slider.classList.add('hidden');

// updateSlider();

form.addEventListener('change', onFormChange);
slider.noUiSlider.on('update', onSliderUpdate);

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

export { resetEffects };
