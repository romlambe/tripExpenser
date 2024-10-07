// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { get } from "firebase/database";
import { getFirestore, collection } from "firebase/firestore";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc2RBp3uUw1mlQ_7hIcBiwxaIwHQTbtuw",
  authDomain: "expensify-3245e.firebaseapp.com",
  projectId: "expensify-3245e",
  storageBucket: "expensify-3245e.appspot.com",
  messagingSenderId: "836056430018",
  appId: "1:836056430018:web:ec8f3d23b49748d548125b"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage)
  });

export const db = getFirestore(app);
// export const auth = getAuth(app);


export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses')

export default app;
