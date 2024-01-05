import React from "react";
import "./Slide.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slide1 from "../../images/slide1.JPG";
import slide2 from "../../images/slide2.JPG";
import slide3 from "../../images/slide3.JPG";
import slide4 from "../../images/slide4.jpg"
import slide5 from "../../images/slide5.JPG";
import slide6 from "../../images/slide6.JPG";
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";

const Slide = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow top="40%" />,
    prevArrow: <PrevArrow top="40%" />,
  };

  return (
    <div>
      <Slider {...settings}>
        <div className="slide-home-container">
          <img className="w-100 h-100" src={slide4} alt="slide4" />
        </div>
        <div className="slide-home-container">
          <img className="w-100 h-100" src={slide5} alt="slide5" />
        </div>
        <div className="slide-home-container slide-home-container-3">
          <img className="w-100 h-100" src={slide6} alt="slide6" />
        </div>
      </Slider>
    </div>
  );
};

export default Slide;
