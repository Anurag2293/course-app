
// FIREBASE
import { db } from "../services/firebase.config.ts"
import { addDoc, collection } from "firebase/firestore";
import type { CourseType } from "./types";

let computerScienceCourses = [
    {
        id: "CS101",
        code: "INTROCS",
        name: "Introduction to Computer Science",
        instructor: "Dr. Alex Johnson",
        description: "This course provides an overview of the fundamentals of computer science, including basic programming, problem-solving, and the basics of algorithmic thinking.",
        enrollmentStatus: "Open",
        thumbnail: "intro_to_cs_thumbnail.jpg",
        duration: "12 weeks",
        schedule: "Mondays and Wednesdays, 3:00 PM - 5:00 PM",
        location: "Tech Building, Room 101",
        prerequisites: [],
        syllabus: [
            { week: 1, topic: "Introduction to Programming", content: "Basics of Python" },
            // ... more weeks
        ],
        startDate: new Date("2024-02-01"),
        dueDate: new Date("2024-05-01"),
        students: []
    },
    {
        id: "CS103",
        code: "ALGO101",
        name: "Algorithms",
        instructor: "Dr. Robert Yang",
        description: "This course covers fundamental algorithms in computer science, focusing on divide and conquer, dynamic programming, and greedy algorithms.",
        enrollmentStatus: "In Progress",
        thumbnail: "algorithms_thumbnail.jpg",
        duration: "10 weeks",
        schedule: "Wednesdays and Fridays, 4:00 PM - 6:00 PM",
        location: "Main Campus, Room 305",
        prerequisites: ["DATASTR"],
        syllabus: [
            { week: 1, topic: "Divide and Conquer", content: "Basic Principles and Examples" },
            // ... more weeks
        ],
        startDate: new Date("2024-01-15"),
        dueDate: new Date("2024-03-26"),
        students: []
    },
    {
        id: "CS104",
        code: "DBSYS",
        name: "Database Systems",
        instructor: "Dr. Maria Lopez",
        description: "Exploring the architecture of modern database systems, this course covers SQL, data modeling, and database design.",
        enrollmentStatus: "Open",
        thumbnail: "database_systems_thumbnail.jpg",
        duration: "12 weeks",
        schedule: "Mondays and Thursdays, 2:00 PM - 4:00 PM",
        location: "Tech Building, Room 108",
        prerequisites: ["INTROCS"],
        syllabus: [
            { week: 1, topic: "Introduction to Databases", content: "Overview of Database Systems" },
            // ... more weeks
        ],
        startDate: new Date("2024-02-10"),
        dueDate: new Date("2024-05-05"),
        students: []
    },
    {
        id: "CS105",
        code: "WEBDEV",
        name: "Web Development",
        instructor: "Dr. Lisa Ray",
        description: "An introduction to web development, covering HTML, CSS, JavaScript, and responsive design principles.",
        enrollmentStatus: "Open",
        thumbnail: "webdev_thumbnail.jpg",
        duration: "8 weeks",
        schedule: "Tuesdays and Thursdays, 1:00 PM - 3:00 PM",
        location: "Online",
        prerequisites: ["INTROCS"],
        syllabus: [
            { week: 1, topic: "HTML Basics", content: "Introduction to HTML" },
            // ... more weeks
        ],
        startDate: new Date("2024-03-01"),
        dueDate: new Date("2024-04-26"),
        students: []
    },
    {
        id: "CS106",
        code: "MLAI",
        name: "Machine Learning & AI",
        instructor: "Dr. Neil Patil",
        description: "Fundamentals of machine learning and artificial intelligence, covering algorithms, neural networks, and practical applications.",
        enrollmentStatus: "Closed",
        thumbnail: "mlai_thumbnail.jpg",
        duration: "15 weeks",
        schedule: "Mondays, Wednesdays, and Fridays, 11:00 AM - 1:00 PM",
        location: "Tech Building, Room 407",
        prerequisites: ["ALGO101", "DATASTR"],
        syllabus: [
            { week: 1, topic: "Introduction to Machine Learning", content: "Basic Concepts and Definitions" },
            // ... more weeks
        ],
        startDate: new Date("2024-01-10"),
        dueDate: new Date("2024-04-30"),
        students: []
    },
    {
        id: "CS107",
        code: "OPSY",
        name: "Operating Systems",
        instructor: "Dr. Alan Turing",
        description: "Detailed study of operating system concepts, including process management, memory management, and file systems.",
        enrollmentStatus: "In Progress",
        thumbnail: "os_thumbnail.jpg",
        duration: "14 weeks",
        schedule: "Wednesdays and Fridays, 9:00 AM - 11:00 AM",
        location: "Main Campus, Room 310",
        prerequisites: ["DATASTR"],
        syllabus: [
            { week: 1, topic: "Introduction to Operating Systems", content: "Overview and History" },
            // ... more weeks
        ],
        startDate: new Date("2024-01-15"),
        dueDate: new Date("2024-04-23"),
        students: []
    },
    {
        id: "CS108",
        code: "NETSEC",
        name: "Network Security",
        instructor: "Dr. Ava Smith",
        description: "Exploring the fundamentals of network security, including cryptography, network attacks, and defense strategies.",
        enrollmentStatus: "Open",
        thumbnail: "netsec_thumbnail.jpg",
        duration: "12 weeks",
        schedule: "Mondays and Thursdays, 3:00 PM - 5:00 PM",
        location: "Tech Building, Room 202",
        prerequisites: ["INTROCS"],
        syllabus: [
            { week: 1, topic: "Basics of Network Security", content: "Introduction to Cryptography" },
            // ... more weeks
        ],
        startDate: new Date("2024-02-05"),
        dueDate: new Date("2024-04-28"),
        students: []
    },
    {
        id: "CS109",
        code: "MOBDEV",
        name: "Mobile App Development",
        instructor: "Dr. John Doe",
        description: "Covers the fundamentals of mobile application development, including UI/UX design, mobile programming languages, and deployment.",
        enrollmentStatus: "Closed",
        thumbnail: "mobdev_thumbnail.jpg",
        duration: "10 weeks",
        schedule: "Tuesdays and Fridays, 10:00 AM - 12:00 PM",
        location: "Online",
        prerequisites: ["WEBDEV"],
        syllabus: [
            { week: 1, topic: "Introduction to Mobile Development", content: "Platforms and Tools" },
            // ... more weeks
        ],
        startDate: new Date("2024-03-10"),
        dueDate: new Date("2024-05-19"),
        students: []
    },
    {
        id: "CS110",
        code: "ADVCODE",
        name: "Advanced Programming Concepts",
        instructor: "Dr. Emily Stone",
        description: "An advanced course on programming paradigms, including functional programming, concurrent programming, and high-performance computing.",
        enrollmentStatus: "Open",
        thumbnail: "advcode_thumbnail.jpg",
        duration: "16 weeks",
        schedule: "Mondays, Wednesdays, and Fridays, 2:00 PM - 4:00 PM",
        location: "Tech Building, Room 305",
        prerequisites: ["ALGO101"],
        syllabus: [
            { week: 1, topic: "Functional Programming", content: "Introduction and Basic Concepts" },
            // ... more weeks
        ],
        startDate: new Date("2024-01-20"),
        dueDate: new Date("2024-05-10"),
        students: []
    },
    {
        id: "CS111",
        code: "CLOUDCOMP",
        name: "Cloud Computing",
        instructor: "Dr. Richard Feynman",
        description: "Introduction to cloud computing concepts, including infrastructure, services, and deployment models.",
        enrollmentStatus: "In Progress",
        thumbnail: "cloudcomp_thumbnail.jpg",
        duration: "12 weeks",
        schedule: "Tuesdays and Thursdays, 4:00 PM - 6:00 PM",
        location: "Main Campus, Room 401",
        prerequisites: ["WEBDEV"],
        syllabus: [
            { week: 1, topic: "Basics of Cloud Computing", content: "Cloud Service Models" },
            // ... more weeks
        ],
        startDate: new Date("2024-02-01"),
        dueDate: new Date("2024-04-24"),
        students: []
    },
    {
        id: "CS112",
        code: "COMGRAPH",
        name: "Computer Graphics",
        instructor: "Dr. Jane Wilson",
        description: "This course focuses on the principles and practices in computer graphics, including 3D modeling, rendering, and animation.",
        enrollmentStatus: "Open",
        thumbnail: "comgraph_thumbnail.jpg",
        duration: "15 weeks",
        schedule: "Mondays and Wednesdays, 1:00 PM - 3:00 PM",
        location: "Tech Building, Room 408",
        prerequisites: ["DATASTR"],
        syllabus: [
            { week: 1, topic: "Introduction to Computer Graphics", content: "Fundamental Concepts" },
            // ... more weeks
        ],
        startDate: new Date("2024-03-05"),
        dueDate: new Date("2024-06-18"),
        students: []
    }
];

const addCourse = async (course: CourseType) => {
    const coursesCollection = collection(db, "courses");
    await addDoc(coursesCollection, course);
} 

async function addCoursesToDB() {
    try {
        const promises = computerScienceCourses.map((course: any) => addCourse(course))
        await Promise.all(promises)
        console.log("Initialized the database successfully!")
    } catch (error) {
        console.log("Their was an error initializing the firebase. Please run the setup again.")
    } finally {
        process.exit()
    }
}

addCoursesToDB()