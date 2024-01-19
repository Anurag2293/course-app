"use client"

import { Suspense, useEffect } from "react"

// REDUX IMPORTS
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/redux/store";
import { addCourses } from "@/redux/features/course-slice";

// STATE
import { getAllCourses } from "@/services/functions";
import { CourseType } from "@/lib/types";

// UI
import { CourseDataTable } from "@/app/(courses)/course-data-table";
import { columns } from "./course-columns";
import { toast } from "sonner";


export default function Home() {
	const dispatch = useAppDispatch();
	const courses = useAppSelector((state) => state.courseSlice.value.courses)

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const { response, error } = await getAllCourses()
				if (error) {
					throw new Error(error.message)
				}
				dispatch(addCourses(response as CourseType[]));
			} catch (error: any) {
				toast(error.message)
			}
		}
		fetchCourses();
	}, []);

	return (
		<div className="container mx-auto py-10">
			<Suspense fallback={<div>Loading...</div>}>
				<CourseDataTable columns={columns} data={courses} />
			</Suspense>
		</div>
	)
}
