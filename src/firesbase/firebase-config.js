// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {GoogleAuthProvider} from '@firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7JkSwrBMl9pkiqMjhDt21NyRkhm__R9E",
  authDomain: "pm-react.firebaseapp.com",
  projectId: "pm-react",
  storageBucket: "pm-react.appspot.com",
  messagingSenderId: "397252912009",
  appId: "1:397252912009:web:c9718c60f3c1bafe023758"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export {db, googleAuthProvider};