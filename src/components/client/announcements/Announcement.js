import React, { Component } from "react";
import "./announcement.css";
import Parser from 'html-react-parser'
import annIcon from "../../icons/shout.svg";
import clock from "../../icons/clock.svg";
import { getAnnouncement, getAnnouncementById } from '../../../redux/Actions/client/announcementActions/AnnouncementAction'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../helpers/scrollTop";
import AnnouncementSkeleton from "./AnnouncementSkeleton";
import NoContent from "./NoContent";
import { Helmet } from "react-helmet";

class Announcement extends Component {
  state = {
    page: 1,
    limit: 3,
  }

  componentWillMount() {
    const { page, limit } = this.state

    this.props.getAnnouncementById(this.props.match.params.id)
    this.props.getAnnouncement(limit, page)
  }


  render() {

    console.log('announcement', this.props.announcement)
    const moreAnnouncement = this.props.announcements.map((item, index) => {
      return (
        <div key={index} className="col-lg-4 col-md-4 col-sm-4 col-12">
          <div className="more-ann">
            <div className="ann-item">
              <Link className="link-announcement" to={`/announcement/${item.id}`} onClick={() => {
                this.props.getAnnouncementById(item.id)
                scrollToTop.scroll()

              }} >
                <div className="ann-img-box">
                  <img className="w-100 zoom" src={item.thumbnail} alt="thumbnail" />
                </div>
                <div className="ann-description py-2">
                  <p className="px-2">
                    {item.title}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )
    })

    if (this.props.loading) return <AnnouncementSkeleton />
    if (this.props.annLoading) return <AnnouncementSkeleton />
    if (this.props.announcement === null || this.props.announcement.length === 0) return <NoContent />

    return (
      <>
        <Helmet>
          {/* General tags */}
          <title>Announcement | www.kshrd.com.kh</title>
          <meta name="description" content={this.props.announcement.description} />
          {/* OpenGraph tags */}
          <meta name="og:url" content="https://kshrd.com.kh/announcement/64" />
          <meta name="og:title" content={this.props.announcement.title} />
          <meta name="og:description" content={this.props.announcement.description} />
          <meta name="og:image" content={this.props.announcement.thumbnail} />
          <meta name="og:type" content="website" />
          <meta name="fb:app_id" content="" />
          {/* Twitter Card tags */}
          <meta name="twitter:title" content={this.props.announcement.title} />
          <meta name="twitter:description" content={this.props.announcement.description} />
          <meta name="twitter:image" content={this.props.announcement.thumbnail} />
          <meta name="twitter:card" content="summary" />
        </Helmet>
        <div>

          <div className="cus-container mt-4 ann-content-title">
            <h2 style={{ fontSize: '24px', fontFamily: "khmer os Battambang", fontWeight: 600, lineHeight: '2.5rem' }}>
              {this.props.announcement.title}
            </h2>

            <div className="card-text m-0 py-2">
              <p className="text-muted d-flex align-items-center">
                <img className="pr-1" src={clock} alt="clock" />
                {new Date(this.props.announcement.date).toDateString()}
              </p>
            </div>

            {/* <div className="my-4">
            <h3 className="m-0 font-weight-bold page-title">
              Detail Information
          </h3>
          </div> */}

            <div className="card border-0 rounded-0 ann-detail-content content">
              <div className="px-5 py-3 dc-wrap">
                {Parser(`${this.props.announcement.content}`)}
              </div>
            </div>
          </div>

          <div className="cus-container">
            <div className="my-4">
              <h3 className="m-0 font-weight-bold page-title">More Announcement</h3>
            </div>

            <div className="row">
              {moreAnnouncement}
            </div>
          </div>

        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    announcements: state.clientAnnouncementReducer.announcements,
    announcement: state.clientAnnouncementReducer.announcement,
    annLoading: state.clientAnnouncementReducer.annLoading,
    loading: state.clientAnnouncementReducer.loading,
  }
}
const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    getAnnouncementById,
    getAnnouncement
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(Announcement);