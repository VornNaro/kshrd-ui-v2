import React, { Component } from "react";
import "./Alumni.css";
import InfiniteScroll from "react-infinite-scroll-component";
import alumni from "../../images/alumni.jpg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAlumni, getMoreAlumni } from "../../../redux/Actions/client/alumniActions/alumniAction";
import AlumniSkeleton from "./AlumniSkeleton";
import { Helmet } from "react-helmet";

class Alumni extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      hasMore: true
    }

  }
  componentWillMount() {
    this.props.getAlumni();
  }

  //TODO: This function is created to get more alumni while loading
  fetchMoreAlumni = () => {

    this.setState(prevState => { return { page: prevState.page + 1 } }, () => {
      this.props.getMoreAlumni(this.state.page, (res) => {

        if (res.length === 0) {
          this.setState({ hasMore: false })
        }
      });
    });

  }

  render() {

    let data = this.props.data.map((data, index) => {

      if (index % 2 === 0) {
        return (
          <div key={data.id} data-aos="fade-up">
            <div className="row">
              <div className="col-md-5">
                <div className="alumni-profile">
                  <div className="alumni-bg">
                    <img className="alumni-pic rounded-circle w-100 h-100"
                      alt="profile"
                      src={data.photo || "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-20.jpg"}
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-20.jpg" }} />
                  </div>
                </div>
              </div>

              <div className="col-md-7">
                <div className="alumni-comment alumni-comment-top">
                  <div className="alumni-detail">
                    <a href={`${data.link}`} target="_blank" rel="noopener noreferrer" >
                      <h4 className="alumni-name">
                        {data.name}
                      </h4>
                    </a>
                    <p className="text-muted m-0">{data.major}</p>
                  </div>

                  <div className="alumni-comment-description">
                    <blockquote className="blockquote-row-top" >
                      {data.comment}
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={data.id} data-aos="fade-up">
            <div className="row">
              <div className="col-md-7 alumni-mb-bt-cm">
                <div className="alumni-comment alumni-comment-bt">
                  <div className="alumni-detail">
                    <a href={`${data.link}`} target="_blank" rel="noopener noreferrer" >
                      <h4 className="alumni-name">
                        {data.name}
                      </h4>
                    </a>
                    <p className="text-muted m-0">{data.major}</p>
                  </div>

                  <div className="alumni-comment-description">
                    <blockquote className="blockquote-row-bottom" >
                      {data.comment}
                    </blockquote>
                  </div>
                </div>
              </div>

              <div className="col-md-5">
                <div className="alumni-profile">
                  <div className="alumni-bg">
                    <img className="alumni-pic rounded-circle w-100 h-100"
                      alt="profile"
                      src={data.photo || "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-20.jpg"}
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-20.jpg" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
    return (
      <>
        <Helmet>

          {/* <!-- Primary Meta Tags --> */}
          <title>Alumni's Feedback | What Our Alumni Say</title>
          <meta name="title" content="Alumni's Feedback | What Our Alumni Say" />
          <meta name="description" content="A college course is a class offered by a college or university. These courses are usually part of a program leading" />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://www.kshrd.com.kh/alumni" />
          <meta property="og:title" content="Alumni's Feedback | What Our Alumni Say" />
          <meta property="og:description" content="A college course is a class offered by a college or university. These courses are usually part of a program leading" />
          <meta property="og:image" content={alumni} />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="http://www.kshrd.com.kh/alumni" />
          <meta property="twitter:title" content="Alumni's Feedback | What Our Alumni Say" />
          <meta property="twitter:description" content="A college course is a class offered by a college or university. These courses are usually part of a program leading" />
          <meta property="twitter:image" content={alumni} />

        </Helmet>

        <div className="container-fluid p-0 m-0">
          <div className="bg-white">
            <div className="row m-0">
              <div className="col-lg-5 col-md-12 col-sm-12 bg-blue px-0 pageTitle">
                <div className="d-flex left-text-top justify-content-center align-content-center h-100 align-items-center flex-column py-4">
                  <h1 className="text-white font-weight-bold py-3 alumni-title">WHAT OUR ALUMNI SAY</h1>
                  <h5 className="text-white line-height text-center px-4">
                    A college course is a class offered by a college or
                    university. These courses are usually part of a program
                    leading.
                </h5>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12 px-0 h-100 w-100">
                <img className="w-100 h-100" src={alumni} alt="alumni" />
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-center h-100 my-5">
              <h3 className="font-weight-bold m-0">Alumni's Feedback</h3>
            </div>

            <InfiniteScroll
              style={{ overflow: 'hidden' }}
              dataLength={this.props.data.length}
              next={this.fetchMoreAlumni}
              hasMore={this.state.hasMore}
              loader={<AlumniSkeleton />}
              endMessage={
                <p className="m-0 py-4 text-center">
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <div className="cus-container">
                {data}
              </div>

            </InfiniteScroll>
          </div>
        </div >
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.clientAlumniReducer.data
  };
};
const mapActionToProps = dispatch => {
  return bindActionCreators({
    getAlumni,
    getMoreAlumni
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(Alumni);
