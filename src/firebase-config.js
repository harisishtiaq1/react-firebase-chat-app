// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB8wom8kU7OGo2ZAmgp8jdxBxJ_wabKUPc",
  authDomain: "chatapp-72955.firebaseapp.com",
  projectId: "chatapp-72955",
  storageBucket: "chatapp-72955.appspot.com",
  messagingSenderId: "221123498804",
  appId: "1:221123498804:web:3dc985bb3fe33bdc448b61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();