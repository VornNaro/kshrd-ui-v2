import React, { useEffect } from 'react'
import './koreaClass.css'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import imgslide1 from '../../images/korean_pp.jpg'
import imgslide2 from '../../images/korean_volunter.jpg'
import img2 from '../../images/korea_btb.jpg'
import img3 from '../../images/korea_clothes.jpg'
import k01 from '../../icons/k01.svg'
import k02 from '../../icons/k02.svg'
import k03 from '../../icons/k03.svg'
import goalIcon from "../../icons/goal.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Helmet } from 'react-helmet';
SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function KoreaClass() {


   var TxtType = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
   };

   TxtType.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
         this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
         this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

      var that = this;
      var delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
         delta = this.period;
         this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
         this.isDeleting = false;
         this.loopNum++;
         delta = 500;
      }

      setTimeout(function () {
         that.tick();
      }, delta);
   };

   useEffect(() => {
      // add class name to swpier slide container
      document.getElementsByClassName('swiper-container')[0].childNodes[0].className = "swiper-wrapper cus-swiper-wrapper"

      var elements = document.getElementsByClassName('typewrite');
      for (var i = 0; i < elements.length; i++) {
         var toRotate = elements[i].getAttribute('data-type');
         var period = elements[i].getAttribute('data-period');
         if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
         }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.15em solid #fff}";
      document.body.appendChild(css);
   }, [])

   const style = {
      height: '600px',
      zIndex: '0',
   }

   const autoPlay = {
      delay: 5000,
      disableOnInteraction: false
   }

   return (
      <>
         <Helmet>
            {/* <!-- Primary Meta Tags --> */}
            <title>Welcome to Our Korean Class | www.kshrd.com.kh</title>
            <meta name="title" content="Welcome to Our Korean Class | www.kshrd.com.kh" />
            <meta name="description" content="All students learn Korean 2 hours a day during both basic and advanced course. Both Khmer and native Korean instructors teach the students together for better understanding.All students learn Korean 2 hours a day during both basic and advanced course. Both Khmer and native Korean instructors teach the students together for better understanding." />

            {/* <!-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="http://www.kshrd.com.kh/korean-class" />
            <meta property="og:title" content="Welcome to Our Korean Class | www.kshrd.com.kh" />
            <meta property="og:description" content="All students learn Korean 2 hours a day during both basic and advanced course. Both Khmer and native Korean instructors teach the students together for better understanding.All students learn Korean 2 hours a day during both basic and advanced course. Both Khmer and native Korean instructors teach the students together for better understanding." />
            <meta property="og:image" content="" />

            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="http://www.kshrd.com.kh/korean-class" />
            <meta property="twitter:title" content="Welcome to Our Korean Class | www.kshrd.com.kh" />
            <meta property="twitter:description" content="All students learn Korean 2 hours a day during both basic and advanced course. Both Khmer and native Korean instructors teach the students together for better understanding.All students learn Korean 2 hours a day during both basic and advanced course. Both Khmer and native Korean instructors teach the students together for better understanding." />
            <meta property="twitter:image" content="" />
         </Helmet>

         <div className="mb-5">
            <div className="slide-header" data-aos="zoom-out">
               <Swiper
                  className="sp-slide"
                  style={style}
                  loop={true}
                  direction={"vertical"}
                  autoplay={autoPlay}
                  autoHeight={true}
                  allowTouchMove={false}
                  data-name="swiper-special"
               >
                  <SwiperSlide >
                     <img style={{ minHeight: '600px', objectFit: 'cover' }} className="w-100" src={imgslide1} alt="special-1" />
                  </SwiperSlide>

                  <SwiperSlide >
                     <img style={{ minHeight: '600px', objectFit: 'cover' }} className="w-100" src={imgslide2} alt="special-1" />
                  </SwiperSlide>

                  <div className="home-content">
                     <div className="home-container">
                        <div className="home-inner-container typewriter">
                           <h2>
                              <span className="typewrite" >
                                 WELCOME TO <br />
                              KOREAN CLASS
                           </span>
                           </h2>
                        </div>
                     </div>
                  </div>
               </Swiper>

            </div>

            <div className="cus-container py-5" data-aos="fade-up">
               <div className="top-box">
                  <div className="row pl-3">
                     <div className="col-md-6">
                        <div className="box-top-title">
                           <h3>Welcome to Our Korean Class</h3>
                        </div>
                        <div className="box-top-description">
                           <p>
                              All students learn Korean 2 hours a day during both basic and advanced course. Both Khmer and native Korean instructors teach the students together for better understanding.All students learn Korean 2 hours a day during both basic and advanced course. Both Khmer and native Korean instructors teach the students together for better understanding.
                        </p>

                        </div>
                     </div>
                     <div class="col-md-6">
                        <div className="k-top-image d-flex justify-content-between">
                           <div className="img-detail">
                              <img src={img2} alt="korean class" />
                           </div>

                           <div className="img-detail">
                              <img src={img3} alt="korean class" />
                           </div>

                           <div className="img-detail">
                              <img src={img2} alt="korean class" />
                           </div>

                        </div>

                     </div>
                  </div>
               </div>
            </div>

            <div className="py-5 bg-white" data-aos="fade-up">
               <div className="cus-container">
                  <div className="top-box">
                     <div className="row pl-3">
                        <div className="col-lg-3 col-md-5">
                           <div className="box-top-title">
                              <h3>Our Detail</h3>
                           </div>
                           <div className="box-top-description">
                              <div className="course-detail">
                                 <ul>
                                    <li>
                                       <span className="icon-next">
                                          <FontAwesomeIcon icon={faChevronCircleRight} />
                                       </span>
                                    Provide training materials
                                 </li>
                                    <li>
                                       <span className="icon-next">
                                          <FontAwesomeIcon icon={faChevronCircleRight} />
                                       </span>
                                    Study with teachers who have many experience
                                 </li>
                                    <li>
                                       <span className="icon-next">
                                          <FontAwesomeIcon icon={faChevronCircleRight} />
                                       </span>
                                    Practice with Koreans
                                 </li>

                                 </ul>
                              </div>

                           </div>
                        </div>

                        <div class="col-lg-9 col-md-7">
                           <div className="k-top-image d-flex justify-content-between">
                              <div className="row k-card-bottom">

                                 <div className="col-lg-4 col-md-12">
                                    <div className="k-card-body">
                                       <div style={{ maxWidth: '80px', minWidth: '80px' }}>
                                          <div className="card-detail">
                                             <div className="card-icon">
                                                <img className="w-100" src={k01} alt="korean" />
                                             </div>
                                          </div>
                                       </div>
                                       <div>
                                          <div className="card-content d-flex flex-column align-items-start">
                                             <div class="k-card-title">
                                                <h4 className="px-2">Our Goal</h4>
                                             </div>
                                             <ul className="p-0 m-0">
                                                <li className="k-list-card">
                                                   <img className="pb-1 px-2" src={goalIcon} alt="goal-icon" />
                                                   <span> Improving Korean communication for close</span>
                                                </li>
                                                <li className="k-list-card">
                                                   <img className="pb-1 px-2" src={goalIcon} alt="goal-icon" />
                                                   <span> mutual collaboration Understanding of Korean Culture</span>
                                                </li>
                                             </ul>
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-lg-4 col-md-12">
                                    <div className="k-card-body">
                                       <div style={{ maxWidth: '80px', minWidth: '80px' }}>
                                          <div className="card-detail">
                                             <div className="card-icon">
                                                <img className="w-100" src={k02} alt="korean" />
                                             </div>
                                          </div>
                                       </div>
                                       <div>
                                          <div className="card-content d-flex flex-column align-items-start">
                                             <div class="k-card-title">
                                                <h4 className="px-2">Our Infrastructure</h4>
                                             </div>
                                             <ul className="p-0 m-0">
                                                <li className="k-list-card">
                                                   <img className="pb-1 px-2" src={goalIcon} alt="goal-icon" />
                                                   <span>Teachers have many experience
                                                   Korean Classroom
                                                </span>
                                                </li>
                                                <li className="k-list-card">
                                                   <img className="pb-1 px-2" src={goalIcon} alt="goal-icon" />
                                                   <span>Multimedia Room</span>
                                                </li>
                                             </ul>
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-lg-4 col-md-12">
                                    <div className="k-card-body">
                                       <div style={{ maxWidth: '80px', minWidth: '80px' }}>
                                          <div className="card-detail">
                                             <div className="card-icon">
                                                <img className="w-100" src={k03} alt="korean" />
                                             </div>
                                          </div>
                                       </div>
                                       <div>
                                          <div className="card-content d-flex flex-column align-items-start">
                                             <div class="k-card-title">
                                                <h4 className="px-2">Our Contents</h4>
                                             </div>
                                             <ul className="p-0 m-0">
                                                <li className="k-list-card">
                                                   <img className="pb-1 px-2" src={goalIcon} alt="goal-icon" />
                                                   <span>Korean Conversation</span>
                                                </li>
                                                <li className="k-list-card">
                                                   <img className="pb-1 px-2" src={goalIcon} alt="goal-icon" />
                                                   <span>Korean Culture Experience with Volunteers</span>
                                                </li>
                                             </ul>
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                              </div>
                           </div>

                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div >
      </>
   )
}
