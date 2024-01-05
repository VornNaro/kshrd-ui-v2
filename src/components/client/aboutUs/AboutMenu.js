import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCommentDots,
  faHandshake,
  faEye
} from "@fortawesome/free-regular-svg-icons";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

export default function AboutMenu() {
  const data = [
    {
      name: "About Us",
      link: "",
      icon: <FontAwesomeIcon icon={faAddressCard} />
    },
    {
      name: "Director's Message",
      link: "/director-message",
      icon: <FontAwesomeIcon icon={faCommentDots} />
    },
    {
      name: "Our Vision",
      link: "/our-vision",
      icon: <FontAwesomeIcon icon={faEye} />
    },
    {
      name: "Our Courses",
      link: "/our-courses",
      icon: <FontAwesomeIcon icon={faLayerGroup} />
    },
    {
      name: "Our Partners",
      link: "/our-partners",
      icon: <FontAwesomeIcon icon={faHandshake} />
    }
  ];

  return (
    <div className="about-menu d-flex justify-content-center">
      <ul>
        {data.map((data, index) => {
          return (
            <li key={index}>
              <NavLink className="about-us-link" exact to={`/about-us${data.link}`}>
                <span className="py-2">{data.icon}</span>
                <span className="font-weight-bold"> {data.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
