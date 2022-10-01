import React from "react";
//import "./Error.css";

const Error404 = () => {
  return (
    <>
      <div className="container2">
        <div>
          <p>ERROR 404!</p>
        </div>
        <div>
          <p>¡Algo salió mal!</p>
        </div>
        <button
          className="getback"
          onClick={() => window.location.replace("/home")}
        >
          Regresar al inicio
        </button>
      </div>
    </>
  );
};

export default Error404;
