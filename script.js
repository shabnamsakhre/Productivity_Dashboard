function openFeature() {
    const allElem = document.querySelectorAll('.elem')
    const fullElem = document.querySelectorAll('.fullElem')
    const fullElemCloseBtn = document.querySelectorAll('.close')

    allElem.forEach((elm) => {
        elm.addEventListener('click', () => {
            fullElem[elm.id].style.display = 'block'
        })
    })

    fullElemCloseBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            fullElem[btn.id].style.display = 'none'
        })
    })
}

openFeature()


function todoList() {
    // Implement add task into list
    let taskList = []

    let allTask = document.querySelector('.allTask')

    function renderTask() {
        let sum = ''

        taskList.forEach((t, idx) =>
            sum += `<div class="task">
                    <h5>${t.task} <span class="task-imp ${t.imp}">imp</span></h5>
                    <button id="${idx}">Mark as Completed</button>
                </div>`
        )

        allTask.innerHTML = sum;
        localStorage.setItem('taskList', JSON.stringify(taskList))

        if (JSON.parse(localStorage.getItem('taskList')).length === 0)
            allTask.innerHTML = "<span style='display: block; text-align: center; font-size: large;'>No task found!</span>"

        document.querySelectorAll('.task button').forEach(btn =>
            btn.addEventListener('click', () => {
                taskList.splice(btn.id, 1)
                renderTask()
            })
        );
    }

    if (localStorage.getItem('taskList')) {
        taskList = JSON.parse(localStorage.getItem('taskList'))
        renderTask()
    }
    else allTask.innerHTML = "<span style='display: block; text-align: center; font-size: large;'>No task found!</span>"



    let taskForm = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form input');
    let taskDetailsInput = document.querySelector('.addTask form textarea');
    let taskCheckbox = document.querySelector('.addTask form #check');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let task = taskInput.value;
        let details = taskDetailsInput.value
        let imp = taskCheckbox.checked

        if (task === "")
            return alert("Task field is required")

        if (details === "")
            return alert("Task details field is required")

        taskList.push({
            task,
            details,
            imp
        })

        renderTask()

        taskInput.value = ''
        taskDetailsInput.value = ''
        taskCheckbox.checked = false
    })
}

todoList()


function dailyPlanner() {
    let dayPlanner = document.querySelector('.day-planner');

    let dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {};

    let hours = Array.from({ length: 18 },
        (_, idx) => `${6 + idx} - ${7 + idx}`);

    let wholeDaySum = ''
    hours.forEach((elem, idx) => {
        let savedData = dayPlanData[idx] || ''

        wholeDaySum += `<div class="day-planner-time">
        <p>${elem}</p>
        <input id=${idx} type="text" placeholder="..." value=${savedData}>
        </div>`
    })

    dayPlanner.innerHTML = wholeDaySum;

    let dayPlannerInput = document.querySelectorAll('.day-planner-time input');

    dayPlannerInput.forEach(input =>
        input.addEventListener('input', () => {
            dayPlanData[input.id] = input.value

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    )
}

dailyPlanner()


// function fetchQuote() {
//     let response = fetch('https://api.quotable.io/random')
//         .then((res) => res.json())
//         .then((data) => console.log(data))
//         .catch((error) => console.log(error))
// }
// fetchQuote()


function motivationalQuote() {
    let motivationalContent = document.querySelector('.motivational-wrapper h2')
    let motivationalAuthor = document.querySelector('.motivational-wrapper h5')

    async function fetchQuote() {
        let response = await fetch('http://api.quotable.io/random')
        let data = await response.json();

        motivationalContent.innerHTML = data.content;
        motivationalAuthor.innerHTML = '~ ' + data.author
    }

    fetchQuote()
}

motivationalQuote();

function pomodoroTimer() {
    let timer = document.querySelector('.pomo-timer h1');
    let session = document.querySelector('.pomo-timer .session')
    let startBtn = document.querySelector('.pomo-timer .start-timer')
    let pauseBtn = document.querySelector('.pomo-timer .pause-timer')
    let resetBtn = document.querySelector('.pomo-timer .reset-timer')

    let totalSeconds = 25 * 60;
    let timerInterval = null;
    isWorkSession = true;

    function updateTime() {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60

        timer.innerHTML = `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`
    }
    updateTime();

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkSession) {
            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateTime()
                }
                else {
                    clearInterval(timerInterval);
                    totalSeconds = 15 * 60
                    isWorkSession = false;
                    timer.innerHTML = '15 : 00'
                    session.innerHTML = "Break"
                    session.style.backgroundColor = 'var(--blue)'
                }
            }, 1000)
        }
        else {
            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateTime()
                }
                else {
                    clearInterval(timerInterval);
                    totalSeconds = 25 * 60
                    isWorkSession = true;
                    timer.innerHTML = '25 : 00'
                    session.innerHTML = "Work Session"
                    session.style.backgroundColor = 'var(--green)'
                }
            }, 1000)
        }
    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }

    function resetTimer() {
        if (isWorkSession) totalSeconds = 25 * 60;
        else totalSeconds = 15 * 60;
        pauseTimer()
        updateTime()
    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)
}

