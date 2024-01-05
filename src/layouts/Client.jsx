import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";

import CovidMenu from "../components/client/covid/CovidMenu";
import NavbarTop from "../components/client/menu/NavbarTop";
import Alumni from "../components/client/alumni/Alumni";
import Home from "../components/client/Home/Home";
import BasicCourse from "../components/client/basic-course/BasicCourse";
import AdvancedCourse from "../components/client/advance-course/AdvancedCourse";
import Announcement from "../components/client/announcements/Announcement";
import CareerPath from "../components/client/career-path/CareerPath";
import SpecialLecture from "../components/client/special-lecture/SpecialLecture";
import Curriculumn from "../components/client/curriculum/Curriculum";
import KoreaClass from "../components/client/korean-class/KoreaClass";
import Footer from "../components/client/footer/Footer";
import AboutUs from "../components/client/aboutUs/AboutUs";
import FAQ from "../components/client/FAQ/FAQ";
import DirectorMessage from "../components/client/aboutUs/DirectorMessage";
import Vision from "../components/client/aboutUs/OurVision";
import Course from "../components/client/aboutUs/OurCourses";
import Partner from "../components/client/aboutUs/AboutOurPartners";
import ContactUs from "../components/client/contact-us/ContactUs";
import Covid from "../components/client/covid/Covid";
import CovidSurvey from "../components/client/covid/CovidSurvey";
import Aos from 'aos'
import PageNotFound from '../components/client/pageNotFound/PageNotFound';

export class Client extends Component {

    componentWillMount() {
        Aos.init({
            duration: window.innerWidth < 768 ? 1000 : 2000,
            once: true
        })
    }

    render() {

        return (
            <div className="wrapper client-style">
                <CovidMenu />
                <NavbarTop {...this.props} />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/basic-course" component={BasicCourse} />
                    <Route path="/advanced-course" component={AdvancedCourse} />
                    <Route path="/announcement/:id" component={Announcement} />
                    <Route path="/career-path" component={CareerPath} />
                    <Route path="/alumni" component={Alumni} />
                    <Route path="/about-us" component={AboutUs} />
                    <Route path="/faq" component={FAQ} />
                    <Route path="/director-message" component={DirectorMessage} />
                    <Route path="/vision" component={Vision} />
                    <Route path="/course" component={Course} />
                    <Route path="/partner" component={Partner} />
                    <Route path="/contact-us" component={ContactUs} />
                    <Route exact path="/covid-19" component={Covid} />
                    <Route path="/covid-19/survey" component={CovidSurvey} />
                    <Route path="/special-lecture" component={SpecialLecture} />
                    <Route path="/curriculum/:id" component={Curriculumn} />
                    <Route path="/korean-class" component={KoreaClass} />
                    <Route path={['/http:', '/https:']} component={props => {
                        window.open(props.location.pathname.substr(1), "_blank") // substr(1) removes the preceding '/'
                        return <Home />
                    }} />
                    <Route path="*" component={PageNotFound} />

                </Switch>
                <Footer />
            </div>
        )
    }
}

export default Client
