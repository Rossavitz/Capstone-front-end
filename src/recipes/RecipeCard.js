import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./RecipeCard.css";
import UserContext from "../auth/UserContext";

function RecipeCard({ id, title, description, tag, search }) {
  const { currUser } = useContext(UserContext);
  let navigate = useNavigate();

  //search tag handler
  function handleClick(e) {
    e.preventDefault();
    search(tag);
  }

  //if no current user, click tag redirects to login
  function noCurrUserHandleClick(e) {
    navigate("/login");
  }

  return (
    <div className="card-body">
      <Link className="RecipeCard card" to={`/recipes/id/${id}`}>
        <h3>{title}</h3>
      </Link>
      <p>{description}</p>

      {currUser ? (
        <h5 className="link-style" onClick={handleClick}>
          #{tag}
        </h5>
      ) : (
        <h5 className="link-style" onClick={noCurrUserHandleClick}>
          #{tag}
        </h5>
      )}
    </div>
  );
}

export default RecipeCard;
