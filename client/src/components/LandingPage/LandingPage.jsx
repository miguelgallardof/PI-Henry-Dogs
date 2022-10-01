import React from "react";
import { Link } from "react-router-dom";
//import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="container">
      <h1 className="title">¡Bienvenidos a DOGHOUSE!</h1>
      <h3 className="subtitle">
        Aquí podrás encontrar todas las razas de perros, para que puedas ver
        cuál se adapta a tu hogar.
      </h3>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  );
}
