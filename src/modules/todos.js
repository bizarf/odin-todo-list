import {
    projectStorage,
    taskStorage
} from "./storage.js"
import {
    init
} from "../index.js"

class ProjectTitle {
    constructor(projectTitle) {
        this.projectTitle = projectTitle
    }
}

class Project extends ProjectTitle {
    constructor(projectTitle) {
        super(projectTitle)
        // this.projectTitle = projectTitle;
        // this.projectId = projectId;
        projectStorage.projects.push(this)
    }
}

function addProject(projectTitle) {
    new Project(projectTitle)
    // assignProjectId()
    projectStorage.saveProjects()
    init()
}

function assignProjectId() {
    projectStorage.projects.forEach(() => {
        for (let i = 0; i < projectStorage.projects.length; i++) {
            projectStorage.projects[i].projectId = i;
        }
    })
}

class Task extends ProjectTitle {
    constructor(projectTitle, title, description, dueDate, priority, isComplete, id) {
        // this.projectId = projectId
        // super(projectId)
        super(projectTitle)
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = isComplete;
        this.id = id;
        taskStorage.tasks.push(this)
    }
}

function addTask(projectTitle, title, description, dueDate, priority, isComplete) {
    new Task(projectTitle, title, description, dueDate, priority, isComplete)
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
    addTask,
    assignTaskId,
    addProject,
    assignProjectId,
    Project
}