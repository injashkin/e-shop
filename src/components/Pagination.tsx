import { useContext } from "react";
import { AppContext } from "../App";
import chevron2 from "../assets/chevron2.svg";

const Pagination = ({ paginate }) => {
  const { state } = useContext(AppContext);
  const totalProducts = state.products.length;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / state.productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      <li onClick={() => paginate("prev")}>
        <a href="#!">
          <img className="pagination__prev" src={chevron2} />
        </a>
      </li>
      {pageNumbers.map((number) => (
        <li
          className={`page-item ${
            number === state.currentPageCatalog ? "pagination__active" : ""
          }`}
          key={number}
        >
          <a href="#!" className="page-link" onClick={() => paginate(number)}>
            {number}
          </a>
        </li>
      ))}
      <li onClick={() => paginate("next")}>
        <a href="#!">
          <img className="pagination__next" src={chevron2} />
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
