import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    new Promise((resolve, reject) => {
      setTimeout(() => {
        state === 'fulfilled' ? resolve(delay) : reject(delay);
      }, delay);
    })
      .then(ms => {
        iziToast.success({
          message: `✅ Fulfilled promise in ${ms}ms`,
          position: "topRight",
        });
      })
      .catch(ms => {
        iziToast.error({
          message: `❌ Rejected promise in ${ms}ms`,
          position: "topRight",
        });
      });
  });
}
