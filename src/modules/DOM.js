import {
    taskStorage
} from "./storage.js";
import {
    format,
    isThisISOWeek,
} from "date-fns";

// const navigation = (() => {
//     const allTasks = () => {
//         mainContentGenerator.headerMaker("All Tasks")
//         mainContentGenerator.addTaskBtn()
//         taskModal.taskFormInit()
//     }
//     const today = () => {
//         mainContentGenerator.headerMaker("Today")
//         taskLoader.todayTasks()
//     }
//     const thisWeek = () => {
//         mainContentGenerator.headerMaker("This Week")
//     }
//     return {
//         allTasks,
//         today,
//         thisWeek
//     }
// })()

const mainContentGenerator = (() => {
    // creates the header for each tab
    const headerMaker = (text) => {
        let main = document.querySelector(".main-content")
        let header = document.createElement("h2")
        let ul = document.createElement("ul")
        ul.id = "list"
        header.textContent = text
        main.appendChild(header);
        main.appendChild(ul)
    }

    const addTaskBtn = () => {
        let main = document.querySelector(".main-content")
        let button = document.createElement("button")
        button.classList = "addTaskButton"
        button.textContent = "+"
        main.appendChild(button)
    }
    return {
        headerMaker,
        addTaskBtn
    }
})()

const taskLoader = (() => {
    // loads all the tasks in the array
    const allTasks = () => {
        let ul = document.querySelector("#allList")
        while (ul.firstChild) ul.removeChild(ul.firstChild)
        if (taskStorage.tasks === null) {
            taskStorage.tasks = []
        } else {
            for (let task of taskStorage.tasks) {
                let li = document.createElement("li")
                li.textContent = `${task.title}, ${task.description}, ${task.dueDate}`;
                ul.appendChild(li);
            }
        }
    }
    // loads up tasks from the array that match today
    const todayTasks = () => {
        for (let task of taskStorage.tasks) {
            if (format(new Date(), "P") === task.dueDate) {
                let ul = document.querySelector("#todayList")
                let li = document.createElement("li")
                li.textContent = `${task.title}, ${task.description}, ${task.dueDate}`;
                ul.appendChild(li);
            }
        }
    }
    // loads up tasks from the array that match the current week
    const weekTasks = () => {
        for (let task of taskStorage.tasks) {
            if (isThisISOWeek(new Date(task.dueDate)) === true) {
                console.log(task);
                let ul = document.querySelector("#weekList")
                let li = document.createElement("li")
                li.textContent = `${task.title}, ${task.description}, ${task.dueDate}`;
                ul.appendChild(li);
            }
        }
    }
    return {
        allTasks,
        todayTasks,
        weekTasks,
    }
})()

// clears the current list on the page
function clear() {
    let ul = document.querySelector("#list")
    while (ul.firstChild) ul.removeChild(ul.firstChild)
}

export {
    taskLoader
}