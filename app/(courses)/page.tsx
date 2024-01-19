"use client"

import { useEffect } from "react"

// REDUX IMPORTS
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/redux/store";
import { addCourses } from "@/redux/features/course-slice";

// STATE
import { getAllDocs } from "@/services/functions";
import { CourseType } from "@/lib/types";

// UI
import { DataTable } from "@/components/data-table";
import { columns } from "./course-columns";
import { toast } from "sonner";


export default function Home() {
	const dispatch = useAppDispatch();
	const courses = useAppSelector((state) => state.courseSlice.value.courses)

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const { response, error } = await getAllDocs()
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
		<div>
			<div className="container mx-auto py-10">
				<DataTable columns={columns} data={courses} />
			</div>
		</div>
	)
}
