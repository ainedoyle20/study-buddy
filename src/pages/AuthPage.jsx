import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../features/authentication/services/userSlice";

import { ToggleForms, Register, Login } from "../features/authentication/components";

import "./AuthPage.scss";

const AuthPage = () => {
  const navigate = useNavigate();
  const userDetails = useSelector(selectUserDetails);

  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (userDetails && Object.keys(userDetails).length) {
      navigate("/my-decks");
    }
  }, [userDetails]);

  return (
    <div className="auth_page">
      <div className="auth_page_landing_link_container">
        <Link to="/">
          <BiArrowBack />
        </Link>
      </div>

      <ToggleForms showLogin={showLogin} setShowLogin={setShowLogin} />

      {showLogin ? (
        <Login />
      ) : (
        <Register />
      )}
    </div>
  );
}

export default AuthPage;
