let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function timeToString(time) {
  const date = new Date(time);
  const mins = String(date.getUTCMinutes()).padStart(2, "0");
  const secs = String(date.getUTCSeconds()).padStart(2, "0");
  const ms = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, "0");
  return `${mins}:${secs}:${ms}`;
}

function updateDisplay() {
  display.textContent = timeToString(elapsedTime);
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
}

function pauseTimer() {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(timerInterval);
}

function resetTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  lapsList.innerHTML = "";
}

function addLap() {
  if (!isRunning) return;
  const li = document.createElement("li");
  li.textContent = `Lap: ${timeToString(elapsedTime)}`;
  lapsList.appendChild(li);
}

// Event listeners
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);
