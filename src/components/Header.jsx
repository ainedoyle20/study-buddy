import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiArrowBack } from "react-icons/bi";

import { logoutUser } from "../features/authentication/services/userSlice";

import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
  }

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
        <Link to="/my-decks" className={`${pathname === "/my-decks" ? "active_header_link" : ""} header_link`}>My Decks</Link>
        <Link to="public-decks" className={`${pathname === "/public-decks" ? "active_header_link" : ""} header_link`}>Public Decks</Link>
      </div>

      <span className="header_logout_btn" onClick={handleLogout}>
        Logout
      </span>
    </div>
  );
}

export default Header;
