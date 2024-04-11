const timerEl = document.getElementById("timer");
const startTimerBtn = document.getElementById("start-timer");
const stopTimerBtn = document.getElementById("stop-timer");
const resetTimerBtn = document.getElementById("reset-timer");

let seconds = 0,
  minutes = 0,
  hours = 0;

timerEl.textContent = `${addPadding(hours)}:${addPadding(minutes)}:${addPadding(
  seconds
)}`;

let timer;

startTimerBtn.addEventListener("click", startTimer);
stopTimerBtn.addEventListener("click", stopTimer);
resetTimerBtn.addEventListener("click", resetTimer);

/* Functions */

// addPadding - to maintain the time string in HH:MM:SS format
function addPadding(str) {
  return str.toString().padStart(2, "0");
}

/* 
startTimer function performs the following:
- Timer should start and update the time string after every second
- Disable start button
- Play sound
- Once stopped, startTimer function should consider the time value when stopped and continue from there
*/
function startTimer() {
  startTimerBtn.disabled = true;

  timer = setInterval(() => {
    seconds++;

    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }

    if (minutes == 60) {
      hours++;
      minutes = 0;
    }
    timerEl.textContent = `${addPadding(hours)}:${addPadding(
      minutes
    )}:${addPadding(seconds)}`;
  }, 1000);

  setTimeout(() => document.getElementById("timer-sound").play(), 1000);
}

/* 
stopTimer function performs the following:
- Timer should stop
- Enable start button
- Stop sound
*/
function stopTimer() {
  clearInterval(timer);
  startTimerBtn.disabled = false;
  document.getElementById("timer-sound").pause();
}

/* 
resetTimer function performs the following:
- Timer should stop
- Reset timer related parameters & update the time string to 00:00:00
- Enable start button
- Handle sound
*/
function resetTimer() {
  clearInterval(timer);
  seconds = 0;
  minutes = 0;
  hours = 0;

  startTimerBtn.disabled = false;
  document.getElementById("timer-sound").pause();
  const resetSound = document.getElementById("reset-sound");
  resetSound.load();
  resetSound.play();

  setTimeout(() => {
    resetSound.pause();
    timerEl.textContent = `${addPadding(hours)}:${addPadding(
      minutes
    )}:${addPadding(seconds)}`;
  }, 700);
}
