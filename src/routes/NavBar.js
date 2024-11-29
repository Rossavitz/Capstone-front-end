import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./NavBar.css";

function NavBar({ logout }) {
  const { currUser } = useContext(UserContext);

  //Check for current user, if true, use this Navbar.
  function currUserNav() {
    return (
      <ul className="nav-bar-ul">
        <li>
          <Link to="/" onClick={logout}>
            Log out {currUser.username}
          </Link>
        </li>

        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/recipes">Recipes</NavLink>
        </li>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
    );
  }

  //Check for current user, if false, use this navbar
  function noCurrUserNav() {
    return (
      <ul className="nav-bar-ul">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
        <li>
          <NavLink to="/recipes">Recipes</NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="nav-bar-ul">
      {currUser ? currUserNav() : noCurrUserNav()}
    </nav>
  );
}

export default NavBar;
