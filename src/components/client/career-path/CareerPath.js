import React, { Component } from 'react';
import './CareerPath.css';
import { Route } from 'react-router-dom';
import CareerPathContent from './CareerPathContent';
import { getCareerPathPosts } from '../../../redux/Actions/client/careerPathActions/careerPathActions'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CareerPathSideBar from './CareerPathSideBar'
import CareerPathContentSkeleton from './CareerPathContentSkeleton';
import { Helmet } from 'react-helmet';
class CareerPath extends Component {
  state = {
    data: {
      id: ''
    }
  }

  //TODO: This function is created to get data of career path
  fetchData = async () => {
    await this.props.getCareerPathPosts();
    if (this.props.data.length !== 0) {
      const defaultActive = this.props.data.filter(item => item.parent_id === 0)[0].id

      this.setState({
        data: {
          id: defaultActive
        }
      })
    }

  }

  componentDidMount() {
    this.fetchData();
  }

  render() {

    const content = this.props.data.map((data, index) => {
      let defaultContent = null

      if (this.state.data.id === data.id) {
        defaultContent = <Route exact path={`/career-path`} render={() => <CareerPathContent data={data} props={this.props.data} />} />
      }

      return (
        <React.Fragment key={index}>
          {defaultContent}
          <Route exact path={`/career-path/${data.id}`} render={() => <CareerPathContent data={data} props={this.props.data} />} />

        </React.Fragment>
      )
    })

    return (
      <div>
        <Helmet>
          {/* <!-- Primary Meta Tags --> */}
          <title>Career Path | What will I do after finishing training? | www.kshrd.com.kh</title>
          <meta name="title" content="Career Path | What will I do after finishing training? | www.kshrd.com.kh" />
          <meta name="description" content="After 9 months of studying, students will have training chances in South Korea top SW companies such as Webcash, AhnLab, K4M and others. The training period could be 1 year or more. Furthermore, the company will cover all expenses such as air ticket, food, insurance, and others in South Korea." />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://www.kshrd.com.kh/career-path" />
          <meta property="og:title" content="Career Path | What will I do after finishing training? | www.kshrd.com.kh" />
          <meta property="og:description" content="After 9 months of studying, students will have training chances in South Korea top SW companies such as Webcash, AhnLab, K4M and others. The training period could be 1 year or more. Furthermore, the company will cover all expenses such as air ticket, food, insurance, and others in South Korea." />
          <meta property="og:image" content="" />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="http://www.kshrd.com.kh/career-path" />
          <meta property="twitter:title" content="Career Path | What will I do after finishing training? | www.kshrd.com.kh" />
          <meta property="twitter:description" content="After 9 months of studying, students will have training chances in South Korea top SW companies such as Webcash, AhnLab, K4M and others. The training period could be 1 year or more. Furthermore, the company will cover all expenses such as air ticket, food, insurance, and others in South Korea." />
          <meta property="twitter:image" content="" />
        </Helmet>
        <div className="py-4 text-center">
          <h2 className="font-weight-bold sample-title page-title">
            <span>Career Path</span>
          </h2>
          <h4 className="mt-3">What will I do after finishing training?</h4>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 p-0">
              <CareerPathSideBar id={this.state.data.id} data={this.props.data} />
            </div>
            <div className="col-lg-9 p-0">
              <div className="career-path-content">

                {this.props.loading ? <CareerPathContentSkeleton /> : content}

              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.clientCareerPathReducer.data,
    loading: state.clientCareerPathReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getCareerPathPosts
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CareerPath);
