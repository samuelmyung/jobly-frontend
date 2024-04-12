import { NavLink } from "react-router-dom";
import { useContext } from "react";
import userContext from "./helpers/userContext";
import "./NavBar.css";

/**
 * NavBar: Links to different components
 *
 * state: none
 *
 * props: none
 *
 * App -> NavBar
 *
 */


function NavBar({logoutUser}) {
    const currUser = useContext(userContext);

    /*
     *  data:
          {username: "testusername",
          password: "password",
          firstName: "Bob",
          lastName: "Last",
          email: "email@email.com"},
    */

    return (
        <nav className="NavBar">

            <NavLink to={"/"}>
                Jobly
            </NavLink>

            {currUser.data
                ? <div>
                    <NavLink to={"/companies"}>
                        Companies
                     </NavLink>

                    <NavLink to={"/jobs"}>
                        Jobs
                    </NavLink>

                    <NavLink to={"/profile"}>
                        Profile
                    </NavLink>

                    < NavLink onClick={logoutUser} >
                        Logout {currUser.data.username}
                    </NavLink></div>

                : <div>
                    < NavLink to={'/login'}> Login </NavLink>
                    < NavLink to={'/signup'}> Signup </NavLink>
                </div>
            }

        </nav>
    );
}

export default NavBar;