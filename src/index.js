import {
    taskLoader
} from "./modules/DOM.js";
import {
    taskModal
} from "./modules/modal.js";
import {
    taskStorage
} from "./modules/storage.js";

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
    taskLoader.allTasks()
    taskLoader.todayTasks()
    taskLoader.weekTasks()
    // console.log(taskStorage.tasks)
}

init()