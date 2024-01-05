import React from "react";
import { Button } from "react-bootstrap";
import covidHeader from "../../images/covid-header.jpg";
import { Link } from "react-router-dom";

export default function CovidHeader() {
  return (
    <div className="row covid-header-content">
      <div data-aos="fade-right" className="col-lg-5 col-md-6">
        <div
          style={{ marginTop: "15%" }}
          className="box-covid shadow-sm border-0 py-3"
        >
          <h2>
            <span className="line-box">CORONA VIRUS</span>
          </h2>
          <h4 className="text-covid">Covid-19</h4>
        </div>
      </div>
      <div data-aos="fade-left" className="col-lg-7 col-md-6">
        <img className="w-100 img-fluid img-header" src={covidHeader} alt="covid" />
      </div>
      <div data-aos="fade-right" className="covid-title text-center">
        <p>
          The COVID‑19 pandemic, also known as the coronavirus pandemic, is an
          ongoing global pandemic of coronavirus disease 2019 (COVID‑19), caused
          by severe acute respiratory syndrome coronavirus 2 (SARS‑CoV‑2). The
          outbreak was first identified in Wuhan, China, in December 2019.
        </p>
        <Button as={Link} to="/covid-19/survey" className="btn-survey">Do Survey</Button>
      </div>
    </div>
  );
}
