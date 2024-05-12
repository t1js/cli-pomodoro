import { createInterface } from 'readline';

import { stdin as input, stdout as output } from 'process';

const rl = createInterface( { input, output });

const workDuration = 25;
const shortBreakDuration = 5;
const longBreakDuration = 25;
const pomodoroCycles = 4;


function startTimer() {
    console.log("Timer started. Let's do this!");

for (let i = 1; i < pomodoroCycles; i++) {
    setTimeout(() => {
        console.log("Cycle " + i + " is finised! Let's have a break.");
    }, (workDuration * 60 * 1000 * i) + (shortBreakDuration * 60 * 1000 * (i - 1)));

    setTimeout(() => {
        console.log("Time is up! Let's get back to work.")
    }, (workDuration * 60 * 1000 * i) + (shortBreakDuration * 60 * 1000 * i));
};

setTimeout(() => {
    console.log("You did 4 amazing pomodoro cycles and deserve some rest. I'll let you know when you can get back to work.");
    setTimeout(() => {
        console.log("Your long break is done. Restart the timer for another pomodoro session.");
        rl.close();
    }, longBreakDuration * 60 * 1000);
}, (workDuration * 60 * 1000 * pomodoroCycles) + (shortBreakDuration * 60 * 1000 * (pomodoroCycles - 1)));
}

let isFirstTime = true;

function startPomodoro() {
    if (isFirstTime) {
    rl.question("Press P (for pomodoro) to start timer: ", (answer) => {
        if (answer === "P" || answer === "p") {
            startTimer();
        } else {
            console.log("Unsupported input, try again.");
            startPomodoro();
    }
    isFirstTime = false;
})
    } else {
    rl.question("Press P (for pomodoro) to start timer or E to exit: ", (answer) => {
        if (answer === "P" || answer === "p") {
            startTimer();
        } else if (answer === "E" || answer === "e") {
            console.log("Exiting the program. See you later!")
            rl.close();
          }  else {
            console.log("Unsupported input, try again.");
            startPomodoro();
    }
})
}
}

startPomodoro();