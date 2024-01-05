import React from "react";
import Faq from "react-faq-component";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import "../FAQ/FAQ.css";
import youtubeIcon from "../../icons/youtube (1).svg";
import { Link } from "react-router-dom";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Helmet } from "react-helmet";

export default function FAQ() {

  const data = {
    title: `FAQ`,
    rows: [
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            Who can join this scholarship?
          </h4>
        ),
        content: `<ul id="test">
                <li>At least year 3 students major in IT field or Computer Science</li>
                <li>Be able to study full time (8 am - 5 pm)</li>
                <li>Age between 20 and 35 years old</li>
            </ul>`
      },
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            How can you register?
          </h4>
        ),
        content: `<ul id="test">
                <li>Online registration via <a href="https://register.kshrd.com.kh">https://register.kshrd.com.kh/</a></li>
                <li>If you are not sure about how to register, please feel free to contact us</li>
                <li>If you have more questions, please visit our Facebook page (www.facebook.com/ksignhrd)</li>
            </ul>`
      },
      /*{
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            Is it free to register for written test?
          </h4>
        ),
        content: `<ul id="test">
                <li>Written test fee is only 5$. You can pay at the center or via our money agency partners.</li>
            </ul>`
      },*/
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            When will the written test started?
          </h4>
        ),
        content: `<ul id="test">
                <li>On February, 06<sup>th</sup> 2021</li>
            </ul>`
      },
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            Where will you make the written test?
          </h4>
        ),
        content: `<ul id="test">
                <li>Asia Euro University (located in Phnom Penh)</li>
            </ul>`
      },
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            How many candidates will be selected?
          </h4>
        ),
        content: `<ul id="test">
                <li>Only 60 candidates will be selected</li>
            </ul>`
      },
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            What subjects will be tested?
          </h4>
        ),
        content: `<ul id="test">
                <li>OOP Concept, Java Basics</li>
                <li>Working with Java Data Types</li>
                <li>Using Operators and Decision Constructs</li>
                <li>Creating and Using Arrays</li>
                <li>Using Loop Constructs</li>
                <li>Working with Methods and Encapsulation</li>
                <li>Working with Inheritance</li>
                <li>Handling Exceptions</li>
                <li>Building Database Applications with JDBC</li>
                <li>Thread</li>
                <li>String Processing</li>
                <li>Database concept, SQL</li>

                <li>HTML</li>
                <li>CSS</li>
                <li>Javascript</li>
                <li>JQuery</li>
                <li>Ajax</li>
                <li>One English essay writing</li>
            </ul>`
      },
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            What stuff do you need to show to proctor that you are written test
            candidate?
          </h4>
        ),
        content: `<ul id="test">
                <li>You have to show the registration invoice to proctor before entering the room.</li>
                <li>You should dress casually as a student.</li>
            </ul>`
      },
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            How long does the written test take?
          </h4>
        ),
        content: `<ul id="test">
                <li>Written test takes 3 hours</li>
            </ul>`
      },
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            When and Where can you get the result for written test?
          </h4>
        ),
        content: `<ul id="test">
                <li>February 11<sup>th</sup>, 2021 at Korea Software HRD Center</li>
            </ul>`
      },
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            What should you do after first result?
          </h4>
        ),
        content: `<ul id="test">
                <li>After you pass the written test, be prepared for the interview stage</li>
            </ul>`
      },
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            When will be the interview tested?
          </h4>
        ),
        content: `<ul id="test">
                <li>February 17<sup>th</sup>-18<sup>th</sup>, 2021</li>
            </ul>`
      },
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            What will be about for interview?
          </h4>
        ),
        content: `<ul id="test">
                <li>We will interview you in English. We interview about your education background and also your experience in IT field.</li>
            </ul>`
      },
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            When and where can you get the result for the final result?
          </h4>
        ),
        content: `<ul id="test">
                <li> Final result will be released a few days after the interview take. Result will be posted on Korea Software HRD Center's facebook page and official website</li>
            </ul>`
      },
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            When will be course started?
          </h4>
        ),
        content: `<ul id="test">
                <li>The course will be started on March of the studying year.</li>
            </ul>`
      },
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            How long do you study in Basic and Advanced course?
          </h4>
        ),
        content: `<ul id="test">
                <li>Study 5 months for Basic Course</li>
                <li>Study 4 months for Advanced Course</li>
            </ul>`
      },
      {
        title: (
          <h4 className="viwat" style={{ textAlign: "start !important" }}>
            What is the benefit after you finish the course?
          </h4>
        ),
        content: `<ul id="test">
                <li>Our center will seek the right job for you from our partner companies.</li>
            </ul>`
      }
    ]
  };

  const element = (
    <FontAwesomeIcon
      style={{ color: "#0A5695" }}
      icon={faCaretDown}
      size="6x"
    />
  );
  const config = {
    animate: true,
    arrowIcon: element
  };
  const styles = {
    bgColor: "#",
    titleTextColor: "black",
    rowTitleColor: "black",
    rowContentTextSize: "20px",
    borderBottom: "0"
  };
  return (
    <>
    <Helmet>
        <title>FAQ | www.kshrd.com.kh</title>
        <meta name="description" content="Stay in touch If you want to know more information, please feel free to contact us.
or give us call 012 998 919 or 085 402 605" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kshrd.com.kh/faq" />
        <meta property="og:title" content="FAQ | www.kshrd.com.kh" />
        <meta property="og:description" content="Stay in touch If you want to know more information, please feel free to contact us.
or give us call 012 998 919 or 085 402 605" />
        <meta property="og:image" content="https://www.fertilityclinicsandiego.com/wp-content/plugins/ajax-search-pro/img/default.jpg" />
        <meta name="fb:app_id" content="" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.kshrd.com.kh/faq" />
        <meta property="twitter:title" content="FAQ | www.kshrd.com.kh" />
        <meta property="twitter:description" content="Stay in touch If you want to know more information, please feel free to contact us.
or give us call 012 998 919 or 085 402 605" />
        <meta property="twitter:image" content="" />
      </Helmet>
      
    {/*
      <Helmet>
        <title>FAQ | www.kshrd.com.kh</title>
        <meta name="title" content="FAQ | www.kshrd.com.kh" />
        <meta name="description" content="Stay in touch If you want to know more information, please feel free to contact us.
or give us call 012 998 919 or 085 402 605" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kshrd.com.kh/faq" />
        <meta property="og:title" content="FAQ | www.kshrd.com.kh" />
        <meta property="og:description" content="Stay in touch If you want to know more information, please feel free to contact us.
or give us call 012 998 919 or 085 402 605" />
        <meta property="og:image" content="" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.kshrd.com.kh/faq" />
        <meta property="twitter:title" content="FAQ | www.kshrd.com.kh" />
        <meta property="twitter:description" content="Stay in touch If you want to know more information, please feel free to contact us.
or give us call 012 998 919 or 085 402 605" />
        <meta property="twitter:image" content="" />
      </Helmet>
      */}
      <div className="cus-container my-5">
        <div className="row">
          <div className="col-md-4" data-aos="fade-right">
            <div className="row">
              <div className="col-md-12 mb-lg-0 mb-md-0 mb-sm-4 mb-4">
                <div className="card border-0 rounded-0 d-block h-100 text-center p-4">
                  <h4 className="m-0 py-3 font-weight-bold">STAY IN TOUCH</h4>
                  <h5 className="m-0 line-height">
                    If you want to know more information, please feel free to
                    contact us.
                  </h5>
                  <h5 className="font-weight-bold m-0 p-3">
                    or give us call{" "}
                    <br/>
                    <a className="contact-phone" href="tel:+85512998919">
                      012 998 919
                    </a>
                    <span> or </span>
                    <a className="contact-phone" href="tel:+85585402605">
                      085 402 605
                    </a>
                  </h5>
                  <Button
                    as={Link}
                    to="/contact-us"
                    size="lg"
                    className="contact-button border-0 m-0 my-3"
                  >
                    Contact Us
                  </Button>
                  <h4 className="line-height page-title m-0 p-3">
                    KEEP A PULSE ON HRD CENTER. GIVE US A FOLLOW.
                  </h4>
                  <div className="d-flex justify-content-center align-items-center">
                    {/* <img className="p-1" width="40" src={fbIcon} alt="fbIcon" /> */}
                    <span style={{ color: "#4267B2" }}>
                      <a
                        style={{ color: "rgb(66, 103, 178)" }}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://web.facebook.com/ksignhrd"
                      >
                        {/* <i className="fab fa-facebook fa-2x mx-2"></i> */}
                        <FontAwesomeIcon
                          className="mx-2"
                          icon={faFacebook}
                          style={{ fontSize: "2em" }}
                        />
                      </a>
                    </span>
                    <a style={{ color: "rgb(66, 103, 178)" }}
                      target="_blank"
                      href="https://www.youtube.com/c/KoreaSoftwareHRDCenter"
                      rel="noopener noreferrer">
                      <img
                        style={{ marginBottom: "2px" }}
                        width="30"
                        height="30"
                        className="mx-2"
                        src={youtubeIcon}
                        alt="ytIcon"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8" data-aos="fade-left">
            <div className="pr-4">
              <Faq data={data} config={config} styles={styles} />
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
