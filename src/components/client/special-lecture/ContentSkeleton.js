import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function ContentSkeleton() {
   const skeleton = Array(3).fill().map((item, index) => {
      return (
         <div key={index} className="cus-container" data-aos="fade-up">
            <div className="special-content">
               <div className="row mb-4">
                  <div className="col-lg-4 col-md-5 col-sm-6">
                     <div className="img-box-bg" style={{ maxHeight: '300px' }}>
                        <Skeleton width="100%" height="100%" />
                     </div>
                  </div>
                  <div className="col-lg-8 col-md-7 col-sm-6">
                     <div className="s-title">
                        <Skeleton width="50%" height="20px" />
                        <Skeleton width="80%" count={3} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   })
   return (
      <>
         {skeleton}
      </>
   )
}
