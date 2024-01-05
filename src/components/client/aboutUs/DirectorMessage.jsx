import React from "react";
import director from "../../images/director.jpg";

export default function DirectorMessage() {

  return (
    <div>
      <div className="pb-4">
        <div className="cus-container">
          <div className="card border-0 rounded-0 my-5">
            <div className="row dr-wrap px-5 pt-5" style={{ paddingTop: "35px" }}>
              <div data-aos="fade-right" className="col-md-5 text-center">
                <img
                  style={{ width: "100%", objectFit: 'cover' }}
                  src={director}
                  alt="Card image1"
                />

              </div>
              <div data-aos="fade-left" className="col-md-7">
                <h4 className="text-center dr-msg-title font-weight-bold">
                  Director's Message
                </h4>
                <p style={{ lineHeight: "2em" }}>
                  Thank you for visiting Korea Software HRD Center Website!
                  Korea Software HRD center (KSHRD) was established in Phnom
                  Penh, Cambodia in April, 2013 with KOICA Global CSR Program
                  and Webcash Co., Ltd. Our main missions are i) to train SW
                  experts and provide job opportunities and ii) to improve SW
                  technologies by means of advanced SW curriculum, technical
                  seminars and e-learning services.
                </p>
              </div>
            </div>
            <div className="text-center py-4" data-aos="zoom-out">
              <h4 className="page-title dr-mgs-title-bt px-3">
                If you want to become high in the SW world, please join KSHRD!
              </h4>
            </div>
          </div>
          <div data-aos="fade-up" className="card border-0 rounded-0 my-5">
            <div className="row p-4" style={{ paddingTop: "35px" }}>
              <div className="col-md-12 w-100 h-100">
                <p className="h-100 m-0" style={{ lineHeight: "2em" }}>
                  KSHRD provides very intensive SW training program and job
                  opportunities for IT major students to help them become SW
                  experts. After a 9-month-full-time program, all students can
                  have a chance to get high quality job opportunities as a
                  trainee in Korea SW companies or local SW companies. All students in KSHRD have a dream and
                  vision to become future IT leaders. If you want to be IT
                  leaders, please try joining us here!
                </p>
              </div>
            </div>
          </div>

          <div
            data-aos="fade-up"
            className="card border-0 rounded-0 mt-5 mb-4 "
          >
            <div className="row p-4" style={{ paddingTop: "35px" }}>
              <div className="col-md-12 w-100 h-100">
                <p className="h-100 m-0" style={{ lineHeight: "2em" }}>
                  KSHRD plays an important role in Cambodia SW technology
                  development KSHRD plays an important role in improving SW
                  technologies in Cambodia. We are trying to share our advanced
                  SW training curriculum and content with local universities.
                  Furthermore, we publish regular SW technical reports twice a
                  year. Lastly, we are developing e-learning content which can
                  help Cambodian people learn IT easily. KSHRD has young
                  history, but great vision and dream to train future IT leaders
                  and contribute to IT development in Cambodia. Please watch our
                  activities and look for further improvement. Thank you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
