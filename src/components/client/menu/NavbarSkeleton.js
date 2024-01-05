import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function NavbarSkeleton() {
   let skeleton = Array(4).fill().map((item, index) => {
      return (
         <li key={index}>
            <Skeleton width={100} />
         </li>
      )
   })
   return (
      <>
         {skeleton}
      </>
   )
}
