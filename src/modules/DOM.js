import {
    projectStorage,
    taskStorage
} from "./storage.js";
import {
    format,
    isThisISOWeek,
} from "date-fns";
import {
    assignTaskId,
    assignProjectId
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
                listDom("#allList", task)
            }
        }
    }

    // loads up tasks from the array that match today
    const todayTasks = () => {
        let ul = document.querySelector("#todayList")
        while (ul.firstChild) ul.removeChild(ul.firstChild)
        for (let task of taskStorage.tasks) {
            if (format(new Date(), "P") === task.dueDate) {
                listDom("#todayList", task)
            }
        }
    }
    // loads up tasks from the array that match the current week
    const weekTasks = () => {
        let ul = document.querySelector("#weekList")
        while (ul.firstChild) ul.removeChild(ul.firstChild)
        for (let task of taskStorage.tasks) {
            if (isThisISOWeek(new Date(task.dueDate)) === true) {
                listDom("#weekList", task)
            }
        }
    }
    // DOM creation function which makes the lists
    const listDom = (list, task) => {
        const ul = document.querySelector(list)
        const div = document.createElement("div")
        const dateDiv = document.createElement("div")
        const li = document.createElement("li")
        const titleDiv = document.createElement("div")
        titleDiv.textContent = `${task.title}`;
        titleDiv.classList = "listItem"
        titleDiv.dataset.id = task.id
        const deleteTaskBtn = document.createElement("span")
        const editTaskBtn = document.createElement("span")
        const infoBtn = document.createElement("span")
        infoBtn.dataset.id = task.id
        infoBtn.id = "infoBtn"
        infoBtn.classList = "fa-solid fa-info"
        infoBtn.dataset.projectTitle = task.projectTitle
        editTaskBtn.dataset.id = task.id
        editTaskBtn.id = "editTaskBtn"
        editTaskBtn.classList = "fa-regular fa-pen-to-square";
        deleteTaskBtn.id = "deleteTaskBtn"
        deleteTaskBtn.classList = "fa-regular fa-trash-can"
        deleteTaskBtn.dataset.id = task.id
        dateDiv.textContent = task.dueDate
        div.classList = "rightListTask";
        div.appendChild(dateDiv);
        div.appendChild(infoBtn);
        div.appendChild(editTaskBtn);
        div.appendChild(deleteTaskBtn);
        li.appendChild(titleDiv);
        li.appendChild(div);
        ul.appendChild(li);
    }
    // sets a class which has a cross through to mark completed tasks
    const renderChecks = () => {
        const titleDiv = document.querySelectorAll(".listItem")
        titleDiv.forEach(task => {
            if (taskStorage.tasks[task.dataset.id].isComplete === true) {
                task.classList.add("taskCompleted")
            }
        })
    }

    const taskLoaderInit = () => {
        allTasks()
        todayTasks()
        weekTasks()
        // renderChecks()
    }
    return {
        taskLoaderInit,
        listDom
    }
})()

const taskFunctions = (() => {
    // delete button function on a task item
    const _deleteTaskBtn = () => {
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

    const _taskMarking = () => {
        const titleDiv = document.querySelectorAll(".listItem")
        titleDiv.forEach(task => {
            task.addEventListener("click", () => {
                if (taskStorage.tasks[task.dataset.id].isComplete === false) {
                    task.classList.add("taskCompleted")
                    taskStorage.tasks[task.dataset.id].isComplete = true;
                } else if (taskStorage.tasks[task.dataset.id].isComplete === true) {
                    task.classList.remove("taskCompleted")
                    taskStorage.tasks[task.dataset.id].isComplete = false;
                }
                taskStorage.saveTasks()
                init()
            })
        })
    }

    const taskFunctionsInit = () => {
        _deleteTaskBtn();
        _taskMarking();
    }
    return {
        taskFunctionsInit
    }
})()

const projectLoader = (() => {
    // loads up the buttons on the side nav bar
    const projectBtnLoad = () => {
        const projectButtons = document.querySelector(".projectButtons")
        while (projectButtons.firstChild) projectButtons.removeChild(projectButtons.firstChild)
        if (projectStorage.projects === null) {
            projectStorage.projects = [];
        }
        for (let project of projectStorage.projects) {
            const container = document.createElement("div")
            container.classList = "projectBtns"
            const newBtn = document.createElement("a");
            newBtn.textContent = project.projectTitle;
            newBtn.classList = "projectButton";
            newBtn.dataset.tabTarget = `#project-${project.projectTitle}`
            const span = document.createElement("button")
            span.classList = "fa-regular fa-trash-can"
            span.id = "projectDeleteBtn"
            span.dataset.projectTitle = project.projectTitle;
            container.appendChild(newBtn)
            container.appendChild(span)
            projectButtons.appendChild(container)
        }
    }

    // creates the divs that hold the project lists
    const projectPageCreation = () => {
        const projectContainer = document.querySelector("#projectContainer")
        for (let project of projectStorage.projects) {
            const mainContent = document.querySelector(".main-content")
            const div = document.createElement("div")
            const h2 = document.createElement("h2")
            const ul = document.createElement("ul")
            const hr = document.createElement("hr")
            div.id = `project-${project.projectTitle}`
            div.dataset.tabContent = "";
            h2.textContent = project.projectTitle;
            ul.id = `${project.projectTitle}List`
            div.appendChild(h2);
            div.appendChild(hr);
            div.appendChild(ul);
            projectContainer.appendChild(div)
            mainContent.appendChild(projectContainer);
        }
    }

    // creates tasks lists for projects based on their titles
    const projectTasks = () => {
        for (let project of projectStorage.projects) {
            let ul = document.querySelector(`#${project.projectTitle}List`)
            const projectDeleteBtn = document.querySelectorAll("#projectDeleteBtn")
            while (ul.firstChild) ul.removeChild(ul.firstChild)
            if (taskStorage.tasks === null) {
                taskStorage.tasks = []
            }
            for (let task of taskStorage.tasks) {
                if (task.projectTitle === project.projectTitle) {
                    taskLoader.listDom(`#${project.projectTitle}List`, task)
                }
            }
        }
    }

    const projectLoaderInit = () => {
        projectBtnLoad();
        projectPageCreation();
        projectTasks();
    }
    return {
        projectLoaderInit,
        projectBtnLoad,
        projectPageCreation,
        projectTasks
    }
})()

const projectDelete = () => {
    const projectDeleteBtn = document.querySelectorAll("#projectDeleteBtn")

    projectDeleteBtn.forEach(button => {
        button.addEventListener("click", () => {
            console.log(button.dataset.projectTitle)
            const pTitle = projectStorage.projects.map(projects => {
                return projects.projectTitle
            })
            const index = pTitle.indexOf(button.dataset.projectTitle)
            projectStorage.projects.splice(index, 1)
            // projectStorage.projects.splice(button.dataset.projectId, 1)
            for (let i = taskStorage.tasks.length - 1; i >= 0; i--) {
                if (taskStorage.tasks[i].projectTitle === button.dataset.projectTitle) {
                    taskStorage.tasks.splice([i], 1)
                }
            }
            while (projectContainer.firstChild) projectContainer.removeChild(projectContainer.firstChild)
            // assignProjectId()
            taskStorage.saveTasks()
            projectStorage.saveProjects()
            init()
        })
    })
}

export {
    taskLoader,
    taskFunctions,
    projectLoader,
    projectDelete
}