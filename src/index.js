import {
    navigation,
    loadTasks,
    taskModal
} from "./modules/DOM.js";
import {
    taskStorage
} from "./modules/storage.js";

// navigation buttons
const navButtons = () => {
    let main = document.querySelector(".main-content")
    let buttons = document.querySelectorAll(".navBtns")
    buttons.forEach(element => {
        element.addEventListener("click", (e) => {
            while (main.firstChild) main.removeChild(main.firstChild);
            if (e.target.id === "allTasks") {
                navigation.allTasks()
                loadTasks()
            } else if (e.target.id === "today") {
                navigation.today()
                loadTasks()
            } else if (e.target.id === "thisWeek") {
                navigation.thisWeek()
                loadTasks()
            }
        })
    })
}

function init() {
    navigation.allTasks()
    navButtons()
    loadTasks()
    taskModal.taskFormInit()
    console.log(taskStorage.tasks)
}

init()