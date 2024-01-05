import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Card } from 'react-bootstrap'

export default function CareerPathContentSkeleton() {


   const subItem = Array(3).fill().map((item, index) => {
      return (
         <div key={index} className="col-md-4 col-lg-4">

            <Card className="w-100 border-0 rounded-0">
               <Skeleton width='300px' height='200px' />
            </Card>
            <Card.Body>
               <div className="career-path-card-title">
                  <h5 className="font-weight-bold mt-2 more-career-path">
                     <Skeleton width={200} />
                  </h5>
                  <p className="text-muted">
                     <Skeleton width={200} />
                  </p>
               </div>

            </Card.Body>

         </div>
      )
   })

   return (

      <div style={{ width: "87%", margin: '0 auto' }} className="py-5">

         <div className="career-path-image-top">
            <Skeleton width='100%' height="50vh" />
         </div>
         <div className="career-path-description">
            <div className="career-path-desc-title py-4">

            </div>
            <p>
               <Skeleton count={3} />
            </p>
         </div>
         <div className="career-path-description">

            <div className="career-path-detail-list">
               <Skeleton count={2} />
            </div>
         </div>

         <div className="row mt-5">

            {subItem}

         </div>
      </div>
   )
}
