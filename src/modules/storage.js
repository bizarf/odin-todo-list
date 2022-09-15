// localstorage for the tasks
const taskStorage = (() => {
    let tasks = JSON.parse(localStorage.getItem("tasks"))

    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(taskStorage.tasks))
    }
    return {
        tasks,
        saveTasks
    }
})()

// localstorage for the projects
const projectStorage = (() => {
    let projects = JSON.parse(localStorage.getItem("projects"));

    const saveProjects = () => {
        localStorage.setItem("projects", JSON.stringify(projects))
    }
    return {
        projects,
        saveProjects
    }
})()

export {
    taskStorage,
    projectStorage
}