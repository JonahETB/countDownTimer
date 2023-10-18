"use strict"

// amount/count , text for , div needed for seconds
let time = {
    hours : [0, "hours", 3600],
    minutes : [0, "minutes", 60],
    seconds : [0, "seconds", 1]
}
let alreadyRun; // for deletign previous code if it was previously run

//first write creates the base forms and prepare the timer
function firstWrite () {

    let max = 24;

    const formsOutSide = document.createElement("div");
            formsOutSide.id = "formsOutSide";
            document.body.appendChild(formsOutSide);

    const timerForm = document.createElement("form");
            timerForm.name = "number";
            timerForm.action  = "";
            timerForm.method = "GET";
            timerForm.id = "form";
            timerForm.setAttribute("onSubmit", "return false;");
            formsOutSide.appendChild(timerForm);

    for (let j = 0; j < 3; j++) {
        let formId = "form" + j
        if (j == 1) {
            max = 60;
        }

        const timerInput = document.createElement("input");
                timerInput.type = "number";
                timerInput.name = "time";
                timerInput.min = 0;
                timerInput.id = formId;
                timerInput.setAttribute("onInput", `inputCheck("${formId}", ${max})`);
                timerInput.setAttribute("onkeypress", `return event.charCode >= 48 && event.charCode <= 57`);
                timerForm.appendChild(timerInput);
    }

    const submit = document.createElement("input");
            submit.type = "submit";
            submit.value = "ENTER";
            submit.setAttribute("onclick", "getTime()");
            timerForm.appendChild(submit);
}


firstWrite();

//get the time from the forms
function getTime () {
    // number will be the total time that it takes to end the time (in seconds)
    let number = 0;
    let num = 0;
    for (let j = 0; j < 3; j++ ) {
        let formId = "form" + j
        let value = (document.getElementById(formId).value);

        if (j === 0) {
            time.hours[0] = value;
            num = time.hours[2];
        } else if (j === 1) {
            time.minutes[0] = value;
            num = time.minutes[2];
        } else {
            time.seconds[0] = value;
            num = time.seconds[2];
        }
        number += convert(value, num);
    }
    startTimer(number);
}

// startTimer functinos as a way to countdown the seconds and minutes
 async function startTimer (number) {
    if (alreadyRun) {
        document.getElementById("timer").remove();
    }
    alreadyRun = true;

    const timer = document.createElement("div");
            timer.id = "timer";
            document.body.appendChild(timer);

    const hoursElement = document.createElement("p");
            hoursElement.id = "hoursId";
    const hoursT = document.createTextNode("0");
            hoursElement.appendChild(hoursT);
            timer.appendChild(hoursElement);

    const minutesElement = document.createElement("p");
            minutesElement.id = "minutesId";
    const minutesT = document.createTextNode("0");
            minutesElement.appendChild(minutesT)
            timer.appendChild(minutesElement);

    const secondsElement = document.createElement("p");
            secondsElement.id = "secondsId";
    const secondsT = document.createTextNode("0");
            secondsElement.appendChild(secondsT)
            timer.appendChild(secondsElement);

    for (let i = number; i > 0; i--) {
        if (time.seconds[0] === 0 || time.seconds[0] <= 0) {
            if (time.minutes[0] === 0 || time.minutes[0] <= 0) {
                if (time.hours[0] === 0 || time.hours[0] <= 0) {
                    alert("Time is up");
                } else {
                    time.hours[0]--;
                    time.minutes[0] += 59;
                    time.seconds[0] += 59;
                }
            } else {
                time.minutes[0]--;
                time.seconds[0] += 59;
            }
        } else {
            time.seconds[0]--;
        }
        document.getElementById("hoursId").innerHTML = time.hours[0];
        document.getElementById("minutesId").innerHTML = time.minutes[0];
        document.getElementById("secondsId").innerHTML = time.seconds[0];
        await sleep(1000);
    }
}

function convert (value, num) {
    return value * num;
}

//checks the input is over 60
function inputCheck (id, max) {
    let elementinput = document.getElementById(id);
    let num = +elementinput.value;
    
    if (num > max) {
        elementinput.value = max
    } 
}

// makes the code wait a second
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
