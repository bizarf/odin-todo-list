import {
    addTask,
    addProject
} from "./todos"
import {
    format,
    parse
} from "date-fns";
import {
    taskStorage,
    projectStorage
} from "./storage";
import {
    init
} from "..";

// task adding modal coding
const taskModal = (() => {
    const modal = document.querySelector(".taskModal")
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#dueDate");
    const priority = document.querySelector("#priority");
    const project = document.querySelector("#project");

    // the button that opens the form
    const _taskBtnClick = () => {
        const taskBtn = document.querySelector(".addTaskButton")
        taskBtn.onclick = () => {
            modal.style.display = "block";
            title.value = "";
            description.value = "";
            dueDate.value = "";
            priority.value = "None";
            title.focus()
            while (project.firstChild) project.removeChild(project.firstChild)
            for (let title of projectStorage.projects) {
                const option = document.createElement("option")
                option.value = title.projectTitle;
                option.textContent = title.projectTitle;
                project.appendChild(option)
            }
        }
    }

    // loads functions which handle closing the modal
    const _taskFormClosing = () => {
        modalSharedCoding.outsideFormClick(".taskModal")
        modalSharedCoding.crossFormClose(".taskFormClose", ".taskModal")
        modalSharedCoding.formCancelButton("#taskCancelButton", ".taskModal")
    }

    const _addTaskBtnForm = () => {
        const button = document.querySelector("#taskAddButton");
        const form = document.querySelector(".addTaskForm");
        button.onclick = (e) => {
            e.preventDefault()
            if (form.reportValidity() === false) {
                form.reportValidity()
            } else {
                if (dueDate.value === "") {
                    addTask(project.value, title.value, description.value, dueDate.value, priority.value, false)
                } else {
                    addTask(project.value, title.value, description.value, format(new Date(dueDate.value), "P"), priority.value, false)
                }
                modal.style.display = "none"
            }
        }
    }
    const taskFormInit = () => {
        _taskBtnClick()
        _taskFormClosing()
        _addTaskBtnForm()
    }
    return {
        taskFormInit
    }
})()

// project adding modal coding
const projectModal = (() => {
    const modal = document.querySelector(".projectModal")
    const projectBtn = document.querySelector("#addProjectBtn")

    // the button that opens the form
    const _projectBtnClick = () => {
        projectBtn.onclick = () => {
            modal.style.display = "block";
            projectTitle.focus()
        }
    }

    // loads functions which handle closing the modal
    const _projectFormClosing = () => {
        modalSharedCoding.outsideFormClick(".projectModal")
        modalSharedCoding.crossFormClose(".projectFormClose", ".projectModal")
        modalSharedCoding.formCancelButton("#projectCancelButton", ".projectModal")
    }

    const _addProjectBtnForm = () => {
        const addProjectButton = document.querySelector("#projectAddButton");
        const projectForm = document.querySelector(".addProjectForm")
        const error = document.querySelector("#projectTitleError")
        addProjectButton.onclick = (e) => {
            e.preventDefault()
            if (projectForm.reportValidity() === false) {
                projectForm.reportValidity()
            } else {
                for (let item of projectStorage.projects) {
                    if (projectTitle.value.toLowerCase() === item.projectTitle.toLowerCase()) {
                        error.style.display = "block";
                        return
                    }
                }
                const newBtn = document.createElement("button");
                newBtn.textContent = projectTitle.value;
                addProject(projectTitle.value)
                const projectContainer = document.querySelector("#projectContainer")
                while (projectContainer.firstChild) projectContainer.removeChild(projectContainer.firstChild)
                init()
                modal.style.display = "none";
                error.style.display = "none";
                projectTitle.value = ""
            }
        }
    }

    const projectFormInit = () => {
        _projectBtnClick()
        _projectFormClosing()
        _addProjectBtnForm()
    }
    return {
        projectFormInit,
    }
})()

// task info modal coding
const taskInfoModal = (() => {
    const modal = document.querySelector(".infoModal")

    const _infoBtnClick = () => {
        const infoBtn = document.querySelectorAll("#infoBtn")
        infoBtn.forEach(button => {
            button.addEventListener("click", () => {
                modal.style.display = "block";
                const id = button.dataset.id
                const projectId = button.dataset.projectTitle
                const title = document.querySelector("#infoTitle")
                const description = document.querySelector("#infoDescription")
                const dueDate = document.querySelector("#infoDueDate")
                const priority = document.querySelector("#infoPriority")
                const project = document.querySelector("#infoProject")
                const date = parse(taskStorage.tasks[id].dueDate, "MM/dd/yyyy", new Date())
                if (taskStorage.tasks[id].dueDate === "") {
                    dueDate.value = ""
                } else {
                    dueDate.value = format(new Date(date), "yyyy-MM-dd");
                }
                title.value = taskStorage.tasks[id].title;
                description.value = taskStorage.tasks[id].description;
                priority.value = taskStorage.tasks[id].priority;
                project.value = projectId;
            })
        })
    }

    // loads functions which handle closing the modal
    const _infoFormClosing = () => {
        modalSharedCoding.outsideFormClick(".infoModal")
        modalSharedCoding.crossFormClose(".infoFormClose", ".infoModal")
        modalSharedCoding.formCancelButton("#infoOkButton", ".infoModal")
    }

    const taskInfoFormInit = () => {
        _infoBtnClick()
        _infoFormClosing()
    }
    return {
        taskInfoFormInit
    }
})()

