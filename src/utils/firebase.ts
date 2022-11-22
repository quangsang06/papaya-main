// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBR8IjrizqGiAya342o0NTjVitD-ep7s4",
  authDomain: "papaya-login.firebaseapp.com",
  projectId: "papaya-login",
  storageBucket: "papaya-login.appspot.com",
  messagingSenderId: "179106800930",
  appId: "1:179106800930:web:3634a2d43a7d5e75f4b17b",
  measurementId: "G-R358VYCYHT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
