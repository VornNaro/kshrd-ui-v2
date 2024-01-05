import React from "react";
import nextArrowIcon from "../../icons/next-arrow.svg";

export default function NextArrow(props) {
  const { onClick, top } = props;
  return (
    <span
      style={{
        cursor: "pointer",
        position: "absolute",
        right: 20,
        top: top,
        zIndex: 1
      }}
      onClick={onClick}
    >
      <img className="slide-icon" src={nextArrowIcon} alt="arrow icon" />
    </span>
  );
}
