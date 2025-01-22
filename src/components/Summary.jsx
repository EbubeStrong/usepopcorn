import PropTypes from "prop-types";

const Summary = ({ watched, avgImdbRating, avgUserRating, avgRuntime }) => {
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

Summary.propTypes = {
  watched: PropTypes.arrayOf(PropTypes.object).isRequired, // Array of objects, required
  avgImdbRating: PropTypes.number.isRequired, // Number, required
  avgUserRating: PropTypes.number.isRequired, // Number, required
  avgRuntime: PropTypes.number.isRequired, // Number, required
};

export default Summary;