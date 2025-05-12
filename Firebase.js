import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDNcU9wSp0RcxIFzig5OQZyatOqGBY4HjU",
  authDomain: "clone-76909.firebaseapp.com",
  projectId: "clone-76909",
  storageBucket: "clone-76909.appspot.com",
  messagingSenderId: "962533151106",
  appId: "1:962533151106:web:3c9310a026e5429895bf9b"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getFirestore(app);