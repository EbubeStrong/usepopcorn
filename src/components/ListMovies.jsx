import PropTypes from "prop-types";

const ListMovies = ({ movie, onSelectedId }) => {
  return (
    <li onClick={() => onSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

ListMovies.propTypes = {
  movie: PropTypes.shape({
    Poster: PropTypes.string,
    Title: PropTypes.string,
    Year: PropTypes.string,
    imdbID: PropTypes.string,
  }).isRequired,
  onSelectedId: PropTypes.func,
};

export default ListMovies;
