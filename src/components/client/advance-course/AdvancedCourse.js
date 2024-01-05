import React, { Component } from "react";
import "../advance-course/advancedCourse.css";
import AdvancedTabsDescription from "./AdvancedTabsDescription";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAdvancedCourseTraining, getAdvancedCourseEvents } from '../../../redux/Actions/client/advanceCourseActions/advanceCourseAction'
import EventSlideAdvanced from "./EventSlideAdvanced";
import SkeletonCardTraining from "../Home/SkeletonCardTraining";
import EventSkeletion from "../basic-course/EventSkeletion";
import { getAllCourseTrainingTypes } from '../../../redux/Actions/client/courseTrainingActions/courseTrainingAction'
import TrainingSlideAdvanced from './TrainingSlideAdvanced'
import { Helmet } from "react-helmet";
class AdvancedCourse extends Component {
  state = {
    id: ''
  }

  fetchData = async () => {

    await this.props.getAllCourseTrainingTypes();

    if (this.props.courseTrainingTypes.length !== 0) {

      this.setState({ id: this.props.courseTrainingTypes[0].id }, () => {
        this.props.getAdvancedCourseTraining(this.state.id);
        this.props.getAdvancedCourseEvents(this.state.id);

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
          <title>Advanced Course | www.kshrd.com.kh</title>
          <meta name="title" content="Advanced Course | www.kshrd.com.kh" />
          <meta name="description" content="Advanced course takes 4 months and performs team-based projects assigned by HRD Center.This course we focus on mobile developments such as Android, iOS, Hybrid(Reactive native) and Spring Framework advanced also." />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://www.kshrd.com.kh/advanced-course" />
          <meta property="og:title" content="Advanced Course | www.kshrd.com.kh" />
          <meta property="og:description" content="Advanced course takes 4 months and performs team-based projects assigned by HRD Center.This course we focus on mobile developments such as Android, iOS, Hybrid(Reactive native) and Spring Framework advanced also." />
          <meta property="og:image" content="" />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="http://www.kshrd.com.kh/advanced-course" />
          <meta property="twitter:title" content="Advanced Course | www.kshrd.com.kh" />
          <meta property="twitter:description" content="Advanced course takes 4 months and performs team-based projects assigned by HRD Center.This course we focus on mobile developments such as Android, iOS, Hybrid(Reactive native) and Spring Framework advanced also." />
          <meta property="twitter:image" content="" />
        </Helmet>
        <div className="pb-5">
          <div className="cus-container">
            <h2 className="font-weight-bold sample-title page-title py-5 text-center">
              <span>Advanced Course</span>
            </h2>

            <div className="course-description">
              <div className="row">
                <div className="col-md-12">
                  <div className="card border-0 rounded-0">
                    <AdvancedTabsDescription />
                  </div>
                </div>
              </div>
            </div>

            {/* slide title */}
            <div className="text-title py-5">
              <h3>Course Training</h3>
            </div>
          </div>

          <div className="cus-container">
            {this.props.courseTrainingTypes.length === 0 &&
              <>
                <SkeletonCardTraining />
                <EventSkeletion />
              </>
            }

            {this.props.loading ? <SkeletonCardTraining /> : <TrainingSlideAdvanced data={this.props.courseTraining} />}

            {this.props.eventLoading ? <EventSkeletion /> : <EventSlideAdvanced data={this.props.events} />}

          </div>

        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    courseTraining: state.clientAdvancedCourseReducer.courseTraining,
    events: state.clientAdvancedCourseReducer.events,
    loading: state.clientAdvancedCourseReducer.loading,
    eventLoading: state.clientAdvancedCourseReducer.eventLoading,
    courseTrainingTypes: state.clientCourseTrainingTypeReducer.courseTrainingTypes
  };
};
const mapActionToProps = dispatch => {
  return bindActionCreators(
    {
      getAdvancedCourseEvents,
      getAdvancedCourseTraining,
      getAllCourseTrainingTypes
    }, dispatch);
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(AdvancedCourse);
