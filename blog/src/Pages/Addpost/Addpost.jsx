import React, { useState } from 'react';
import './Addpost.css';

const Addpost = () => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleImageInputChange = (event) => {
    setNewImageUrl(event.target.value);
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() !== '') {
      setImageUrls([...imageUrls, newImageUrl]);
      setNewImageUrl('');
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls.splice(index, 1);
    setImageUrls(updatedImageUrls);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic for handling form submission
  };

  return (
    <div className="write">
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            className="writeInput"
            placeholder="Add image URL"
            type="text"
            value={newImageUrl}
            onChange={handleImageInputChange}
          />
          <button type="button" onClick={handleAddImage} className="writeIcon">
            Add Image
          </button>
        </div>
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="writeFormGroup">
            <img className="uploadedImage" src={imageUrl} alt={`Image ${index + 1}`} />
            <button
              type="button"
              onClick={() => handleDeleteImage(index)}
              className="deleteIcon"
            >
              Delete
            </button>
          </div>
        ))}
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Addpost;
