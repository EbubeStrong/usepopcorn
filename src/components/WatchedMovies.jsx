import PropTypes from "prop-types";
const WatchedMovies = ({ movie }) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
};

WatchedMovies.propTypes = {
  movie: PropTypes.shape({
    Poster: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
    imdbRating: PropTypes.string.isRequired,
    userRating: PropTypes.string.isRequired,
    runtime: PropTypes.string.isRequired,
  }).isRequired,
};

export default WatchedMovies;
