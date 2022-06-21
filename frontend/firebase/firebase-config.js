// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATV9FlFtw29RSWnKQM7bR7geLzyMIhRiw",
  authDomain: "minimal-notes-10eed.firebaseapp.com",
  projectId: "minimal-notes-10eed",
  storageBucket: "minimal-notes-10eed.appspot.com",
  messagingSenderId: "494763340420",
  appId: "1:494763340420:web:00520a4ef42635dcfe88d1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
