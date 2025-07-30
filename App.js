const studyBtn = document.getElementById("study-btn");
const quickBreakBtn = document.getElementById("quick-break-btn");
const longBreakBtn = document.getElementById("long-break-btn");
const allModeButtons = [studyBtn, quickBreakBtn, longBreakBtn];

const toggleBtn = document.getElementById("toggle-timer");
const restart = document.getElementById("restart");

const timer = document.getElementById("timer");
const quickBreak = document.getElementById("quick-break");
const longBreak = document.getElementById("long-break");

let timeLeft = 1500; // 25 min
let interval = null;
let currentMode = "study";
let isRunning = false;

const updateTimerDisplay = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatted = `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;

  if (currentMode === "study") {
    timer.innerHTML = formatted;
  } else if (currentMode === "short-break") {
    quickBreak.innerHTML = formatted;
  } else if (currentMode === "long-break") {
    longBreak.innerHTML = formatted;
  }
};

const setMode = (mode) => {
  clearInterval(interval);
  isRunning = false;
  currentMode = mode;

  allModeButtons.forEach(btn => btn.classList.remove("active"));
  if (mode === "study") {
    studyBtn.classList.add("active");
    timeLeft = 1500;
    timer.style.display = "block";
    quickBreak.style.display = "none";
    longBreak.style.display = "none";
  } else if (mode === "short-break") {
    quickBreakBtn.classList.add("active");
    timeLeft = 300;
    timer.style.display = "none";
    quickBreak.style.display = "block";
    longBreak.style.display = "none";
  } else if (mode === "long-break") {
    longBreakBtn.classList.add("active");
    timeLeft = 900;
    timer.style.display = "none";
    quickBreak.style.display = "none";
    longBreak.style.display = "block";
  }

  updateTimerDisplay();
  toggleBtn.textContent = "Start";
};

const stopTimer = () => {
  clearInterval(interval);
  isRunning = false;
  toggleBtn.textContent = "Start";
};

const toggleTimer = () => {
  if (!isRunning) {
    isRunning = true;
    toggleBtn.textContent = "Stop";

    interval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(interval);
        isRunning = false;
        updateTimerDisplay();
        toggleBtn.textContent = "Start";

        if (currentMode === "study") {
          alert("You did great! Now it's time for a short break.");
          setMode("short-break");
        } else {
          alert("Break over! Back to study mode.");
          setMode("study");
        }
      }
    }, 1000);
  } else {
    stopTimer();
  }
};

const resetTimer = () => {
  stopTimer();
  if (currentMode === "study") timeLeft = 1500;
  else if (currentMode === "short-break") timeLeft = 300;
  else if (currentMode === "long-break") timeLeft = 900;
  updateTimerDisplay();
};

studyBtn.addEventListener("click", () => setMode("study"));
quickBreakBtn.addEventListener("click", () => setMode("short-break"));
longBreakBtn.addEventListener("click", () => setMode("long-break"));
toggleBtn.addEventListener("click", toggleTimer);
restart.addEventListener("click", resetTimer);

// Initialize default mode on page load
setMode("study");

