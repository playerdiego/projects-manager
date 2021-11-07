// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import {getFirestore} from 'firebase/firestore';
import {GithubAuthProvider, GoogleAuthProvider} from '@firebase/auth';
import { getStorage } from "@firebase/storage";
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
const storage = getStorage();


const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();

export {db, storage, googleAuthProvider, githubAuthProvider, firebase, app};