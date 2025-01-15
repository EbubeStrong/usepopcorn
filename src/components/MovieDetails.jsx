import PropTypes from "prop-types";

const MovieDetails = ({selectedId}) => {
  return (
    <div>{selectedId}</div>
  )
}

MovieDetails.propTypes = {
  selectedId: PropTypes.func // Children must be renderable and required
};

export default MovieDetails