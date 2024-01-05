import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function AlumniSkeleton() {
   let skeleton = Array(2).fill().map((item, index) => {
      if (index % 2 === 0) {
         return (
            <div key={index}>
               <div className="row mb-4">
                  <div className="col-md-5">
                     <div className="d-flex justify-content-center">
                        <Skeleton circle={true} width={250} height={250} />
                     </div>

                  </div>

                  <div className="col-md-7 al-sk-t d-flex justify-content-center flex-column" style={{ paddingRight: "15%" }}>

                     <div>
                        <h4 className=" font-weight-bolder pl-3 pt-2 alumniTitle mr-auto">
                           <Skeleton width="80%" />
                        </h4>

                     </div>
                     <h5 className="alumniCommentText w-100 px-4">
                        <Skeleton width="100%" height={15} count={2} />
                     </h5>

                  </div>
               </div>
            </div>
         );
      }
      else {
         return (
            <div key={index}>
               <div className="row mb-4">
                  <div className="col-md-7 ann-sk-row al-sk-bt d-flex justify-content-center flex-column" style={{ paddingLeft: "15%" }}>

                     <div>
                        <h4 className="font-weight-bolder pl-3 pt-2 alumniTitle mr-auto">
                           <Skeleton width="80%" />
                        </h4>

                     </div>
                     <h5 className="alumniCommentText w-100 px-4">

                        <Skeleton width="100%" height={15} count={2} />
                     </h5>

                  </div>
                  <div className="col-md-5">
                     <div className="d-flex justify-content-center">
                        <Skeleton circle={true} width={250} height={250} />
                     </div>

                  </div>

               </div>
            </div>
         );
      }
   })
   return (
      <div>
         {skeleton}
      </div>
   )
}
