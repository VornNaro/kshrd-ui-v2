import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function NavbarResSkeleton() {
   let skeleton = Array(4).fill().map((item, index) => {
      return (
         <li key={index} className="py-2 px-1" >
            <Skeleton width='100%' />
         </li>
      )
   })
   return (
      <>
         {skeleton}
      </>
   )
}
