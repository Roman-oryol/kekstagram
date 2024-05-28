import { renderThumbnails } from './thumbnails.js';
import { debounce } from './util.js';

const PHOTOS_COUNT = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterContainer = document.querySelector('.img-filters');

let currentFilter = '';
let photos = [];

const addFiltering = (loadedPhotos) => {
  filterContainer.classList.remove('img-filters--inactive');
  photos = [...loadedPhotos];
  currentFilter = Filter.DEFAULT;
};

const randomSort = () => Math.random() - 0.5;

const discussedSort = (photoA, photoB) =>
  photoB.comments.length - photoA.comments.length;

const filterPictures = () => {
  switch(currentFilter) {
    case Filter.RANDOM:
      return [...photos].sort(randomSort).slice(0, PHOTOS_COUNT);
    case Filter.DISCUSSED:
      return [...photos].sort(discussedSort);
    default:
      return[...photos];
  }
};

const debouncedRenderThumbnails = debounce(renderThumbnails);

filterContainer.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  const clickedButton = evt.target;
  if (clickedButton.id === currentFilter) {
    return;
  }

  filterContainer
    .querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');

  clickedButton.classList.add('img-filters__button--active');

  currentFilter = clickedButton.id;
  debouncedRenderThumbnails(filterPictures());
});

export { addFiltering, filterPictures };
