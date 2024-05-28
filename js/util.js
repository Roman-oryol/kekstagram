const ALERT_SHOW_TIME = 5000;

// Функция получения случайного положительного целого числа из диапазона.
// Максимум и минимум включаются

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функкция получения случайного элемента из массива

const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

// Функция получения набора заданной длины случайных неповторяющихся чисел из диапазона

const getNonRepeatNumber = (length, rangeMin, rangeMax) => {
  const setOfIdentifiers = [];

  while (setOfIdentifiers.length < length) {
    const randomNumber = getRandomPositiveInteger(rangeMin, rangeMax);
    let found = false;

    for (let i = 0; i < setOfIdentifiers.length; i++) {
      if (setOfIdentifiers[i] === randomNumber) {
        found = true;
        break;
      }
    }

    if (!found) {
      setOfIdentifiers[setOfIdentifiers.length] = randomNumber;
    }
  }

  return setOfIdentifiers;
};

// Функция создания генератора неповторяющихся случайных чисел из диапазона

function createRandomNumberGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

// Функция проверки длины строки на соответствие заданной длине

const checkStringLength = (string, length) => string.length <= length;
checkStringLength('Проверочная строка', 10); // Временно, чтобы не ругался линтер!!!

// Функция удаления всех дочерних элементов родителя
const removeChild = (parentElement) => {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.left = 0;
  alertContainer.style.padding = '5px 10px';
  alertContainer.style.fontSize = '14px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#e82e2e';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  },
  ALERT_SHOW_TIME
  );
};

//Функция debounce для устранения дребезга:

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

// Функция throttle для пропуска кадров:

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {
  getRandomPositiveInteger,
  getRandomArrayElement,
  createRandomNumberGenerator,
  removeChild,
  isEscapeKey,
  showAlert,
  debounce,
  throttle,
  getNonRepeatNumber
};
