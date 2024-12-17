import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKq1m4GN1HkWZM6LWgJbo-t6lyhsg3N3Y",
  authDomain: "odeio-native.firebaseapp.com",
  projectId: "odeio-native",
  storageBucket: "odeio-native.firebasestorage.app",
  messagingSenderId: "753223392981",
  appId: "1:753223392981:web:7e1d135fe0eebbe797cc5c"
};

// Initialize Firebase
export const App = initializeApp(firebaseConfig);
export const Auth = getAuth(App);
export const Firestore = getFirestore(App);