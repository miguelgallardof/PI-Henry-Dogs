import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Nav from "../Nav/nav.jsx";
//import gif from "../../../img/GIFCARGA.gif";
import "./Detail.css";
const Detail = () => {
  const [dog, setDog] = useState({});
  let { name } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3001/dogs/${name}`)
      .then((response) => response.json())
      .then((response) => setDog(response))
      .catch((error) => {
        window.location.replace("/*");
      });
  }, []);
  const dispatch = useDispatch();

  return (
    <>
      <div className="detail">
        <Nav />
        <div
          className="loading"
          style={!dog.name ? { display: "block" } : { display: "none" }}
        >
          <p> ¡Cargando!</p>
          {/* <img src={gif} alt="Cargando" height="300" width="300"></img> */}
        </div>
        <div style={dog.name ? { display: "block" } : { display: "none" }}>
          <div className="detail2">
            <img
              src={dog.image?.url}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://cdn.com.do/wp-content/uploads/2016/08/PERRO-CHINA.jpg";
              }}
              alt="Perro no encontrado"
            ></img>
            <div>Nombre: {dog.name}</div>
            <div>Años de vida: {dog.life_span} años</div>
            <div>Peso: {dog.weight?.metric} Kg.</div>
            <div>Altura: {dog.height?.metric} Cm.</div>
            <div>Temperamentos: {dog.temperament?.map((el) => el.name)}</div>
            <div>Origen: {dog.origin ? dog.origin : "Unknown"}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
