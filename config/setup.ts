
const { initializeApp } = require("firebase/app")
const { addDoc, collection, getFirestore, doc, deleteDoc, getDocs } = require("firebase/firestore");
const fs = require("fs")

const firebaseConfig = {
	apiKey: "AIzaSyCofd05rLHzFcmss_6DoaYj4MXnUgeSbH8",
	authDomain: "course-app-alemeno.firebaseapp.com",
	projectId: "course-app-alemeno",
	storageBucket: "course-app-alemeno.appspot.com",
	messagingSenderId: "682724620931",
	appId: "1:682724620931:web:bdf7dbb5985a96bab739b6",
	measurementId: "G-SL7J38MG8K" // optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud firestore
const db = getFirestore(app);

const coursesCollection = collection(db, "courses");

type CourseType = {
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
    startDate: number,
    dueDate: number,
    students: [{
        studentId: string,
        courseStatus: "pending" | "completed"
    }]
}

type SyllabusType = {
    week: number,
    topic: string,
    content: string
}

const getJSONData = () => {
    const data = fs.readFileSync("demo-courses.json");
    return JSON.parse(data);
}

const deleteAllDocs = async () => {
    const coursesSnapshot = await getDocs(coursesCollection);
    coursesSnapshot.forEach(async (course: any) => {
        await deleteDoc(doc(db, "courses", course.id))
    })
}

const addCourse = async (course: CourseType) => {
    await addDoc(coursesCollection, course);
} 

const addCoursesToDB = async () => {
    try {
        await deleteAllDocs();
        const courses = getJSONData()
        const promises = courses.map((course: any) => addCourse(course))
        await Promise.all(promises)
        console.log("Initialized the database successfully!")
    } catch (error) {
        console.log("Their was an error initializing the firebase. Please run the setup again.")
    } finally {
        process.exit()
    }
}

addCoursesToDB()