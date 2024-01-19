"use client"

import React, { Suspense, useEffect } from 'react'
import { toast } from 'sonner';

// REDUX IMPORTS
import { useAppSelector } from "@/redux/store";
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateEnrolledCourses } from '@/redux/features/course-slice';

// UTILS
import { getEnrolledCourses } from '@/services/functions';

// UI
import { columns } from "./dashboard-columns"
import { DashboardDataTable } from './dashboard-data-table'
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {}

const Dashboard = (props: Props) => {
    const dispatch = useAppDispatch()
    const { isAuthenticated, email, name, id } = useAppSelector(state => state.authSlice.value);
    const { courses, enrolledCourses } = useAppSelector((state) => state.courseSlice.value)

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const { response, error } = await getEnrolledCourses(id);
                if (error) {
                    throw new Error(error.message)
                }
                dispatch(updateEnrolledCourses(response as any));
            } catch (error: any) {
                toast("Error fetching courses", {
                    description: error.message
                })
            }
        }
        fetchEnrolledCourses();
    }, [])

    if (!isAuthenticated) {
        return (<Card className='max-w-max mx-auto my-auto'>
            <CardHeader>
                <CardTitle>
                    Login to see your dashboard.
                </CardTitle>
            </CardHeader>
        </Card>)
    }

    return (
        <Suspense
            fallback={<div>Loading...</div>}
        >
            <div className="container mx-auto py-10">
                <DashboardDataTable columns={columns} data={enrolledCourses} />
            </div>
        </Suspense>
    )
}

export default Dashboard