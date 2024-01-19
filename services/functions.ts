
// FIREBASE
import { coursesCollection } from "@/services/firebase.config"
import { getDocs } from "firebase/firestore";

export const getAllDocs = async () => {
    try {
        const coursesSnapshot = await getDocs(coursesCollection)
        const coursesToAdd: CourseType[] = [];
        coursesSnapshot.forEach((course) => {
            let courseToAdd = { id: course.id, ...course.data() } as CourseType
            courseToAdd = { 
                ...courseToAdd, 
                startDate: course.data().startDate.seconds, 
                dueDate: course.data().dueDate.seconds 
            }
            coursesToAdd.push(courseToAdd)
        })
        return { response: coursesToAdd, error: undefined };
    } catch (error: any) {
        return { response: [], error: error}
    }
}