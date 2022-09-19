import {
    addTask
} from "./todos"
import {
    format,
    parse
} from "date-fns";
import {
    taskStorage
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

    // the button that opens the form
    const _taskBtnClick = () => {
        const taskBtn = document.querySelector(".addTaskButton")
        taskBtn.onclick = () => {
            modal.style.display = "block";
            title.value = "";
            description.value = "";
            dueDate.value = "";
            priority.value = "None";
        }
    }

    // when you click outside of the form
    const _outsideTaskFormClick = () => {
        modalSharedCoding.outsideFormClick(".taskModal")
    }

    // the x on the top right
    const _taskFormClose = () => {
        modalSharedCoding.crossFormClose(".taskFormClose", ".taskModal")
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
                    addTask(title.value, description.value, dueDate.value, priority.value)
                } else {
                    addTask(title.value, description.value, format(new Date(dueDate.value), "P"), priority.value)
                }
                modal.style.display = "none"
            }
        }
    }

    // cancel button
    const _taskFormCancel = () => {
        modalSharedCoding.formCancelButton("#taskCancelButton", ".taskModal")
    }

    const taskFormInit = () => {
        _taskBtnClick()
        _outsideTaskFormClick()
        _taskFormClose()
        _addTaskBtnForm()
        _taskFormCancel()
    }

    return {
        taskFormInit
    }
})()

// project adding modal coding
const projectModal = (() => {
    const modal = document.querySelector(".projectModal")

    // the button that opens the form
    const _projectBtnClick = () => {
        const projectBtn = document.querySelector("#addProjectBtn")
        projectBtn.onclick = () => {
            modal.style.display = "block";
        }
    }

    // when you click outside of the form
    const _outsideProjectFormClick = () => {
        modalSharedCoding.outsideFormClick(".projectModal")
    }

    const _projectFormClose = () => {
        modalSharedCoding.crossFormClose(".projectFormClose", ".projectModal")
    }

    const _projectFormCancel = () => {
        modalSharedCoding.formCancelButton("#projectCancelButton", ".projectModal")
    }

    const _addProjectBtnForm = () => {
        const button = document.querySelector("#projectAddButton");
        const form = document.querySelector(".addProjectForm")
        button.onclick = (e) => {
            e.preventDefault()
            if (form.reportValidity() === false) {
                form.reportValidity()
            } else {
                modal.style.display = "none"
            }
        }
    }

    const projectFormInit = () => {
        _projectBtnClick()
        _outsideProjectFormClick()
        _projectFormClose()
        _projectFormCancel()
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
                const title = document.querySelector("#infoTitle")
                const description = document.querySelector("#infoDescription")
                const dueDate = document.querySelector("#infoDueDate")
                const priority = document.querySelector("#infoPriority")
                const date = parse(taskStorage.tasks[id].dueDate, "MM/dd/yyyy", new Date())
                if (taskStorage.tasks[id].dueDate === "") {
                    dueDate.value = ""
                } else {
                    dueDate.value = format(new Date(date), "yyyy-MM-dd");
                }
                title.value = taskStorage.tasks[id].title;
                description.value = taskStorage.tasks[id].description;
                priority.value = taskStorage.tasks[id].priority;
            })
        })
    }

    const _outsideInfoFormClick = () => {
        modalSharedCoding.outsideFormClick(".infoModal")
    }

    const _infoFormClose = () => {
        modalSharedCoding.crossFormClose(".infoFormClose", ".infoModal")
    }

    const _infoFormOk = () => {
        modalSharedCoding.formCancelButton("#infoOkButton", ".infoModal")
    }

    const taskInfoFormInit = () => {
        _infoBtnClick()
        _outsideInfoFormClick()
        _infoFormClose()
        _infoFormOk()
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

    const _editBtnClick = () => {
        const editTaskBtn = document.querySelectorAll("#editTaskBtn")
        editTaskBtn.forEach(button => {
            button.addEventListener("click", () => {
                modal.style.display = "block";
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
            })
        })
    }

    const _outsideEditFormClick = () => {
        modalSharedCoding.outsideFormClick(".editModal")
    }

    const _editFormClose = () => {
        modalSharedCoding.crossFormClose(".editTaskFormClose", ".editModal")
    }

    const _editFormCancel = () => {
        modalSharedCoding.formCancelButton("#editCancelButton", ".editModal")
    }

    // edit button, unfinished
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
                } else {
                    taskStorage.tasks[dataId.value].title = title.value;
                    taskStorage.tasks[dataId.value].description = description.value;
                    taskStorage.tasks[dataId.value].dueDate = format(new Date(dueDate.value), "P");
                    taskStorage.tasks[dataId.value].priority = priority.value;
                }
                taskStorage.saveTasks()
                init()
                modal.style.display = "none"
            }
        })
    }

    const editTaskFormInit = () => {
        _editBtnClick()
        _outsideEditFormClick()
        _editFormClose()
        _editFormCancel()
        _editTaskBtnForm()
    }
    return {
        editTaskFormInit
    }
})()

// shared functions that the modals use
const modalSharedCoding = (() => {
    const outsideFormClick = (modal) => {
        const formModal = document.querySelector(modal)
        formModal.onclick = (event) => {
            if (event.target === formModal) {
                formModal.style.display = "none";
            }
        }
    }

    const crossFormClose = (spanId, modalId) => {
        const modal = document.querySelector(modalId)
        const span = document.querySelector(spanId)
        span.onclick = () => {
            modal.style.display = "none"
        }
    }

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