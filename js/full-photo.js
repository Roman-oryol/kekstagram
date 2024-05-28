import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const socialCommentsList = document.querySelector('.social__comments');

const shownCommentsCount = bigPicture.querySelector('.comments-displayed');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const MAX_START_COMMENTS_COUNT = 5;

const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  socialCommentsList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);

    if (fragment.childElementCount > MAX_START_COMMENTS_COUNT) {
      commentElement.classList.add('hidden');
    }
  });

  socialCommentsList.append(fragment);
};

// Логика показа комментариев в ленте - начало

const createIndexGenerator = () => {
  let lastIndex = 0;

  return function () {
    lastIndex += 5;
    if (lastIndex >= socialCommentsList.children.length) {
      lastIndex = 5;
    }
    return lastIndex;
  };
};

let indexGenerator = createIndexGenerator();

const showNewComments = () => {
  const startIndex = indexGenerator();
  const elementCount = socialCommentsList.children.length;
  let index = MAX_START_COMMENTS_COUNT;

  for (let i = startIndex; i < startIndex + 5 && i < elementCount; i++) {
    socialCommentsList.children[i].classList.remove('hidden');
    index = i;

    if (i === elementCount - 1) {
      commentsLoader.classList.add('hidden');
    }
  }

  shownCommentsCount.textContent = index + 1;
};

const displayingСommentsLoader = () => {
  if (socialCommentsList.children.length > MAX_START_COMMENTS_COUNT) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }
};

// Логика показа комментариев в ленте - окончание

const hideFullPhoto = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  commentsLoader.removeEventListener('click', showNewComments);
  indexGenerator = createIndexGenerator();
};

function onEscKeyDown (evt) {
  if (isEscapeKey(evt)) {
    hideFullPhoto();
  }
}

const onButtonCloseClick = () => {
  hideFullPhoto();
};

const getPhotoDetails = ({ url, likes, description, comments }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  if (comments.length <= MAX_START_COMMENTS_COUNT) {
    shownCommentsCount.textContent = comments.length;
  } else {
    shownCommentsCount.textContent = MAX_START_COMMENTS_COUNT;
  }
};

const showFullPhoto = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);

  getPhotoDetails(data);
  renderComments(data.comments);

  commentsLoader.addEventListener('click', showNewComments);
  displayingСommentsLoader();
};

buttonClose.addEventListener('click', onButtonCloseClick);

export { showFullPhoto };
