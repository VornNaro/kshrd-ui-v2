import React from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

export default function CovidCard({ data }) {
  const [focus, setFocus] = React.useState(false);

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="covid-card-box">
          <div className="card-box h-100 shadow-sm">
            <div className="card-box-title">
              <CountUp
                start={focus ? null : 0}
                end={!data ? 0 : data.cases}
                separator=","
                duration={1.5}
                redraw={true}
              >
                {({ countUpRef }) => (
                  <VisibilitySensor
                    onChange={isVisible => {
                      if (isVisible) setFocus(true);
                    }}
                    delayedCall
                  >
                    <span ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
            </div>
            <div>
              <span>Confirmed Cases</span>
            </div>
            <div>
              <small className="text-muted">
                * Last updated: {new Date().toDateString()}
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="covid-card-box">
          <div className="card-box h-100 shadow-sm">
            <div className="card-box-title">
              <CountUp
                start={focus ? null : 0}
                end={!data ? 0 : data.recovered}
                separator=","
                duration={1.5}
                redraw={true}
              >
                {({ countUpRef }) => (
                  <VisibilitySensor
                    onChange={isVisible => {
                      if (isVisible) setFocus(true);
                    }}
                    delayedCall
                  >
                    <span ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
            </div>
            <div>
              <span>Recovered</span>
            </div>
            <div>
              <small className="text-muted">
                * Last updated: {new Date().toDateString()}
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="covid-card-box">
          <div className="card-box shadow-sm h-100">
            <div className="card-box-title">
              <CountUp
                start={focus ? null : 0}
                end={!data ? 0 : data.deaths}
                separator=","
                duration={1.5}
                redraw={true}
              >
                {({ countUpRef }) => (
                  <VisibilitySensor
                    onChange={isVisible => {
                      if (isVisible) setFocus(true);
                    }}
                    delayedCall
                  >
                    <span ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
            </div>
            <div>
              <span>Deaths</span>
            </div>
            <div>
              <small className="text-muted">
                * Last updated: {new Date().toDateString()}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
