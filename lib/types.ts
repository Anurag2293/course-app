
export type CourseType = {
    id: string,
    code: string,
    name: string,
    instructor: string,
    description: string,
    enrollmentStatus: "Open" | "Closed" | "In Progress",
    thumbnail: string,
    duration: string,
    schedule: string,
    location: string,
    prerequisites: Array<string>,
    syllabus: Array<SyllabusType>,
    startDate: Date,
    dueDate: Date,
    students: [{
        studentId: string,
        courseStatus: "pending" | "completed"
    }]
}

export type StudentType = {
    id: string,
    name: string,
    email: string
}

export type SyllabusType = {
    week: number,
    topic: string,
    content: string
}