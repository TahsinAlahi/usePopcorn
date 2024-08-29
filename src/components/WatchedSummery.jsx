import React from "react";

function WatchedSummery({ watched }) {
  const average = (arr) =>
    (arr.reduce((acc, cur) => acc + cur, 0) / arr.length).toFixed(1);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));

  const avgUserRating = average(watched.map((movie) => movie.userRating));

  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{!isNaN(avgImdbRating) ? avgImdbRating : "0.00"}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{!isNaN(avgUserRating) ? avgUserRating : "0.00"}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{!isNaN(avgRuntime) ? avgRuntime : "0"} min</span>
        </p>
      </div>
    </div>
  );
}

export default WatchedSummery;
