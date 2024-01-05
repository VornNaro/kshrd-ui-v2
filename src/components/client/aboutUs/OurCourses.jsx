import React from "react";
import { Component } from "react";
import { getCourseTraining } from "../../../redux/Actions/client/homeActions/homeAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SkeletonAboutUsOurCourse from "./SkeletonAboutUsOurCourseCard"

class OurCourses extends Component {

  componentWillMount() {
    this.props.getCourseTraining();
  }

  render() {
    
    const data = this.props.courseTraining ? (
      this.props.courseTraining.map((data, index) => {
          return (
            <div className="col-md-6" style={{marginBottom : '30px'}}>
              <div className="card border-0 rounded-0 p-4 h-100 list-card d-flex flex-row align-content-center">
                <div>
                  <img
                    width="70"
                    className="p-2"
                    src={data.logo}
                    alt="img icon"
                  />
                </div>
                <div className="ml-3">
                  <h5 className="list-title">{data.name}</h5>
                  <p className="pt-2 m-0 title-des">{data.description}</p>
                </div>
              </div>
            </div>

          );

      })
    ) : (
        <SkeletonAboutUsOurCourse />
      );

    return (
      <div className="cus-container">
        <div className="d-flex justify-content-center align-items-center my-4" data-aos="zoom-out">
          <h3 className="m-0 font-weight-bold page-title">WHAT WE OFFER</h3>
        </div>
        <div className='ab-card' style={{ paddingBottom: '30px' }} data-aos="fade-up">
          <div className="row">
            {data.length === 0 ? <SkeletonAboutUsOurCourse /> : data}
          </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courseTraining: state.clientHomeReducer.courseTraining
  };
};

const mapActionToProps = dispatch => {
  return bindActionCreators(
    {
      getCourseTraining
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(OurCourses);
