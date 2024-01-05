import React from "react";
import "./About.css";
import { Route, Switch } from "react-router-dom";
import AboutMenu from "./AboutMenu";
import AboutUsPage from "./AboutUsPage";
import DirectorMessage from "./DirectorMessage";
import OurVision from "./OurVision";
import OurCourses from "./OurCourses";
import AboutOurPartners from "./AboutOurPartners";
import './About.css';
import { Helmet } from "react-helmet";
import aboutUsImg from "../../images/about-us-img.png";
export default function AboutUs() {
  return (
    <div>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>About Us | www.kshrd.com.kh</title>
        <meta name="title" content="About Us | www.kshrd.com.kh" />
        <meta name="description" content="Korea Software HRD Center is an IT academy for training SW professionals established by Korea International Cooperation Agency (KOICA) and Webcash Co., Ltd in April, 2013. Our mission is to train SW experts, provide job opportunities for them, and improve SW technologies in Cambodia." />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://www.kshrd.com.kh/about-us" />
        <meta property="og:title" content="About Us | www.kshrd.com.kh" />
        <meta property="og:description" content="Korea Software HRD Center is an IT academy for training SW professionals established by Korea International Cooperation Agency (KOICA) and Webcash Co., Ltd in April, 2013. Our mission is to train SW experts, provide job opportunities for them, and improve SW technologies in Cambodia." />
        <meta property="og:image" content={aboutUsImg} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://www.kshrd.com.kh/about-us" />
        <meta property="twitter:title" content="About Us | www.kshrd.com.kh" />
        <meta property="twitter:description" content="Korea Software HRD Center is an IT academy for training SW professionals established by Korea International Cooperation Agency (KOICA) and Webcash Co., Ltd in April, 2013. Our mission is to train SW experts, provide job opportunities for them, and improve SW technologies in Cambodia." />
        <meta property="twitter:image" content={aboutUsImg} />
      </Helmet>

      <h2 className="font-weight-bold sample-title page-title py-4 text-center">
        <span>KOREA SOFTWARE HRD CENTER</span>
      </h2>

      <AboutMenu />

      <Switch>
        <Route exact path="/about-us" component={AboutUsPage} />
        <Route exact path="/about-us/director-message" component={DirectorMessage} />
        <Route exact path="/about-us/our-vision" component={OurVision} />
        <Route exact path="/about-us/our-courses" component={OurCourses} />
        <Route exact path="/about-us/our-partners" component={AboutOurPartners} />
      </Switch>
    </div>
  );
}
