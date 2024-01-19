
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
	
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud firestore
export const db = getFirestore(app);
export const coursesCollection = collection(db, "courses")
export const usersCollection = collection(db, "users")