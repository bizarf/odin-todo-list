import {
    navigation,
    loadTasks
} from "./modules/DOM.js";
import {
    addTask
} from "./modules/todos.js";

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

navigation.allTasks()
navButtons()
addTask("This is a test", "Test", "22/01/2022", "High")
loadTasks()