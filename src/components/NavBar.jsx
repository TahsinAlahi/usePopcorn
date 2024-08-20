import React from "react";
import Logo from "./Logo";
import SearchBox from "./SearchBox";

function NavBar({ children }) {
  // const [query, setQuery] = useState("");
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBox />
      {children}
    </nav>
  );
}

export default NavBar;
