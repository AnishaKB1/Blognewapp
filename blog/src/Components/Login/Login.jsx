import React from 'react';
import './Login.css';
import { Link , useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [user,setUser]=useState();
const navigate=useNavigate();


const inputHandler = (e) =>{
  setUser({...user,[e.target.name]:e.target.value})
}
const addHandler=()=>{
  axios.post('http://localhost:3000/sign/login',user).then((res)=>{
    alert(res.data);
    if(res.data.message=='success'){
      sessionStorage.setItem("userToken",res.data.token);
      navigate("/addpost")
    }
 
    

  })
  .catch((error) => {
    if (error.response && error.response.status === 401) {
        alert('Invalid credentials. Please try again.');
        setUser(' ');
    } else {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
        setUser(' ');
    }
});
  console.log(user)

}


  return (
    <div className="login">
    <span className="loginTitle">Login</span>
    <form className="loginForm">
      <label>Email</label>
      <input className="loginInput" type="text" placeholder="Enter your email..." name='email' onChange={inputHandler} />
      <label>Password</label>
      <input className="loginInput" type="password" placeholder="Enter your password..." name='password' onChange={inputHandler} />
      <button className="loginButton" onClick={addHandler}>Login</button>
    </form>
      <button className="loginRegisterButton" ><Link className='link' to={'/register'}>Register </Link></button>
  </div>
  );
}

export default Login;
