import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./CareerPath.css";
import { connect } from "react-redux";
import CareerPathSideBarSkeleton from "./CareerPathSideBarSkeleton";

class CareerPathSideBar extends Component {

  render() {

    const careerPathSideBar = this.props.data
      .map((data, index) => {
        let navLinkDefault = null
        let navLink = null

        if (data.parent_id === 0 && data.id !== this.props.id) {
          navLink = <NavLink exact key={index} className="menu-box-link" to={`/career-path/${data.id}`}>
            {data.title}
          </NavLink>
        }

        if (data.id === this.props.id) {
          navLinkDefault = <NavLink exact key={index} className="menu-box-link" to={`/career-path`}>
            {data.title}
          </NavLink>
        }

        return (
          <React.Fragment key={index}>
            {navLinkDefault}
            {navLink}
          </React.Fragment>
        )

      });

    return (
      <div>
        <h3 className="font-weight-bold sample-title page-title career-path-title mb-4">
          <span>KSHRD Career Path</span>
        </h3>
        <div className="menu-box">
          {this.props.loading ? <CareerPathSideBarSkeleton /> : careerPathSideBar}
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.clientCareerPathReducer.loading
  }
}

export default connect(mapStateToProps, null)(CareerPathSideBar);