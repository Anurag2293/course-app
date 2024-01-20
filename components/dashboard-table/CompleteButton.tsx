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

const CompleteButton = ({ row }: Props) => {
    const dispatch = useAppDispatch()
    const { id: studentId } = useAppSelector(state => state.authSlice.value)
    const { id: courseId, students, } = row;
    const studentStatus = row.students.find((value) => value.studentId === studentId)
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

export default CompleteButton