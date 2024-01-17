"use client"

import { useState, useEffect } from "react"

import { db } from "@/services/firebase.config"
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function Home() {

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const coursesSnapshot = await getDocs(collection(db, "course"))
				// console.log({coursesSnapshot})
				coursesSnapshot.forEach((course) => {
					console.log(`${course.id} => ${course.data()}`);
					console.log({ data: course.data() });
				})
			} catch (error: any) {
				console.log({ error })
				alert(error?.message)
			}
		}
		fetchCourses();
	}, []);

	const handleSubmit = async () => {
		try {
			const docRef = await addDoc(collection(db, "course"), courseDemo);
			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}


	return (
		<div>
			<h1>Hello World</h1>
			<button onClick={handleSubmit}>Add document</button>
		</div>
	)
}

const courseDemo =
{
	name: 'Introduction to Flutter',
	instructor: 'Jack Reacher', // Name of the course instructor
	description: 'Learn the basics of Flutter development and build your first mobile app.',
	enrollmentStatus: 'Open', // Can be 'Open', 'Closed', or 'InProgress'
	thumbnail: 'your.image.here', //Link to the course thumbnail
	duration: '10 weeks', // Duration of the course
	schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
	location: 'Online',
	prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
	syllabus: [
		{
			week: 1,
			topic: 'Introduction to Flutter',
			content: 'Overview of Flutter, setting up your	development environment.'
		},
		{
			week: 2,
			topic: 'Building Your First App',
			content: 'Creating a simple mobile app using Flutter components.'
		},
		// Additional weeks and topics...
	],
	students: [
		{
			id: 101,
			name: 'Adam Zampa',
			email: 'adam@zampa.com',
		},
		{
			id: 102,
			name: 'Mitchell marsh',
			email: 'mitch@marsh.com',
		},
		// Additional enrolled students...
	],
}