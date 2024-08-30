import React, { useEffect, useState } from "react";

const KEY = "6b9c5145";
function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);

        if (!query) return;

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
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

  return { movies, isLoading, error };
}

export default useMovies;
