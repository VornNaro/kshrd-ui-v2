import React, { Component } from "react";
import "./Dashboard.css";
import { bindActionCreators } from "redux";
import { getAllUsers } from "../../redux/Actions/admin/userActions/UserAction";
import { getAllCareerPath } from "../../redux/Actions/admin/careerPathActions/CareerPathAction";
import { getAllCourseTraining } from "../../redux/Actions/admin/courseTraining/CourseTrainingAction";
import { getAllAnnouncements } from "../../redux/Actions/admin/announcementActions/AnnouncementActions";
import { getAllPartner } from "../../redux/Actions/admin/partnerActions/PartnerAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LoopCircleLoading } from "react-loadingg";
class Dashboard extends Component {

  componentWillMount() {
    this.props.getAllUsers();
    this.props.getAllPartner();
    this.props.getAllCareerPath();
    this.props.getAllCourseTraining();
    this.props.getAllAnnouncements();
  }
  render() {
    if (this.props.loading)
      return (
        <div className="content-wrapper ml-5">
          <div className="ml-5">
            <LoopCircleLoading
              color="#0A5695"
              style={{ marginLeft: "48%", marginTop: "25%" }}
            />
          </div>
        </div>
      );
    else
      return (
        <div className="bg-dashboard content-wrapper">
          <div>
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0 text-dark">Dashboard</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 col-6 ">
                  <Link to={{ pathname: "/admin/users" }}>
                    <div className="small-box bg-light">
                      <div className="inner">
                        <h3 style={{ textDecoration: "none" }}>
                          {this.props.user.length}
                        </h3>
                        <p className="text-decoration-none">Users</p>
                      </div>
                      <div className="icon">
                        <i className="fas fa-users" />
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-3 col-6">
                  <Link to={{ pathname: "/admin/partner" }}>
                    <div className="small-box bg-light">
                      <div className="inner">
                        <h3>
                          {this.props.partner.length}
                          {/* <sup style={{ fontSize: 20 }}></sup> */}
                        </h3>
                        <p>Partners</p>
                      </div>
                      <div className="icon">
                        <i className="fas fas fa-handshake" />
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-lg-3 col-6">
                  <Link to={{ pathname: "/admin/career-path" }}>
                    <div className="small-box bg-light">
                      <div className="inner">
                        <h3>{this.props.careerPath.length}</h3>
                        <p>Career Path</p>
                      </div>
                      <div className="icon">
                        <i className="nav-icon fas fa-medal" />
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-lg-3 col-6">
                  <Link to={{ pathname: "/admin/course-training" }}>
                    <div className="small-box bg-light">
                      <div className="inner">
                        <h3>{this.props.courseTraining.length}</h3>
                        <p>Course training</p>
                      </div>
                      <div className="icon">
                        <i className="nav-icon fas fa-chalkboard-teacher" />
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-lg-3 col-6">
                  <Link to={{ pathname: "/admin/event" }}>
                    <div className="small-box bg-light">
                      <div className="inner">
                        <h3>10</h3>
                        <p>Event</p>
                      </div>
                      <div className="icon">
                        <i className="far fa-calendar-alt" />
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-lg-3 col-6">
                  <Link to={{ pathname: "/admin/announcement" }}>
                    <div className="small-box bg-light">
                      <div className="inner">
                        <h3>{this.props.announcement.length}</h3>
                        <p>Announcement</p>
                      </div>
                      <div className="icon">
                        <i className="fas fa-bullhorn" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.data,
    partner: state.partnerReducer.partner,
    careerPath: state.careerPathReducer.careerPath,
    courseTraining: state.courseTrainingReducer.courseTraining,
    announcement: state.AnnouncementReducer.data,
    loading: state.userReducer.loading,
  };
};
const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllUsers,
      getAllPartner,
      getAllCareerPath,
      getAllCourseTraining,
      getAllAnnouncements,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapActionToProps)(Dashboard);
