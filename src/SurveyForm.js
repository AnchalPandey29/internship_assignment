
import React, { useState, useEffect } from 'react';
import useForm from './useForm';
import axios from 'axios';

const validate = (values) => {
    const errors = {};
    if (!values.fullName) errors.fullName = 'Full Name is required';
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.surveyTopic) errors.surveyTopic = 'Survey Topic is required';

    if (values.surveyTopic === 'Technology') {
        if (!values.favoriteLanguage) errors.favoriteLanguage = 'Favorite Programming Language is required';
        if (!values.yearsOfExperience) errors.yearsOfExperience = 'Years of Experience is required';
    }
    if (values.surveyTopic === 'Health') {
        if (!values.exerciseFrequency) errors.exerciseFrequency = 'Exercise Frequency is required';
        if (!values.dietPreference) errors.dietPreference = 'Diet Preference is required';
    }
    if (values.surveyTopic === 'Education') {
        if (!values.highestQualification) errors.highestQualification = 'Highest Qualification is required';
        if (!values.fieldOfStudy) errors.fieldOfStudy = 'Field of Study is required';
    }
    if (!values.feedback) {
        errors.feedback = 'Feedback is required';
    } else if (values.feedback.length < 50) {
        errors.feedback = 'Feedback must be at least 50 characters';
    }
    return errors;
};

const SurveyForm = () => {
    const initialValues = {
        fullName: '',
        email: '',
        surveyTopic: '',
        favoriteLanguage: '',
        yearsOfExperience: '',
        exerciseFrequency: '',
        dietPreference: '',
        highestQualification: '',
        fieldOfStudy: '',
        feedback: '',
    };

    const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validate);

    const [additionalQuestions, setAdditionalQuestions] = useState([]);

    useEffect(() => {
        if (values.surveyTopic) {
            fetchAdditionalQuestions(values.surveyTopic);
        }
    }, [values.surveyTopic]);

    const fetchAdditionalQuestions = async (topic) => {
        try {
            const response = await axios.get(`https://api.example.com/questions?topic=${topic}`);
            setAdditionalQuestions(response.data);
        } catch (error) {
            console.error("Error fetching additional questions", error);
        }
    };

    return (
        <div className='form-container'>
         <h2>Survey Form</h2>

            <form onSubmit={handleSubmit}>
            <div>
                <label>Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                />
                {errors.fullName && <p>{errors.fullName}</p>}
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label>Survey Topic</label>
                <select name="surveyTopic" value={values.surveyTopic} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                </select>
                {errors.surveyTopic && <p>{errors.surveyTopic}</p>}
            </div>
            {values.surveyTopic === 'Technology' && (
                <>
                    <div>
                        <label>Favorite Programming Language</label>
                        <select name="favoriteLanguage" value={values.favoriteLanguage} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                            <option value="Java">Java</option>
                            <option value="C#">C#</option>
                        </select>
                        {errors.favoriteLanguage && <p>{errors.favoriteLanguage}</p>}
                    </div>
                    <div>
                        <label>Years of Experience</label>
                        <input
                            type="number"
                            name="yearsOfExperience"
                            value={values.yearsOfExperience}
                            onChange={handleChange}
                        />
                        {errors.yearsOfExperience && <p>{errors.yearsOfExperience}</p>}
                    </div>
                </>
            )}
            {values.surveyTopic === 'Health' && (
                <>
                    <div>
                        <label>Exercise Frequency</label>
                        <select name="exerciseFrequency" value={values.exerciseFrequency} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Rarely">Rarely</option>
                        </select>
                        {errors.exerciseFrequency && <p>{errors.exerciseFrequency}</p>}
                    </div>
                    <div>
                        <label>Diet Preference</label>
                        <select name="dietPreference" value={values.dietPreference} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                        </select>
                        {errors.dietPreference && <p>{errors.dietPreference}</p>}
                    </div>
                </>
            )}
            {values.surveyTopic === 'Education' && (
                <>
                    <div>
                        <label>Highest Qualification</label>
                        <select name="highestQualification" value={values.highestQualification} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="High School">High School</option>
                            <option value="Bachelor's">Bachelor's</option>
                            <option value="Master's">Master's</option>
                            <option value="PhD">PhD</option>
                        </select>
                        {errors.highestQualification && <p>{errors.highestQualification}</p>}
                    </div>
                    <div>
                        <label>Field of Study</label>
                        <input
                            type="text"
                            name="fieldOfStudy"
                            value={values.fieldOfStudy}
                            onChange={handleChange}
                        />
                        {errors.fieldOfStudy && <p>{errors.fieldOfStudy}</p>}
                    </div>
                </>
            )}
            <div>
                <label>Feedback</label>
                <textarea
                    name="feedback"
                    value={values.feedback}
                    onChange={handleChange}
                />
                {errors.feedback && <p>{errors.feedback}</p>}
            </div>
            <button type="submit">Submit</button>
            {additionalQuestions.length > 0 && (
                <div>
                    <h3>Additional Questions:</h3>
                    {additionalQuestions.map((question, index) => (
                        <div key={index}>
                            <label>{question.question}</label>
                            <input type="text" name={`additionalQuestion_${index}`} onChange={handleChange} />
                        </div>
                    ))}
                </div>
            )}
        </form>
        </div>
    );
};

export default SurveyForm;
