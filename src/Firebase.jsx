// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB7h4pfdXHISDHN4X2IOPA7QGmcLZrl6ok",
  authDomain: "projectfairauth.firebaseapp.com",
  projectId: "projectfairauth",
  storageBucket: "projectfairauth.appspot.com",
  messagingSenderId: "899677429849",
  appId: "1:899677429849:web:04ad89c2ddf83e71f8d148",
  measurementId: "G-6PTY48ZP48",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
