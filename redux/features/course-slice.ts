import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { CourseType } from "@/lib/types";

type CourseState = {
    courses: Array<CourseType>
}

type InitialState = {
    value: CourseState
}

const initialState = {
    value: {
        courses: []
    } as CourseState
} as InitialState


export const course = createSlice({
    name: "course",
    initialState,
    reducers: {
        resetCourses: () => {
            return initialState;
        }
    }
})

// exporting actions and reducers from course slice
export const { resetCourses } = course.actions;
export default course.reducer;