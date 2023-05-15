import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyhSsJhRTqoMV9fwN-dsZFY8HfG-txjlQ",
  authDomain: "chatapp-b8de9.firebaseapp.com",
  projectId: "chatapp-b8de9",
  storageBucket: "chatapp-b8de9.appspot.com",
  messagingSenderId: "18114908863",
  appId: "1:18114908863:web:c6cd98d833cac96f4a6c0a",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
