/* eslint-disable */
import { useState, useEffect } from "react";
import ListMovies from "./ListMovies";
import WatchedMovies from "./WatchedMovies";
import MovieBox from "./MovieBox";
import Summary from "./Summary";

const API = 'dfa7bd90';

const Main = ({ tempMovieData, tempWatchedData, average }) => {
  // const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);

  // WAYS OF FETCHING DATA but the best is useEffect because, it makes codes to not run in infinite network loop and also it is a good practice to use it because it will run only during onmounted and unmounted

  useEffect(() => {
fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${API}&s=avengers`)
  .then((res) => res.json())
  .then((data) => {
    setMovies(data.Search) 
    console.log(data)
  });
  }, [])

  
// fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${API}&s=marvel`)
//   .then((res) => res.json())
//   .then((data) => console.log(data));


  // function movieSearch() {
// fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${API}&s=marvel`)
//   .then((res) => res.json())
//   .then((data) => console.log(data));
  // }
  // movieSearch()

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
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
        <Summary
          watched={watched}
          avgImdbRating={avgImdbRating}
          avgUserRating={avgUserRating}
          avgRuntime={avgRuntime}
        />

        {watched.map((movie) => (
          <WatchedMovies key={movie.imdbID} movie={movie} />
        ))}
      </MovieBox>
    </main>
  );
};

export default Main;
