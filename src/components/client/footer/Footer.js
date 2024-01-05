import React from "react";
import "./footer.css";
import facebookIcon from "../../icons/facebook.svg";
import youtubeIcon from "../../icons/youtube (1).svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {

  const getYear = () => {
    return new Date().getFullYear()
  }

  return (
    <div className="container-fluid footer">
      <div className="cus-container">
        <div className="row">
          <div className="col-md-12 p-0">
            <div className="py-3 text-white">
              <h4 className="font-weight-bold my-4 ft-title">
                KOREA SOFTWARE HRD CENTER
              </h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="footer-item col-lg-4 col-md-6 col-12 pl-0">
            <h5 className="text-white-50 font-weight-bold">ABOUT US</h5>
            <div>
              <p className="text-white about-title">
                Korea Software HRD Center is an academy training center for training software professionals in cooperation with Korea International Cooperation Agency(KOICA) and Webcash in April, 2013 in Phnom Penh, Cambodia. From 2020, Korea Software HRD Center has been become Global NGO, main sponsored by Webcash Group, to continue mission to train SW experts, to improve SW technologies and ICT Development in Cambodia.
              </p>
            </div>
          </div>

          <div className="footer-item col-lg-4 col-md-6 w-100 follow-page d-flex justify-content-center">
            <div>
              <h5 className="text-white-50 pb-3 font-weight-bold">FOLLOW OUR FACEBOOK</h5>
              <div
                className="fb-page"
                data-href="https://web.facebook.com/ksignhrd"
                data-tabs=""
                data-width="300"
                data-height=""
                data-small-header="false"
                data-adapt-container-width="false"
                data-hide-cover="false"
                data-show-facepile="true"
              >
                <blockquote
                  cite="https://web.facebook.com/ksignhrd"
                  className="fb-xfbml-parse-ignore"
                >
                  <a href="https://web.facebook.com/ksignhrd">
                    Korea Software HRD Center
                  </a>
                </blockquote>
              </div>
            </div>
          </div>

          <div className="footer-item col-lg-4 col-md-12 col-12 pr-0">
            <h5 className="text-white-50 font-weight-bold">CONTACT</h5>
            <ul className="list-contact">
              <li className="address-contact">
                <span>
                  <FontAwesomeIcon
                    className="mr-3 mt-2"
                    icon={faMapMarkerAlt}
                  />
                </span>
                <span className="ml-1">
                  {" "}
                  Address: #12, St 323, Sangkat Boeung Kak II, Khan Toul Kork,
                  Phnom Penh, Cambodia.
                </span>
              </li>
              <li>
                <span style={{ marginRight: "14px" }}>
                  <FontAwesomeIcon icon={faPhoneAlt} />
                </span>
                Tel: 012 998 919 (Khmer)
                <div className="tel-contact">
                  085 402 605 (Korean)
                </div>
              </li>
              <li>
                {/* <i className="fas fa-envelope mr-3"></i> */}
                <FontAwesomeIcon className="mr-3" icon={faEnvelope} />
                Email: info.kshrd@gmail.com
                <div className="email-contact"> phirum.iti@gmail.com</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 p-0">
            <div className="line-footer"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="footer-bottom py-4">
              <div className="row">
                <div className="col-md-5 p-0 d-flex align-items-center">
                  <p className="text-white m-0">
                    {getYear()} © Korea Software HRD Center. All right reserved.
                  </p>
                </div>
                <div className="col-md-7 social-wrap">
                  <p className="text-white m-0 mr-1">Social Network</p>
                  <a
                    style={{ color: "rgb(66, 103, 178)" }}
                    target="_blank"
                    href="https://web.facebook.com/ksignhrd"
                    rel="noopener noreferrer">
                    <img width="17" height="17" src={facebookIcon} alt="fbIcon" />
                  </a>
                  <a
                    style={{ color: "rgb(66, 103, 178)" }}
                    target="_blank"
                    href="https://www.youtube.com/c/KoreaSoftwareHRDCenter"
                    rel="noopener noreferrer">
                    <img width="17" height="17" src={youtubeIcon} alt="ytIcon" />
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
