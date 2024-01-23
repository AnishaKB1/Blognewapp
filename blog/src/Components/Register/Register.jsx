import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState();


  const handleChange = (e) => {
    
    setFormData({
      ...formData,[e.target.name]:e.target.value })
    }

  const handleSubmit = ( ) => {
   // e.preventDefault();
    console.log('Form data:', formData);
    // You can also send the form data to a server or perform further actions here.
      axios.post('http://localhost:3000/sign/blogdata',formData).then((res)=>{
        alert(res.data);
    navigate("/addpost")
  })
}

  return (
    <div className="register">
    <span className="registerTitle">Register</span>
    <form className="registerForm">
      
      <input className="registerInput" type="text" placeholder="Enter your Name..."   name='name'
          onChange={handleChange} />
          <br/>
     
      <input className="registerInput" type="text" placeholder="Enter your Email..." name='email'
           onChange={handleChange} />
           <br/>
      
      <input className="registerInput" type="text" placeholder="Enter your Address..." rows={4}   name='address'
           onChange={handleChange} />

           <br/>
           <input className="registerInput" type="text" placeholder="Enter your phone Number..." name='phonenumber'
           onChange={handleChange} />
           <br/>
      
           <input className="registerInput" type="password" placeholder="Enter your Password..." name='password'
           onChange={handleChange} />
           <br/>
      
      <button className="registerButton" onClick={handleSubmit}>Register</button>
    </form>
      <button className="registerLoginButton"> <Link to={'/'} className='link'>Login </Link></button>
  </div>
  );
}

export default Register;
