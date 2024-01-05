import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function SpecialMenuSkeleton() {
   const skeleton = Array(4).fill().map((item, index) => {
      return (
         <div key={index} className="mx-4">
            <Skeleton />
         </div>
      )
   })
   return (
      <>
         {skeleton}
      </>
   )
}
