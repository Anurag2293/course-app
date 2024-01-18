
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// FIREBASE
import { db } from "@/services/firebase.config"
import { collection, getDocs } from "firebase/firestore";

// REDUX IMPORTS
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/redux/store";
import { addCourses } from "@/redux/features/course-slice";
import { logInAsync } from "@/redux/features/auth-slice";

// STATE
import { CourseType } from "@/lib/types";

// UI
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form"

const loginSchema = z.object({
    email: z.string().email("Enter valid email address"),
    name: z.string()
})

const LoginDialog = () => {
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        dispatch(logInAsync(values));
        document.getElementById("closeDialog")?.click();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>
                        Enter email to login. If no account, then enter email and name.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4 py-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="email" className="text-right">
                                                Email
                                            </Label>
                                            <Input {...field} id="email" className="col-span-3" />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input {...field} id="name" className="col-span-3" />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="submit">Login</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}


export default LoginDialog;