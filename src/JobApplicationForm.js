// src/JobApplicationForm.js
import React from 'react';
import useForm from './useForm';
import './styles.css';

const validate = (values) => {
    const errors = {};
    if (!values.fullName) errors.fullName = 'Full Name is required';
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.phoneNumber) errors.phoneNumber = 'Phone Number is required';
    if (values.applyingFor === 'Developer' || values.applyingFor === 'Designer') {
        if (!values.relevantExperience) errors.relevantExperience = 'Relevant Experience is required';
    }
    if (values.applyingFor === 'Designer') {
        if (!values.portfolioURL) {
            errors.portfolioURL = 'Portfolio URL is required';
        } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.portfolioURL)) {
            errors.portfolioURL = 'Portfolio URL is invalid';
        }
    }
    if (values.applyingFor === 'Manager') {
        if (!values.managementExperience) errors.managementExperience = 'Management Experience is required';
    }
    if (values.additionalSkills.length === 0) {
        errors.additionalSkills = 'At least one skill must be selected';
    }
    if (!values.preferredInterviewTime) errors.preferredInterviewTime = 'Preferred Interview Time is required';
    return errors;
};

const JobApplicationForm = () => {
    const initialValues = {
        fullName: '',
        email: '',
        phoneNumber: '',
        applyingFor: '',
        relevantExperience: '',
        portfolioURL: '',
        managementExperience: '',
        additionalSkills: [],  // Initialize as an empty array
        preferredInterviewTime: '',
    };

    const { values, errors, handleChange, handleSubmit, setValues } = useForm(initialValues, validate);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setValues({
                ...values,
                additionalSkills: [...values.additionalSkills, name],
            });
        } else {
            setValues({
                ...values,
                additionalSkills: values.additionalSkills.filter((skill) => skill !== name),
            });
        }
    };

    return (
        <div className="form-container">
            <h2>Job Application Form</h2>
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
                <label>Phone Number</label>
                <input
                    type="number"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                />
                {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
            </div>
            <div>
                <label>Applying for Position</label>
                <select name="applyingFor" value={values.applyingFor} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Manager</option>
                </select>
                {errors.applyingFor && <p>{errors.applyingFor}</p>}
            </div>
            {(values.applyingFor === 'Developer' || values.applyingFor === 'Designer') && (
                <div>
                    <label>Relevant Experience (years)</label>
                    <input
                        type="number"
                        name="relevantExperience"
                        value={values.relevantExperience}
                        onChange={handleChange}
                    />
                    {errors.relevantExperience && <p>{errors.relevantExperience}</p>}
                </div>
            )}
            {values.applyingFor === 'Designer' && (
                <div>
                    <label>Portfolio URL</label>
                    <input
                        type="text"
                        name="portfolioURL"
                        value={values.portfolioURL}
                        onChange={handleChange}
                    />
                    {errors.portfolioURL && <p>{errors.portfolioURL}</p>}
                </div>
            )}
            {values.applyingFor === 'Manager' && (
                <div>
                    <label>Management Experience</label>
                    <textarea
                        name="managementExperience"
                        value={values.managementExperience}
                        onChange={handleChange}
                    />
                    {errors.managementExperience && <p>{errors.managementExperience}</p>}
                </div>
            )}
            <div style={{justifyContent:"flex-start"}}>
                <label>Additional Skills</label>
                <div>
                    
                        <input
                            type="checkbox"
                            name="JavaScript"
                            checked={values.additionalSkills.includes('JavaScript')}
                            onChange={handleCheckboxChange}
                        />
                        JavaScript
                        &nbsp;
                        &nbsp;
                        &nbsp;

                        <input
                            type="checkbox"
                            name="CSS"
                            checked={values.additionalSkills.includes('CSS')}
                            onChange={handleCheckboxChange}
                        />
                        CSS
                        &nbsp;
                        &nbsp;
                        &nbsp;

                        <input
                            
                            type="checkbox"
                            name="Python"
                            checked={values.additionalSkills.includes('Python')}
                            onChange={handleCheckboxChange}
                        />
                        Python
                        &nbsp;
                           
                    {/* Add more checkboxes as needed */}
                </div>
                {errors.additionalSkills && <p>{errors.additionalSkills}</p>}
            </div>
            <div>
                <label>Preferred Interview Time</label>
                <input
                    type="datetime-local"
                    name="preferredInterviewTime"
                    value={values.preferredInterviewTime}
                    onChange={handleChange}
                />
                {errors.preferredInterviewTime && <p>{errors.preferredInterviewTime}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

export default JobApplicationForm;
