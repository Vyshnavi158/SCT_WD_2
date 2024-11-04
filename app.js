let startTime = 0;
    let updatedTime = 0;
    let difference = 0;
    let timerInterval = null;
    let running = false;
    let laps = [];
    
    const timeDisplay = document.getElementById('timeDisplay');
    const startStopBtn = document.getElementById('startStopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsList = document.getElementById('lapsList');
    
    startStopBtn.addEventListener('click', function() {
        if (!running) {
            startTimer();
        } else {
            stopTimer();
        }
    });
    
    resetBtn.addEventListener('click', resetTimer);
    
    lapBtn.addEventListener('click', recordLap);
    
    function startTimer() {
        startTime = Date.now() - difference;
        timerInterval = setInterval(updateTimer, 100);
        running = true;
        startStopBtn.textContent = "Pause";
        lapBtn.disabled = false;
    }
    
    function stopTimer() {
        clearInterval(timerInterval);
        difference = Date.now() - startTime;
        running = false;
        startStopBtn.textContent = "Start";
    }
    
    function resetTimer() {
        clearInterval(timerInterval);
        startTime = 0;
        updatedTime = 0;
        difference = 0;
        running = false;
        startStopBtn.textContent = "Start";
        timeDisplay.textContent = "00:00:00";
        laps = [];
        lapBtn.disabled = true;
        lapsList.innerHTML = '';
    }
    
    function updateTimer() {
        updatedTime = Date.now() - startTime;
        timeDisplay.textContent = formatTime(updatedTime);
    }
    
    function recordLap() {
        laps.push(updatedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${formatTime(updatedTime)}`;
        lapsList.appendChild(lapItem);
    }
    
    function formatTime(time) {
        let hours = Math.floor(time / (1000 * 60 * 60));
        let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((time % (1000 * 60)) / 1000);
    
        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
    
        return `${hours}:${minutes}:${seconds}`;
    }
    