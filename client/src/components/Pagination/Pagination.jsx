import React from "react";
// import "./Pagination.css";

const Pagination = ({
  dogsPerPage,
  allDogs,
  next,
  prev,
  currentPage,
  firstPage,
  lastPage,
}) => {
  return (
    <nav className="paginado">
      <button className="botoncito" onClick={firstPage}>
        Primera página
      </button>
      <button disabled={currentPage == 1} className="botoncito" onClick={prev}>
        Anterior
      </button>
      <button
        className="botoncito"
        disabled={currentPage == Math.ceil(allDogs / dogsPerPage)}
        onClick={next}
      >
        Siguiente
      </button>
      <button class="botoncito" onClick={lastPage}>
        Última página
      </button>
      ))
    </nav>
  );
};

export default Pagination;
