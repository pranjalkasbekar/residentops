import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8H_9bHkqwkEPgrYKwnNYe9lnToFauj68",
  authDomain: "residentops.firebaseapp.com",
  projectId: "residentops",
  storageBucket: "residentops.firebasestorage.app",
  messagingSenderId: "155937300481",
  appId: "1:155937300481:web:6a2eed1576ab169afc2000",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
