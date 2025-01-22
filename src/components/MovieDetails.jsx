import PropTypes from "prop-types";

const MovieDetails = ({ selectedId, onClose }) => {
  return (
    <>
      <div>{selectedId}</div>
      <button className='btn-back' onClick={onClose}>&larr;</button>
    </>
  );
};

MovieDetails.propTypes = {
  selectedId: PropTypes.string,
  onClose: PropTypes.func,
};

export default MovieDetails;
