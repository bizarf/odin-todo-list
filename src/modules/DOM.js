import {
    taskStorage
} from "./storage.js";
import {
    addTask
} from "./todos.js";

const navigation = (() => {
    const allTasks = () => {
        mainContentGenerator.headerMaker("All Tasks")
        mainContentGenerator.addTaskBtn()
        taskModal.taskFormInit()
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
        button.classList = "addTaskButton"
        button.textContent = "+"
        main.appendChild(button)
    }
    return {
        headerMaker,
        addTaskBtn
    }
})()

function loadTasks() {
    let ul = document.querySelector("#list")
    while (ul.firstChild) ul.removeChild(ul.firstChild)
    if (taskStorage.tasks === null) {
        taskStorage.tasks = []
    } else {
        for (let task of taskStorage.tasks) {
            let li = document.createElement("li")
            li.textContent = `${task.title}, ${task.description}`;
            ul.appendChild(li);
        }
    }
}

// clears the current list on the page
function clear() {
    let ul = document.querySelector("#list")
    while (ul.firstChild) ul.removeChild(ul.firstChild)
}

// modal form coding
const taskModal = (() => {
    const modal = document.querySelector(".taskModal")

    // the button that opens the form
    const taskBtnClick = () => {
        const taskBtn = document.querySelector(".addTaskButton")
        taskBtn.onclick = () => {
            modal.style.display = "block";
        }
    }

    // when you click outside of the form
    const outsideFormClick = () => {
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }

    // the x on the top right
    const taskFormClose = () => {
        const span = document.querySelector(".taskFormClose")
        span.onclick = () => {
            modal.style.display = "none"
        }
    }

    const addTaskBtnForm = () => {
        const button = document.querySelector("#taskAddButton");
        const title = document.querySelector("#title");
        const description = document.querySelector("#description");
        const dueDate = document.querySelector("#dueDate");
        const priority = document.querySelector("#priority");
        button.onclick = (e) => {
            modal.style.display = "none"
            e.preventDefault()
            addTask(title.value, description.value, dueDate.value, priority.value)
        }
    }

    // cancel button
    const taskFormCancel = () => {
        const button = document.querySelector("#taskCancelButton")
        button.onclick = (e) => {
            modal.style.display = "none"
            e.preventDefault()
        }
    }

    const taskFormInit = () => {
        taskBtnClick()
        outsideFormClick()
        taskFormClose()
        addTaskBtnForm()
        taskFormCancel()
    }

    return {
        taskFormInit
    }
})()

export {
    navigation,
    loadTasks,
    taskModal
}