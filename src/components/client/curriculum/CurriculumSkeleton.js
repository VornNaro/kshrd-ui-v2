import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function CurriculumSkeleton() {
   return (
      <>
         <div className="course-details pt-4">
            <h5>
               <Skeleton width={200} />
            </h5>
            <p>
               <Skeleton width={400} />
               <Skeleton width={700} />
            </p> 
            <div className="py-4">
               <Skeleton width="100%" height={700} />
            </div>
         </div>
      </>
   )
}
