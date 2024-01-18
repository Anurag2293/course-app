
export type CourseType = {
    uuid: string,
    id: string,
    name: string,
    instructor: string,
    description: string,
    enrollmentStatus: "Open" | "Closed" | "InProgress",
    thumbnail: string,
    duration: string,
    schedule: string,
    location: "Online" | "Offline" | "Hybrid",
    prerequisites: Array<string>,
    syllabus: Array<SyllabusType>,
    students: Array<StudentType>
}

export type StudentType = {
    id: number,
    name: string,
    email: string
}

export type SyllabusType = {
    week: number,
    topic: string,
    content: string
}