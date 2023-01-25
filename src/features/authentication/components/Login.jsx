import { useState } from 'react';
import {TfiEmail} from "react-icons/tfi";
import {RiLockPasswordLine} from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

import "./Auth.scss";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo({ ...loginInfo, [name]: value });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setLoginInfo({ email: "", password: "" });

    navigate("/discover");
  }

  return (
    <form onSubmit={(e) => handleOnSubmit(e)} className="auth_form">
      <div className='auth_form_input_container'>
        <span className='auth_form_input_icon'>
          <TfiEmail />
        </span>
        <input 
          className='auth_form_input'
          type="email"
          name="email"
          value={loginInfo.email}
          onChange={(e) => handleOnChange(e)}
          placeholder="Email"
          required
        />
      </div>

      <div className='auth_form_input_container'>
        <span className='auth_form_input_icon'>
          <RiLockPasswordLine />
        </span>
        <input 
          className='auth_form_input'
          type="password"
          name="password"
          value={loginInfo.password}
          onChange={(e) => handleOnChange(e)}
          placeholder="Password"
          required
        />
      </div>

      <button type="submit" className='auth_form_submit_button'>Login</button>
    </form>
  );
}

export default Login;