pomodoroTimer()


function dailyGoals() {
    let allGoalsList = [
        {
            input: "Hello",
            description: "Hi, How are you?",
            time: "12:10:12",
            isCompleted: false
        }
    ]

    let addGoalForm = document.querySelector('.addGoal form')
    let goalInput = document.querySelector('.addGoal form input')
    let goalDescription = document.querySelector('.addGoal form textarea')
    let goalsList = document.querySelector('.allGoals');

    function renderGoals() {
        allGoalsList = JSON.parse(localStorage.getItem('dailyGoalsList')) || []

        if (allGoalsList.length === 0) return goalsList.innerHTML = "<h3 style='width: 100%; text-align: center;'>No Daily Task!</h3>"

        let list = ""
        allGoalsList.forEach((goal, idx) => list += `<div class="goal" id="goal-${idx}">
                        <input type="checkbox" id=${idx}>
                        <h3>${goal.input}</h3>
                        <hr>
                        <p>${goal.description}</p>
                        <span>${goal.time}</span>
                    </div>`)

        goalsList.innerHTML = list;
    }

    renderGoals();

    addGoalForm.addEventListener('submit', (e) => {
        e.preventDefault()

        allGoalsList.push({
            input: goalInput.value,
            description: goalDescription.value,
            time: new Date().toLocaleTimeString(),
            isCompleted: false
        })

        localStorage.setItem('dailyGoalsList', JSON.stringify(allGoalsList));
        renderGoals()

        goalInput.value = ''
        goalDescription.value = ''
    })

    function isGoalCompleted() {
        let allCheckbox = document.querySelectorAll('.goal input')

        allCheckbox.forEach(input => {
            input.addEventListener('click', () => {
                let isCheck = allGoalsList[input.id].isCompleted;
                let elem = document.querySelector(`#goal-${input.id}`)

                if (!isCheck) {
                    allGoalsList[input.id].isCompleted = true;
                    elem.style.opacity = 0.9
                    elem.style.textDecoration = "line-through"
                }
                else {
                    allGoalsList[input.id].isCompleted = false;
                    elem.style.opacity = 1
                    elem.style.textDecoration = "none"
                }
            })
        })
    }
    isGoalCompleted()
}

dailyGoals()


// Set the current location and Weather details
async function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    weatherAPICall(latitude, longitude)
}

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
getMyLocation()


const apiKey = '87cf32deedd9442793a70453250305'
// const city = 'Nagpur'

let data = null;

async function weatherAPICall(latitude, longitude) {
    let res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`)
    data = await res.json()

    document.querySelector('.header1 h3').innerHTML = `${data.location.name}, ${data.location.region}`
}

// weatherAPICall()

let headerDate = document.querySelector('.header1 h2')
let headerTime = document.querySelector('.header1 h1')

function timeDate() {
    let date = new Date();

    let todayDate = date.getDate()
    let year = date.getFullYear()
    let monthName = date.toLocaleString('default', { month: 'long' });
    let dayName = new Date().toLocaleString('en-US', { weekday: 'long' });
    let time = date.toLocaleTimeString()

    headerDate.innerHTML = `${monthName} ${todayDate}, ${year}`
    headerTime.innerHTML = `${dayName}, ${time}`
}

setInterval(function () {
    timeDate()
}, 1000)