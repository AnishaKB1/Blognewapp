// View.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import './View.css';
import Topbar from '../../Components/Topbar/Topbar';
import axiosInstance from '../../axiosinterceptor';

const View = () => {
  const [cardData, setData] = useState([]);

  useEffect(() => {
    fetchPost();
  }, []);

  function fetchPost() {
    axiosInstance.get('http://localhost:3000/blog').then((res) => {
      setData(res.data);
    });
  }

  return (
    <>
      <Topbar />
      <div className="view-container">
        {cardData.map((val, i) => (
          <Card key={i} className="post-card">
            <CardMedia className="post-image" image={val.imageurl} title={val.title} />
            <CardContent className="post-content">
              <div className="post-header">
                <Typography variant="subtitle2" className='post-headertitle' sx={{ fontSize: '20px' }}>
                {val.user ? val.user.name : 'Unknown User'}
                </Typography>
                <Typography variant="caption" className='date'> {new Date(val.createdAt).toDateString()}</Typography>
              </div>
              <Typography gutterBottom className="post-title"  variant="h5" component={Link} to={`/singlepost/${val.postId}`}>
                {val.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="post-description"  sx={{ lineHeight: '1.9' ,fontFamily:"Varela Round, sans-serif",marginTop:'10px'}}>
                {val.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default View;
