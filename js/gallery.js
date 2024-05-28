import { renderThumbnails } from './thumbnails.js';
import { getData } from './api.js';
import { addFiltering, filterPictures } from './filter.js';

const onGetDataSuccess = (photos) => {
  addFiltering(photos);
  renderThumbnails(filterPictures());
};

getData(onGetDataSuccess);
