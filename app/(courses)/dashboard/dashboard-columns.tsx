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
        accessorKey: "id",
        header: "Course Code"
    },
    {
        accessorKey: "enrollmentStatus",
        header: "Enrollment Status"
    },
    {
        accessorKey: "uuid",
        header: "",
        cell: ({ row }) => {
            const course = row.original;
            return (
                <Link href={`/details/${course.uuid}`}>
                    <Button variant="ghost">View details</Button>
                </Link>
            )
        }
    }
];