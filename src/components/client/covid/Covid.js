import React from "react";
import "../covid/Covid.css";
import cambodiaIcon from "../../images/cambodia.png";
import {
  getCovidInfo,
  getCovidInfoKh
} from "../../../redux/Actions/client/covidActions/covidAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CovidCard from "./CovidCard";
import AboutCovid from "./AboutCovid";
import CovidAdvice from "./CovidAdvice";
import CovidSymptoms from "./CovidSymptoms";
import CovidHeader from "./CovidHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAsia } from "@fortawesome/free-solid-svg-icons";

class Covid extends React.Component {
  componentDidMount() {
    this.props.getCovidInfo();
    this.props.getCovidInfoKh();
  }

  render() {
    const { data } = this.props.data;
    const { data: dataKh } = this.props.dataKh;

    return (
      <div>
        <div className="covid-header container-fluid p-0">
          <div className="cus-container">
            <CovidHeader />

            <div className="covid-case-country" data-aos="fade-up" data-aos-offset="200" >
              {/* <span>
                <FontAwesomeIcon style={{ color: 'var(--primary-color' }} className="mr-2" icon={faGlobeAsia} />
                    WorldWide Cases
              </span> */}
              <span>
                <img
                  className="mr-2"
                  width="24"
                  src={cambodiaIcon}
                  alt="cambodiaIcon"
                />
                    Cambodia Cases
                  </span>
            </div>

            {/* cambodia case */}
            <div data-aos="fade-up" data-aos-offset="300">
              <div className="my-2 ">
                <CovidCard data={dataKh} />
              </div>
            </div>

            <div data-aos="fade-up" data-aos-offset="200">
              <CovidSymptoms />
            </div>
          </div>
        </div>
        <div className="cus-container">
          <div className="row" data-aos="fade-up">
            <div className="col-md-12 my-4">
              <div className="covid-case-country">
                <span>
                  <FontAwesomeIcon style={{ color: 'var(--primary-color' }} className="mr-2" icon={faGlobeAsia} />
                    WorldWide Cases
                  </span>
                {/* <span>
                  <img
                    className="mr-2"
                    width="24"
                    src={cambodiaIcon}
                    alt="cambodiaIcon"
                  />
                    Cambodia Cases
                  </span> */}
              </div>
            </div>
          </div>

          {/* covid wordwide card*/}
          <div data-aos="fade-up" data-aos-offset="200">
            <CovidCard data={data} />
          </div>

          <div data-aos="fade-up" data-aos-offset="200">
            <CovidAdvice />
          </div>
        </div>
        <div
          id="covid-about"
          data-aos="fade-up"
          data-aos-offset="200"
          className="container-fluid covid-header border-0"
        >
          <AboutCovid />
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    data: state.clientCovidReducer.data,
    dataKh: state.clientCovidReducer.dataKh
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCovidInfo,
      getCovidInfoKh
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Covid);
