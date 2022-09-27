import {
    projectStorage,
    taskStorage
} from "./storage.js"
import {
    init
} from "../index.js"

class ProjectId {
    constructor(projectId) {
        this.projectId = projectId
    }
}

class Project extends ProjectId {
    constructor(projectTitle, projectId) {
        super(projectId)
        this.projectTitle = projectTitle;
        // this.projectId = projectId;
        projectStorage.projects.push(this)
    }

    get projectTitle() {
        return this.projectTitle
    }
}

function addProject(projectTitle, projectId) {
    new Project(projectTitle, projectId)
    assignProjectId()
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

class Task extends ProjectId {
    constructor(projectId, title, description, dueDate, priority, isComplete, id) {
        // this.projectId = projectId
        super(projectId)
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = isComplete;
        this.id = id;
        taskStorage.tasks.push(this)
    }
}

function addTask(projectId, title, description, dueDate, priority, isComplete) {
    new Task(projectId, title, description, dueDate, priority, isComplete)
    // taskStorage.tasks.push(task)
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