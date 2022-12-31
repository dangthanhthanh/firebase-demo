// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { config } from "../config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = config.firebase;
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const facebookProvider = new FacebookAuthProvider()
export const db = getFirestore();
export const googleProvider=new GoogleAuthProvider();

export default app