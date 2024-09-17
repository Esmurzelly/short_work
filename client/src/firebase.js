// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi5N4DoB1ARVZ30tRLxSOrCOPRESC2-is",
  authDomain: "short-work.firebaseapp.com",
  projectId: "short-work",
  storageBucket: "short-work.appspot.com",
  messagingSenderId: "864726355117",
  appId: "1:864726355117:web:f9d9faedb48b7299ac8a24",
  measurementId: "G-B22F7L97QG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);