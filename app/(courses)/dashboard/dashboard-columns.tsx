"use client"

// NODE MODULES
import Link from "next/link";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { toast } from "sonner";

// UI
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"

// UTILS
import type { CourseType } from "@/lib/types"
import { formatDate, toEpochSeconds } from "@/lib/utils";
import { markCourseCompleted } from "@/services/functions";

// REDUX
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/redux/store";
import { updateEnrolledCourses } from "@/redux/features/course-slice";
import ProgressBar from "@/components/dashboard-table/ProgressBar";
import CompletionStatus from "@/components/dashboard-table/CompletionStatus";
import CompleteButton from "@/components/dashboard-table/CompleteButton";

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
                <Image src={row.original.thumbnail} alt={row.original.name} width={50} height={50} />
            )
        }
    },
    {
        accessorKey: "dueDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Due Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
            return <ProgressBar row={row.original} />
        }
    },
    {
        accessorKey: "students",
        header: "Completion Status",
        cell: ({ row }) => {
            return <CompletionStatus row={row.original} />
        }
    },
    {
        accessorKey: "code",
        header: "Mark as completed",
        cell: ({ row }) => {
            <CompleteButton row={row.original} />
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