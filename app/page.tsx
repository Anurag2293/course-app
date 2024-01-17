"use client"

import { useEffect } from "react"

// FIREBASE
import { db } from "@/services/firebase.config"
import { collection, getDocs, addDoc } from "firebase/firestore";

// REDUX EXPORTS
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/redux/store";
import { addCourses } from "@/redux/features/course-slice";
import { CourseType } from "@/lib/types";

export default function Home() {
	const dispatch = useAppDispatch();
	const courses = useAppSelector((state) => state.courseSlice.value.courses)

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const coursesSnapshot = await getDocs(collection(db, "course"))
				const coursesToAdd: CourseType[] = [];
				coursesSnapshot.forEach((course) => {
					coursesToAdd.push(course.data() as CourseType);
				})
				dispatch(addCourses(coursesToAdd));
			} catch (error: any) {
				console.log({ error })
				alert(error?.message)
			}
		}
		fetchCourses();
	}, []);

	return (
		<div>
			<h1>Hello World</h1>
			<button>Add document</button>
			{courses.map(course => {
				return <div>
					{course.name}
				</div>
			})}
		</div>
	)
}
