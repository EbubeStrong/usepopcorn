import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import StarRating from "../StarRating/StarRating";

const API = "dfa7bd90";

const MovieDetails = ({ selectedId, onCloseMovie, onHandleAddMovie }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({
    Title: "",
    Year: "",
    Rated: "",
    Released: "",
    Runtime: "",
    Genre: "",
    Director: "",
    Writer: "",
    Actors: "",
    Plot: "",
  });

  const {
    Title: title,
    // Year: year,
    imdbRating: imdbRating,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    Director: director,
    Actors: actors,
    Plot: plot,
    Poster: poster,
  } = movie;

  const addMovie = () => { 
    const newWatchedMovie = {
      imdbId: selectedId,
      Title: title,
      // year,

      imdbRating: (imdbRating === "N/A") ? 0 : parseFloat(imdbRating),
      runtime: runtime,
      Poster: poster,
    }

    onHandleAddMovie(newWatchedMovie);
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API}&i=${selectedId}`
        );
        const data = await response.json();
        // console.log(data);
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, [selectedId]);
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

            <img src={poster} alt={`Poster of ${movie}`} />

            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating size={10} maxRating={10} />

              <button className="btn-add" onClick={addMovie}>+ Add to Watched list</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

MovieDetails.propTypes = {
  selectedId: PropTypes.string,
  onCloseMovie: PropTypes.func,
  onHandleAddMovie: PropTypes.func,
};

export default MovieDetails;
