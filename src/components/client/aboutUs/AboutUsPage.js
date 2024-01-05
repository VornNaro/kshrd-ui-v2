import React from "react";
import img1 from "../../images/1.jpg";
import img2 from "../../images/about2.jpg";
import './About.css'
export default function AboutUsPage() {

  return (
    <div className="cus-container">
      <div className="row" style={{ paddingTop: "35px" }}>
        <div className="col-lg-6 col-md-12 col-sm-12" data-aos="fade-right">
          <div className="w-100 h-100">
            <img
              style={{ objectFit: 'cover' }}
              className="border-0 rounded-0 w-100 h-100"
              src={img1}
              alt="Card image1"
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 ab-top-content" data-aos="fade-left">
          <div
            className="bg-white border-0 rounded-0 h-100 p-3"
            style={{ lineHeight: "2em" }}
          >
          <p className='mb-3'>
          <b>Korea Software HRD Center</b> is an academy training center for training software professionals in cooperation with Korea International Cooperation Agency(KOICA) and Webcash in April, 2013 in Phnom Penh, Cambodia.  </p>
          <p>From 2020, Korea Software HRD Center has been become <b>Global NGO</b> with the name Foundation for Korea Software Global Aid <b>(KSGA)</b>, main sponsored by <b>Webcash Group</b>, to continue mission for ICT Development in Cambodia and will recruit 60 t0 80 scholarship students every year.
          </p>
           
            </div>
        </div>
      </div>

      <div className="row my-4">
        <div className="col-lg-6 col-md-12 col-sm-12 ab-bottom-content" data-aos="fade-right">
          <div
            className="bg-white border-0 rounded-0 h-100 p-3 "
            style={{ lineHeight: "2em" }}
          >
          <p>Korea Software HRD Center is located at Sangkat Boeung Kak II, Khan Toul Kork, Phnom Penh. It is the first center in Cambodia provides many benefits to students. There are two main courses in the training curriculum; basic and advanced courses. The basic course includes Java programming and web development training. In the advanced course, students perform individual group projects.</p>
          <p> The center has a good environment for students to study. It supports all materials that are related to the courses and provides scholarships for motivation. After training, the students will become software experts, good at soft skill, and more confident as leaders in IT field. Additionally, there are many job opportunities in local and global after training since our goal is to train Korea Software professional skills aimed at excellent students of IT major and to offer job opportunities to them. </p>
            </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12" data-aos="fade-left">
          <div className="w-100 h-100">
            <img
              style={{ objectFit: 'cover' }}
              className="border-0 rounded-0 w-100 h-100"
              src={img2}
              alt="Card image2"
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center" data-aos="zoom-out">
        <h3 className="m-0 font-weight-bold page-title">BENEFITS</h3>
      </div>

      <div className="row mt-4 ab-card" style={{ paddingBottom: '30px' }} data-aos="fade-up">

        <div className="col-md-6 about-card-left">
          <div className="card border-0 rounded-0 p-4 h-100 list-card">
            <h5 className=" text-center list-title">
              Learning up-to-date technologies
              </h5>
            <ul>
              <li>Professional Korean IT Trainers</li>
              <li>Well-organized curriculum and training system</li>
              <li>Best IT training environment</li>
            </ul>
          </div>
        </div>

        <div className="col-md-6 about-card-right">
          <div className="card border-0 rounded-0 p-4 h-100 list-card">
            <h5 className=" text-center list-title">
              Free of Charge Plus Optional Allowance
              </h5>
            <ul>
              <li>Basic course : up to $100</li>
              <li>Advanced course : $140</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row ab-card" style={{ paddingBottom: '30px' }} data-aos="fade-up">
        <div className="col-md-6 about-card-right">
          <div className="card border-0 rounded-0 p-4 h-100 list-card">
            <h5 className=" text-center list-title">
              Best Education Environment
              </h5>
            <ul>
              <li>20 students in each class</li>
              <li>Provides study materials</li>
              <li>Trained by Korean IT experts</li>
              <li>1PC/Person, Textbooks, Smart Devices (iOS & Android) and etc</li>
            </ul>
          </div>
        </div>
        <div className="col-md-6 about-card-right">
          <div className="card border-0 rounded-0 p-4 h-100 list-card">
            <h5 className=" text-center list-title">
              Other Welfare
              </h5>
            <ul>
              <li>Free lunch and uniforms</li>
              <li>Strong social network</li>
              <li>Sports event and monthly party</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row" style={{ paddingBottom: '30px' }} data-aos="fade-up">
        <div className="col-md-12">
          <div className="card border-0 rounded-0 p-4 h-100 list-card">
            <h5 className="text-center list-title">
              100% High Quality Job Opportunities
              </h5>
            <ul>
              <li>Korea Software companies in South Korea</li>
              <li>KOSIGN Co.,Ltd(Global SW company)</li>
              <li>Shinhan Bank Cambodia Plc</li>
              <li>Piped Bits (Cambodia) Co.,Ltd</li>
              <li>Phillip Bank Plc</li>
              <li>WB Finance Co.,Ltd</li>
              <li>IG Tech Group</li>
              <li>DGB Specialize Bank</li>
              <li>Other local software companies (KSHRD Partners)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
