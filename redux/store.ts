import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import courseSlice from "./features/course-slice";

export const store = configureStore({
    reducer: {
        courseSlice
    }
});

// get types of this store and export them
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export custom useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;