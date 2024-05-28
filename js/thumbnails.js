import { showFullPhoto } from './full-photo.js';

const thumbnailsContainer = document.querySelector('.pictures'); // Элемент для отображения миниатюр
const thumbnailsTemplate = document.querySelector('#picture') // Шаблон изображения пользователя
  .content
  .querySelector('.picture');


const createThumbnails = (date) => {
  const { url, description, likes, comments } = date;
  const thumbnail = thumbnailsTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  thumbnail.addEventListener('click', () => {
    showFullPhoto(date);
  });

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const thumbnailElement = createThumbnails(photo);
    fragment.append(thumbnailElement);
  });
  thumbnailsContainer
    .querySelectorAll('.picture')
    .forEach((photo) => photo.remove());
  thumbnailsContainer.append(fragment);
};

export { renderThumbnails };
