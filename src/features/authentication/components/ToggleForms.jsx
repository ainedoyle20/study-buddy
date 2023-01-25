import "./Auth.scss";

const ToggleForms = ({ showLogin, setShowLogin }) => {

  return (
    <div className="toggle_auth_forms_container">
      <span 
        className={`toggle_login_form_button ${showLogin ? "active_toggle_login_form_button" : ""}`} 
        onClick={() => setShowLogin(true)}
      >
        Login
      </span>
      <span 
        className={`toggle_register_form_button ${!showLogin ? "active_toggle_register_form_button" : ""}`}
        onClick={() => setShowLogin(false)}
      >
        Register
      </span>
    </div>
  );
}

export default ToggleForms;
