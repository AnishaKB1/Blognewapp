// Contact.js

import React, { useState } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS SDK
import './Contact.css';
import Topbar from '../../Components/Topbar/Topbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendEmail(formData);
      // You may want to reset the form after submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const sendEmail = async ({ name, email, message }) => {
    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your actual EmailJS credentials
    const serviceId = 'service_a407t2k';
    const templateId = 'template_hxwfknp';
    const userId = 'ID4fcTFjndsDNv5CU';

    const templateParams = {
      to_email: 'anishakk.b@gmail.com',
      from_name: name,
      from_email: email,
      message: message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, userId);
      console.log('Email sent successfully');
    } catch (error) {
      throw new Error('Error sending email:', error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="contact-container">
      
        <div className="contact-form">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
              />
            </div>
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <div className="contact-image">
          <img src="https://media.istockphoto.com/id/1201366590/photo/3d-communication-symbols-contact-info-symbols.jpg?s=612x612&w=0&k=20&c=QUSma-zDwXaWT6a9iSTvWebUkQVXd3cxd7pJpci0kE4=" alt="Contact Us" />
        </div>
      </div>
    </>
  );
};

export default Contact;
