"use client"

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button";

import type { CourseType } from "@/lib/types"

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
        accessorKey: "code",
        header: "Course Code"
    },
    {
        accessorKey: "enrollmentStatus",
        header: "Enrollment Status"
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