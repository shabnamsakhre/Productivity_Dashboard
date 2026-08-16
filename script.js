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