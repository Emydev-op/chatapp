// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC8hoQQ1a1cDqTiBTY6S-PuigXsTFrNCw",
  authDomain: "chat-app-d715e.firebaseapp.com",
  projectId: "chat-app-d715e",
  storageBucket: "chat-app-d715e.appspot.com",
  messagingSenderId: "283863007664",
  appId: "1:283863007664:web:8053dbf8c3ff587db09675",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app)

export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");