// Write.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Write.css';
import Topbar from '../../Components/Topbar/Topbar';
import axios from 'axios';
import axiosInstance from '../../axiosinterceptor';

const Write = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: '',
    description: '',
    imageurl: '',
  });

  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        if (postId) {
          const res = await axiosInstance.get(`http://localhost:3000/blog/posts/${postId}`);
          console.log('Fetched data:', res.data);
          setPostData({
            title: res.data.title,
            description: res.data.desc,
            imageurl: res.data.imageurl,
          });
          setIsUpdate(true);
        }
      } catch (err) {
        console.error('Error fetching post data:', err);
      }
    };

    getPost();
  }, [postId]);

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if required fields are not empty
    if (!postData.title || !postData.description || !postData.imageurl) {
      alert('Title, description, and image URL cannot be empty.');
      return;
    }

    try {
      const token = sessionStorage.getItem('userToken');
      const userId = sessionStorage.getItem('userid');

      if (isUpdate) {
        await axiosInstance.put(
          `http://localhost:3000/blog/postdata/${postId}`,
          postData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert('Post Updated Successfully');
      } else {
        const response = await axiosInstance.post(
          `http://localhost:3000/blog/postdata?id=${userId}`,
          postData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert('Posted Successfully');
        navigate('/View');
      }

      setPostData({
        title: '',
        description: '',
        imageurl: '',
      });
    } catch (error) {
      console.error('Error posting/updating data:', error.message);
      alert('Error posting/updating data. Please try again.');
    }
  };

  return (
    <>
      <Topbar />
      <div className="write">
        <img
          className="writeImg"
          src="https://t4.ftcdn.net/jpg/06/50/81/45/240_F_650814582_zFpISpw6sQW8XgFfdfTgy725nNNFJmL2.jpg"
          alt=""
        />
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <input
              className="writeInput"
              placeholder="Title"
              type="text"
              name="title"
              value={postData.title}
              onChange={handleChange}
              autoFocus={true}
            />
          </div>
          <div className="writeFormGroup">
            <input
              className="writeInput writeText"
              placeholder="The Story begins here..."
              type="text"
              name="description"
              value={postData.description}
              onChange={handleChange}
            />
          </div>
          <div className="writeFormGroup">
            <input
              className="writeInput writeText"
              placeholder="Add your experiences by photos..."
              type="text"
              name="imageurl"
              value={postData.imageurl}
              onChange={handleChange}
            />
          </div>
          <button className="writeSubmit" type="submit">
            {isUpdate ? 'Update' : 'Publish'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Write;
