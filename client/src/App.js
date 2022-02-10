import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { NavBar } from "./components";
import {
  CreateListing,
  EditListing,
  Home,
  Login,
  ShowPage,
  Profile,
  Register,
  Search,
} from "./pages";
import "./App.css";
import "./pages";
import { postLogOut } from "./helpers/requests";

export const UserContext = React.createContext(null);

const App = () => {
  const [username, setUsername] = useState();

  const providerValue = {
    username,
    setUsername,
  };

  const logOut = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("authTokens"));
      await postLogOut(tokens);
      localStorage.clear();
      setUsername(null);
    } catch (err) {
      console.warn(`Error logging out ${username}`);
    }
  };

  useEffect(() => {
    const storageEventHandler = () => {
      setUsername(localStorage.getItem("username") || null);
    };

    setUsername(localStorage.getItem("username") || null);
    window.addEventListener("storage", storageEventHandler);
  }, [setUsername]);

  function isAuthenticated() {
    const token = localStorage.getItem("authTokens");
    let authToken = JSON.parse(localStorage.getItem("authTokens"));

    if (authToken != null) {
      const refreshToken = authToken.refresh;
      try {
        jwt_decode(token);
        const { exp } = jwt_decode(refreshToken);

        if (new Date(Date.now() + 5000) - new Date(exp * 1000) > 0) {
          const here = async () => {
            let options = {
              method: "POST",
              body: JSON.stringify(
                JSON.parse(localStorage.getItem("authTokens"))
              ),
              headers: { "Content-type": "application/json" },
            };

            let data = await fetch(
              "http://127.0.0.1:8000/user/logout",
              options
            );
            await data.json();
            localStorage.clear();
          };
          here();

          return false;
        }
      } catch (err) {
        return false;
      }
      return true;
    }
  }

  // This will constantly check if the token is valid. If not, then it will sign out and clear the token
  setInterval(isAuthenticated, 100);

  return (
    <UserContext.Provider value={providerValue}>
      <div className="App">
        <NavBar username={username} logOut={logOut} />
        <Routes>
          <Route path="/create" element={<CreateListing />}></Route>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/update/:id" element={<EditListing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/view/:id" element={<ShowPage />}></Route>
          <Route path="/profile/:isCurrentUser" element={<Profile />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/search" element={<Search />}></Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;