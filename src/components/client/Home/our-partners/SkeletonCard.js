import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function SkeletonCard() {

   let skeleton = Array(8).fill().map((item, index) => {
      return (
         <div
            key={index}
            className="col-lg-3 col-md-4 col-sm-4 col-6  partner-skeleton"
            style={{ marginBottom: "15px" }}
         >
            <div className="card shadow-none text-center border-0 rounded-0 h-100 partner-card d-flex justify-content-around">
               <div className="pt-2">
                  <Skeleton circle={true} width={90} height={90} />
               </div>
               <div className="partner-title mt-2">
                  <p>
                     <Skeleton width="90%" />
                  </p>
               </div>

            </div>
         </div>
      )
   })
   return (

      <div className="list-partner mt-4">
         <div className="row">{skeleton}</div>
      </div>

   )
}
