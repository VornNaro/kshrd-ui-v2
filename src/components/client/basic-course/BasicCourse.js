import React from "react";
import "./basicCourse.css";
import EventSlideBasic from "./EventSlideBasic";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBasicCourseEvents, getBasicCourseTraining } from '../../../redux/Actions/client/basicCourseActions/basicCourseAction'
import TrainingSlideBasic from './TrainingSlideBasic'
import BasicCourseTabsDetail from "./BasicCourseTabsDetail";
import SkeletonCardTraining from "../Home/SkeletonCardTraining";
import EventSkeletion from "./EventSkeletion";
import { getAllCourseTrainingTypes } from '../../../redux/Actions/client/courseTrainingActions/courseTrainingAction'
import { Helmet } from "react-helmet";

class BasicCourse extends React.Component {

  state = {
    id: ''
  }

  //TODO: This function is created to get data for basice
  fetchData = async () => {
    await this.props.getAllCourseTrainingTypes();
    if (this.props.courseTrainingTypes.length !== 0) {

      this.setState({ id: this.props.courseTrainingTypes[1].id }, () => {
        this.props.getBasicCourseTraining(this.state.id);
        this.props.getBasicCourseEvents(this.state.id);
      })
    }

  }

  componentDidMount() {
    this.fetchData()
  }


  render() {

    return (
      <>
        <Helmet>
          {/* <!-- Primary Meta Tags --> */}
          <title>Basic Course | www.kshrd.com.kh</title>
          <meta name="title" content="Basic Course | www.kshrd.com.kh" />
          <meta name="description" content="Training period of basic course is 5 months from 8:00am to 5:00pm. We trains Java, Database, and Web technologies. The goal of basic course is to understand the key concepts of the technologies and improve the implementation skills. We motivate students to practice more by giving homework and assignments, which could help them improve the understanding and implementation skills." />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://www.kshrd.com.kh/basic-course" />
          <meta property="og:title" content="Basic Course | www.kshrd.com.kh" />
          <meta property="og:description" content="Training period of basic course is 5 months from 8:00am to 5:00pm. We trains Java, Database, and Web technologies. The goal of basic course is to understand the key concepts of the technologies and improve the implementation skills. We motivate students to practice more by giving homework and assignments, which could help them improve the understanding and implementation skills." />
          <meta property="og:image" content="" />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="http://www.kshrd.com.kh/basic-course" />
          <meta property="twitter:title" content="Basic Course | www.kshrd.com.kh" />
          <meta property="twitter:description" content="Training period of basic course is 5 months from 8:00am to 5:00pm. We trains Java, Database, and Web technologies. The goal of basic course is to understand the key concepts of the technologies and improve the implementation skills. We motivate students to practice more by giving homework and assignments, which could help them improve the understanding and implementation skills." />
          <meta property="twitter:image" content="" />
        </Helmet>
        <div className="pb-5" >
          <h2 className="font-weight-bold sample-title page-title py-5 text-center">
            <span>Basic Course</span>
          </h2>

          <div className="cus-container course-description">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-0">
                  <BasicCourseTabsDetail />
                </div>
              </div>
            </div>
          </div>

          {/* slide title */}
          <div className="text-title py-5" >
            <h3>Course Training in Basic Course</h3>
          </div>

          <div className="cus-container">
            {this.props.courseTrainingTypes.length === 0 &&
              <>
                <SkeletonCardTraining />
                <EventSkeletion />
              </>
            }

            {this.props.loading ? <SkeletonCardTraining /> : <TrainingSlideBasic data={this.props.courseTraining} />}

            {this.props.eventLoading ? <EventSkeletion /> : <EventSlideBasic data={this.props.events} />}


          </div>

        </div >
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    courseTraining: state.clientBasicCourseReducer.courseTraining,
    events: state.clientBasicCourseReducer.events,
    loading: state.clientBasicCourseReducer.loading,
    eventLoading: state.clientBasicCourseReducer.eventLoading,
    courseTrainingTypes: state.clientCourseTrainingTypeReducer.courseTrainingTypes
  }
}
const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    getBasicCourseTraining,
    getBasicCourseEvents,
    getAllCourseTrainingTypes
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(BasicCourse);
