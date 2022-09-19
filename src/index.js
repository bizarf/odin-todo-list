import {
    taskFunctions,
    taskLoader
} from "./modules/DOM.js";
import {
    taskModal,
    projectModal,
    taskInfoModal,
    editTaskModal
} from "./modules/modal.js";

const tabs = document.querySelectorAll("[data-tab-target]")
const tabContent = document.querySelectorAll("[data-tab-content]")

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContent.forEach(tabContent => {
            tabContent.classList.remove("active")
        })
        target.classList.add("active")
    })
})

function init() {
    taskModal.taskFormInit()
    projectModal.projectFormInit()
    taskLoader.allTasks()
    taskLoader.todayTasks()
    taskLoader.weekTasks()
    taskInfoModal.taskInfoFormInit()
    editTaskModal.editTaskFormInit()
    taskFunctions.deleteTaskBtn()
}

init()

export {
    init
}