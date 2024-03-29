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
getNonRepeatNumber(); // Чтобы не ругался линтер

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

export {getRandomPositiveInteger, getRandomArrayElement, createRandomNumberGenerator};
