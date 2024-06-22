// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import EventRegistrationForm from './EventRegistrationForm';
import JobApplicationForm from './JobApplicationForm';
import SurveyForm from './SurveyForm';
import './styles.css';
import NoPage from './NoPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/event-registration" element={<EventRegistrationForm />} />
                <Route path="/job-application" element={<JobApplicationForm />} />
                <Route path="/survey-form" element={<SurveyForm />} />
                <Route path="*" element={<NoPage/>}/>
            </Routes>
        </Router>
    );
};

export default App;
