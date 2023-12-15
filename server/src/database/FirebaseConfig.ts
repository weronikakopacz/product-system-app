import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcFy4LDJ0sIQLvw0bJKrlr45DyAWvfudg",
  authDomain: "programowanie-aa217.firebaseapp.com",
  projectId: "programowanie-aa217",
  storageBucket: "programowanie-aa217.appspot.com",
  messagingSenderId: "103985831622",
  appId: "1:103985831622:web:ef0a26fa214d54d72901c7",
  measurementId: "G-NCVZX3041T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };