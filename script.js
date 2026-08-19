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