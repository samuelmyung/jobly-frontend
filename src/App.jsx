import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './App.css';
import NavBar from './NavBar';
import RoutesList from './RoutesList';
import JoblyApi from "./helpers/api";
import userContext from "./helpers/userContext";

/**
 * App: Handles user auth and current user state
 *
 * state: currUser object like =>
 * {
 *  data:
      {username: "testusername",
      password: "password",
      firstName: "Bob",
      lastName: "Last",
      email: "email@email.com"},
 *  isLoading: true,
 *  errors: null
 * }
 *
 * currToken: unique token
 *
 * props: none
 *
 * App -> RoutesList
 *
 */

function App() {

  const [currUser, setCurrUser] = useState({});
  // TODO: use local storage to set initial state
  const [currToken, setCurrToken] = useState(localStorage.token);

  console.log("Our currUser:", currUser);
  // console.log("Our currToken:", currToken);
  // console.log('boolean', localStorage.token && !currToken)
  console.log('token in storage', localStorage.token)
  console.log('token in state', currToken)

  // if (localStorage.token && !currToken){
  //   console.log("conditional block entered")
  //   console.log("curr token", currToken)
  //   setCurrToken(localStorage.token);
  // }

  /** Function to register new user and update token */

  async function signup(formData) {
    const token = await JoblyApi.signUpUser(formData);
    setCurrToken(token);
    localStorage.setItem("token", token);
  }

  /** Function to login existing user, takes in username and password, make a call to the api and validates the formdata that
   * this is a real user. Sets current user and the current token */

  async function login(formData) {
    const token = await JoblyApi.login(formData);
    setCurrToken(token);
    localStorage.setItem("token", token);
  }

  /** Function to logout current user, resets the currUser and currToken */

  function logout() {
    localStorage.clear();
    setCurrToken("");
    setCurrUser({
      data: null,
      isLoading: false,
      errors: []
    })
  }

  /** Function to edit the currUser, make a call to the api and accepts username, fname, lname, email, and token to validate
   *  and update the user and resets currUser */
  async function edit(formData) {
    setCurrUser({
      data: await JoblyApi.editUser(formData),
      isLoading: false,
      errors: null
    });
  }

  /** UseEffect block to keep track of token changes and updates currUser accordingly */
  useEffect(function fetchUserFromToken() {
    console.log('!!!!!!!! token changed. new token is:', currToken)
    async function fetchUser() {
      try {
        const { username } = jwtDecode(currToken);
        console.log('username in useffect', username)
        JoblyApi.token = currToken
        console.log('jobly api token', JoblyApi.token)
        const userResult = await JoblyApi.getUser(username);
        setCurrUser({
          data: userResult,
          isLoading: false,
          errors: null
        });

      } catch (err) {
        setCurrUser({
          data: null,
          isLoading: false,
          errors: err
        });
      }
    }
    if (currToken) {
      fetchUser();
    }
  }, [currToken]);


  const authorizers = {
    signup,
    edit,
    login
  };

  return (
    <div className="App">
      <userContext.Provider value={currUser}>
        <BrowserRouter>
          <NavBar logoutUser={logout} />
          <RoutesList authorizers={authorizers} />
        </BrowserRouter>
      </ userContext.Provider >
    </div>
  );
};

export default App;
