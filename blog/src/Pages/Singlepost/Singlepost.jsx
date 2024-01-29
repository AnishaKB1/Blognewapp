// Singlepost.js

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Singlepost.css';
import Topbar from '../../Components/Topbar/Topbar';
import axiosInstance from '../../axiosinterceptor';

const Singlepost = () => {
  const { postId } = useParams();
  const loggedUserId = sessionStorage.getItem('userid');

  const [post, setPost] = useState({});
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        if (postId) {
          const res = await axiosInstance.get(`http://localhost:3000/blog/posts/${postId}`);
          console.log('Fetched data:', res.data);
          setPost(res.data);
          setTitle(res.data.title);
          setDesc(res.data.desc);

          // Check if the logged-in user is authorized to edit/delete
          if (loggedUserId && res.data.user && loggedUserId === res.data.user._id) {
            setIsAuthorized(true);
          }
        }
      } catch (err) {
        console.error('Error fetching post:', err);
      }
    };

    getPost();
  }, [postId, loggedUserId]);

  const handleEdit = () => {
    window.location.replace(`/Write/${postId}`);
  };

  const deletePost = (id) => {
    axiosInstance
      .delete(`http://localhost:3000/blog/postdata/${id}`)
      .then((res) => {
        alert(res.data);
        window.location.replace('/View');
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <>
      <Topbar />
      <div className="singlePost">
        <div className="singlePostWrapper">
          {post.imageurl && (
            <img src={post.imageurl} alt="" className="singlePostImg" />
          )}

          <h1 className="singlePostTitle">
            {title}

            <div className="singlePostEdit">
              {isAuthorized && (
                <>
                  <i className="singlePostIcon far fa-edit" onClick={handleEdit}></i>
                  <i
                    className="singlePostIcon far fa-trash-alt"
                    onClick={() => deletePost(post._id)}
                  ></i>
                </>
              )}
            </div>
          </h1>

          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:
              <b> {post.user && post.user.name}</b>
            </span>
            <span className="singlePostDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>

          <p className="singlePostDesc">{post.description}</p>
        </div>
      </div>
    </>
  );
};

export default Singlepost;
