import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import kshrd from "../../assets/images/kshrd.png";
export default class Sidebar extends Component {
  render() {
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/admin/dashboard" className="brand-link">
          <img
            src={kshrd}
            alt="kshrd logo"
            className="brand-image elevation-3"
            style={{ opacity: ".8", textAlign: "center" }}
          />
          <span className="brand-text font-weight-light">KSHRD WEBSITE</span>
        </Link>
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" id="icon" />
                  <p className="font">Dashboard</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/admin/users" className="nav-link">
                  <i className="nav-icon fas fa-users" id="icon" />
                  <p>Users Profile</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/admin/menu" className="nav-link">
                  <i className="nav-icon fas fa-bars" id="icon" />
                  <p>Menu</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/admin/partner" className="nav-link">
                  <i className="nav-icon fas fa-handshake" id="icon" />
                  <p>Partners</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/admin/partner-type" className="nav-link">
                  <i className="nav-icon fas fa-edit" id="icon" />
                  <p>Partner Type</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/admin/career-path" className="nav-link">
                  <i className="nav-icon fas fa-medal" id="icon" />
                  <p>Career Path</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/admin/alumni" className="nav-link">
                  <i className="nav-icon fas fa-comment-dots" id="icon" />
                  <p>Alumni Comment</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/admin/course-training" className="nav-link ">
                  <i className="nav-icon fas fa-chalkboard-teacher" id="icon" />
                  <p>Course Training</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/course-training-types" className="nav-link ">
                  <i className="fas fa-chalkboard nav-icon" />
                  <p>Course Trainning Type</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/admin/generation" className="nav-link">
                  <i className="nav-icon fas fa-clipboard-list" id="icon" />
                  <p>Generation</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/admin/event" className="nav-link">
                  <i className="far fa-calendar-alt nav-icon" />
                  <p>Event</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/event-category" className="nav-link">
                  <i className="far fa-calendar nav-icon" />
                  <p>Event Category</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/admin/announcement" className="nav-link">
                  <i className="nav-icon fas fa-bullhorn" id="icon" />
                  <p>Announcement</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}
