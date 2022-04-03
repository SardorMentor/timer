let minutes = 0;
let seconds = 0;
let appendMinutes = document.getElementById("minutes");
let appendSeconds = document.getElementById("seconds");
let addBtn = document.getElementById("add");
let toggleBtn = document.getElementById("toggle");
let resetBtn = document.getElementById("reset");
let intervalsArr = [];
let intervalFunc;

if (localStorage.getItem("localStorageMinutes") !== null) {
  seconds = localStorage.getItem("localStorageSeconds");
  minutes = localStorage.getItem("localStorageMinutes");
}

const startTimer = () => {
  seconds++;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  appendSeconds.innerHTML = seconds;

  if (seconds == 59) {
    minutes++;
    seconds = 0;
  }

  minutes = +minutes;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  appendMinutes.innerHTML = minutes;
};

const toggle = () => {
  if (localStorage.getItem("localStorageMinutes") !== null) {
    let localMinutes = +localStorage.getItem("localStorageMinutes");
    let localSeconds = +localStorage.getItem("localStorageSeconds");
    let localSum = localMinutes * 60 + localSeconds;
    minutes = +minutes;
    seconds = +seconds;
    let sum = minutes * 60 + seconds;

    if (sum >= localSum) {
      localSeconds = localSeconds < 10 ? "0" + localSeconds : localSeconds;
      localMinutes = localMinutes < 10 ? "0" + localMinutes : localMinutes;
      appendMinutes.innerHTML = localMinutes;
      appendSeconds.innerHTML = localSeconds;
    }
  }

  if (toggleBtn.innerHTML == "Start") {
    intervalFunc = setInterval(startTimer, 1000);
    toggleBtn.innerHTML = "Pause";
    addBtn.removeAttribute("disabled");
    resetBtn.removeAttribute("disabled");
  } else {
    clearInterval(intervalFunc);
    toggleBtn.innerHTML = "Start";
    appendMinutes.innerHTML = minutes;
    appendSeconds.innerHTML = seconds;
  }
};

// Add Btn
addBtn.addEventListener("click", () => {
  intervalsFunc();
  createIntervalElementsFunc();
});




// Toggle Btn
toggleBtn.addEventListener("click", toggle);


// Reset Btn
resetBtn.addEventListener("click", () => {
  clearInterval(intervalFunc);
  addBtn.setAttribute("disabled", "");
  resetBtn.setAttribute("disabled", "");
  toggleBtn.innerHTML = "Start";
  seconds = "00";
  minutes = "00";
  appendSeconds.innerHTML = seconds;
  appendMinutes.innerHTML = minutes;
  localStorage.removeItem("localStorageMinutes");
  localStorage.removeItem("localStorageSeconds");
  localStorage.removeItem("intervals");
  intervalsArr = [];
  createIntervalElementsFunc();
});


// Intervals funciton
const intervalsFunc = () => {
  if (localStorage.getItem("intervals") !== null) {
    let intervalalsString = localStorage.getItem("intervals")
    let values = intervalalsString.split(",")
    
    for (let item of values) {
      intervalsArr.push(item)
    }
    
    
  }
  
  let addedMinutes = +minutes;
  let addedSeconds = +seconds;
  let sum = addedMinutes * 60 + addedSeconds;
  sum = "" + sum
  intervalsArr.unshift(sum)
  let newIntervalsArr = [...new Set(intervalsArr)]
  localStorage.setItem("intervals", newIntervalsArr);
  console.log(newIntervalsArr);
  
}

const createIntervalElementsFunc = () => {
  if (localStorage.getItem("intervals") !== null) {
    let intervalalsString = localStorage.getItem("intervals")
    let values = intervalalsString.split(",")

    document.querySelector(".intervals").innerHTML = "";
    
    values.map((item) => {
      let el = document.createElement("li");
      item = +item;
      let minutesItem = Math.floor(item / 60)
      let secondsItem = item % 60;

      secondsItem = secondsItem < 10 ? "0" + secondsItem : secondsItem;
      minutesItem = minutesItem < 10 ? "0" + minutesItem : minutesItem;
      item = minutesItem + " : " + secondsItem;
      el.innerHTML = item;
      document.querySelector(".intervals").appendChild(el)
    })
    console.log(values);
    
  } else {
    document.querySelector(".intervals").innerHTML = "";
  }
}

createIntervalElementsFunc()


// Window functions
window.addEventListener("beforeunload", () => {
  if (seconds != 0 || minutes != 0) {
    localStorage.setItem("localStorageMinutes", minutes);
    localStorage.setItem("localStorageSeconds", seconds);
  }

});

window.addEventListener("load", () => {
  if (localStorage.getItem("localStorageMinutes") !== null) {
    toggle();
  }
});
