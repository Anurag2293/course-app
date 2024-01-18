
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCofd05rLHzFcmss_6DoaYj4MXnUgeSbH8",
	authDomain: "course-app-alemeno.firebaseapp.com",
	projectId: "course-app-alemeno",
	storageBucket: "course-app-alemeno.appspot.com",
	messagingSenderId: "682724620931",
	appId: "1:682724620931:web:bdf7dbb5985a96bab739b6",
	measurementId: "G-SL7J38MG8K" // optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud firestore
export const db = getFirestore(app);
export const coursesCollection = collection(db, "courses")
export const usersCollection = collection(db, "users")