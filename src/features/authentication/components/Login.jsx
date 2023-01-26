import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {TfiEmail} from "react-icons/tfi";
import {RiLockPasswordLine} from "react-icons/ri";

import { loginUser } from "../services/userSlice";

import "./Auth.scss";

const Login = () => {
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo({ ...loginInfo, [name]: value });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    dispatch(loginUser({ email, password }));

    setLoginInfo({ email: "", password: "" });
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
