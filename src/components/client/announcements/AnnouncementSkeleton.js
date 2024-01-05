import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function AnnouncementSkeleton() {
   const moreAnnSkeleton = Array(3).fill().map((item, index) => {
      return (
         <div key={index} className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="more-ann">
               <div className="ann-item">
                  <div className="link-announcement"  >
                     <div className="ann-img-box">
                        <Skeleton width="100%" height="200px" />
                     </div>
                     <div className="ann-description py-2">
                        <p className="px-2">
                           <Skeleton count={2} width="100%" />
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   })
   return (
      <div>

         <div className="cus-container mt-4">
            <h2 style={{ fontFamily: "khmer os Battambang", lineHeight: '3rem' }}>
               <Skeleton height="10" width="80%" />

            </h2>

            <div className="my-4">
               <h3 className="m-0 font-weight-bold page-title">
                  <Skeleton width={'40%'} />
               </h3>
            </div>

            <div className="card border-0 rounded-0 ann-detail-content content">
               <div className="px-5 py-3">
                  <Skeleton width="100%" height="400px" style={{ marginBottom: '20px' }} />
                  <Skeleton width="60%" height={15} />
                  <Skeleton width="70%" height={15} />
                  <Skeleton width="80%" count={2} height={15} />

               </div>
            </div>
         </div>

         <div className="cus-container">
            <div className="my-4">
               <Skeleton width="50%" />
            </div>

            <div className="row">
               {moreAnnSkeleton}
            </div>
         </div>

      </div>

   )
}
