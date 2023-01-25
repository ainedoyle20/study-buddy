import {useState} from 'react';
import {TfiEmail} from "react-icons/tfi";
import {RiLockPasswordLine} from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

import "./Auth.scss";

const Register = () => {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({email: "", password: "", confirmPassword: ""});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setRegisterInfo({ ...registerInfo, [name]: value });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setRegisterInfo({email: "", password: "", confirmPassword: ""});

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
          value={registerInfo.email}
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
          value={registerInfo.password}
          onChange={(e) => handleOnChange(e)}
          placeholder="Password"
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
          name="confirmPassword"
          value={registerInfo.confirmPassword}
          onChange={(e) => handleOnChange(e)}
          placeholder="Confirm Password"
          required
        />
      </div>

      <button type="submit" className='auth_form_submit_button'>Register</button>
    </form>
  );
}

export default Register;
