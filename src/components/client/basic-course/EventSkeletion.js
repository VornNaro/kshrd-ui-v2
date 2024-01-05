import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-multi-carousel/lib/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';

SwiperCore.use([Pagination, Navigation]);
export default function EventSkeletion() {

   const breakpoints = {
      '@0.00': {
         slidesPerView: 1,
         spaceBetween: 30
      },
      '@0.75': {
         slidesPerView: 2,
         spaceBetween: 40
      },
      '@1.00': {
         slidesPerView: 3,
         spaceBetween: 30
      },
      '@1.50': {
         slidesPerView: 4,
         spaceBetween: 30
      },
   }


   const eventSlide = Array(2).fill().map((event, index) => {
      return (
         <div key={index} className="row" >
            <div className="col-lg-12">

               {/* slide title */}
               <div className="text-title py-5">
                  <h3 className="m-0">
                     <Skeleton width={200} />
                  </h3>
               </div>

               <div>
                  <Swiper
                     speed={400}
                     loop={true}
                     spaceBetween={20}
                     slidesPerView={4}
                     navigation
                     breakpoints={breakpoints}
                     pagination={{ clickable: true, type: null }}

                  >
                     {Array(4).fill().map((data, index) => {
                        return (
                           <SwiperSlide key={index}>

                              <div className="card card-course border-0 rounded-0 h-100">
                                 <div className="row">
                                    <div className="col-md-12">
                                       <div className="img-box">
                                          <Skeleton width="100%" height="100%" />
                                       </div>
                                    </div>
                                    <div className="col-md-12">
                                       <div className="title-box p-3" style={{ minHeight: '104px' }}>
                                          <p className="text-center m-0">
                                             <Skeleton count={3} width="100%" />
                                          </p>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                           </SwiperSlide>
                        )
                     })}
                  </Swiper>

               </div>
            </div>
         </div>
      )
   })

   return (
      <>
         {eventSlide}
      </>

   )
}