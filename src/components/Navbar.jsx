import PropTypes from "prop-types";
import Search from "./Search"

const Navbar = ({movieList}) => {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
          </div>
          
          <Search />
          
      <p className="num-results">
        Found <strong>{movieList}</strong> results
      </p>
    </nav>
  );
};

Navbar.propTypes = {
  movieList: PropTypes.number
}

export default Navbar;
