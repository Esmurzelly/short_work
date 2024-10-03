import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "short-work.firebaseapp.com",
  projectId: "short-work",
  storageBucket: "short-work.appspot.com",
  messagingSenderId: "864726355117",
  appId: "1:864726355117:web:f9d9faedb48b7299ac8a24",
  measurementId: "G-B22F7L97QG"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);