"use client"

import { useState, useMemo, useCallback } from "react"

// UTILS
import { addStudentToCourse, getCourseByID } from "@/services/functions";

// REDUX IMPORTS
import { useAppSelector } from "@/redux/store";

// UI IMPORTS
import { Button } from "@/components/ui/button"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner";

type Props = {
    id: string
}

const initialCourseState: CourseType = {
    id: "",
    code: "",
    name: "",
    instructor: "",
    description: "",
    enrollmentStatus: "Open",
    thumbnail: "",
    duration: "",
    schedule: "",
    location: "",
    prerequisites: [],
    syllabus: [],
    startDate: 0,
    dueDate: 0,
    students: [{ studentId: "", courseStatus: "pending" }]
}

const CourseDetailsComponent = ({ id: courseId }: Props) => {
    const { isAuthenticated, id: studentId } = useAppSelector(state => state.authSlice.value);
    const [currentCourse, setCurrentCourse] = useState<CourseType>(initialCourseState)
    const [studentEnrolled, setStudentEnrolled] = useState<boolean>(false);

    const checkDetails = useCallback(async () => {
        const { response, error } = await getCourseByID(courseId);
        if (error) {
            setCurrentCourse(initialCourseState);
            setStudentEnrolled(false);
        } else {
            let currCourse = response as CourseType;
            setCurrentCourse(currCourse);
            setStudentEnrolled(currCourse.students.filter((student) => student.studentId === studentId).length > 0)
        }
    }, [courseId, studentId])

    useMemo(async () => {
        await checkDetails()
    }, [checkDetails])

    const handleEnrollmentSubmit = async () => {
        console.log("we are here");
        try {
            const { response, error } = await addStudentToCourse(courseId, studentId);
            console.log({response, error})
            if (error) {
                throw new Error(error.message)
            }
            await checkDetails()
            console.log("Registered")
            toast(response)
        } catch (error: any) {
            toast(error.message)
        }
    }

    return (
        <div className="w-full mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">{currentCourse.name} ({currentCourse.code})</h1>
            <h2 className="text-xl font-semibold mb-2">Instructor: {currentCourse.instructor}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{currentCourse.description}</p>
            <Separator />
            <div className={`p-3 rounded-md my-4 max-w-max
                ${currentCourse.enrollmentStatus === "Open" && "bg-green-100 text-green-400"} 
                ${currentCourse.enrollmentStatus === "In Progress" && "bg-yellow-100 text-yellow-400"} 
                ${currentCourse.enrollmentStatus === "Closed" && "bg-red-100 text-red-400"}
            `}>
                <strong>Status: </strong>{currentCourse.enrollmentStatus}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <CardTitle className="font-semibold mb-1">Duration</CardTitle>
                    <CardDescription>{currentCourse.duration}</CardDescription>
                </div>
                <div>
                    <CardTitle className="font-semibold mb-1">Schedule</CardTitle>
                    <CardDescription>{currentCourse.schedule}</CardDescription>
                </div>
                <div>
                    <CardTitle className="font-semibold mb-1">Location</CardTitle>
                    <CardDescription>{currentCourse.location}</CardDescription>
                </div>
                <div>
                    <CardTitle className="font-semibold mb-1">Pre-requisites</CardTitle>
                    <ul className="list-disc list-inside">
                        {currentCourse.prerequisites.map((prerequisite, index) => (<li key={index}>{prerequisite}</li>))}
                    </ul>
                </div>
            </div>
            <Collapsible className="mb-4">
                <CollapsibleTrigger asChild>
                    <Button variant="outline">View Syllabus</Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="my-2">
                    {currentCourse.syllabus.map((syllabi, index) => (
                        <Card key={syllabi.week} className="my-2">
                            <CardHeader>
                                <CardTitle>Week {syllabi.week}: {syllabi.topic}</CardTitle>
                                <CardDescription>{syllabi.content}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </CollapsibleContent>
            </Collapsible>
            <Button
                className="w-full md:w-1/2"
                size="lg"
                disabled={!isAuthenticated || studentEnrolled || currentCourse.enrollmentStatus === "Closed"}
                onClick={handleEnrollmentSubmit}
            >
                {studentEnrolled ? "Enrolled" : "Enroll Now"}
            </Button>
        </div>
    )
}

export default CourseDetailsComponent;