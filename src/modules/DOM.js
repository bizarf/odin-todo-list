import {
    taskStorage
} from "./storage.js"

const navigation = (() => {
    const allTasks = () => {
        mainContentGenerator.headerMaker("All Tasks")
        mainContentGenerator.addTaskBtn()
    }
    const today = () => {
        mainContentGenerator.headerMaker("Today")
    }
    const thisWeek = () => {
        mainContentGenerator.headerMaker("This Week")
    }
    return {
        allTasks,
        today,
        thisWeek
    }
})()

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
        button.textContent = "+"
        main.appendChild(button)
    }
    return {
        headerMaker,
        addTaskBtn
    }
})()

function loadTasks() {
    // clear()
    let ul = document.querySelector("#list")
    while (ul.firstChild) ul.removeChild(ul.firstChild)
    for (let task of taskStorage.tasks) {
        let li = document.createElement("li")
        li.textContent = `${task.title}`;
        ul.appendChild(li);
    }
}

// clears the current list on the page
function clear() {
    let ul = document.querySelector("#list")
    while (ul.firstChild) ul.removeChild(ul.firstChild)
}

export {
    navigation,
    loadTasks
}