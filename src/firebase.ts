
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add your own Firebase configuration here
const firebaseConfig = {
  apiKey: "AIzaSyDiFT3BTn00RzLz6omqcaYdKPmIIqGvPl4",
  authDomain: "mindease-e585b.firebaseapp.com",
  projectId: "mindease-e585b",
  storageBucket: "mindease-e585b.firebasestorage.app",
  messagingSenderId: "1081449945852",
  appId: "1:1081449945852:web:150da071044915752e1579",
  measurementId: "G-WSNG5Q8EVN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
