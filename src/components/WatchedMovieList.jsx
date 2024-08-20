import React from "react";
import WatchedList from "./WatchedList";

function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedList movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
