// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl2p3irgOJ_K5bqVXc3wro-lUF8Lf9jy0",
  authDomain: "proyectodb-a72ce.firebaseapp.com",
  projectId: "proyectodb-a72ce",
  storageBucket: "proyectodb-a72ce.firebasestorage.app",
  messagingSenderId: "921053135987",
  appId: "1:921053135987:web:a451e6b7dd1ede45955606"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };