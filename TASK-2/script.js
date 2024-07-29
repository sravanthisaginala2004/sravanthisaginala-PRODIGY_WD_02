// script.js

let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let lapCounter = 0;
let splitCounter = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const splitButton = document.getElementById('split');
const laps = document.getElementById('laps');
const splits = document.getElementById('splits');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTimer, 1);
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
    }
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
}

function formatTime(milliseconds) {
    let date = new Date(milliseconds);
    let minutes = ('0' + date.getUTCMinutes()).slice(-2);
    let seconds = ('0' + date.getUTCSeconds()).slice(-2);
    let millisecondsStr = ('000' + date.getUTCMilliseconds()).slice(-3);
    return `${minutes}:${seconds}:${millisecondsStr}`;
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00.000';
    laps.innerHTML = '';
    splits.innerHTML = '';
    lapCounter = 0;
    splitCounter = 0;
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function recordLap() {
    if (running) {
        lapCounter++;
        let lapTime = formatTime(difference);
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapItem);
    }
}

function recordSplit() {
    if (running) {
        splitCounter++;
        let splitTime = formatTime(difference);
        let splitItem = document.createElement('li');
        splitItem.textContent = `Split ${splitCounter}: ${splitTime}`;
        splits.appendChild(splitItem);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
splitButton.addEventListener('click', recordSplit);
