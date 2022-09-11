var millisecondsTime = 0;
var offset = Date.now();

let interval = null;

let timerRunning = false;
const playPauseID = "playPause";
const displayID = "displayText";

function stopWatch() {
    function delta() {
        var now = Date.now();
        var timePassed = new Date(now) - offset;
        offset = now;
        return timePassed;
    }

    millisecondsTime += delta();
    var secondsTime = Math.round(millisecondsTime / 10) / 100;
    var secondsRounded = Math.floor(millisecondsTime / 1000);

    var seconds = Math.round((secondsTime % 60) * 100) / 100;
    var minutes = Math.round(Math.floor(secondsRounded / 60) % 60);
    var hours = Math.round(Math.floor(secondsRounded / 3600) % 24);
    var days = Math.round(Math.floor(secondsRounded / 86400));

    var displaySeconds = seconds.toString();
    var displayMinutes = minutes.toString();
    var displayHours = hours.toString();


    document.getElementById(displayID).innerHTML = timeFormater();
    document.title = "Stopwatch " + titleFormatter();

    function timeFormater() {
        function addZeroBeforeUnit() {
            if (secondsTime > 60 && seconds < 10) {
                displaySeconds = "0" + displaySeconds;
            }
        }

        if (secondsTime > 3600 && displayMinutes.length === 1) {
            displayMinutes = "0" + displayMinutes;
        }

        if (days > 0 && displayHours.length === 1) {
            displayHours = "0" + displayHours;
        }

        if (days > 0) {
            displaySeconds = (Math.round(secondsRounded % 60)).toString();
            addZeroBeforeUnit();
        }
        else if (hours > 0) {
            displaySeconds = ((Math.round(seconds * 10) / 10) % 60).toString();
            addZeroBeforeUnit();
            if (displaySeconds.length === 2) {
                displaySeconds += ".0";
            }
        }
        else {
            addZeroBeforeUnit();
            if (secondsTime > 10) {
                if (displaySeconds.length === 2) {
                    displaySeconds += ".00";
                }
                else if (displaySeconds.length === 4) {
                    displaySeconds += "0";
                }
            }
            else {
                if (displaySeconds.length === 1) {
                    displaySeconds += ".00";
                }
                else if (displaySeconds.length === 3) {
                    displaySeconds += "0";
                }
            }
        }

        if (days > 0) {
            return days.toString() + ":" + displayHours + ":" + displayMinutes + ":" + displaySeconds;
        }
        else if (hours > 0) {
            return displayHours + ":" + displayMinutes + ":" + displaySeconds;
        }
        else if (minutes > 0) {
            return displayMinutes + ":" + displaySeconds;
        }
        else {
            return displaySeconds;
        }
    }

    function titleFormatter(){
        seconds = Math.round(secondsRounded % 60);
        displaySeconds = seconds.toString();

        if (seconds < 10) {
            displaySeconds = "0" + displaySeconds;
        }
        
        if (displayMinutes.length === 1) {
            displayMinutes = "0" + displayMinutes;
        }

        if (displayHours.length === 1) {
            displayHours = "0" + displayHours;
        }

        if (days > 0) {
            return days.toString() + ":" + displayHours + ":" + displayMinutes + ":" + displaySeconds;
        }
        else if (hours > 0) {
            return displayHours + ":" + displayMinutes + ":" + displaySeconds;
        }
        else{
            return displayMinutes + ":" + displaySeconds;
        }
    }
}

function playPause() {
    if (timerRunning === false) {
        offset = Date.now();
        interval = window.setInterval(stopWatch, 10);
        document.getElementById(playPauseID).innerHTML = "Stop";
        timerRunning = true;
    } else {
        window.clearInterval(interval);
        document.getElementById(playPauseID).innerHTML = "Play";
        timerRunning = false;
        document.title += " (Paused)";
    }
}

function reset() {
    window.clearInterval(interval);
    timerRunning = false;
    millisecondsTime = 0;
    document.title = "Stopwatch";
    document.getElementById(displayID).innerHTML = "0.00";
    document.getElementById(playPauseID).innerHTML = "Play";
}