import {
    taskStorage
} from "./storage.js"
import {
    init
} from "../index.js"

class Task {
    constructor(title, description, dueDate, priority, id) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id;
    }
}

function addTask(title, description, dueDate, priority) {
    let task = new Task(title, description, dueDate, priority)
    taskStorage.tasks.push(task)
    assignTaskId()
    taskStorage.saveTasks()
    init()
}

// gives each task an id number based on their position in the array
function assignTaskId() {
    taskStorage.tasks.forEach(() => {
        for (let i = 0; i < taskStorage.tasks.length; i++) {
            taskStorage.tasks[i].id = i;
        }
    });
}

export {
    Task,
    addTask,
    assignTaskId
}