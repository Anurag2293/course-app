"use client"

import { useEffect } from "react"

// FIREBASE
import { db } from "@/services/firebase.config"
import { collection, getDocs } from "firebase/firestore";

// REDUX IMPORTS
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/redux/store";
import { addCourses } from "@/redux/features/course-slice";
import { logInAsync } from "@/redux/features/auth-slice";

// STATE
import { CourseType } from "@/lib/types";

// UI
import { DataTable } from "@/components/data-table";
import { columns } from "./course-columns";

export default function Home() {
	const dispatch = useAppDispatch();
	const courses = useAppSelector((state) => state.courseSlice.value.courses)

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const coursesSnapshot = await getDocs(collection(db, "course"))
				const coursesToAdd: CourseType[] = [];
				coursesSnapshot.forEach((course) => {
					const courseToAdd = {uuid: course.id, ...course.data()}
					coursesToAdd.push(courseToAdd as CourseType);
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
			<div className="container mx-auto py-10">
				<DataTable columns={columns} data={courses} />
			</div>
		</div>
	)
}
