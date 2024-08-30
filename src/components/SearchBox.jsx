import React, { useEffect, useRef } from "react";
import useKey from "../hooks/useKey";

function SearchBox({ query, setQuery }) {
  const inputRef = useRef(null);

  useKey("Enter", () => {
    if (document.activeElement === inputRef.current) return;
    inputRef.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query ?? ""}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputRef}
    />
  );
}

export default SearchBox;
