// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQ819NqODxppimluZH66ULNNXPxqPQimo",
    authDomain: "kingdavidauto.firebaseapp.com",
    projectId: "kingdavidauto",
    storageBucket: "kingdavidauto.firebasestorage.app",
    messagingSenderId: "272546418933",
    appId: "1:272546418933:web:5b50eb4f4ebec76b5fb5bc",
    measurementId: "G-HE95F5BBM0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)