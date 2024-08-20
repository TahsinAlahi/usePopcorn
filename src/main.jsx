import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import StarRating from "./components/StarRating";
// import App from './App.jsx'
// import './index.css'

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <>
      <StarRating maxRating={5} onSetRating={setMovieRating} />
      <p>this movies is {movieRating} rated</p>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}

    <StarRating
      maxRating={5}
      message={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />

    {/* <Test /> */}
  </StrictMode>
);
