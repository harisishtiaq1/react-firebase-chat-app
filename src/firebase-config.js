import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDe9Qy_mCUu2qsV5EBR8-6w7ULIY-StyjA",
  authDomain: "chatapp-ffa2d.firebaseapp.com",
  projectId: "chatapp-ffa2d",
  storageBucket: "chatapp-ffa2d.appspot.com",
  messagingSenderId: "269634017614",
  appId: "1:269634017614:web:ae2f8920d27048f78d661f",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
