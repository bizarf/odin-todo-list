import { firebaseConfig } from "./firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { init, userType } from "../index.js";

const app = initializeApp(firebaseConfig);

// localstorage for the tasks
const taskStorage = (() => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    const saveTasks = () => {
        if (userType === "local") {
            localStorage.setItem("tasks", JSON.stringify(taskStorage.tasks));
        }
        if (userType === "cloud") {
            writeTasksToFirestore(JSON.stringify(taskStorage.tasks));
        }
    };
    return {
        tasks,
        saveTasks,
    };
})();

// localstorage for the projects
const projectStorage = (() => {
    let projects = JSON.parse(localStorage.getItem("projects"));

    const saveProjects = () => {
        if (userType === "local") {
            localStorage.setItem(
                "projects",
                JSON.stringify(projectStorage.projects)
            );
        }
        if (userType === "cloud") {
            writeProjectsToFirestore(JSON.stringify(projectStorage.projects));
        }
    };
    return {
        projects,
        saveProjects,
    };
})();

export {
    taskStorage,
    projectStorage,
    firebaseProjectLoader,
    firebaseTaskLoader,
};

// firebase store
const firestore = getFirestore();

// set the "collection/document" to be uploaded to the firestore
const projectsFirestore = doc(firestore, "todo/projects");
function writeProjectsToFirestore(project) {
    const docData = {
        projectData: project,
    };
    setDoc(projectsFirestore, docData);
}

const tasksFirestore = doc(firestore, "todo/tasks");
function writeTasksToFirestore(task) {
    const docData = {
        taskData: task,
    };
    setDoc(tasksFirestore, docData);
}

// loader function to get the project data from firestore
const firebaseProjectLoader = async () => {
    const mySnapshot = await getDoc(projectsFirestore);
    if (mySnapshot.exists()) {
        const docData = mySnapshot.data();
        projectStorage.projects = JSON.parse(docData.projectData);
        init();
    }
};

// loader function to get the task data from firestore
const firebaseTaskLoader = async () => {
    const mySnapshot = await getDoc(tasksFirestore);
    if (mySnapshot.exists()) {
        const docData = mySnapshot.data();
        taskStorage.tasks = JSON.parse(docData.taskData);
        init();
    }
};
