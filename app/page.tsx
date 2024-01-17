"use client"

import { useEffect } from "react"

// FIREBASE
import { db } from "@/services/firebase.config"
import { collection, getDocs, addDoc } from "firebase/firestore";

// REDUX EXPORTS
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/redux/store";
import { CourseType } from "@/lib/types";

export default function Home() {
	const courses = useAppSelector((state) => state.courseSlice.value.courses)

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

	const addCourse = async (courseDemo: CourseType) => {
		try {
			const docRef = await addDoc(collection(db, "course"), courseDemo);
			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}

	const handleSubmit = () => {
		// coursesToAdd.forEach(async (course: any) => {
		// 	await addCourse(course);
		// })
		const promises = coursesToAdd.map((course: any) => addCourse(course));
		Promise
			.all(promises)
			.then(() => {
				console.log("All courses added.")
			})
			.catch(err => {
				console.log("Error occurred: ", err);
			})
	}

	return (
		<div>
			<h1>Hello World</h1>
			<button onClick={handleSubmit}>Add document</button>
		</div>
	)
}

const coursesToAdd = [
	{
		id: "CS101",
		name: "Introduction to Programming",
		instructor: "Dr. Jane Smith",
		description: "An introductory course to programming concepts using Python.",
		enrollmentStatus: "Open",
		thumbnail: "intro_programming_thumbnail.jpg",
		duration: "10 weeks",
		schedule: "Mondays and Wednesdays, 10:00 AM - 12:00 PM",
		location: "Online",
		prerequisites: ["None"],
		syllabus: [
			{ week: 1, topic: "Basics of Python", content: "Introduction to Python and setting up the environment." },
			{ week: 2, topic: "Control Structures", content: "If statements, loops, and flow control." },
			// ... more weeks
		],
		students: []
	},
	{
		id: "CS201",
		name: "Data Structures",
		instructor: "Dr. Alan Turing",
		description: "A course on fundamental data structures in computer science.",
		enrollmentStatus: "InProgress",
		thumbnail: "data_structures_thumbnail.jpg",
		duration: "12 weeks",
		schedule: "Tuesdays and Thursdays, 2:00 PM - 4:00 PM",
		location: "Offline",
		prerequisites: ["Introduction to Programming"],
		syllabus: [
			{ week: 1, topic: "Arrays and Lists", content: "Introduction to linear data structures." },
			{ week: 2, topic: "Stacks and Queues", content: "Understanding LIFO and FIFO structures." },
			// ... more weeks
		],
		students: []
	},
	// Continuing from the previous list...
	{
		id: "CS301",
		name: "Algorithms",
		instructor: "Prof. Emily Clarke",
		description: "Advanced course on algorithms, their design, analysis, and implementation.",
		enrollmentStatus: "Closed",
		thumbnail: "algorithms_thumbnail.jpg",
		duration: "14 weeks",
		schedule: "Wednesdays and Fridays, 3:00 PM - 5:00 PM",
		location: "Offline",
		prerequisites: ["Data Structures"],
		syllabus: [
			{ week: 1, topic: "Sorting Algorithms", content: "Introduction to sorting, bubble sort, quicksort, mergesort." },
			{ week: 2, topic: "Search Algorithms", content: "Binary search, depth-first search, breadth-first search." },
			// ... more weeks
		],
		students: []
	},
	{
		id: "CS401",
		name: "Database Systems",
		instructor: "Dr. Michael Johnson",
		description: "Covers database design, SQL, and database management systems.",
		enrollmentStatus: "Open",
		thumbnail: "database_systems_thumbnail.jpg",
		duration: "12 weeks",
		schedule: "Mondays and Thursdays, 10:00 AM - 12:00 PM",
		location: "Hybrid",
		prerequisites: ["Introduction to Programming"],
		syllabus: [
			{ week: 1, topic: "Introduction to Databases", content: "Overview of database systems, history, and uses." },
			{ week: 2, topic: "SQL Basics", content: "Basic queries, data manipulation, and retrieval operations." },
			// ... more weeks
		],
		students: []
	},
	{
		id: "CS501",
		name: "Operating Systems",
		instructor: "Prof. Anna Bell",
		description: "Exploration of fundamental concepts in operating systems including processes, threads, and memory management.",
		enrollmentStatus: "InProgress",
		thumbnail: "operating_systems_thumbnail.jpg",
		duration: "15 weeks",
		schedule: "Tuesdays and Fridays, 1:00 PM - 3:00 PM",
		location: "Offline",
		prerequisites: ["Data Structures"],
		syllabus: [
			{ week: 1, topic: "Introduction to Operating Systems", content: "Overview of OS structures, history, and functions." },
			{ week: 2, topic: "Processes and Threads", content: "Process lifecycle, thread management." },
			// ... more weeks
		],
		students: []
	},
	{
		id: "CS601",
		name: "Computer Networks",
		instructor: "Dr. Robert Zhao",
		description: "Covers the fundamentals of computer networking including the OSI model, IP addressing, and network protocols.",
		enrollmentStatus: "Open",
		thumbnail: "computer_networks_thumbnail.jpg",
		duration: "13 weeks",
		schedule: "Mondays and Wednesdays, 4:00 PM - 6:00 PM",
		location: "Online",
		prerequisites: ["Introduction to Programming"],
		syllabus: [
			{ week: 1, topic: "Introduction to Networking", content: "Basics of computer networks, history, and importance." },
			{ week: 2, topic: "OSI Model", content: "Understanding the OSI model layers and functions." },
			// ... more weeks
		],
		students: []
	},
	{
		id: "CS701",
		name: "Artificial Intelligence",
		instructor: "Prof. Sarah Lee",
		description: "Introduction to the principles and techniques used in artificial intelligence.",
		enrollmentStatus: "Closed",
		thumbnail: "artificial_intelligence_thumbnail.jpg",
		duration: "16 weeks",
		schedule: "Tuesdays and Thursdays, 9:00 AM - 11:00 AM",
		location: "Hybrid",
		prerequisites: ["Data Structures", "Algorithms"],
		syllabus: [
			{ week: 1, topic: "History of AI", content: "Overview of the development of AI over the years." },
			{ week: 2, topic: "Search Algorithms in AI", content: "Applying search strategies in AI contexts." },
			// ... more weeks
		],
		students: []
	},
	{
		id: "CS801",
		name: "Web Development",
		instructor: "Dr. Kevin Brown",
		description: "Comprehensive course on front-end and back-end web development.",
		enrollmentStatus: "Open",
		thumbnail: "web_development_thumbnail.jpg",
		duration: "12 weeks",
		schedule: "Mondays, Wednesdays, and Fridays, 2:00 PM - 4:00 PM",
		location: "Online",
		prerequisites: ["Introduction to Programming"],
		syllabus: [
			{ week: 1, topic: "HTML Basics", content: "Introduction to HTML and building web page structures." },
			{ week: 2, topic: "CSS for Styling", content: "Using CSS to style web pages." },
			// ... more weeks
		],
		students: []
	},
	{
		id: "CS901",
		name: "Machine Learning",
		instructor: "Prof. Olivia Green",
		description: "Introduction to machine learning concepts and algorithms.",
		enrollmentStatus: "InProgress",
		thumbnail: "machine_learning_thumbnail.jpg",
		duration: "14 weeks",
		schedule: "Wednesdays and Fridays, 10:00 AM - 12:00 PM",
		location: "Hybrid",
		prerequisites: ["Algorithms", "Statistics"],
		syllabus: [
			{ week: 1, topic: "Overview of Machine Learning", content: "History, applications, and types of machine learning." },
			{ week: 2, topic: "Supervised Learning", content: "Concepts of supervised learning and algorithms." },
			// ... more weeks
		],
		students: []
	},
	{
		id: "CS1001",
		name: "Cybersecurity Fundamentals",
		instructor: "Dr. Emily Ford",
		description: "Basics of cybersecurity, including threats, vulnerabilities, and protection strategies.",
		enrollmentStatus: "Open",
		thumbnail: "cybersecurity_thumbnail.jpg",
		duration: "11 weeks",
		schedule: "Tuesdays and Thursdays, 5:00 PM - 7:00 PM",
		location: "Online",
		prerequisites: ["Introduction to Programming"],
		syllabus: [
			{ week: 1, topic: "Introduction to Cybersecurity", content: "Understanding the importance of cybersecurity." },
			{ week: 2, topic: "Malware and Threats", content: "Types of malware, and common cyber threats." },
			// ... more weeks
		],
		students: []
	},
	{
		id: "CS1101",
		name: "Software Engineering",
		instructor: "Prof. John Carter",
		description: "Study of software development lifecycle, methodologies, and best practices.",
		enrollmentStatus: "Closed",
		thumbnail: "software_engineering_thumbnail.jpg",
		duration: "15 weeks",
		schedule: "Mondays, Wednesdays, and Fridays, 9:00 AM - 11:00 AM",
		location: "Offline",
		prerequisites: ["Data Structures", "Algorithms"],
		syllabus: [
			{ week: 1, topic: "Introduction to Software Engineering", content: "Basics of software engineering and its significance." },
			{ week: 2, topic: "Software Development Life Cycle", content: "Exploring different phases of SDLC." },
			// ... more weeks
		],
		students: []
	},
	{
		id: "CS1201",
		name: "Cloud Computing",
		instructor: "Dr. Rachel Adams",
		description: "Covers cloud architecture, services, hosting, and security considerations.",
		enrollmentStatus: "Open",
		thumbnail: "cloud_computing_thumbnail.jpg",
		duration: "13 weeks",
		schedule: "Tuesdays and Thursdays, 3:00 PM - 5:00 PM",
		location: "Hybrid",
		prerequisites: ["Computer Networks"],
		syllabus: [
			{ week: 1, topic: "Introduction to Cloud Computing", content: "Fundamentals of cloud computing and its models." },
			{ week: 2, topic: "Cloud Services and Architecture", content: "Exploring various cloud services and architecture models." },
			// ... more weeks
		],
		students: []
	}
];
