"use client"

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

import type { CourseType } from "@/lib/types"
import { capitalize, formatDate, toEpochSeconds } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { markCourseCompleted } from "@/services/functions";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updateEnrolledCourses } from "@/redux/features/course-slice";
import { toast } from "sonner";

export const columns: ColumnDef<CourseType>[] = [
    {
        accessorKey: "name",
        header: "Course Name"
    },
    {
        accessorKey: "instructor",
        header: "Instructor"
    },
    {
        accessorKey: "thumbnail",
        header: "Thumbnail",
        cell: ({ row }) => {
            return (
                <Image src={"/" + row.original.thumbnail} alt={row.original.name} width={50} height={50} />
            )
        }
    },
    {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) => {
            const date = new Date(row.original.dueDate * 1000);
            const text = formatDate(date);
            return (
                <div>{text}</div>
            )
        }
    },
    {
        accessorKey: "startDate",
        header: "Course Progress",
        cell: ({ row }) => {
            const { startDate, dueDate, students } = row.original;
            const currentSeconds = toEpochSeconds(new Date());
            let progressPercentage = Math.max(0, currentSeconds-startDate) / (dueDate - startDate) * 100;

            // if course marked as completed, then the course progress is also completed.
            const { id: studentId } = useAppSelector(state => state.authSlice.value)
            const studentStatus = students.find((value) => value.studentId === studentId)
            const { courseStatus } = studentStatus || { courseStatus: "pending" }
            if (courseStatus === "completed") {
                progressPercentage = 100;
            }

            return (
                <Progress value={progressPercentage} />
            )
        }
    },
    {
        accessorKey: "students",
        header: "Completion Status",
        cell: ({ row }) => {
            const { id: studentId } = useAppSelector(state => state.authSlice.value)
            const studentStatus = row.original.students.find((value) => value.studentId === studentId)
            if (studentStatus === undefined) {
                return <div>Loading...</div>
            }
            const { courseStatus } = studentStatus
            return (
                <>
                    {courseStatus === "completed" && <div className="max-w-max rounded-lg  px-2 py-1 font-semibold bg-green-100 text-green-500">Completed</div>}
                    {courseStatus === "pending" && <div className="max-w-max rounded-lg  px-2 py-1 font-semibold bg-yellow-100 text-yellow-500">Pending</div>}
                </>
            )
        }
    },
    {
        accessorKey: "code",
        header: "Mark as completed",
        cell: ({ row }) => {
            const dispatch = useAppDispatch()
            const { id: studentId } = useAppSelector(state => state.authSlice.value)
            const { id: courseId, students,  } = row.original;
            const studentStatus = row.original.students.find((value) => value.studentId === studentId)
            const { courseStatus } = studentStatus || {}

            const handleMarkComplete = async () => {
                try {
                    const { error, response } = await markCourseCompleted(courseId, studentId);
                    if (error) {
                        throw new Error(error.message);
                    }
                    dispatch(updateEnrolledCourses(response as CourseType[]))
                    toast("Course marked complete successfully!");
                } catch (error: any) {
                    toast("Error while updating", {
                        description: error.message
                    })
                }
            }
            
            return (
                <>
                    {courseStatus === "completed" && <Button disabled variant="outline">Completed</Button>}
                    {courseStatus === "pending" && <Button onClick={handleMarkComplete}>Complete</Button>}
                </>
            )
        }
    },
    {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => {
            const course = row.original;
            return (
                <Link href={`/details/${course.id}`}>
                    <Button variant="ghost">View details</Button>
                </Link>
            )
        }
    },
];