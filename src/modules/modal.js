import {
    addTask
} from "./todos"
import {
    format
} from "date-fns";

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
            addTask(title.value, description.value, format(new Date(dueDate.value), "P"), priority.value)
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
    taskModal
}