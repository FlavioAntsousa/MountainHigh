import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
    getFirestore,
    doc, setDoc,
    getDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    query, where,
    orderBy, limit,
    Timestamp, collection
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

import {
    getAuth, updateProfile,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";


const firebaseConfig = initializeApp ( {
    apiKey: "AIzaSyAyPapefO5bkm2_KDQ4ldX7yXv1G-xA9nI",
    authDomain: "mount-f22e1.firebaseapp.com",
    projectId: "mount-f22e1",
    storageBucket: "mount-f22e1.appspot.com",
    messagingSenderId: "620387715958",
    appId: "1:620387715958:web:f7883864f71c4e437c4857",
    measurementId: "G-5ZNJK0T4VN"
  });

  const db = getFirestore(firebaseConfig);

  const auth = getAuth(firebaseConfig);

  const login = async () => {
    let email = document.getElementById("signin-email").value;
    let password = document.getElementById("signin-password").value;
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("email", user.email)
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("name", user.displayName);
        window.location.href = "/perfil.html";
    }).catch((error) => {
        alert(error
            +"erro"); 
    });
}



const createUser = async () => {
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("email", user.email);
            localStorage.setItem("uid", user.uid);
            localStorage.setItem("name", user.displayName);
            console.log("A");
            window.location.href = "/perfil.html";

        }).catch((error) => {
            alert(error 
                + "erro");
        });
}
  
  const logout = async () => {
    signOut(auth).then(() => {
        window.location.href = "/login.html";
        localStorage.clear();
    }).catch((error) => {
        alert(error
            +"erro");
    });
}
  
  
  
  
document.getElementById("sign-in").addEventListener("click", login);
document.getElementById("sign-up").addEventListener("click", createUser);
  
  
  
  const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});
