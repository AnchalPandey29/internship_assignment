// src/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <button onClick={() => navigate('/event-registration')}>Event Registration</button>
            <button onClick={() => navigate('/job-application')}>Job Application</button>
            <button onClick={() => navigate('/survey-form')}>Survey Form</button>
        </div>
    );
};

export default HomePage;
