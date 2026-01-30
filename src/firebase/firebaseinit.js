import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX-7zBQo1pCiM2M6AIPi5Xg8LJ8yGy_RU",
  authDomain: "weatherapp-ff920.firebaseapp.com",
  projectId: "weatherapp-ff920",
  storageBucket: "weatherapp-ff920.firebasestorage.app",
  messagingSenderId: "406029026858",
  appId: "1:406029026858:web:049a5cf3ef19cd19552553"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// default export
const db = getFirestore(app);
export default db;