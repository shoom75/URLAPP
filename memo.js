// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// a

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2Jei1fSM9ekyJ4SB5i2y-ck4EV3Pbubk",
  authDomain: "urlapp-7500d.firebaseapp.com",
  projectId: "urlapp-7500d",
  storageBucket: "urlapp-7500d.firebasestorage.app",
  messagingSenderId: "323267916128",
  appId: "1:323267916128:web:0dc4b327048a455dde6e05",
  measurementId: "G-QJ947H2CE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// npm install firebase