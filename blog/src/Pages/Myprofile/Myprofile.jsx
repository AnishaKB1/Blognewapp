// Myprofile.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosContact } from 'react-icons/io';
import axios from 'axios';
import './Myprofile.css';
import Topbar from '../../Components/Topbar/Topbar';
import axiosInstance from '../../axiosinterceptor';

const Myprofile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    address: '',
    phonenumber: '',
    password: '',
  });
  const userId = sessionStorage.getItem('userid');
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3000/sign/get/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const validateInputs = () => {
    const errors = {};
    if (!userData.name) {
      errors.name = 'Name is required';
    }
    if (!userData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!userData.address) {
      errors.address = 'Address is required';
    }
    if (!userData.phonenumber) {
      errors.phonenumber = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(userData.phonenumber)) {
      errors.phonenumber = 'Invalid phone number format';
    }
    if (!userData.password) {
      errors.password = 'Password is required';
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
        userData.password
      )
    ) {
      errors.password =
        'Password must contain at least 8 characters with one uppercase, one lowercase, one digit, and one special character';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async () => {
    try {
      if (!validateInputs()) {
        return; // Don't proceed if validation fails
      }

      console.log('Updating user data...', userData);
      const response = await axiosInstance.put(`http://localhost:3000/sign/blogdata/${userId}`, { ...userData });
      console.log('Update response:', response.data);

      // Show alert for successful update
      window.alert('Profile has been updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`http://localhost:3000/sign/blogdata/${userId}`);
      window.alert(`Profile for ${userData.name} has been deleted.`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <span className="settingsDeleteTitle" onClick={handleDelete}>
              Delete Account
            </span>
          </div>
          <form className="settingsForm">
            <div>
              <IoIosContact className="settingsPP" />
            </div>
            <label>Name</label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            <br />
            <span className="error">{validationErrors.name}</span>

            <label>Email</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <br />
            <span className="error">{validationErrors.email}</span>

            <label>Address</label>
            <input
              type="text"
              value={userData.address}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
            />
            <br />
            <span className="error">{validationErrors.address}</span>

            <label>Phone Number</label>
            <input
              type="text"
              value={userData.phonenumber}
              onChange={(e) => setUserData({ ...userData, phonenumber: e.target.value })}
            />
            <br />
            <span className="error">{validationErrors.phonenumber}</span>

            <label>Password</label>
            <input
              type="password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
            <br />
            <span className="error">{validationErrors.password}</span>

            <button className="settingsSubmit" type="button" onClick={handleUpdate}>
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Myprofile;
