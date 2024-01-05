import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';

SwiperCore.use([Pagination, Navigation]);

export default function TrainingSlide({ data }) {

  const breakpoints = {
    '@0.00': {
      slidesPerView: 1,
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
      slidesPerView: 3,
      spaceBetween: 30
    },
  }

  return (

    <Swiper
      speed={400}
      loop={true}
      spaceBetween={20}
      slidesPerView={4}
      navigation
      breakpoints={breakpoints}
      pagination={{ clickable: true, type: null }}

    >
      {
        data.map((data, index) => {
          return (
            <SwiperSlide key={index} className="cus-swipper">
              <div className="card card-box-course-training h-100">
                <div className="card-course-training-img">
                  <img className="w-100" src={data.logo} alt="thumbnail" />
                </div>

                <div className="card-course-training-body">
                  <Link className="card-course-training-link" to={`/curriculum/${data.id}`}>
                    <h5 className="card-course-training-title m-0 px-3">{data.name}</h5>
                  </Link>

                  <div className="card-course-training-description pb-3 pt-2 px-4">
                    <Link className="card-course-training-link" to={`/curriculum/${data.id}`}>
                      <p style={{ wordWrap: 'break-word' }} className="slide-ct m-0">{data.description}</p>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })
      }
    </Swiper>

  );
}
