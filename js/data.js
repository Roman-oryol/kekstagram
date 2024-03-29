import {
  getRandomPositiveInteger,
  getRandomArrayElement,
  createRandomNumberGenerator
} from './util.js';

const PHOTO_COUNT = 25;

// Набор описаний фотографий

const DESCRIPTIONS = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
  'Описание 4',
  'Описание 5',
  'Описание 6',
  'Описание 7',
  'Описание 8',
];

// Набор предложений для генерации сообщений в комментариях

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

// Набор имен для генерации имен авторов комментариев

const NAMES = [
  'Евгений',
  'Дмитрий',
  'Андрей',
  'Алексей',
  'Константин',
  'Роман',
  'Иван'
];

// Функция создания описаний фотографий

// const createPhotos = () => {
//   const MAX_NUMBER_OF_COMMENTS = 5;
//   const NUMBER_OF_DESCRIPTIONS = 25;

//   const descriptionIds = getNonRepeatNumber(NUMBER_OF_DESCRIPTIONS, 1, NUMBER_OF_DESCRIPTIONS);
//   const photoNumbers = getNonRepeatNumber(NUMBER_OF_DESCRIPTIONS, 1, NUMBER_OF_DESCRIPTIONS);

//   // Создание набора коментариев с случайным количеством
//   const getComments = (maxComments) => {
//     const numberOfComments = getRandomPositiveInteger(1, maxComments);
//     const commentIds = getNonRepeatNumber(numberOfComments, 1, 1000);

//     const comments = commentIds.map((id) => ({
//       id: id,
//       avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
//       message: getRandomArrayElement(MESSAGES),
//       name: getRandomArrayElement(NAMES)
//     }));
//     return comments;
//   };

//   const descriptionsPhotographs = descriptionIds.map((id, index) => ({
//     id: id,
//     url: `photos/${photoNumbers[index]}.jpg`,
//     description: getRandomArrayElement(DESCRIPTIONS),
//     likes: getRandomPositiveInteger(15, 200),
//     comments: getComments(MAX_NUMBER_OF_COMMENTS),
//   }));

//   return descriptionsPhotographs;
// };

// вариант 2

const generatePhotoId = createRandomNumberGenerator(1, PHOTO_COUNT);
const genetatePhotoNumber = createRandomNumberGenerator(1, PHOTO_COUNT);
const generateCommentId = createRandomNumberGenerator(1, 1000);

const createMessage = () =>
  Array.from({ length: getRandomPositiveInteger(1, 2)}, () =>
    getRandomArrayElement(MESSAGES)
  ).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES)
});

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${genetatePhotoNumber()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from(
    { length:  getRandomPositiveInteger(1, 6) }, createComment
  )
});

const createPhotos = () => Array.from({ length: PHOTO_COUNT }, createPhoto);

export {createPhotos};
