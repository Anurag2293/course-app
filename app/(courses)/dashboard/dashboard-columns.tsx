"use client"

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"

import type { CourseType } from "@/lib/types"
import { formatDate, toEpochSeconds } from "@/lib/utils";

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
            const { startDate, dueDate } = row.original;
            const currentSeconds = toEpochSeconds(new Date());
            const progressPercentage = Math.max(0, currentSeconds-startDate) / (dueDate - startDate) * 100;
            return (
                <Progress value={progressPercentage} />
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
    }
];