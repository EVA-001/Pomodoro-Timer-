const start = document.getElementById("start");
const stop = document.getElementById("stop");
const restart = document.getElementById("restart");
const timer = document.getElementById("timer");
const quickBreak = document.getElementById("quick-break");
const studyBtn = document.getElementById("study-btn");
const quickBreakBtn = document.getElementById("quick-break-btn");

let timeLeft = 1500; // default 25 minutes
let interval = null;
let currentMode = "study"; // 'study' or 'break'
let isRunning = false;

const updateTimerDisplay = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formatted = `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
    
    if (currentMode === "study") {
        timer.innerHTML = formatted;
    } else {
        quickBreak.innerHTML = formatted;
    }
};

const setMode = (mode) => {
    clearInterval(interval);
    isRunning = false;
    currentMode = mode;

    if (mode === "study") {
        timeLeft = 1500;
        timer.style.display = "block";
        quickBreak.style.display = "none";
    } else {
        timeLeft = 300;
        timer.style.display = "none";
        quickBreak.style.display = "block";
    }

    updateTimerDisplay();
};

const startTimer = () => {
    if (isRunning) return;
    isRunning = true;

    interval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft == 0) {
            clearInterval(interval);
            isRunning = false;

            if (currentMode === "study") {
                alert("You did great! Now it's time for a break.");
                setMode("break");
            } else {
                alert("Break over! Back to work.");
                setMode("study");
            }
        }
    }, 1000);
};

const stopTimer = () => {
    clearInterval(interval);
    isRunning = false;
};

const resetTimer = () => {
    stopTimer();
    if (currentMode === "study") {
        timeLeft = 1500;
    } else {
        timeLeft = 300;
    }
    updateTimerDisplay();
};

// Button event listeners
studyBtn.addEventListener("click", () => setMode("study"));
quickBreakBtn.addEventListener("click", () => setMode("break"));
start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
restart.addEventListener("click", resetTimer);

