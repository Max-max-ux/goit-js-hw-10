import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("[data-start]");
const dateInput = document.querySelector("#datetime-picker");


const daysReflection = document.querySelector("[data-days]");
const hoursReflection = document.querySelector("[data-hours]");
const minutesReflection = document.querySelector("[data-minutes]");
const secondsReflection = document.querySelector("[data-seconds]");

startBtn.disabled = true;

let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if(selectedDate <= now) {
        startBtn.disabled = true;
        iziToast.warning({
            message: "Please choose a date in the future",
            position: "topRight",
            backgroundColor: "red",
            timeout: 3000,
            progressBar: false,
            messageColor: "white",
            icon: "",
            iconUrl: new URL('../img/error.svg', import.meta.url).href,
        })
    } else {
        userSelectedDate = selectedDate;
        startBtn.disabled = false;
    }
  },
};

flatpickr(dateInput, options);

startBtn.addEventListener("click", handleClick);

function handleClick() {
    if(!userSelectedDate) return;

    startBtn.disabled = true;
    dateInput.disabled = true;

    timerId = setInterval(() => {
        const now = new Date();
        const difference = userSelectedDate - now;

        if(difference <= 0) {
            clearInterval(timerId);
            updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            dateInput.disabled = false;
            return;
        }

        const time = convertMs(difference);
         updateTimerInterface(time);

    }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}


function updateTimerInterface({ days, hours, minutes, seconds}) {
    daysReflection.textContent = addLeadingZero(days);
    hoursReflection.textContent = addLeadingZero(hours);
    minutesReflection.textContent = addLeadingZero(minutes);
    secondsReflection.textContent = addLeadingZero(seconds);
}


