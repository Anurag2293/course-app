"use client"

import React from 'react'

// REDUX IMPORTS
import { useAppSelector } from "@/redux/store";

// UI
import { columns } from "./dashboard-columns"
import { DashboardDataTable } from './dashboard-data-table'
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {}

const Dashboard = (props: Props) => {
    const { isAuthenticated, email, name, id } = useAppSelector(state => state.authSlice.value);
    const courses = useAppSelector((state) => state.courseSlice.value.courses)

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
        <div className="container mx-auto py-10">
            <DashboardDataTable columns={columns} data={courses} />
        </div>
    )
}

export default Dashboard