import {useState} from 'react';
import { useDispatch } from 'react-redux';
import {TfiEmail} from "react-icons/tfi";
import {RiLockPasswordLine} from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { Oval } from 'react-loader-spinner';

import { registerUser } from "../services/userSlice";

import "./Auth.scss";

const Register = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({ userDisplayName: "", email: "", password: "", confirmPassword: ""});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setRegisterInfo({ ...registerInfo, [name]: value });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { userDisplayName, email, password, confirmPassword} = registerInfo;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (userDisplayName && email && password) {
      dispatch(registerUser({ userDisplayName, email, password }))
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    setRegisterInfo({ userDisplayName: "", email: "", password: "", confirmPassword: ""});
  }

  return (
    <form onSubmit={(e) => handleOnSubmit(e)} className="auth_form">
      <div className='auth_form_input_container'>
        <span className='auth_form_input_icon'>
          <VscAccount />
        </span>
        <input 
          className='auth_form_input'
          type="text"
          name="userDisplayName"
          value={registerInfo.userDisplayName}
          onChange={(e) => handleOnChange(e)}
          placeholder="Display Name"
          required
        />
      </div>

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

      <button disabled={loading} type="submit" className='auth_form_submit_button'>
        {loading 
          ? <span className='auth_form_submit_button_loader'>
              <Oval
                height={20}
                width={20}
                color="#ffffff"
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#ffffff"
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            </span>
          : "Register"
        }
      </button>
    </form>
  );
}

export default Register;
