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

type Props = {
    row: CourseType
}

const CompletionStatus = ({ row }: Props) => {
    const { id: studentId } = useAppSelector(state => state.authSlice.value)
    const studentStatus = row.students.find((value) => value.studentId === studentId)
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

export default CompletionStatus