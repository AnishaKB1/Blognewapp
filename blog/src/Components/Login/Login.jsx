// Login.jsx
import React from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../axiosinterceptor';
import Topbar from '../Topbar/Topbar';
import { useUser } from '../../UserContext';


const Login = () => {
  const { loginUser } = useUser();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addHandler = (event) => {
    event.preventDefault();
    if (!user.email.trim() || !user.password.trim()) {
      alert('Email and password cannot be empty.');
    } else {
      axiosInstance
        .post('http://localhost:3000/sign/login', user)
        .then((res) => {
          console.log('Server response:', res);
          console.log('Response data:', res.data);
  
          if (res.status === 200 && res.data.message === 'success') {
            console.log('Response data:', res.data);
            sessionStorage.setItem('userid', res.data.userid);
      console.log(sessionStorage.getItem('userid'));
  
            alert(res.data.message);
            sessionStorage.setItem('userToken', res.data.token);
  
            loginUser();
            console.log('User logged in successfully!');
            navigate('/Write');
          } else {
            alert('Login failed. Please check your credentials.');
          }
        })
        .catch((error) => {
          console.error('Error during login:', error);
  
          if (error.response) {
            if (error.response.status === 401) {
              alert(error.response.data.message);
            } else {
              alert('An error occurred. Please try again later.');
            }
          } else {
            alert('An error occurred. Please try again later.');
          }
        });
    }
  };

  return (
    <>
      <Topbar />
      <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm">
          <input
            className="loginInput"
            type="text"
            placeholder="Enter your email..."
            name="email"
            onChange={inputHandler}
          />
          <br />
          <input
            className="loginInput"
            type="password"
            placeholder="Enter your password..."
            name="password"
            onChange={inputHandler}
          />
          <button className="loginButton" onClick={addHandler}>
            Login
          </button>
        </form>
        <button className="loginRegisterButton">
          <Link className="link" to={'/register'}>
            Register
          </Link>
        </button>
      </div>
    </>
  );
};

export default Login;
