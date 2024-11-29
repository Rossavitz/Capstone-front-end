import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
  const { currUser } = useContext(UserContext);
  const navigate = useNavigate();

  function currUserHome() {
    return (
      <div className="currUser-div">
        <p>Welcome back {currUser.username}!</p>
        <p>
          See your <Link to="/profile">favorites!</Link>
        </p>
      </div>
    );
  }

  function noCurrUserHome() {
    return (
      <div className="noCurrUser-div">
        <p>
          To get started: Create an account or log in to search and see full
          recipes.
        </p>

        <h3>
          Preview recipes <Link to={`/recipes`}> here!</Link>{" "}
        </h3>

        <button onClick={() => navigate("/login")}>Log in</button>
        <button onClick={() => navigate("/signup")}>Sign up</button>
      </div>
    );
  }
  return (
    <div className="homepage">
      <h1>Ross' Recipes</h1>
      <h4>A collection of an answers to the question: "What's for dinner?"</h4>
      {currUser ? currUserHome() : noCurrUserHome()}
    </div>
  );
}

export default Homepage;
