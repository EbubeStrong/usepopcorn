/* eslint-disable */
import Search from "./Search"

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
          </div>
          
          <Search />
          
      <p className="num-results">
        Found <strong>X</strong> results
      </p>
    </nav>
  );
};

export default Navbar;
