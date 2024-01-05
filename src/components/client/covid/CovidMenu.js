import React from "react";
import "./covidMenu.css";
import { Link } from "react-router-dom";

export default function CovidMenu() {
  return (
    <div className="container-fluid covid-navbar">
      <Link to="/covid-19" className="text-white text-center text-content">
        Update and helpful resources for community during COVID-19. Learn more
      </Link>
    </div>
  );
}
