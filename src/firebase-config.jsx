// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3qVzyzZVz9W0EvBg6ENTHMKtxLvn4I_A",
  authDomain: "chatapp-4a386.firebaseapp.com",
  projectId: "chatapp-4a386",
  storageBucket: "chatapp-4a386.appspot.com",
  messagingSenderId: "450994435786",
  appId: "1:450994435786:web:dff25f8f2e759c70072633"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);