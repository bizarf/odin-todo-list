import {
    addTask
} from "./todos"
import {
    format
} from "date-fns";

// modal form coding
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
            priority.value = "";
        }
    }

    // when you click outside of the form
    const _outsideTaskFormClick = () => {
        modal.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }

    // the x on the top right
    const _taskFormClose = () => {
        const span = document.querySelector(".taskFormClose")
        span.onclick = () => {
            modal.style.display = "none"
        }
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
        const button = document.querySelector("#taskCancelButton")
        button.onclick = (e) => {
            modal.style.display = "none"
            e.preventDefault()
        }
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
        modal.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }

    const _projectFormClose = () => {
        const span = document.querySelector(".projectFormClose")
        span.onclick = () => {
            modal.style.display = "none"
        }
    }

    const _projectFormCancel = () => {
        const button = document.querySelector("#projectCancelButton")
        button.onclick = (e) => {
            modal.style.display = "none"
            e.preventDefault()
        }
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

const taskInfoModal = (() => {
    const modal = document.querySelector(".infoForm")

    const _infoBtnClick = () => {
        const infoBtn = document.querySelectorAll("#infoBtn")
        infoBtn.forEach(button => {
            button.addEventListener("click", () => {
                console.log("infoBtn")
            })
        })
        // projectBtn.onclick = () => {
        //     modal.style.display = "block";
        // }
    }

    const taskInfoFormInit = () => {
        _infoBtnClick()
    }
    return {
        taskInfoFormInit
    }
})()

const editTaskModal = (() => {
    const modal = document.querySelector(".infoModal")

    const _editBtnClick = () => {
        const editTaskBtn = document.querySelectorAll("#editTaskBtn")
        editTaskBtn.forEach(button => {
            button.addEventListener("click", () => {
                console.log("editBtn")
            })
        })
    }

    const editTaskFormInit = () => {
        _editBtnClick()
    }
    return {
        editTaskFormInit
    }
})()

export {
    taskModal,
    projectModal,
    taskInfoModal,
    editTaskModal
}