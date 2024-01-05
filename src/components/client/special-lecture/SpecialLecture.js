import React, { useEffect } from "react";
import "./specialLecture.css";
import goal from "../../icons/goal.svg";
import { NavLink, Route } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import SwiperCore, { Autoplay, EffectFade } from 'swiper';
import imgslide1 from '../../images/special.JPG'
import imgslide2 from '../../images/special2.jpeg'
import goal1 from '../../icons/goal1.jpg'
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAllGeneration } from "../../../redux/Actions/client/specialLectureActions/specialLectureAction";
import SpecialMenuSkeleton from "./SpecialMenuSkeleton";
import SpecialLectureContent from "./SpecialLectureContent";
import { Helmet } from "react-helmet";
SwiperCore.use([Autoplay, EffectFade]);


function SpecialLecture(props) {

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


  const fetchData = () => {
    props.getAllGeneration();
  }

  useEffect(() => {

    fetchData();

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


  const autoPlay = {
    delay: 2000,
    disableOnInteraction: false
  }

  const style = {
    zIndex: 0,
    height: '600px'
  }

  const options = {
    items: 2,
    responsive: {
      0: {
        items: 2
      },
      576: {
        items: 3
      },
      768: {
        items: 4
      },
      992: {
        items: 5
      },
      1200: {
        items: 6
      },

    }
  };

  const specialLecMenu = props.generations.map((gen, index) => {
    let defaultActive = null
    let menu = null
    if (index === 0) {
      defaultActive = <NavLink exact
        className="special-lecture-nav-link"
        to={`/special-lecture`}
      >
        {gen.name}
      </NavLink>
    }

    if (index !== 0) {
      menu = <NavLink exact
        className="special-lecture-nav-link"
        to={`/special-lecture/${gen.id}`}
      >
        {gen.name}
      </NavLink>
    }

    return (
      <React.Fragment key={index}>
        {defaultActive}
        {menu}
      </React.Fragment>
    )
  })

  const specialLecContent = props.generations.map((gen, index) => {

    let defaultActiveContent = null
    let content = null

    if (index === 0) {
      defaultActiveContent = <Route exact path={`/special-lecture`} render={() => <SpecialLectureContent id={gen.id} />} />
    }

    if (index !== 0) {
      content = <Route exact key={index} path={`/special-lecture/${gen.id}`} render={() => <SpecialLectureContent id={gen.id} />} />
    }

    return (
      <React.Fragment key={index}>
        {defaultActiveContent}
        {content}
      </React.Fragment>
    )
  })

  return (
    <>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>Special Lecture ITE | www.kshrd.com.kh</title>
        <meta name="title" content="Special Lecture ITE | www.kshrd.com.kh" />
        <meta name="description" content="We invites special lecturer once a month to share knowledge and experience. It motivates trainees to have a vision and goal in their life. It also provides opportunities to donate their talents. Our goals is to strengthening trainees’ ability and natural social contribution." />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://www.kshrd.com.kh/special-lecture" />
        <meta property="og:title" content="Special Lecture ITE | www.kshrd.com.kh" />
        <meta property="og:description" content="We invites special lecturer once a month to share knowledge and experience. It motivates trainees to have a vision and goal in their life. It also provides opportunities to donate their talents. Our goals is to strengthening trainees’ ability and natural social contribution." />
        <meta property="og:image" content="" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://www.kshrd.com.kh/special-lecture" />
        <meta property="twitter:title" content="Special Lecture ITE | www.kshrd.com.kh" />
        <meta property="twitter:description" content="We invites special lecturer once a month to share knowledge and experience. It motivates trainees to have a vision and goal in their life. It also provides opportunities to donate their talents. Our goals is to strengthening trainees’ ability and natural social contribution." />
        <meta property="twitter:image" content="" />
      </Helmet>
      <div data-aos="zoom-out">
        <Swiper
          className="sp-slide"
          style={style}
          loop={true}
          autoplay={autoPlay}
          effect="fade"
          autoHeight={true}
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
                  <span className="typewrite" data-period="2000" data-type='[ "KSHRD Center","Special Lecture" ]'>
                  </span>
                </h2>
              </div>
            </div>
          </div>


        </Swiper>
      </div>
      <div className="cus-container">
        <div className="special-description mt-5 p-4" data-aos="fade-up">
          <h5 className="font-weight-bold">DESCRIPTION</h5>
          <p>
            We invites special lecturer once a month to share knowledge and
            experience. It motivates trainees to have a vision and goal in their
            life. It also provides opportunities to donate their talents. Our
            goals is to strengthening trainees’ ability and natural social
            contribution.
            </p>
        </div>

        <div className="cus-container">
          <h2 className="font-weight-bold sample-title page-title pt-5 text-center" data-aos="zoom-out">
            <span>Our Goal</span>
          </h2>
          <div className="row" data-aos="fade-up">
            <div className="col-lg-6 col-md-12 list-wrapper">
              <div className="special-list h-100">
                <div className="s-icon">
                  <img className="w-100" src={goal1} alt="goal" />
                </div>
                <div>
                  <h5 className="list-title">
                    Strengthening Trainee Ability
                    </h5>
                </div>
                <ul>
                  <li>
                    <img className="pr-2" src={goal} alt="goal" />
                    <span> Providing Indirect Experience</span>
                  </li>
                  <li>
                    <img className="pr-2" src={goal} alt="goal" />
                    <span> Strengthening Global Mind</span>
                  </li>
                  <li>
                    <img className="pr-2" src={goal} alt="goal" />
                    <span>Improvement of Trainee Self-confidence</span>
                  </li>
                  <li>
                    <img className="pr-2" src={goal} alt="goal" />
                    <span>Providing Expert Network</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 list-wrapper">
              <div className="special-list h-100">
                <div className="s-icon">
                  <img className="w-100" src={goal1} alt="goal" />
                </div>
                <div>
                  <h5 className="list-title">
                    Natural Social Contribution
                    </h5>
                </div>
                <ul>

                  <li>
                    <img className="pr-2" src={goal} alt="goal" />
                    <span>
                      Sharing vision of Software training, human resource
                        </span>
                  </li>
                  <li>
                    <img className="pr-2" src={goal} alt="goal" />
                    <span>Sharing global vision of HRD</span>
                  </li>
                  <li>
                    <img className="pr-2" src={goal} alt="goal" />
                    <span>Contributing improvement of Cambodia</span>
                  </li>
                  <li>
                    <img className="pr-2" src={goal} alt="goal" />
                    <span>
                      Supporting business with right mutual understanding
                        </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>


        <div className="specail-ite px-4 pb-4">
          <div className="py-4">
            <h3 className="m-0 font-weight-bold">Special Lecture ITE</h3>
          </div>

          <div className="special-lecture-menu mb-4" >
            <div data-aos="fade-left">
              <OwlCarousel options={options}>

                {props.loading ? <SpecialMenuSkeleton /> : specialLecMenu}

              </OwlCarousel>
            </div>
          </div>

          {specialLecContent}

        </div>
      </div>
    </>
  );
}


const mapStateToProps = state => {
  return {
    generations: state.clientSpecialLectureReducer.generations,
    loading: state.clientSpecialLectureReducer.loading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getAllGeneration
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialLecture);