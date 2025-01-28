import PropTypes from "prop-types";
import Search from "./Search";

const Navbar = ({ movieLength, query, setQuery }) => {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <div className="search-container">
        <Search query={query} setQuery={(e) => setQuery(e.target.value)} />

        <p className="num-results">
          Found <strong>{movieLength ? movieLength : 0}</strong> results
        </p>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  movieLength: PropTypes.number,
  query: PropTypes.string,
  setQuery: PropTypes.func,
};

export default Navbar;
