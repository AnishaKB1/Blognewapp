import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import Topbar from '../Topbar/Topbar';
import axiosInstance from '../../axiosinterceptor';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phonenumber: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setValidationErrors({
      ...validationErrors,
      [e.target.name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const errors = {};
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.address) {
      errors.address = 'Address is required';
    }
    if (!formData.phonenumber) {
      errors.phonenumber = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phonenumber)) {
      errors.phonenumber = 'Invalid phone number format';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
        formData.password
      )
    ) {
      errors.password =
        'Password must contain at least 8 characters with one uppercase, one lowercase, one digit, and one special character';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    console.log('Form data:', formData);
    // You can also send the form data to a server or perform further actions here.
    axiosInstance.post('http://localhost:3000/sign/blogdata', formData).then((res) => {
      alert(res.data);
      navigate('/View');
    });
  };

  return (
    <>
      <Topbar />
      <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm">
          <input
            className="registerInput"
            type="text"
            placeholder="Enter your Name..."
            name="name"
            onChange={handleChange}
          />
          <br />
          <span className="error">{validationErrors.name}</span>

          <input
            className="registerInput"
            type="text"
            placeholder="Enter your Email..."
            name="email"
            onChange={handleChange}
          />
          <br />
          <span className="error">{validationErrors.email}</span>

          <input
            className="registerInput"
            type="text"
            placeholder="Enter your Address..."
            rows={4}
            name="address"
            onChange={handleChange}
          />
          <br />
          <span className="error">{validationErrors.address}</span>

          <input
            className="registerInput"
            type="text"
            placeholder="Enter your phone Number..."
            name="phonenumber"
            onChange={handleChange}
          />
          <br />
          <span className="error">{validationErrors.phonenumber}</span>

          <input
            className="registerInput"
            type="password"
            placeholder="Enter your Password..."
            name="password"
            onChange={handleChange}
          />
          <br />
          <span className="error">{validationErrors.password}</span>

          <button className="registerButton" onClick={handleSubmit}>
            Register
          </button>
        </form>
        <button className="registerLoginButton">
          {' '}
          <Link to={'/login'} className="link">
            Login{' '}
          </Link>
        </button>
      </div>
    </>
  );
};

export default Register;
