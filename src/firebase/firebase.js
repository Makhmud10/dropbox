// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB9Zd0-EvJF6KwluYPPujtlKSyv2Ee2nUk",
    authDomain: "dropbox-44d6f.firebaseapp.com",
    projectId: "dropbox-44d6f",
    storageBucket: "dropbox-44d6f.appspot.com",
    messagingSenderId: "223579621421",
    appId: "1:223579621421:web:485cfe211f922ebb4250a4",
    measurementId: "G-3S9WYKHFWY"
  };

// Initialize Firebase
!getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
const provider = new GoogleAuthProvider();

export default db;

export { auth, storage, provider };
