"use client"

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

type Props = {
    uuid: string
}

const CourseDetailsComponent = ({ uuid }: Props) => {
    const courses = useAppSelector((state) => state.courseSlice.value.courses);
    const currentCourse = courses.filter((course) => course.uuid === uuid)[0];
    console.log({ currentCourse })

    if (!currentCourse) {
        return (
            <div>No such course exists!</div>
        )
    }

    return (
        <div className="w-full mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">{currentCourse.name} ({currentCourse.id})</h1>
            <h2 className="text-xl font-semibold mb-2">Instructor: {currentCourse.instructor}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{currentCourse.description}</p>
            <Separator />
            <div className={`p-3 rounded-md my-4 max-w-max
                ${currentCourse.enrollmentStatus === "Open" && "bg-green-100 text-green-400"} 
                ${currentCourse.enrollmentStatus === "InProgress" && "bg-yellow-100 text-yellow-400"} 
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
            <Button className="w-full md:w-1/2" size="lg">
                Enroll Now
            </Button>
        </div>
    )
}

export default CourseDetailsComponent;