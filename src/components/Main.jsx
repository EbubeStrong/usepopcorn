/* eslint-disable */
import { useState } from "react";
import ListMovies from "./ListMovies";
import WatchedMovies from "./WatchedMovies";
import MovieBox from "./MovieBox";
import Summary from "./Summary";

const Main = ({ tempMovieData, tempWatchedData, average }) => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState(tempMovieData );
    const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

    const avgImdbRating =  average(watched.map((movie) => movie.imdbRating)) ;
  const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
    
  return (
    <main className="main">
      <MovieBox>
        {movies?.map((movie) => (
          <ListMovies movie={movie} key={movie.imdbID} />
        ))}
      </MovieBox>

      <MovieBox>
        <Summary  watched={watched} avgImdbRating={avgImdbRating} avgUserRating={avgUserRating} avgRuntime={avgRuntime} />
          {watched.map((movie) => (
            <WatchedMovies movie={movie} />
          ))}
      </MovieBox>
      {/* <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen1((open) => !open)}
        >
          {isOpen1 ? "–" : "+"}
        </button>
        {isOpen1 && (
          <ul className="list">
            {movies?.map((movie) => (
              <ListMovies movie={movie} key={movie.imdbID} />
            ))}
          </ul>
        )}
      </div> */}

      {/* <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen2((open) => !open)}
        >
          {isOpen2 ? "–" : "+"}
        </button>
        {isOpen2 && (
          <>
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

            <ul className="list">
              {watched.map((movie) => (
                <WatchedMovies movie={movie} />
              ))}
            </ul>
          </>
        )}
      </div> */}
    </main>
  );
};

export default Main;
