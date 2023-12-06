import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXUFCi3Y_k0QmJGHFOQFzHrSVFDKUJa-c",
  authDomain: "n423-20e27.firebaseapp.com",
  projectId: "n423-20e27",
  storageBucket: "n423-20e27.appspot.com",
  messagingSenderId: "273133448656",
  appId: "1:273133448656:web:b539ad9c391b95a55f5dd5",
  measurementId: "G-20WTNQHVD4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
