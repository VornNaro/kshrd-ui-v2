import React from "react";
import "./contactUs.css";
import {
  faGlobeAsia,
  faPhoneAlt,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Helmet } from "react-helmet";
import contactUsImg from '../../images/contact-us.jpg'

export default function ContactUs() {
  return (
    <div>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>Contact Us | www.kshrd.com.kh</title>
        <meta name="title" content="Contact Us | www.kshrd.com.kh" />
        <meta name="description" content="If you have any questions, please feel free to contact us.#12, st. 323, Sangkat Beoung Kok 2 Khan Toul Kork, Phnom Penh, Cambodia(855)23 991 314 (855)77 77 12 36 (Khmer, English) (855)15 4 5555 2 (Khmer, English) (855)17 52 81 69 (Korean, English) info.kshrd@gmail.com|phirum.gm@gmail.com http://www.kshrd.com.kh/ Facebook Page Monday-Friday (8:00am - 5:30pm), Saturday (8:00am-12:00pm)" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://www.kshrd.com.kh/contact-us" />
        <meta property="og:title" content="Contact Us | www.kshrd.com.kh" />
        <meta property="og:description" content="If you have any questions, please feel free to contact us.#12, st. 323, Sangkat Beoung Kok 2 Khan Toul Kork, Phnom Penh, Cambodia(855)23 991 314 (855)77 77 12 36 (Khmer, English) (855)15 4 5555 2 (Khmer, English) (855)17 52 81 69 (Korean, English) info.kshrd@gmail.com|phirum.gm@gmail.com http://www.kshrd.com.kh/ Facebook Page Monday-Friday (8:00am - 5:30pm), Saturday (8:00am-12:00pm)" />
        <meta property="og:image" content={contactUsImg} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://www.kshrd.com.kh/contact-us" />
        <meta property="twitter:title" content="Contact Us | www.kshrd.com.kh" />
        <meta property="twitter:description" content="If you have any questions, please feel free to contact us.#12, st. 323, Sangkat Beoung Kok 2 Khan Toul Kork, Phnom Penh, Cambodia(855)23 991 314 (855)77 77 12 36 (Khmer, English) (855)15 4 5555 2 (Khmer, English) (855)17 52 81 69 (Korean, English) info.kshrd@gmail.com|phirum.gm@gmail.com http://www.kshrd.com.kh/ Facebook Page Monday-Friday (8:00am - 5:30pm), Saturday (8:00am-12:00pm)" />
        <meta property="twitter:image" content={contactUsImg} />
      </Helmet>
      <div className="container-fluid p-0">
        <div className="contact-title py-3">
          <h1 className="py-3 font-weight-bold" style={{ fontSize: '2rem' }}>CONTACT US</h1>
          <h5 className="pb-3">
            If you have have any questions, please feel free to contact us.
          </h5>
        </div>

        <div>
          <iframe
            title="google map"
            style={{ width: "100%", height: "50vh" }}
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d250154.6036936549!2d104.889363!3d11.575807!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2c2974b77cdaff4b!2sKorea%20Software%20HRD%20Center!5e0!3m2!1sen!2skh!4v1596757141812!5m2!1sen!2skh"
          ></iframe>
        </div>

        <div className="wrapper-contact m-0">
          <div className="contact-us cus-container py-3">
            <h5 className="font-weight-bold text-center py-2">CONTACT INFO</h5>
            <ul className="list-contact contact-info">
              <li style={{ display: 'inline-flex' }}>
                <span>
                  <FontAwesomeIcon
                    className="mr-3 mt-2"
                    icon={faMapMarkerAlt}
                  />
                </span>
                <span className="ml-1">
                  Address: #12, St 323, Sangkat Boeung Kak II, KhanToul Kork,
                  Phnom Penh, Cambodia.
                </span>
              </li>
              <li>
                <span style={{ marginRight: "14px" }}>
                  <FontAwesomeIcon icon={faPhoneAlt} />
                </span>
                Tel:
                <a className="contact-phone" href="tel:+85512998919">
                  012 998 919 (Khmer)
                </a>
                <div class="tel-contact">
                <a class="contact-phone" href="tel:+085585402605">
                085 402 605 (Korean)
                </a>
                
                </div>
              </li>
              <li>
                <FontAwesomeIcon className="icon-item mr-3" icon={faEnvelope} />
                Email: info.kshrd@gmail.com
                <div className="email-contact"> phirum.gm@gmail.com</div>
              </li>
              <li>
                <FontAwesomeIcon
                  className="icon-item mr-3"
                  icon={faGlobeAsia}
                />
                www.kshrd.com.kh
              </li>
              <li>
                <FontAwesomeIcon className="icon-item mr-3" icon={faFacebook} />
                <a
                  className="contact-phone"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://web.facebook.com/ksignhrd"
                >
                  Facebook Page
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
