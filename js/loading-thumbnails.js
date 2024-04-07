import {createPhotos} from './data.js';

const rundomUserPhotos = createPhotos(); // Массив объектов с случайными данными фотографий
const userThumbnailsSection = document.querySelector('.pictures'); // Элемент для отображения миниатюр пользователей
const userThumbnailsTemplate = document.querySelector('#picture') // Шаблон изображения пользователя
  .content
  .querySelector('.picture');
const thumbnailsListFragment = document.createDocumentFragment();

rundomUserPhotos.forEach(({url, likes, comments}) => {
  const userThumbnail = userThumbnailsTemplate.cloneNode(true);
  userThumbnail.querySelector('.picture__img').src = url;
  userThumbnail.querySelector('.picture__info')
    .querySelector('.picture__comments').textContent = comments.length;
  userThumbnail.querySelector('.picture__info')
    .querySelector('.picture__likes').textContent = likes;
  thumbnailsListFragment.append(userThumbnail);
});

userThumbnailsSection.append(thumbnailsListFragment);
