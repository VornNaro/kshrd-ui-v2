import React from "react";
import ReactDOM from "react-dom";
import back from "../../icons/back.svg";
import { Link } from "react-router-dom";
import covid01 from "../../images/covid-01.png";
import DateTime from "./DateTime";
import RdoButton from "./RdoButton";
import { Button, Modal } from "react-bootstrap";
import img3 from "../../images/covid-03.png";
import img1 from "../../images/covid-001.png";
import img2 from "../../images/covid-result02.jpg";
import ResultSurvey from "./ResultSurvey";

export default class CovidSurvey extends React.Component {
  state = {
    showModal: false,
    data: [
      {
        id: 1,
        name: "Cough",
        value: 1,
        aw: null,
        selected: false,
        validate: false,
      },
      {
        id: 2,
        name: "Flu",
        value: 1,
        aw: null,
        selected: false,
        validate: false,
      },
      {
        id: 3,
        name: "Diarrhea",
        value: 1,
        aw: null,
        selected: false,
        validate: false,
      },
      {
        id: 4,
        name: "Sore throat",
        value: 1,
        aw: null,
        selected: false,
        validate: false,
      },

      {
        id: 5,
        name: "Fever",
        value: 1,
        aw: null,
        selected: false,
        validate: false,
      },
      {
        id: 6,
        name: "Headache",
        value: 1,
        aw: null,
        selected: false,
        validate: false,
      },
      {
        id: 7,
        name: "37.5 °C+",
        value: 1,
        aw: null,
        selected: false,
        validate: false,
      },
      {
        id: 8,
        name: "Shortness of breath",
        value: 2,
        aw: null,
        selected: false,
        validate: false,

      },
      {
        id: 9,
        name: "Tired",
        value: 2,
        aw: null,
        selected: false,
        validate: false,
      },
      {
        id: 10,
        name: "Been to a country that has high cases of cover-19",
        value: 3,
        aw: null,
        selected: false,
        validate: false,
      },
    ],

    resSurvey: [
      {
        image: img1,
        content: "You must have been too worried.",
      },
      {
        image: img2,
        content:
          "You might have been exposed to COVID‑19, quarantine yourself. The purpose of this practice is to separate yourself from others and restrict your movement while waiting to see if you become sick.",
      },
      {
        image: img3,
        content:
          "You have high risk of getting infected from covid-19 disease. Please stay home, self-isolate, monitor your symptoms and seek for doctor’s appointment immediately.",
      },
    ],
  };

  setAnswer = (aw, id) => {
    this.setState({
      data: [
        ...this.state.data.map((data) => {
          if (data.id === parseInt(id)) {
            data.aw = aw;
            data.selected = true
            data.validate = false
          }
          return data;
        }),
      ],
    });
  };

  onSubmit = () => {
    let validate = []
    this.state.data.map((data) => {
      if (data.selected === false) {
        validate.push(data.id)
      }
    });

    validate.map(d => {
      this.setState({
        data: [
          ...this.state.data.map((data) => {
            if (data.id === d) {
              data.validate = true
            }
            validate.unshift();
            return data;
          }),
        ],
      });
    })

    if (validate.length === 0) {
      this.setState({
        showModal: true,
      });

    }

  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  handleShow = () => {
    this.setState({
      showModal: true,
    });
  };

  render() {
    let score = [];

    this.state.data.filter((data) => {
      let aw = data.aw;
      if (aw !== null) {
        score.push(parseInt(aw));
      }
    });

    const totalScore = score.reduce((a, b) => {
      return a + b;
    }, 0);

    let result = null;

    if (totalScore < 5) {
      result = (
        <ResultSurvey totalScore={totalScore} data={this.state.resSurvey[0]} />
      );
    } else if (totalScore < 12) {
      result = (
        <ResultSurvey totalScore={totalScore} data={this.state.resSurvey[1]} />
      );
    } else {
      result = (
        <ResultSurvey totalScore={totalScore} data={this.state.resSurvey[2]} />
      );
    }

    return (
      <div className="cus-container">
        <div className="bg-white my-5 pb-5">
          {/* survey title */}
          <div className="survey-title text-center py-4">
            <div class="back-icon">
              <Link to="/covid-19">
                <img className="w-100 h-100" src={back} alt="back" />
              </Link>
            </div>

            <h2 className="m-0 covid-sv-title">Covid 19 survey form</h2>
            <h5 className="m-0 py-3">
              Now I am going to ask you some questions about Symptoms{" "}
            </h5>
          </div>

          {/* survey form */}
          <div className="survey-form">
            <div className="survey-container">
              <div class="row">
                <div class="col-lg-4 col-md-5">
                  <img className="w-100" src={covid01} alt="covid" />
                </div>

                <div className="col-lg-8 col-md-7">
                  <div className="form-survey">
                    <h6 className="font-weight-bold">
                      Date of first symptom onset
                    </h6>

                    <DateTime />

                    {this.state.data.map((data) => {
                      return (
                        <RdoButton setAnswer={this.setAnswer} data={data} />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mr-5">
            <Button onClick={this.onSubmit} className="btn-submit px-4">
              Submit
            </Button>
          </div>
        </div>

        {this.state.showModal &&
          ReactDOM.createPortal(
            <Modal size="lg" show={this.state.showModal}>
              <Modal.Body>
                {result}

                <div className="d-flex justify-content-end mr-3">
                  <Link to="/covid-19" className="btn-ok-modal">
                    OK
                  </Link>
                </div>
              </Modal.Body>
            </Modal>,
            document.getElementById("root")
          )}
      </div>
    );
  }
}
