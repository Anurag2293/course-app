"use client"

import React from 'react'

// REDUX IMPORTS
import { useAppSelector } from "@/redux/store";

import { columns } from "./dashboard-columns"
import { DashboardDataTable } from './dashboard-data-table'

type Props = {}

const Dashboard = (props: Props) => {
    const courses = useAppSelector((state) => state.courseSlice.value.courses)

    return (
        <div>
            Dashboard
            <div className="container mx-auto py-10">
				<DashboardDataTable columns={columns} data={courses} />
			</div>
        </div>
    )
}

export default Dashboard