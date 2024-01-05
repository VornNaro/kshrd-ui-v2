import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';


SwiperCore.use([Pagination, Navigation]);

export default function EventSlide(props) {

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


  const eventSlide = props.data.map((event, index) => {
    return (
      <div key={index} className="row" data-aos="fade-up">
        <div className="col-lg-12">

          {/* slide title */}
          <div className="text-title py-5">
            <h3 className="m-0">{event.category.name}</h3>
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
              {event.eventDescription.map((data, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="card card-course border-0 rounded-0 h-100">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="img-box" style={{ height: "200px"}}>
                            <img
                              style={{ objectFit: 'cover' }}
                              className="w-100 h-100"
                              src={data.image || "https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png"}
                              alt="sport"
                              onError={(e) => { e.target.onerror = null; e.target.src = "https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png" }}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="title-box p-3" style={{ minHeight: '104px' }}>
                            <p className="text-center m-0">{data.description}</p>
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
    eventSlide
  );
}
