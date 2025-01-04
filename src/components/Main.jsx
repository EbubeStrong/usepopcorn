/* eslint-disable */
import { useState } from "react";
import ListMovies from "./ListMovies";
import WatchedMovies from "./WatchedMovies";
import MovieBox from "./MovieBox";
import Summary from "./Summary";

const Main = ({ tempMovieData, tempWatchedData, average }) => {
    // const [query, setQuery] = useState("");
    const [movies, setMovies] = useState(tempMovieData );
    const [watched, setWatched] = useState(tempWatchedData);

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
    
    </main>
  );
};

export default Main;
