import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import advance from "../../images/advance-s.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

export default function AdvancedTabsDescription() {
  return (
    <>
      <Tabs
        transition={false}
        className="tabs-menu"
        defaultActiveKey="description"
        id="uncontrolled-tab-example"
      >
        <Tab
          tabClassName="tabs-link"
          eventKey="description"
          title="DESCRIPTION"
        >
          <div className="p-4 row d-flex align-items-center">
            <div className="col-md-4">
              <img className="w-100" src={advance} alt="advanceImage" />
            </div>
            <div className="col-md-6">
              <p className="sample-description">
                Advanced course takes 4 months and performs team-based projects
                assigned by KSHRD Center.This course we focus on mobile
                developments such as Android, iOS, Hybrid(React Native), 
                Spring Framework advanced, and Devops.Advanced course takes 4 months
                and performs team-based projects assigned by KSHRD Center.
              </p>
            </div>
          </div>
        </Tab>

        <Tab tabClassName="tabs-link" eventKey="detail" title="DETAIL">
          <div className="course-detail">
            <ul>
              <li>
                <span className="icon-next">
                  <FontAwesomeIcon icon={faChevronCircleRight} />
                </span>
                Demand Survey from students
              </li>
              <li>
                <span className="icon-next">
                  <FontAwesomeIcon icon={faChevronCircleRight} />
                </span>
                Decide project topic
              </li>
              <li>
                <span className="icon-next">
                  <FontAwesomeIcon icon={faChevronCircleRight} />
                </span>
                Trainee Selection
              </li>
              <li>
                <span className="icon-next">
                  <FontAwesomeIcon icon={faChevronCircleRight} />
                </span>
                Customized Selection
              </li>
            </ul>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
