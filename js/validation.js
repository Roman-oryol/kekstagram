const form = document.querySelector('.img-upload__form');
const regexp = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const hashtagsField = form.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'text-label__hashtags',
  errorClass: 'text__hashtags--error',
  errorTextParent: 'text-label__hashtags',
  errorTextClass: 'text__error'
});

const checkHashtagLength = (value) => {
  const hashtags = value.split(' ');
  return hashtags.every((hashtag) => hashtag.length <= 20);
};

const checkHashtagDublicate = (value) => {
  const hashtags = value.split(' ')
    .map((element) => element.toLowerCase())
    .filter((hashtag) => hashtag.trim().length);
  const isDublicate = hashtags.length > new Set(hashtags).size;
  if (hashtags.length === 0) {
    return false;
  }
  return isDublicate;
};

const validateHashtags = (value) => {
  const hashtags = value
    .split(' ')
    .filter((hashtag) => hashtag.trim().length);
  const isDublicate = checkHashtagDublicate(value);
  const isValid = hashtags.every((hashtag) => regexp.test(hashtag)) || value === '';

  if (hashtags.length > 5) {
    return false;
  }

  return isValid && !isDublicate;
};

const getMessageValidateHashtags = (value) => {
  if (checkHashtagDublicate(value)) {
    return'Хэш-теги не должны повторяться.';
  }

  if (value.split(' ').filter((hashtag) => hashtag.trim().length).length > 5) {
    return 'Максимальное количество хеш-тегов 5';
  }

  if (checkHashtagLength(value)) {
    return 'хэш-теги перечисляются через пробел и состоят из букв и чисел после символа #.';
  }

  return 'длина хэш-тега не должна превышать 20 символов.';
};

const resetErrors = () => {
  pristine.reset();
};

pristine.addValidator(
  hashtagsField,
  validateHashtags,
  getMessageValidateHashtags
);

const checkValidity = () => pristine.validate();

export { resetErrors, checkValidity };
