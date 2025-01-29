/* eslint-disable */
import { useState, useEffect } from "react";
import ListMovies from "./ListMovies";
import WatchedMovies from "./WatchedMovies";
import MovieBox from "./MovieBox";
import Summary from "./Summary";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";

const API = import.meta.env.VITE_OMDB_API_KEY;

if (!API) {
  console.error("OMDB API Key is missing! Check your .env file.");
}

const Main = ({ movies, setMovies, average, query }) => {
  // console.log("OMDB API Key:", API);

  const [isLoading, setIsLoading] = useState(false); // Loading state for fetching movies.
  const [error, setError] = useState(""); // Error message state for handling fetch issues.
  // const [watched, setWatched] = useState(tempWatchedData); // List of watched movies.
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useState(() => {
    const storedMovies = localStorage.getItem("watchedMovies");
    return storedMovies ? JSON.parse(storedMovies) : [];
  });

  // Save `watched` movies to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watched));
  }, [watched]);

  function handleSelect(id) {
    setSelectedId(selectedId === id ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddMovie(movies) {
    // Add a movie to the watched list.
    setWatched((watched) => [...watched, movies]);
  }

  // function handleAddMovie(movie) {
  //   // Prevent duplicate movies in the watched list
  //   setWatched((prev) =>
  //     prev.some((m) => m.imdbID === movie.imdbID) ? prev : [...prev, movie]
  //   );
  // }

  function handleRemoveMovie(id) {
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== id));
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
    const controller = new AbortController();
    const signal = controller.signal;

    const movieSearch = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching.
        setError(""); // Clear previous errors before fetching.

        const res = await fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=${API}&s=${query}`,
          { signal }
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

          setError(data.Search.length < 3 ? "Fewer than 3 results found." : "");
        }

        setError("");
      } catch (err) {
       if (err.name !== "AbortError") {
         console.error(err.message); // Log the error to the console.
         setError(err.message); // Update the error state.
       }
      } finally {
        setIsLoading(false); // Set loading to false after fetching.
      }
    };

    // if (query.trim() && query.length >= 3) {
    //   movieSearch();
    //   setError("Search input must have at least 3 characters");
    // } else {
    //   setMovies([]);
    //   setError("");
    // }

    if (!query.trim()) {
      setMovies([])
      setError("")
      return
    }

     if (query.length <= 3) {
       setMovies([]);
       setError("Search input must have at least 3 characters");
       return;
    }
    
     handleCloseMovie()
     movieSearch();


    // Cleanup function to abort the request if component unmounts
    return () => controller.abort();

    // Fetch movies only if the query is not empty.
  }, [query]); // Dependency array ensures the effect runs when `query` changes.

  // const avgImdbRating = average(watched.map((movie) => movie?.imdbRating || 0));

  const avgImdbRating = Number(
    average(watched.map((movie) => Number(movie?.imdbRating) || 0)).toFixed(1)
  );
  avgImdbRating === 0 ? 0 : avgImdbRating;

  // const avgImdbRating = average(watched.map((movie) => movie.imdbRating)); // Calculate average IMDb rating.
  const avgUserRating = average(watched.map((movie) => movie?.userRating)); // Calculate average user rating.
  // const avgRuntime = average(
  //   watched.map((movie) => movie?.runtime || 0)
  // ).toFixed(1); // Calculate average runtime.

  const avgRuntime = Number(
    average(watched.map((movie) => Number(movie?.runtime) || 0)).toFixed(1)
  );
  avgRuntime === 0 ? 0 : avgRuntime;

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
              ) : movies?.length > 0 ? (
                movies.map((movie) => (
                  <ListMovies
                    movie={movie}
                    key={movie.imdbID}
                    onSelectedId={handleSelect}
                  />
                ))
              ) : (
                <h1 style={{ margin: "50px 20px" }}>
                  Search for any movie in the search bar
                </h1>
              )}
            </>
          )}
        </MovieBox>

        <MovieBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onHandleAddMovie={handleAddMovie}
              watched={watched}
              setWatched={setWatched}
            />
          ) : (
            <>
              <Summary
                watched={watched}
                avgImdbRating={avgImdbRating}
                avgUserRating={avgUserRating}
                avgRuntime={avgRuntime}
              />

              {watched.map((movie) => (
                <WatchedMovies
                  key={movie.imdbID || movie.Title}
                  movie={movie}
                  onRemoveMovie={handleRemoveMovie}
                />
              ))}
            </>
          )}
        </MovieBox>
      </>
    </main>
  );
};

export default Main;
