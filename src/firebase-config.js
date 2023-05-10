// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNx6qEyLSJk8rxz-2IJWrb9jIB5jxbUrA",
  authDomain: "chatapp-db370.firebaseapp.com",
  projectId: "chatapp-db370",
  storageBucket: "chatapp-db370.appspot.com",
  messagingSenderId: "182671035863",
  appId: "1:182671035863:web:64cdaadf08144795524f92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
