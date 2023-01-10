// firebase imports
import { firebaseConfig } from "./modules/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
// import functions from other modules
import {
    taskFunctions,
    taskLoader,
    projectLoader,
    projectDelete,
} from "./modules/DOM.js";
import {
    taskModal,
    projectModal,
    taskInfoModal,
    editTaskModal,
} from "./modules/modal.js";
import {
    projectStorage,
    firebaseProjectLoader,
    firebaseTaskLoader,
} from "./modules/storage.js";

init();

function tabsController() {
    const tabs = document.querySelectorAll("[data-tab-target]");
    const tabContent = document.querySelectorAll("[data-tab-content]");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = document.querySelector(tab.dataset.tabTarget);
            tabContent.forEach((tabContent) => {
                tabContent.classList.remove("active");
            });
            target.classList.add("active");
        });
    });
}

export function init() {
    taskModal.taskFormInit();
    projectModal.projectFormInit();
    projectLoader.projectLoaderInit();
    taskLoader.taskLoaderInit();
    taskInfoModal.taskInfoFormInit();
    editTaskModal.editTaskFormInit();
    taskFunctions.taskFunctionsInit();
    tabsController();
    projectDelete();
}

export let userType = "";

// firebase stuff
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Google authentication
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    const loginBtn = document.querySelector(".loginBtn");
    const logoutBtn = document.querySelector(".logoutBtn");
    const displayNameDiv = document.querySelector(".displayName");
    const avatarDiv = document.querySelector(".avatar");

    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        userType = "cloud";
        firebaseProjectLoader();
        firebaseTaskLoader();
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block";
        logoutBtn.addEventListener("click", googleLogout);
        const displayName = user.displayName;
        const photoURL = user.photoURL;
        displayNameDiv.textContent = displayName;
        avatarDiv.src = photoURL;
        displayNameDiv.style.display = "block";
        avatarDiv.style.display = "block";
    } else {
        // User is signed out
        userType = "local";
        logoutBtn.style.display = "none";
        loginBtn.style.display = "block";
        loginBtn.addEventListener("click", googleLogin);
        displayNameDiv.style.display = "none";
        avatarDiv.style.display = "none";
    }
});

const googleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
};

const googleLogout = () => {
    signOut(auth);
};
