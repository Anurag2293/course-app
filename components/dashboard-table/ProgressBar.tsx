
// UI
import { Progress } from "@/components/ui/progress"

// UTILS
import type { CourseType } from "@/lib/types"
import { toEpochSeconds } from "@/lib/utils";

// REDUX
import { useAppSelector } from "@/redux/store";

type Props = {
    row: CourseType
}

const ProgressBar = ({ row }: Props) => {
    const { startDate, dueDate, students } = row;
    const currentSeconds = toEpochSeconds(new Date());
    let progressPercentage = Math.max(0, currentSeconds - startDate) / (dueDate - startDate) * 100;

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

export default ProgressBar