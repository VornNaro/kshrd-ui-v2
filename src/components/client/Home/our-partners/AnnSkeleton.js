import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom';

export default function AnnSkeleton() {
   let data = Array(3).fill().map((announcement, index) => {
      return (
         <div key={index} to="/">
            <div key={index} className="row mx-2 mt-4">
               <div className="col-lg-3 col-md-4 col-sm-5 col-12 ">
                  <Link to={`/announcement/`} className="link-announcement">
                     <Skeleton width='100%' height="200px" />

                  </Link>

               </div>
               <div className="col-lg-9 col-md-8 col-sm-7 col-12 pl-lg-0 pl-md-0 pl-sm-0">
                  <div
                     style={{ padding: "0 20px" }}
                     className="card-body pt-2 mr-0"
                  >
                     <Skeleton width="60%" />

                     <Skeleton count={3} width="90%" />
                  </div>
               </div>
            </div>
         </div >
      );
   });
   return (
      <>
         {data}
      </>
   )
}
