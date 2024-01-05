import React, { Component } from "react";
import "./slideTraining.css";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCourseTraining } from "../../../redux/Actions/client/homeActions/homeAction"
import SkeletonCardTraining from "../Home/SkeletonCardTraining";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Link } from "react-router-dom";

SwiperCore.use([Pagination, Navigation]);
export class SlideTraining extends Component {

  componentWillMount() {
    this.props.getCourseTraining();
  }

  render() {

    const breakpoints = {
      '@0.00': {
        slidesPerView: 1,
      },
      '@0.75': {
        slidesPerView: 2,
      },
      '@1.00': {
        slidesPerView: 3,
      },
      '@1.50': {
        slidesPerView: 3,
      },
    }

    if (this.props.loading) {
      return <SkeletonCardTraining />
    }
    else {
      return (
        <div>
          <Swiper
            speed={400}
            loop={true}
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={breakpoints}
            navigation

          >
            {
              this.props.courseTraining.map((data, index) => {
                return (
                  <SwiperSlide key={index} className="cus-swipper">
                    <div className="card card-box-course-training h-100">
                      <div className="card-course-training-img">
                        <img className="w-100" src={data.logo} alt="thumbnail" />
                      </div>

                      <div className="card-course-training-body">
                        <Link className="card-course-training-link" to={`/curriculum/${data.id}`} >
                          <h5 className="card-course-training-title m-0 pb-2 px-3">{data.name}</h5>
                        </Link>

                        <div className="card-course-training-description px-4 pb-3">
                          <Link className="card-course-training-link" to={`/curriculum/${data.id}`}>
                            <p style={{ wordWrap: 'break-word' }} className="m-0 slide-ct">{data.description}</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    courseTraining: state.clientHomeReducer.courseTraining,
    loading: state.clientHomeReducer.loading
  }
}
const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    getCourseTraining,
  }, dispatch)
}

export default connect(mapStateToProps, mapActionToProps)(SlideTraining)

