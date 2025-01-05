import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB4eY1Kb1aa-vB6U1YXCuHTs5oJr5GvEQo",
  authDomain: "food-ordering-website-f3cdb.firebaseapp.com",
  projectId: "food-ordering-website-f3cdb",
  storageBucket: "food-ordering-website-f3cdb.firebasestorage.app",
  messagingSenderId: "40784010930",
  appId: "1:40784010930:web:703b24ecdbdfdc6c6033ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { auth, googleProvider, signInWithPopup };
