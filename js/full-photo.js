const bigPicture = document.querySelector('.big-picture');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const socialCommentsList = document.querySelector('.social__comments');

const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

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
  });

  socialCommentsList.append(fragment);
};

const hideFullPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown (evt) {
  if (evt.key === 'Escape') {
    hideFullPicture();
  }
}

const onButtonCloseClick = () => {
  hideFullPicture();
};

const getPhotoDetails = ({ url, likes, description, comments }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showFullPhoto = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('hidden');
  document.addEventListener('keydown', onEscKeyDown);

  getPhotoDetails(data);
  renderComments(data.comments);
};

buttonClose.addEventListener('click', onButtonCloseClick);

export { showFullPhoto };
