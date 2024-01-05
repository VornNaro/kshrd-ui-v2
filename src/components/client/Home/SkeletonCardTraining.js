import React from 'react'
import Skeleton from 'react-loading-skeleton'
export default function SkeletonCardTraining() {

   let skeleton = Array(3).fill().map((item, index) => {

      return (
         <div key={index} className="col-md-4 course-training-skeleton-child">
            <div className="card card-box-course-skeleton card-box-course-training h-100">
               <div className="card-course-training-img p-0 m-0 m-auto py-3 h-100 w-100">
                  <Skeleton circle={true} width={100} height={100} />
               </div>

               <div className="card-course-training-body">
                  <h5>
                     <Skeleton width="90%" height={15} count={3} />
                  </h5>
               </div>
            </div>
         </div>
      )
   })
   return (
      <div className="row course-training-skeleton">
         {skeleton}
      </div>
   )
}
