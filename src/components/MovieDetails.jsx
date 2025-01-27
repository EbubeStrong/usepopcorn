import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import StarRating from "../StarRating/StarRating";

const API = import.meta.env.VITE_OMDB_API_KEY;

const MovieDetails = ({
  selectedId,
  onCloseMovie,
  onHandleAddMovie,
  watched,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [ setStoredRating] = useState(null);
  const [movie, setMovie] = useState({});

  const isWatched = watched?.some((movie) => movie.imdbId === selectedId);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API}&i=${selectedId}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [selectedId]);

  useEffect(() => {
    const selectedMovie = JSON.parse(localStorage.getItem(selectedId));
    if (selectedMovie) {
      setStoredRating(selectedMovie.userRating);
    }
  }, [selectedId, setStoredRating]);

  const imdbRating = movie.imdbRating === "N/A" ? 0 : Number(movie.imdbRating);
  const runtimeMinutes =
    movie.Runtime && movie.Runtime.includes(" ")
      ? movie.Runtime.split(" ")[0]
      : "0";

  const addMovie = () => {
    const newWatchedMovie = {
      imdbId: selectedId,
      Title: movie.Title,
      imdbRating,
      runtime: runtimeMinutes,
      Poster: movie.Poster,
      userRating,
    };

    onHandleAddMovie(newWatchedMovie);
    onCloseMovie();

    // Save to localStorage
    localStorage.setItem(selectedId, JSON.stringify(newWatchedMovie));
  };

  return (
    <div className="details">
      {isLoading ? (
        <h1 className="loader">Loading...</h1>
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              <i className="bx bx-left-arrow-alt"></i>
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {runtimeMinutes} min
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {isWatched ? (
                <p>You already rated this movie</p>
              ) : (
                <>
                  <StarRating
                    size={30}
                    maxRating={10}
                    handleSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={addMovie}>
                      + Add to Watched list
                    </button>
                  )}
                </>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>
                <em>{movie.Plot}</em>
              </p>
              <p>Starring {movie.Actors}</p>
              <p>Directed by {movie.Director}</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

MovieDetails.propTypes = {
  selectedId: PropTypes.string.isRequired,
  onCloseMovie: PropTypes.func.isRequired,
  onHandleAddMovie: PropTypes.func.isRequired,
  watched: PropTypes.array.isRequired,
};

export default MovieDetails;
