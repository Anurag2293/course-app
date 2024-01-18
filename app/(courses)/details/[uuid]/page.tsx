import React, { Suspense } from 'react'

import CourseDetailsComponent from '@/components/course-details'

type Props = {
    params: { uuid: string }
}

const CourseDetails = (props: Props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CourseDetailsComponent uuid={props.params.uuid} />
        </Suspense>
    )
}

export default CourseDetails