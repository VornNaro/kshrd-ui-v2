import React from "react";
import advice1 from "../../images/advice-1.jpg";
import advice2 from "../../images/advice-2.jpg";
import advice3 from "../../images/advice-3.jpg";
import advice4 from "../../images/advice-4.jpg";

export default function CovidAdvice() {
  return (
    <div>
      <div className="title-header flex-column mt-5">
        <h3>PREVENTION & ADVICE</h3>
        <p className="mt-3">
          There is currently no vaccine to prevent coronavirus disease 2019
          (COVID-19). The best way to prevent illness is to avoid being exposed
          to this virus. Stay aware of the latest information on the COVID-19
          outbreak, available on the WHO website and through your national and
          local public health authority.Protect yourself and others around you
          by knowing the facts and taking appropriate precautions. Follow advice
          provided by your local health authority.
        </p>
      </div>
      <div className="row mt-3">
        <div className="col-md-3 text-center advice-card">
          <div className="advice-image">
            <img src={advice1} alt="advice" />
          </div>
          <div className="advice-card-title">
            <h6>Wash your hands frequently</h6>
          </div>
          <div>
            <p>
              Regularly and thoroughly clean your hands with an alcohol-based
              hand rub or wash them with soap and water for at least 20 seconds.
            </p>
          </div>
        </div>
        <div className="col-md-3 text-center advice-card">
          <div className="advice-image">
            <img src={advice2} alt="advice" />
          </div>
          <div className="advice-card-title">
            <h6>Maintain social distancing</h6>
          </div>
          <div>
            <p>
              Maintain at least 1 metre (3 feet) distance between yourself &
              anyone who is coughing or sneezing. If you are too close, get
              chance to infected.
            </p>
          </div>
        </div>

        <div className="col-md-3 text-center advice-card">
          <div className="advice-image">
            <img src={advice3} alt="advice" />
          </div>
          <div className="advice-card-title">
            <h6>Avoid touching face</h6>
          </div>
          <div>
            <p>
              Hands touch many surfaces and can pick up viruses. So, hands can
              transfer the virus to your eyes, nose or mouth and can make you
              sick.
            </p>
          </div>
        </div>

        <div className="col-md-3 text-center advice-card">
          <div className="advice-image">
            <img src={advice4} alt="advice" />
          </div>
          <div className="advice-card-title">
            <h6>Practice respiratory hygiene</h6>
          </div>
          <div>
            <p>
              Maintain good respiratory hygiene as covering your mouth & nose
              with your bent elbow or tissue when cough or sneeze.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
