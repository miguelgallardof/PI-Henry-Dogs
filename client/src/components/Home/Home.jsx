import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Hook que reemplaza a mapDispatchToProps, mapStateToProps
import { getDogs } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card/Card";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  return (
    <div>
      <Link to="/dog">Crear raza</Link>
      <h1>Henry Dogs</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar
      </button>
      <div>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select>
          <option value="All">Todos</option>
          <option value="created">Creados</option>
          <option value="api">Existentes</option>
        </select>
        {allDogs?.map((c) => {
          return (
            <fragment>
              <Link to={"/home" + c.id}>
                <Card
                  name={c.name}
                  image={c.image}
                  temperament={c.temperament}
                />
              </Link>
            </fragment>
          );
        })}
        {/*         {allDogs &&
          allDogs.map((el) => {
            <Card
              name={el.name}
              image={el.image}
              temperament={el.temperament}
            />;
          })} */}
      </div>
    </div>
  );
}
