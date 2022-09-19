import {
    taskStorage
} from "./storage.js";
import {
    format,
    isThisISOWeek,
} from "date-fns";
import {
    assignTaskId
} from "./todos.js"
import {
    init
} from "../index.js"

const taskLoader = (() => {

    // loads all the tasks in the array
    const allTasks = () => {
        const ul = document.querySelector("#allList")
        while (ul.firstChild) ul.removeChild(ul.firstChild)
        if (taskStorage.tasks === null) {
            taskStorage.tasks = []
        } else {
            for (let task of taskStorage.tasks) {
                _listDom("#allList", task)
            }
        }
    }
    // loads up tasks from the array that match today
    const todayTasks = () => {
        let ul = document.querySelector("#todayList")
        while (ul.firstChild) ul.removeChild(ul.firstChild)
        for (let task of taskStorage.tasks) {
            if (format(new Date(), "P") === task.dueDate) {
                _listDom("#todayList", task)
            }
        }
    }
    // loads up tasks from the array that match the current week
    const weekTasks = () => {
        let ul = document.querySelector("#weekList")
        while (ul.firstChild) ul.removeChild(ul.firstChild)
        for (let task of taskStorage.tasks) {
            if (isThisISOWeek(new Date(task.dueDate)) === true) {
                _listDom("#weekList", task)
            }
        }
    }
    // DOM creation function which makes the lists
    const _listDom = (list, task) => {
        let ul = document.querySelector(list)
        const div = document.createElement("div")
        const dateDiv = document.createElement("div")
        const li = document.createElement("li")
        li.textContent = `${task.title}`;
        const deleteTaskBtn = document.createElement("span")
        const editTaskBtn = document.createElement("span")
        const infoBtn = document.createElement("span")
        infoBtn.dataset.id = task.id
        infoBtn.id = "infoBtn"
        infoBtn.classList = "fa-solid fa-info"
        editTaskBtn.dataset.id = task.id
        editTaskBtn.id = "editTaskBtn"
        editTaskBtn.classList = "fa-regular fa-pen-to-square";
        deleteTaskBtn.id = "deleteTaskBtn"
        deleteTaskBtn.classList = "fa-regular fa-trash-can"
        deleteTaskBtn.dataset.id = task.id
        dateDiv.textContent = task.dueDate
        div.classList = "rightListTask";
        div.appendChild(dateDiv)
        div.appendChild(infoBtn)
        div.appendChild(editTaskBtn)
        div.appendChild(deleteTaskBtn)
        li.appendChild(div);
        ul.appendChild(li);
    }

    return {
        allTasks,
        todayTasks,
        weekTasks,
    }
})()

const taskFunctions = (() => {
    // delete button function on a task item
    const deleteTaskBtn = () => {
        const deleteTaskX = document.querySelectorAll("#deleteTaskBtn")

        deleteTaskX.forEach(button => {
            button.addEventListener("click", () => {
                taskStorage.tasks.splice(button.dataset.id, 1)
                assignTaskId()
                init()
                taskStorage.saveTasks()
            })
        })
    }
    return {
        deleteTaskBtn
    }
})()

const loadProjects = (() => {

})

export {
    taskLoader,
    taskFunctions
}