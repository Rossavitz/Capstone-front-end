import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./routes/Routes";
import NavBar from "./routes/NavBar";
import RecipeApi from "./api";
import { jwtDecode } from "jwt-decode";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./useLocalStorage";

export const TOKEN_STORAGE_ID = "recipe-token";

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(
    function getUserInfo() {
      async function getCurrUser() {
        if (token) {
          try {
            let { username } = jwtDecode(token);
            RecipeApi.token = token;
            let currUser = await RecipeApi.getCurrUser(username);
            setCurrUser(currUser);
          } catch (e) {
            console.log("app getuserinfo: problem loading", e);
            setCurrUser(null);
          }
        }
      }
      getCurrUser();
    },
    [token]
  );

  async function signup(formData) {
    try {
      let token = await RecipeApi.signup(formData);
      setToken(token);
    } catch (e) {
      console.error("Failed to sign up", e);
    }
  }

  async function login(data) {
    let token = await RecipeApi.login(data);
    setToken(token);
  }

  function logout() {
    setCurrUser(null);
    setToken(null);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currUser, setCurrUser }}>
          <NavBar logout={logout} />
          <RoutesList signup={signup} login={login} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
