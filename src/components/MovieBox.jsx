import PropTypes from "prop-types";
import { useState } from "react";

const MovieBox = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className=" list list-movies box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && <ul className="list">{children}</ul>}
    </div>
  );
};

MovieBox.propTypes = {
  children: PropTypes.node.isRequired, // Children must be renderable and required
};

export default MovieBox;
