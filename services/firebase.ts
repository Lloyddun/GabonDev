import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqlrTNGgGZs5iWAibsi9gGGOsXkcZ-K1s",
  authDomain: "gabondev-a8b9e.firebaseapp.com",
  projectId: "gabondev-a8b9e",
  storageBucket: "gabondev-a8b9e.firebasestorage.app",
  messagingSenderId: "378780888382",
  appId: "1:378780888382:web:74eb478181d13310a4106f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;