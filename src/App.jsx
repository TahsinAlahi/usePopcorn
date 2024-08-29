import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import NumResults from "./components/NumResults";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummery from "./components/WatchedSummery";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import SearchBox from "./components/SearchBox";
import MovieDetails from "./components/MovieDetails";

const KEY = "6b9c5145";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState(null);
  const [selectedID, setSelectedID] = useState(null);

  function handleSelectedMovie(id) {
    // id === selectedID ? handleCloseMovie() : setSelectedID(id);
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }

  function handleAddWatched(movie) {
    // if (watched.some((watchedMovie) => watchedMovie.imdbID === movie.imdbID))
    //   return;
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeletedWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);

        if (!query) return;

        const res = await fetch(
          ` https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Something went wrong.");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
        setError("");
      }
    }

    if (query?.length < 4) {
      setMovies([]);
      setError("");
    }
    fetchData();

    return () => controller.abort();
  }, [query]);

  return (
    <>
      <NavBar>
        <SearchBox query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummery watched={watched} />
              <WatchedMovieList
                onDeleteWatched={handleDeletedWatched}
                watched={watched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
