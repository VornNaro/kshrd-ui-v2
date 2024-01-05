import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

export default function BasicDetail() {
  return (
    <div className="course-detail">
      <ul>
        <li>
          <span className="icon-next">
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </span>
          Course duration is 5 months
        </li>
        <li>
          <span className="icon-next">
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </span>
          Training 8 hours a day from 8am to 5pm
        </li>
        <li>
          <span className="icon-next">
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </span>
          Subjects are Java programming, Database, and Web development
        </li>
        <li>
          <span className="icon-next">
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </span>
          Topics are given for students do their own research.
        </li>
      </ul>
    </div>
  );
}
