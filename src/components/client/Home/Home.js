import React, { Component } from "react";
import Slide from "./Slide";
import "./home.css";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import nextPagination from "../../icons/next-pagination.svg";
import prevPagination from "../../icons/prev-pagination.svg";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCourseTraining } from "../../../redux/Actions/client/homeActions/homeAction"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAnnouncement } from "../../../redux/Actions/client/announcementActions/AnnouncementAction"
import OurPartners from "./our-partners/OurPartners";
import SlideTraining from "./SlideTraining";
import AnnSkeleton from "./our-partners/AnnSkeleton";
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { Helmet } from "react-helmet";
import imgHome from "../../images/announcement.jpg";

class Home extends Component {
  state = {
    dataHtml: '',
    dataArr: [],
    page: 1,
    limit: 3,
    pagination: {}

  }

  componentDidMount() {
    this.loadData();
  }

  //TODO: This function is created to get announcement
  loadData = async () => {
    const { limit, page } = this.state
    await this.props.getAnnouncement(limit, page);
    this.setState({
      pagination: this.props.pagination
    })
  }

  //TODO: This function is created to change page number of pagination
  handlePageChange = (e) => {

    const seleted = e.selected + 1;
    this.setState({
      page: seleted,
    }, () => {
      this.loadData();
    });

  }

  onPageChange = (e) => {

    this.setState({
      limit: e.target.value,
      count: this.props.pagination.totalCount
    }, () => this.loadData())

  }


  render() {
    let data = this.props.announcements.map((announcement, index) => {
      const date = new Date(announcement.date).toDateString();
      return (
        <div data-aos="fade-up" key={index} >
          <div key={index} className="row mx-2 mt-4">
            <div className="col-xl-3 col-lg-4 col-md-5 col-sm-5 col-12 ">
              <Link to={`/announcement/${announcement.id}`} className="link-announcement">
                <div style={{ width: '100%', height: '200px' }}>
                  <img
                    style={{ objectFit: 'cover' }}
                    className="w-100 h-100 zoom ann-img"
                    src={announcement.thumbnail}
                    alt="thumbnail"
                  />
                </div>

              </Link>
            </div>

            <div className="col-xl-9 col-lg-8 col-md-7 col-sm-7 col-12 pl-lg-0 pl-md-0 pl-sm-0">
              <div
                style={{ padding: "0 20px" }}
                className="card-body pt-2 mr-0 ann-body"
              >
                <Link to={`/announcement/${announcement.id}`} className="link-announcement">
                  <div className="amt-title-top" >
                    <h5 style={{ lineHeight: '2rem' }} className="card-title font-weight-bold m-0">
                      {announcement.title}
                    </h5>
                  </div>
                </Link>

                <div className="card-text m-0 py-2">
                  <small className="text-muted">
                    <span style={{ verticalAlign: 'middle' }}>
                      <FontAwesomeIcon style={{ fontSize: "1.5em" }} className="mr-2" icon={faClock} />
                    </span>
                    <span>{date}</span>

                  </small>
                </div>
                <Link to={`/announcement/${announcement.id}`} className="link-announcement">
                  <p className="card-text amt-desc">
                    {announcement.description}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });

    let prevArrow = <img className="mx-2" src={prevPagination} alt="prevArrow" />;
    let nextArrow = <img className="mx-2" src={nextPagination} alt="nextArrow" />;

    return (
      <>
        <Helmet>
          {/* <!-- Primary Meta Tags --> */}
          <title>Korea Software HRD Center | kshrd.com.kh</title>
          <meta name="title" content="Korea Software HRD Center | kshrd.com.kh" />
          <meta name="description" content="We provide the best opportunities for IT major students to become global SW experts with the highest quality training programs. All courses are free of charge. Furthermore, we provide a bridge for graduated students to the global SW job market. Please join our center for a bright future!" />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.kshrd.com.kh/" />
          <meta property="og:title" content="Korea Software HRD Center | kshrd.com.kh" />
          <meta property="og:description" content="We provide the best opportunities for IT major students to become global SW experts with the highest quality training programs. All courses are free of charge. Furthermore, we provide a bridge for graduated students to the global SW job market. Please join our center for a bright future!" />
          <meta property="og:image" content={imgHome} />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://www.kshrd.com.kh/" />
          <meta property="twitter:title" content="Korea Software HRD Center | kshrd.com.kh" />
          <meta property="twitter:description" content="We provide the best opportunities for IT major students to become global SW experts with the highest quality training programs. All courses are free of charge. Furthermore, we provide a bridge for graduated students to the global SW job market. Please join our center for a bright future!" />
          <meta property="twitter:image" content={imgHome} />

        </Helmet>

        <div>
          {/* page title */}

          <div
            data-aos="zoom-out"
            className="my-3 pt-2 d-flex justify-content-center align-items-center flex-column"
          >
            <h3 className="page-title title-home ">
              <span>
                WELCOME TO KOREA SOFTWARE
            </span>
              <span>
                {' '}HRD CENTER
            </span>
            </h3>

          </div>
          {/* end page title */}

          {/* slide home page */}
          <div data-aos="zoom-out">
            <Slide />
          </div>

          {/* end slide home page */}

          {/* page title bottom */}
          <div
            data-aos="fade-up"
            className="text-center mt-3 cus-container"
          >
            <h5 className="font-weight-bold py-3">
              The Best Software Expert Training Center in Cambodia
          </h5>
            <p>
              We provide the best opportunities for IT major students to become
              global SW experts with the highest quality training programs. All
              courses are free of charge. Furthermore, we provide a bridge for
              graduated students to the global SW job market. Please join our
              center for a bright future!
          </p>
          </div>
          {/* end page title bottom */}

          {/* recent announcemenet */}
          <div className="cus-container dp-mb-content" data-aos="fade-up">
            <div className="ann-bar">
              <h4 className="accouncement-toolbar">
                <span className="accouncement-title">Recent Announcements</span>
              </h4>
            </div>

            <div className="card shadow-none pb-4 border-0 rounded-0">

              {this.props.annLoading ? <AnnSkeleton /> : data}

            </div>
            {/* Recent Annoumcement */}

            {/* pagination */}
            <div className="pagination" data-aos="fade-left">
              <ReactPaginate
                previousLabel={prevArrow}
                nextLabel={nextArrow}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pagination.totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={this.handlePageChange}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
            {/* pagination */}
            <hr className="m-0" />
            <div
              className="text-center"
              data-aos="zoom-out"
            >
              <h4 className="font-weight-bold py-4">WHAT OUR TRAINING INCLUDE</h4>

              {/* <SlideTraining /> */}
            </div>
          </div>

          <div className="cus-container" data-aos="fade-left">
            <SlideTraining />
          </div>

          <div className="cus-container">
            <hr className="m-0 my-4" />
            <div className="text-center" data-aos="zoom-out">
              <h4 className="font-weight-bold m-0">OUR PARTNERS</h4>
              <p className="p-3 line-height">
                We have a network of dedicated partners, each brining their special
                expertise and contribution. We successfully cooperate with many
                local and international partners such as KOSIGN Co., Ltd,
                government, and universities for mutual improvement.
            </p>
            </div>

            <OurPartners />


          </div>
        </div >
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    // data: state.homeReducer.data,
    announcements: state.clientAnnouncementReducer.announcements,
    pagination: state.clientAnnouncementReducer.pagination,
    annLoading: state.clientAnnouncementReducer.annLoading,
  }
}
const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    getCourseTraining,
    getAnnouncement,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(Home);
