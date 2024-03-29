import {
  getRandomPositiveInteger,
  getRandomArrayElement,
  createRandomNumberGenerator
} from './util.js';

const PHOTO_COUNT = 25;

// Набор описаний фотографий

const DESCRIPTIONS = [
  'Летний чил на югах. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
  'Тестим новую камеру! #camera #test #new #newcameratest #pic #photo #instaphoto',
  'Затусили с друзьями на море #laptevsea #north #northeastpassage',
  'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy',
  'Отдыхаем... #chill #relax #group #photo',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка! #wow #car #carwow #drive',
  '#fun #party #cool #young',
  'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр',
  'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть #пивка',
  'Норм',
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
