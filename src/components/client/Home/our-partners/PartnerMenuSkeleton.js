import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Nav } from 'react-bootstrap'

export default function PartnerMenuSkeleton() {
   const skeleton = Array(4).fill().map((item, index) => {
      return <Nav.Item key={index} className="mx-5 m-0">
         <Nav.Link className="tabs-link-partner">
            <Skeleton width={150} />
         </Nav.Link>
      </Nav.Item >
   })
   return (
      <>
         {skeleton}
      </>
   )
}
