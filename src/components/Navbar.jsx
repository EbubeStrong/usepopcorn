import PropTypes from "prop-types";
import Search from "./Search"

const Navbar = ({queryLength, query, setQuery  }) => {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
          </div>
          
          <Search query={query} setQuery={(e) => setQuery(e.target.value)} />
          
      <p className="num-results">
        Found <strong>{queryLength}</strong> results
      </p>
    </nav>
  );
};

Navbar.propTypes = {
  queryLength: PropTypes.number,
  query: PropTypes.string,
  setQuery: PropTypes.func
}

export default Navbar;
