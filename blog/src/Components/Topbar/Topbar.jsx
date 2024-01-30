import React, { useState,useEffect } from 'react';
import './Topbar.css';
import { Link } from 'react-router-dom';
import { IoIosContact } from "react-icons/io";
import { FaFacebookSquare, FaInstagramSquare, FaPinterestSquare, FaTwitterSquare } from "react-icons/fa";
import { useUser } from '../../UserContext';

const Topbar = () => {
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);
  const { user, logoutUser } = useUser();

  useEffect(() => {
    console.log('User state changed:', user);
  }, [user]);

  const handleMobileSidebarToggle = () => {
    setOpenMobileSidebar(!openMobileSidebar);
  };

  const handleSidebarItemClick = () => {
    setOpenMobileSidebar(false);
  };

  const handleLogout = () => {
    console.log('Before logout:', user);
  
    // Using the callback function of setUser to log the state after it's updated
    logoutUser(() => {
      console.log('After logout:', user);
      
    });
  };
  return (
    <div>
      {/* Desktop View */}
      <div className="desktop-topbar">
      <div className="topLeft">
  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
    <FaFacebookSquare className="topIcon" />
  </a>
  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
    <FaInstagramSquare className="topIcon" />
  </a>
  <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
    <FaPinterestSquare className="topIcon" />
  </a>
  <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
    <FaTwitterSquare className="topIcon" />
  </a>
</div>

        <div className="topCenter">
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/" onClick={handleSidebarItemClick}>
                HOME
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/About" >
                ABOUT
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/Contact" >
                CONTACT
              </Link>
            </li>
            {user.isAuthenticated && (
              <>
                <li className="topListItem">
                  <Link className="link" to="/Write">
                    WRITE
                  </Link>
                </li>
                <li className="topListItem">
                  <Link className="link" to="/View">
                    POSTS
                  </Link>
                </li>
                <li className="topListItem" >
                <Link className="link" to="/Logout" onClick={handleLogout}>
                    LOG OUT
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="topRight">
          {user.isAuthenticated && (
            <Link className="link" to="/Myprofile">
              <IoIosContact className="topImg" />
            </Link>
          )}
          {!user.isAuthenticated && (
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to="/login" onClick={handleSidebarItemClick}>
                  LOGIN
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/register" onClick={handleSidebarItemClick}>
                  REGISTER
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="mobile-topbar">
      <div className="mobile-icons">
  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
    <FaFacebookSquare className="topIcon" />
  </a>
  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
    <FaInstagramSquare className="topIcon" />
  </a>
  <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
    <FaPinterestSquare className="topIcon" />
  </a>
  <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
    <FaTwitterSquare className="topIcon" />
  </a>
</div>

        <div className="mobile-sidebar-toggle" onClick={handleMobileSidebarToggle}>
          {openMobileSidebar ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </div>
        {openMobileSidebar && (
          <aside className="mobile-sidebar">
            <div className="close-icon" onClick={handleMobileSidebarToggle}>
              <i className="fas fa-times"></i>
            </div>
            <ul className="sidebar-list">
              <li className="sidebar-list-item" onClick={handleSidebarItemClick}>
                <Link className="link" to="/">
                  HOME
                </Link>
              </li>
              <li className="sidebar-list-item" onClick={handleSidebarItemClick}>
                <Link className="link" to="/About">
                  ABOUT
                </Link>
              </li>
              <li className="sidebar-list-item" onClick={handleSidebarItemClick}>
                <Link className="link" to="/Contact">
                  CONTACT
                </Link>
              </li>
              {user.isAuthenticated ? (
                <>
                  <li className="sidebar-list-item" onClick={handleSidebarItemClick}>
                    <Link className="link" to="/Write">
                      WRITE
                    </Link>
                  </li>
                  <li className="sidebar-list-item" onClick={handleSidebarItemClick}>
                    <Link className="link" to="/View">
                      POSTS
                    </Link>
                  </li>
                  <li className="sidebar-list-item" onClick={handleSidebarItemClick}>
                    <Link className="link" to="/Myprofile">
                      MY PROFILE
                    </Link>
                  </li>
                  <li className="sidebar-list-item" >
                  <Link className="link" to="/Logout" onClick={handleLogout}>
                      LOG OUT
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="sidebar-list-item" onClick={handleSidebarItemClick}>
                    <Link className="link" to="/login">
                      LOGIN
                    </Link>
                  </li>
                  <li className="sidebar-list-item" onClick={handleSidebarItemClick}>
                    <Link className="link" to="/register">
                      REGISTER
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Topbar;
