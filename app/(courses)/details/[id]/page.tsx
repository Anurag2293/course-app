import React, { Suspense } from 'react'

import CourseDetailsComponent from '@/components/course-details'

type Props = {
    params: { id: string }
}

const CourseDetails = (props: Props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CourseDetailsComponent id={props.params.id} />
        </Suspense>
    )
}

export default CourseDetails