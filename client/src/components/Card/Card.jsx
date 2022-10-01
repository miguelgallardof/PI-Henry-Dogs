import React from "react";

export default function Card({ name, image, temperament, weight }) {
  return (
    <div>
      <h3>{name}</h3>
      <img scr={image} alt={`${name}`} width="200px" height="250px" />
      <h5 className="info">
        {(function (temperament) {
          if (typeof temperament === "string") {
            return temperament;
          }
          if (Array.isArray(temperament)) {
            let temps = temperament.map((el) => el.name);
            return temps.join(", ");
          }
        })(temperament)}
        <h5 className="info">Peso: {weight}</h5>
      </h5>
    </div>
  );
}
