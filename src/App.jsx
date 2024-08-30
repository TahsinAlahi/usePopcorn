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
import useMovies from "./hooks/useMovies";
import useLocalStorageState from "./hooks/useLocalStorageState";

const KEY = "6b9c5145";

export default function App() {
  const [watched, setWatched] = useLocalStorageState([], "movie");
  const [query, setQuery] = useState(null);
  const [selectedID, setSelectedID] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

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
