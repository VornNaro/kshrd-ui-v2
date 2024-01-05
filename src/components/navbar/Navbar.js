import React, { Component } from "react";
import { connect } from "react-redux";

class Navbar extends Component {
  handleLogout = () => {
    sessionStorage.clear();
  };
  render() {
    return (
      <div>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="/"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <a
              className="dropdown-item"
              onClick={this.handleLogout}
              href="/admin/login"
              role="button"
            >
              Log Out
            </a>
          </ul>
        </nav>
      </div>
    );
  }
}
// map state in store
const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps, null)(Navbar);
