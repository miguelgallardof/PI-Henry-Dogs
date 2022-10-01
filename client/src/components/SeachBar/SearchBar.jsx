import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogsName } from "../../actions/index";
//import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const name = useSelector((state) => state.Dogs);
  function handleInputChange(e) {
    e.preventDefault();
    setInput(e.target.value);
  }
  function handleSubmit(e) {
    let nodogs = name.find(
      (el) => el.name?.toLowerCase() === input.trim()?.toLowerCase()
    );
    if (input.trim().length === 0) {
      setInput("");
      return alert("Ingrese el nombre de la raza en la barra de búsqueda.");
    } else if (!nodogs) {
      setInput("");
      return alert("No existe el perro solicitado.");
    } else if (input.length > 2) {
      e.preventDefault();
      dispatch(getDogsName(input));
      setInput("");
    } else {
      alert("El nombre de la raza debe tener al menos 3 caracteres.");
      setInput("");
    }
  }

  return (
    <>
      <div class="search">
        <input
          class="search"
          type="search"
          placeholder="Ingresa una raza"
          value={input}
          onChange={(e) => handleInputChange(e)}
        ></input>
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Buscar
        </button>
      </div>
    </>
  );
};
export default SearchBar;
