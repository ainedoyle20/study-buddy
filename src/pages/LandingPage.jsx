import Head from "../assets/study-head.svg";
import Brain from "../assets/study-brain.svg";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../features/authentication/services/userSlice";
import { useNavigate, Link } from "react-router-dom";

import Book from "../assets/study-book.svg";

import "./LandingPage.scss";

const LandingPage = () => {
  const navigate = useNavigate();
  const userDetails = useSelector(selectUserDetails);

  useEffect(() => {
    if (userDetails && Object.keys(userDetails).length) {
      navigate("/my-decks");
    }
  }, [userDetails]);

  return (
    <div className="landing_page_container">
      <div className="landing_page_auth_link">
        <Link to="/auth">Login / Register</Link>
      </div>

      <div className="landing_page_text_container">
        <h1>Study Buddy</h1>
      </div>

      <div className="landing_page_svgs_container">
        <div className="landing_page_top_svgs_container">
          <img src={Head} alt="" className="landing_page_svg landing_page_svg_head" />

          <img src={Brain} alt="" className="landing_page_svg landing_page_svg_brain" />
        </div>

        <div className="landing_page_bottom_svgs_container">
          <img src={Book} alt="" className="landing_page_svg" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage