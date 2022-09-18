import {
    taskStorage
} from "./storage.js"
import {
    taskLoader,
    taskFunctions
} from "./DOM.js"

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
    // checks if the localStorage is empty
    // if (localStorage.getItem("tasks") === null) {
    //     taskStorage.tasks = []
    //     taskStorage.tasks.push(task)
    // } else {
    taskStorage.tasks.push(task)
    assignTaskId()
    taskStorage.saveTasks()
    // }
    taskLoader.allTasks()
    taskLoader.todayTasks()
    taskLoader.weekTasks()
    taskFunctions.deleteTaskBtn()
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