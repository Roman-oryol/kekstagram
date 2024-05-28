import { showAlert } from './util.js';

const getData = async (onSuccess) => {
  try {
    const response = await fetch('https://25.javascript.htmlacademy.pro/kekstagram/data');

    if (!response.ok) {
      throw new Error('Не удалось загрузить фотографии!');
    }

    const photos = await response.json();

    onSuccess(photos);
  } catch (error) {
    showAlert(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://25.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        credentials: 'same-origin',
        body
      }
    );

    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    }

    onSuccess ();
  } catch (error) {
    onFail();
  }
};

// Вариант без acync/await

// const getData = (onSuccess) => {
//   fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')
//     .then((response) => response.json())
//     .then((photos) => {
//       onSuccess(photos);
//     })
//     .catch(() => {
//       showAlert('Не удалось загрузить фотографии!');
//     });
// };

// const sendData = (onSuccess, onFail, body) => {
//   fetch(
//     'https://25.javascript.htmlacademy.pro/kekstagram',
//     {
//       method: 'POST',
//       credentials: 'same-origin',
//       body
//     }
//   )
//     .then((response) => {
//       if (response.ok) {
//         onSuccess();
//       } else {
//         onFail();
//       }
//     })
//     .catch(() => {
//       onFail();
//     });
// };

export { getData, sendData };
