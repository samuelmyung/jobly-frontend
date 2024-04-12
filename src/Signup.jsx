import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";


const SIGNUP_DEFAULT_DATA = { "username": "", "password": "", "firstName": "", "lastName": "", "email": "" };

/**
 * Signup: A signup form for new users to register
 *
 * state: formData, errors
 *
 * props: signupUser
 *
 * App -> RoutesList -> {..., SignUp} -> Alert
 *
 */

function Signup({ signupUser }) {

    const [formData, setFormData] = useState(SIGNUP_DEFAULT_DATA);
    const [errors, setErrors] = useState();
    const navigate = useNavigate();

    /** Updating the formData in state depending on user input */

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value,
        }));
    }

    /** Calls parent function to update parent's state with form data */

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await signupUser(formData);
        } catch (err) {
            setFormData(formData);
            setErrors(err);
            navigate('/signup');
            return
        }
        // TODO: send in extra argument with navigate to trigger alert on homepage. check that state in homepage and useEffect() to render alert
        navigate('/');
    }

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label htmlFor="Signup-username">Username</label>
                <input
                    id="Signup-username"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    onChange={handleChange}
                    value={formData.username}
                    aria-label="Username"
                />
            </div>

            <br />

            <div>
                <label htmlFor="Signup-password">Password</label>
                <input
                    id="Signup-password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                    aria-label="Password"
                />
            </div>

            <br />

            <div>
                <label htmlFor="Signup-firstName">First Name</label>
                <input
                    id="Signup-firstName"
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                    onChange={handleChange}
                    value={formData.firstName}
                    aria-label="First Name"
                />
            </div>

            <br />

            <div>
                <label htmlFor="Signup-lastName">Last Name</label>
                <input
                    id="Signup-lastName"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    onChange={handleChange}
                    value={formData.lastName}
                    aria-label="Last Name"
                />
            </div>

            <br />

            <div>
                <label htmlFor="Signup-email">Email</label>
                <input
                    id="Signup-email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                    aria-label="Email"
                />
            </div>

            <br />
            {/* errors.length && */}
            {errors?.length > 0
                ? <Alert messageData={{ text: errors, success: 'failure' }}/>
                : null}
            <button>Sign Up!</button>
        </form>
    );
}

export default Signup;