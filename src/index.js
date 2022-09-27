import {
    taskFunctions,
    taskLoader,
    projectLoader,
    projectDelete
} from "./modules/DOM.js";
import {
    taskModal,
    projectModal,
    taskInfoModal,
    editTaskModal
} from "./modules/modal.js";
import {
    projectStorage,
    taskStorage
} from "./modules/storage.js";

init()

function tabsController() {
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
}

function init() {
    taskModal.taskFormInit()
    projectModal.projectFormInit()
    projectLoader.projectLoaderInit()
    taskLoader.taskLoaderInit()
    taskInfoModal.taskInfoFormInit()
    editTaskModal.editTaskFormInit()
    taskFunctions.taskFunctionsInit()
    // projectDelete(taskStorage.tasks, projectStorage.projects)
    tabsController()
}

console.log(projectStorage.projects)
console.log(taskStorage.tasks)

console.log(projectStorage.projects[1].projectTitle)

export {
    init
}