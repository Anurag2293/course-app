// NODE MODULES
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// STATE
import type { StudentType } from "@/lib/types";

// FIREBASE
import { db } from "@/services/firebase.config"
import { addDoc, collection, getDocs } from "firebase/firestore";
import { toast } from "sonner";

type AuthState = {
    isAuthenticated: boolean;
} & StudentType

type InitialState = {
    value: AuthState
}

const initialState = {
    value: {
        isAuthenticated: false,
        id: "",
        name: "",
        email: ""
    } as AuthState
} as InitialState;

export const logInAsync = createAsyncThunk(
    "auth/logInAsync",
    async ({ name, email }: {name: string, email: string}, thunkAPI) => {
        try {
            const usersCollection = collection(db, "users");
            const snapshot = await getDocs(usersCollection);
            const allUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StudentType));
            const currentUser = allUsers.filter(user => user.email === email);
            if (currentUser.length > 0) {
                return currentUser[0] as StudentType;
            }
            const newUserRef = await addDoc(usersCollection, {
                name, email
            })
            const newUser = { id: newUserRef.id, name, email } as StudentType;
            return newUser;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => {
            return initialState
        },
        logIn: (state, action: PayloadAction<StudentType>) => {
            return {
                value: {
                    isAuthenticated: true,
                    id: action.payload.id,
                    email: action.payload.email,
                    name: action.payload.name
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logInAsync.fulfilled, (state, action: PayloadAction<StudentType>) => {
            toast("Logged in successfully!")
            return {
                value: {
                    isAuthenticated: true,
                    id: action.payload.id,
                    email: action.payload.email,
                    name: action.payload.name
                }
            }
        });
        builder.addCase(logInAsync.rejected, (state, action) => {
            toast("Login Unsuccesful!", {
                description: action.error.stack,
                descriptionClassName: "text-destructive"
            })
        });
    }
})

// Exporting functions from auth slice
export const { logIn, logOut } = auth.actions;
export default auth.reducer;