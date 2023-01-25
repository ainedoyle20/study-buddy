import { useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import { ToggleForms, Register, Login } from "../features/authentication/components";

import "./AuthPage.scss";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

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
