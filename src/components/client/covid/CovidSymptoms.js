import React from "react";
import symptomsA from "../../images/symptom-a.png";
import symptomsB from "../../images/symptom-b.png";
import symptomsC from "../../images/symptom-c.png";
import covidWarning from "../../images/covid-warning.jpg";
import { Button } from "react-bootstrap";
import { Link } from "react-scroll";

export default function CovidSymptoms() {
  return (
    <div>
      <div className="title-header flex-column mt-5">
        <h3>SYMPTOMS OF CORONAVIRUS</h3>
        <p className="mt-3">
          COVID-19 affects different people in different ways. Most infected
          people will develop mild to moderate illness and recover without
          hospitalization.The most common symptoms of COVID-19 are fever,
          tiredness, and dry cough. Some patients may have aches and pains,
          nasal congestion, runny nose, sore throat or diarrhea. These symptoms
          are usually mild and begin gradually. Also the symptoms may appear
          2-14 days after exposure.
        </p>
      </div>

      <div className="row mt-4">
        <div
          className="col-md-4 card-box-2"
          data-aos="fade-up"
          data-aos-offset="200"
        >
          <div className=" h-100 shadow-sm">
            <div className="card-box-2-img">
              <img className="w-100" src={symptomsA} alt="symptoms" />
            </div>
            <div className="card-box-2-title">
              <h5>Fever</h5>
              <p>
                <strong> High Fever</strong> – this means you feel hot to touch
                on your chest or back (you do not need to measure your
                temperature). It is a common sign and also may appear in 2-10
                days if you affected.
              </p>
            </div>
          </div>
        </div>

        <div
          className="col-md-4 card-box-2"
          data-aos="fade-up"
          data-aos-offset="200"
        >
          <div className="h-100 shadow-sm">
            <div className="card-box-2-img">
              <img className="w-100" src={symptomsB} alt="symptoms" />
            </div>
            <div className="card-box-2-title">
              <h5>Cough</h5>
              <p>
                <strong>Continuous cough</strong> – this means coughing a lot
                for more than an hour, or 3 or more coughing episodes in 24
                hours (if you usually have a cough, it may be worse than usual).
              </p>
            </div>
          </div>
        </div>

        <div
          className="col-md-4 card-box-2"
          data-aos="fade-up"
          data-aos-offset="200"
        >
          <div className="h-100 shadow-sm">
            <div className="card-box-2-img">
              <img className="w-100" src={symptomsC} alt="symptoms" />
            </div>
            <div className="card-box-2-title">
              <h5>Shortness of breath</h5>
              <p>
                <strong>Difficulty breathing</strong> – Around 1 out of every 6
                people who gets COVID-19 becomes seriously ill and develops
                difficulty breathing or shortness of breath.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5 pb-4" data-aos="fade-up" data-aos-offset="200">
        <div className="col-md-8 d-flex sample-warning">
          <img
            className="mr-2"
            width="50"
            height="50"
            src={covidWarning}
            alt="covid warning"
          />
          <p>
            <strong className="sample-style-covid">
              {" "}
              Stay at home and call your doctor:
            </strong>{" "}
            If you think you have been exposed to COVID-19 and develop a fever
            and any symptoms, such as cough or difficulty breathing, call your
            healthcare provider as soon as possible for medical advice.
          </p>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <Link
            to="covid-about"
            spy={true}
            smooth={true}
            offset={-200}
            duration={1000}
          >
            <Button className="btn-survey">Learn More</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
