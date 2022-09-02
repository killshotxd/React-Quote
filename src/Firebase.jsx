// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

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

// -------------Functions-------------------------

// -------------Updating user to db-------------
const updateUserDb = async (user, uid) => {
  if (typeof user !== "object") return;
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, { ...user, uid });
};

// -------------Getting user from db-------------

const getUserFromDb = async (uid) => {
  const docRef = doc(db, "users", uid);
  const result = await getDoc(docRef);

  if (!result.exists()) return null;
  return result.data();
};

// ----------ADD QUote in DB-----------------

const addQuoteInDb = async (quote) => {
  if (typeof quote !== "object") return;
  const collectionRef = collection(db, "quotes");
  await addDoc(collectionRef, { ...quote });
};

// ---------------Fetch all Quote-------------
const getAllQuotesForUser = async (uid) => {
  if (!uid) return;
  const collectionRef = collection(db, "quotes");
  const condition = where("refUser", "==", uid);
  const dbQuery = query(collectionRef, condition);

  return await getDocs(dbQuery);
};

// -----------Delete Projects-------------
const deleteQuote = async (pid) => {
  const docRef = doc(db, "quotes", pid);
  await deleteDoc(docRef);
};

export {
  auth,
  db,
  storage,
  updateUserDb,
  addQuoteInDb,
  getUserFromDb,
  getAllQuotesForUser,
  deleteQuote,
};
