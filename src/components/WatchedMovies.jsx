import PropTypes from "prop-types";
// import StarRating from "../StarRating/StarRating"
const WatchedMovies = ({ movie, onRemoveMovie }) => {
  return (
    <div className="watched">
      <li key={movie.imdbId}>
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

        {/* <div></div> */}
      </li>
      <button
        // style={{ backgroundColor: "", color: "white" }}
        onClick={() => onRemoveMovie(movie.imdbId)}
      >
        ❌{" "}
      </button>
    </div>
  );
};

WatchedMovies.propTypes = {
  movie: PropTypes.shape({
    Poster: PropTypes.string,
    Title: PropTypes.string,
    imdbId: PropTypes.string,
    imdbRating: PropTypes.number,
    userRating: PropTypes.number,
    runtime: PropTypes.string,
  }),
  onRemoveMovie: PropTypes.func,
};

export default WatchedMovies;
