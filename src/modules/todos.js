import {
    taskStorage
} from "./storage.js"
import {
    taskLoader
} from "./DOM.js"

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority
    }
}

function addTask(title, description, dueDate, priority) {
    let task = new Task(title, description, dueDate, priority)
    // checks if the localStorage is empty
    // if (localStorage.getItem("tasks") === null) {
    //     taskStorage.tasks = []
    //     taskStorage.tasks.push(task)
    // } else {
    taskStorage.tasks.push(task)
    taskStorage.saveTasks()
    // }
    taskLoader.allTasks()
}

export {
    Task,
    addTask,
}