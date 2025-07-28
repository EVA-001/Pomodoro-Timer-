const start = document.getElementById("start");
const stop = document.getElementById("stop");
const restart = document.getElementById("restart");
const timer = document.getElementById("timer");
const quickBreak = document.getElementById("quick-break");
const quickBreakBtn = document.getElementById("quick-break-btn");

let timeLeft = 1500; // 25 minutes
let interval;

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.innerHTML = `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
};

const updateBreakTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    quickBreak.innerHTML = `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
};

const startTimer = () => {
    timer.style.display = "block";
    quickBreak.style.display = "none";

    clearInterval(interval);
    timeLeft = 1500;
    updateTimer();

    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(interval);
            alert("Time's up!");
            timeLeft = 1500;
            updateTimer();
        }
    }, 1000);
};

const startBreak = () => {
    timer.style.display = "none";
    quickBreak.style.display = "block";

    clearInterval(interval);
    timeLeft = 300;
    updateBreakTimer();

    interval = setInterval(() => {
        timeLeft--;
        updateBreakTimer();

        if (timeLeft === 0) {
            clearInterval(interval);
            alert("Break over! Back to work.");
            timeLeft = 1500;
            updateTimer();
            timer.style.display = "block";
            quickBreak.style.display = "none";
        }
    }, 1000);
};

const stopTimer = () => clearInterval(interval);

const resetTimer = () => {
    
    if(quickBreak.style.display == "block" &&  timer.style.display == "none") {
        clearInterval(interval);
        timeLeft = 300;
        updateBreakTimer();
    } else {
        clearInterval(interval);
        timeLeft = 1500;
        updateTimer();
    }
};

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
restart.addEventListener("click", resetTimer);
quickBreakBtn.addEventListener("click", startBreak);

