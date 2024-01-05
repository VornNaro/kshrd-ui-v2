import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function CareerPathSideBarSkeleton() {
   const skeleton = Array(4).fill().map((item, index) => {
      return (
         <div key={index} className="menu-box-link" >
            <Skeleton width={300} height={30} />
         </div>
      )
   })
   return (
      <>
         {skeleton}
      </>
   )
}
