import React, { useEffect, useRef } from "react";

function SearchBox({ query, setQuery }) {
  const inputRef = useRef("");

  useEffect(() => {
    function keydown(e) {
      if (document.activeElement === inputRef.current) return;
      if (e.key === "Enter") {
        inputRef.current.focus();
        setQuery("");
      }
    }

    document.addEventListener("keydown", keydown);

    return () => document.removeEventListener("keydown", keydown);
  }, [inputRef]);

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
