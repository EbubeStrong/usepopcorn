/* eslint-disable */
import { useState, useEffect } from "react";
import ListMovies from "./ListMovies";
import WatchedMovies from "./WatchedMovies";
import MovieBox from "./MovieBox";
import Summary from "./Summary";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";

const API = "dfa7bd90";

const Main = ({ movies, setMovies, tempWatchedData, average, query }) => {
  // const [query, setQuery] = useState("");
  
  const [isLoading, setIsLoading] = useState(false); // Loading state for fetching movies.
  const [error, setError] = useState(""); // Error message state for handling fetch issues.
  const [watched, setWatched] = useState(tempWatchedData); // List of watched movies.

  const [selectedId, setSelectedId] = useState(null);

  function handleSelect(id) {
    setSelectedId(id);
  }

  // WAYS OF FETCHING DATA but the best is useEffect because it avoids infinite network loops and is a good practice since it runs only during component mount and unmount.

  // Using this method - useEffect()
  //   useEffect(() => {
  // fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${API}&s=avengers`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setMovies(data.Search)
  //     console.log(data)
  //   });
  //   }, [])

  // Or this method - fetch()
  // fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${API}&s=marvel`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  // Or this method - putting fetch inside a function
  // function movieSearch() {
  // fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${API}&s=marvel`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
  // }
  // movieSearch()

  // Or using async and await
  useEffect(() => {
    const movieSearch = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching.
        setError(""); // Clear previous errors before fetching.
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${API}&s=${query}`
        );

        // Throw an error if the response is not ok.
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();

        // Handle API-specific errors.
        if (data.Response === "False") throw new Error(data.Error);

        // Not good / correct logic
        // if (data.Search && data.Search.length < 3) {
        //   console.warn("Fewer than 3 results found.");
        //   // Optional: Handle the case where fewer results are found.

        //   setMovies(data.Search || []); // Set the movies, or empty array if none found.
        // }

        // correct / good logic
        // if (data.Search) {
        //   if (data.Search.length >= 3) {
        //      setMovies(data.Search);
        //   }
        //   else {
        //     setMovies([])
        //     setError("")
        // }
        // }

        // simplified and correct logic
        if (data.Search) {
          setMovies(data.Search.length >= 3 ? data.Search : []);
          setError(
            data.Search.length >= 3 ? "" : "Fewer than 3 results found."
          );
        }
      } catch (err) {
        console.error(err.message); // Log the error to the console.
        setError(err.message); // Update the error state.
      } finally {
        setIsLoading(false); // Set loading to false after fetching.
      }
    };

    if (query.trim() && query.length >= 3) {
      movieSearch();
    } else {
      setMovies([]);
      setError("");
    }
    // Fetch movies only if the query is not empty.
  }, [query]); // Dependency array ensures the effect runs when `query` changes.

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating)); // Calculate average IMDb rating.
  const avgUserRating = average(watched.map((movie) => movie.userRating)); // Calculate average user rating.
  const avgRuntime = average(watched.map((movie) => movie.runtime)); // Calculate average runtime.

  return (
    <main className="main">
      <>
        <MovieBox>
          {/* Instead of too much conditional rendering, you can do this */}
          {/* {isLoading ? (
          <h1 className="loader">Loading...</h1>
        ) : (
          movies?.map((movie) => (
            <ListMovies movie={movie} key={movie.imdbID} />
          ))
        )} */}

          {/* This 👇 */}
          {isLoading && <h1 className="loader">Loading...</h1>}
          {!isLoading && (
            <>
              {error ? (
                <ErrorMessage className="error" message={error} />
              ) : (
                movies?.map((movie) => (
                  <ListMovies
                    movie={movie}
                    key={movie.imdbID}
                    onSelectedId={handleSelect}
                  />
                ))
              )}
            </>
          )}
        </MovieBox>

        <MovieBox>
          {selectedId ? (
            <MovieDetails selectedId={selectedId} />
          ) : (
            <>
              <Summary
                watched={watched}
                avgImdbRating={avgImdbRating}
                avgUserRating={avgUserRating}
                avgRuntime={avgRuntime}
              />

              {watched.map((movie) => (
                <WatchedMovies key={movie.imdbID} movie={movie} />
              ))}
            </>
          )}
        </MovieBox>
      </>
    </main>
  );
};

export default Main;
