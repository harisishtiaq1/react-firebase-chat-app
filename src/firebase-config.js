import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_1nZCoIuCPwc1eQerbCVd2njmzQxvEr8",
  authDomain: "chatapp-f74be.firebaseapp.com",
  projectId: "chatapp-f74be",
  storageBucket: "chatapp-f74be.appspot.com",
  messagingSenderId: "674422252651",
  appId: "1:674422252651:web:a5cd700970cf451a773d2e",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
