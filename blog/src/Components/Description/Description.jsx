import React from "react";
import "./Description.css";
import blog from "../../Pages/images/blog.jpg";
import passion from "../../Pages/images/passion.jpg";
import connect from "../../Pages/images/connect.jpg";
import exposure from "../../Pages/images/exposure.jpg";
import educate from "../../Pages/images/educate.jpg";
import auth from "../../Pages/images/auth.jpg";
import learn from "../../Pages/images/learn.jpg";
import write from "../../Pages/images/write.jpg";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";



const Description = () => {
  const itemData = [
    {
      img: passion,
      title: "To share your passion",

      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: educate,
      title: "To educate others",
     
    },
    {
      img: exposure,
      title: "To gain exposure",
      
    },
    {
      img: auth,
      title: "To build authority",
      author: "@nolanissac",
      cols: 2,
    },
    {
      img: learn,
      title: "Learn new things",
      
      cols: 2,
    },
    {
      img: write,
      title: "Improve writing skill",
     
      rows: 2,
      cols: 2,
      featured: true,
    }
  ];
  return (
    <div>
      <div className="home-container">
        <div className="content-container">
          <div className="text-container">
            <h2 id="head">Start a Blog</h2>
            <p id="para">
              In the realm of ideas, where curiosity reigns, Agoos takes the
              lead, breaking knowledge chains. Embark on a journey, let words be
              your guide, Explore with us, where intellect and passion collide.
            </p>
            <div className="button-container">
              <button id="get-started-btn">Get Started</button>
            </div>
          </div>

          <div className="image-container">
            <img src={blog} alt="Internship" className="desc-image" />
          </div>
        </div>
      </div>

      <div className="content-container second-content-container">
        <div className="text-container">
          <h2 id="head">"Curate, Connect, Explore."</h2>
          <p id="para">
            Welcome to our digital sanctuary, where words dance and ideas
            flourish. We are more than storytellers; we are navigators of
            curiosity, architects of words. Journey with us through the art of
            expression and diverse perspectives. Our About Us page invites you
            to join a community fueled by passion for knowledge.
          </p>
          <div className="button-container">
            <button id="get-started-btn">Discover More</button>
          </div>
        </div>

        <div className="image-container">
          <img src={connect} alt="Internship" className="desc-image" />
        </div>
      </div>

      <div className="text-containerwonder">
        <h2 id="head">Unveiling Blogging's Wonders</h2>
      </div>

      <div className="image-list-container">
        <ImageList
          className="image-list"
          sx={{
            width: "70%",
            height: "50%",
            "@media (max-width: 768px)": {
              width: "90%",
            },
            "@media (max-width: 1000px)": {
              width: "100%", // Adjust for mobile view
            },
          }}
        >
          <ImageListItem key="Subheader" cols={2}></ImageListItem>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img className="imglist"
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar className="imglist"
                title={
                  <span  className='imgtitle'  >
                    {item.title}
                  </span>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export default Description;
