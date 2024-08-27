'use client';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD6t3Cz1LevLCs0MAFYqZ93NkzgqN6gDrc",
  authDomain: "flashcardsaas-a28da.firebaseapp.com",
  projectId: "flashcardsaas-a28da",
  storageBucket: "flashcardsaas-a28da.appspot.com",
  messagingSenderId: "462209121725",
  appId: "1:462209121725:web:9bdcd8ce39a38ce5f7e6d4",
  measurementId: "G-5TXTEZWRNX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export { db };
