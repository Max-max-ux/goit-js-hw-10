import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let chosenDate = null;
let timerId = null;

refs.startBtn.disabled = true;

const fpOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const picked = selectedDates[0];
    if (picked <= Date.now()) {
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });
      refs.startBtn.disabled = true;
      return;
    }
    chosenDate = picked;
    refs.startBtn.disabled = false;
  },
};

flatpickr(refs.input, fpOptions);

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;
  timerId = setInterval(() => {
    const diff = chosenDate - Date.now();
    if (diff <= 0) {
      clearInterval(timerId);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      refs.input.disabled = false;
      return;
    }
    updateTimer(convertMs(diff));
  }, 1000);
});

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = pad(days);
  refs.hours.textContent = pad(hours);
  refs.minutes.textContent = pad(minutes);
  refs.seconds.textContent = pad(seconds);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const sec = 1000;
  const min = sec * 60;
  const hr = min * 60;
  const d = hr * 24;
  return {
    days: Math.floor(ms / d),
    hours: Math.floor((ms % d) / hr),
    minutes: Math.floor((ms % hr) / min),
    seconds: Math.floor((ms % min) / sec),
  };
}


