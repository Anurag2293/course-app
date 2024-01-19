
// FIREBASE
import { db, coursesCollection } from "@/services/firebase.config"
import { getDoc, getDocs, doc, updateDoc } from "firebase/firestore";

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

export const addStudentToCourse = async (courseId: string, studentId: string) => {
    try {
        console.log({courseId, studentId})
        const currentDocRef = doc(db, "courses", courseId);
        const currentDocSnap = await getDoc(currentDocRef);
        if (!currentDocSnap.exists()) {
            throw new Error("No such document!");
        }
        const currentDoc = currentDocSnap.data() as CourseType;
        
        const studentsEnrolled = currentDoc.students;
        if (studentsEnrolled.filter(student => student.studentId === studentId).length > 0) {
            throw new Error("Already enrolled!")
        } 

        studentsEnrolled.push({studentId, courseStatus: "pending"});
        await updateDoc(currentDocRef, {
            students: studentsEnrolled
        });
        return { error: undefined, response: "Course registered!"};
    } catch (error: any) {
        return { error: error.message, response: undefined };
    }
}

export const getCourseByID = async (courseId: string) => {
    try {
        const currentDocRef = doc(db, "courses", courseId);
        const currentDocSnap = await getDoc(currentDocRef);
        if (!currentDocSnap.exists()) {
            throw new Error("No such document!");
        }
        const currentDoc = currentDocSnap.data() as CourseType;
        return { error: undefined, response: currentDoc};
    } catch (error: any) {
        return { error: error.message, response: undefined };
    }
}