import React from 'react';
import './Home.css';
import Topbar from '../../Components/Topbar/Topbar';
import Description from '../../Components/Description/Description';

const Home = () => {
  return (
    <>
    <Topbar/>
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Exress & Experience</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img
        className="headerImg"
        src="https://wallpaperaccess.com/full/1516408.jpg"
        alt=""
      />
    </div>
    <Description/>
    </>
  );
}

export default Home;
