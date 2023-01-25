import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import "./Header.scss";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (pathname === "/" || pathname === "/auth") {
    return null;
  }

  if (pathname !== "/my-decks" && pathname !== "/public-decks") {
    return (
      <div className="deck_details_header_container">
        <span className="deck_details_header_back_button_container" onClick={() => navigate(`/${pathname.split("/")[1]}`)}>
          <BiArrowBack />
        </span>
      </div>
    );
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
