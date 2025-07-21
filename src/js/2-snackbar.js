import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleClick);

function handleClick(event) {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const check = form.elements.state.value;

  createPromise(delay, check)
    .then(delay => {
      iziToast.success({
        message: `Fulfilled promise in ${delay} ms`,
        position: 'topRight',
        backgroundColor: "#59a10d",
        progressBar: false,
        messageColor: "white",
        icon: "",
        iconUrl: new URL('../img/check.svg', import.meta.url).href,
        close: false
      });
    })
    .catch(delay => {
        iziToast.error({
           message: `Rejected promise in ${delay}ms`,
            position: 'topRight',
            backgroundColor: '#ef4040',
            progressBar: false,
            messageColor: "white",
            icon: "",
            iconUrl: new URL('../img/error.svg', import.meta.url).href,
            close: false
        })
    })
}

function createPromise(delay, check) {
    form.elements.delay.value = '';
      const radios = form.elements.state;
      for (const radio of radios) {
        radio.checked = false;}
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (check === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
