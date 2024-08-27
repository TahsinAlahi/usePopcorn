import React, { useState } from "react";

function SearchBox({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query === null ? "" : query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default SearchBox;
