import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken"
import { BrowserRouter } from "react-router-dom";
//import "./styles/App.css";
import Nav from "./routes/Nav";
import Routes from "./routes/Routes";
//import LoadingSpinner from "./common/LoadingSpinner";
import PrepListApi from "./api/api";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./auth/UserContext";
export const TOKEN_STORAGE_ID = "preplist-token";


//PrepList App --//

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID)
  console.debug("App",
    "info loaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token);

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          PrepListApi.token = token;
          let currentUser = await PrepListApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch(err) {
          console.error("User Error", err);
          setCurrentUser(null);
        }
      };
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  //logout

  function logout() {
    setCurrentUser(null);
    setToken(null);
  };

  //Sign-Up

  async function signup(signupData) {
    try {
      let token = await PrepListApi.signup(signupData);
      setToken(token);
      return { success: true }
    } catch(err) {
      console.error("Failed.", err);
      return { success: false, err };
    }
  };

  async function login(loginData) {
    try {
      let token = await PrepListApi.login(loginData);
      setToken(token);
      setCurrentUser(loginData.username);
      return { success: true };
    } catch(err) {
      console.error("invalid login", err);
      return { success: false, err };
    }
  };

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser }}>
          <div className="App">
            <Nav logout={logout} />
            <Routes login={login} signup={signup} />
          </div>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App;
