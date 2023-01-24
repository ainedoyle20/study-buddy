import { Link, useLocation } from "react-router-dom";

import "./Header.scss";

const Header = () => {
  const { pathname } = useLocation();

  if (pathname === "/" || pathname === "/auth") {
    return null;
  }

  return (
    <div className="header_container">
      <div className="header_links_container">
        <Link to="/my-decks">My Decks</Link>
        <Link to="public-decks">Public Decks</Link>
      </div>
    </div>
  );
}

export default Header;
