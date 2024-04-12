import React, { useState } from "react";
import userContext from "./helpers/userContext";
import { useContext } from "react";

/**
 * Profile: A profile edit form for users to edit first name, last name, and email
 *
 * state: formData
 *
 * props: edit function
 *
 * App -> RoutesList -> {..., Profile} -> Alert
 *
 */


function Profile({ edit }) {

    const currUser = useContext(userContext);
    console.log("Profile currUser:", currUser);

    const { username, firstName, lastName, email } = currUser.data;

    const [formData, setFormData] = useState({ username, firstName, lastName, email });


    /** Updating the formData in state depending on user input */

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value,
        }));
    }

    /** Calls parent function to update parent's state with form data */

    function handleSubmit(evt) {
        evt.preventDefault();
        edit(formData);
        setFormData({ firstName, lastName, email });
    }

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label htmlFor="Edit-username">Username</label>
                <input disabled
                    id="Edit-username"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    value={currUser.data.username}
                    aria-label="Username"
                />
            </div>

            <br />

            <div>
                <label htmlFor="Edit-firstName">First Name</label>
                <input
                    id="Edit-firstName"
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
                <label htmlFor="Edit-lastName">Last Name</label>
                <input
                    id="Edit-lastName"
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
                <label htmlFor="Edit-email">Email</label>
                <input
                    id="Edit-email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                    aria-label="Email"
                />
            </div>

            <br />

            <button>Save Changes!</button>
        </form>
    );
}

export default Profile;