// task edit modal coding
const editTaskModal = (() => {
    const modal = document.querySelector(".editModal")
    const title = document.querySelector("#editTitle")
    const description = document.querySelector("#editDescription")
    const dueDate = document.querySelector("#editDueDate")
    const priority = document.querySelector("#editPriority")
    const project = document.querySelector("#editProject")

    const _editBtnClick = () => {
        const editTaskBtn = document.querySelectorAll("#editTaskBtn")
        editTaskBtn.forEach(button => {
            button.addEventListener("click", () => {
                modal.style.display = "block";
                title.focus()
                const id = button.dataset.id
                const dataId = document.querySelector("#dataId")
                const date = parse(taskStorage.tasks[id].dueDate, "MM/dd/yyyy", new Date())
                if (taskStorage.tasks[id].dueDate === "") {
                    dueDate.value = "";
                } else {
                    dueDate.value = format(new Date(date), "yyyy-MM-dd");
                }
                title.value = taskStorage.tasks[id].title;
                description.value = taskStorage.tasks[id].description;
                priority.value = taskStorage.tasks[id].priority;
                dataId.value = taskStorage.tasks[id].id;
                while (project.firstChild) project.removeChild(project.firstChild)
                for (let title of projectStorage.projects) {
                    const option = document.createElement("option")
                    option.value = title.projectTitle;
                    option.textContent = title.projectTitle;
                    project.appendChild(option)
                }
                project.value = taskStorage.tasks[id].projectTitle
            })
        })
    }

    // loads functions which handle closing the modal
    const _editFormClosing = () => {
        modalSharedCoding.outsideFormClick(".editModal")
        modalSharedCoding.crossFormClose(".editTaskFormClose", ".editModal")
        modalSharedCoding.formCancelButton("#editCancelButton", ".editModal")
    }

    // edit button
    const _editTaskBtnForm = () => {
        const button = document.querySelector("#editAddButton");
        const form = document.querySelector(".editForm");
        const dataId = document.querySelector("#dataId")

        button.addEventListener("click", (e) => {
            e.preventDefault()
            if (form.reportValidity() === false) {
                form.reportValidity()
            } else {
                if (dueDate.value === "") {
                    taskStorage.tasks[dataId.value].title = title.value;
                    taskStorage.tasks[dataId.value].description = description.value;
                    taskStorage.tasks[dataId.value].dueDate = dueDate.value;
                    taskStorage.tasks[dataId.value].priority = priority.value;
                    taskStorage.tasks[dataId.value].projectTitle = project.value;
                } else {
                    taskStorage.tasks[dataId.value].title = title.value;
                    taskStorage.tasks[dataId.value].description = description.value;
                    taskStorage.tasks[dataId.value].dueDate = format(new Date(dueDate.value), "P");
                    taskStorage.tasks[dataId.value].priority = priority.value;
                    taskStorage.tasks[dataId.value].projectTitle = project.value;
                }
                taskStorage.saveTasks()
                init()
                modal.style.display = "none"
            }
        })
    }

    const editTaskFormInit = () => {
        _editBtnClick()
        _editFormClosing()
        _editTaskBtnForm()
    }
    return {
        editTaskFormInit
    }
})()

// shared functions that the modals use
const modalSharedCoding = (() => {
    // closes the form when clicking outside of the modal
    const outsideFormClick = (modal) => {
        const formModal = document.querySelector(modal)
        formModal.onclick = (event) => {
            if (event.target === formModal) {
                formModal.style.display = "none";
            }
        }
    }

    // closes the form when clicking on the upper right cross
    const crossFormClose = (spanId, modalId) => {
        const modal = document.querySelector(modalId)
        const span = document.querySelector(spanId)
        span.onclick = () => {
            modal.style.display = "none"
        }
    }

    // closes the form when clicking on the cancel button
    const formCancelButton = (buttonId, modalId) => {
        const button = document.querySelector(buttonId)
        const modal = document.querySelector(modalId)
        button.onclick = (e) => {
            modal.style.display = "none"
            e.preventDefault()
        }
    }
    return {
        outsideFormClick,
        crossFormClose,
        formCancelButton
    }
})()

export {
    taskModal,
    projectModal,
    taskInfoModal,
    editTaskModal
}