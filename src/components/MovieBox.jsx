import PropTypes from "prop-types";
import { useState } from "react";

const MovieBox = ({ children }) => {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && <ul className="list">{children}</ul>}
    </div>
  );
};

MovieBox.propTypes = {
  children: PropTypes.node.isRequired, // Children must be renderable and required
};

export default MovieBox;
