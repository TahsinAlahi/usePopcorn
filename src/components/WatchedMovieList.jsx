import React from "react";
import WatchedList from "./WatchedList";

function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedList
          onDeleteWatched={onDeleteWatched}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
