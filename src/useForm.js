
import { useState } from 'react';

const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setValues({
            ...values,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            alert(JSON.stringify(values, null, 2));
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        setValues,  // Include setValues in the return object
    };
};

export default useForm;
