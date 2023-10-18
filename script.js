"use strict"

let hours = [0, "hours"];
let minutes = [0, "minutes"];
let seconds = [0, "seconds"];


//first write creates the base forms and prepare the timer
function firstWrite () {


    let max = 24;

    let timerForm = document.createElement("form");
            timerForm.name = "number";
            timerForm.action  = "";
            timerForm.method = "GET";
            timerForm.id = "form";
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

    var button = document.createElement("input");
            button.type = "submit";
            button.id = "btnSendMail";
            button.value = "ENTER TIME";
            button.setAttribute("onclick", "getTime()");
            timerForm.appendChild(button);
}


firstWrite();

//get the time from the forms
function getTime () {
    // number will be the total time that it takes to end the time (in seconds)
    let number = 0;

    for (let j = 0; j < 3; j++ ) {
        let formId = "form" + j
        let value = (document.getElementById(formId).value);
        console.log(value)
    }
    startTimer(number)
}

function startTimer (number) {

    for (let i = number; i > 0; i--) {
        seconds--;
        if (hours == 0 && minutes == 0 && seconds == 0) {
            alert('time is up');
        } else if (minutes == 0 && seconds == 0) {
            minutes = 59;
            seconds = 60;
            hours--;
        } else if (seconds == 0) {
            seconds = 60;
            minutes--;
        }
        number--;
        sleep(1000);
    }
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
