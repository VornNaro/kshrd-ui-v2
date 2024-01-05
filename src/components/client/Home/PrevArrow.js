import React from "react";
import prevArrowIcon from "../../icons/prev-arrow.svg";

export default function PrevArrow(props) {
  const { onClick, top } = props;
  return (
    <span
      style={{
        cursor: "pointer",
        position: "absolute",
        left: 20,
        top: top,
        zIndex: 1
      }}
      onClick={onClick}
    >
      <img className="slide-icon" src={prevArrowIcon} alt="arrow icon" />
    </span>
  );
}
