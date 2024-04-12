import React from "react";
import userContext from "./helpers/userContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

/**
 * HomePage: Displays the hero image/our homepage
 *
 * state: none
 *
 * props: none
 *
 * App -> RoutesList -> HomePage
 *
 */
function HomePage() {
    const currUser = useContext(userContext);
    return (
        <div>
            <h2>Jobly</h2>
            <br />
            <h4> All the jobs you could ever want </h4>
            <br />
            {currUser.data
                ? `Welcome ${currUser.data.username}`
                : <div>
                    <br />
                    <NavLink to={'/signup'}> Signup </NavLink>
                    <br />
                    <NavLink to={'/login'}> Login </NavLink>
                </div>}
        </div>);
}

export default HomePage;
