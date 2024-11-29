import React, { useState, useEffect, useContext } from "react";
import Dropdown from "./DropdownSearch";
import RecipeApi from "../api";
import RecipeCard from "./RecipeCard";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";
import "./RecipeList.css";

function RecipesList() {
  const { currUser } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);

  //on mount, search, no tag is given, so all recipes returned.
  useEffect(function getRecipesList() {
    search();
  }, []);

  //search for recipes by tag. if no tag, returns all recipes. Passed to dropdown search, and recipe card.
  async function search(tag) {
    let recipes = await RecipeApi.getAllRecipes(tag);
    setRecipes(recipes);
  }

  return (
    <div className="RecipeList">
      <div className="search-add">
        {currUser ? (
          <div className="dropdown">
            <Dropdown search={search} />
          </div>
        ) : (
          <div className="dropdown-logout">
            <Link to={`/login`}>Log in</Link> or
            <Link to={`/signup`}> Sign up</Link> to search and see full recipes!
          </div>
        )}
        <div className="add-recipe-btn">
          {currUser ? (
            currUser.isAdmin ? (
              <div>
                <hr></hr>
                <h4>Add a recipe!</h4>
                <Link className="RecipeCard card" to={`/recipes/new`}>
                  <button>Add Recipe</button>
                </Link>
              </div>
            ) : null
          ) : null}
        </div>
      </div>
      <div className="RecipeCardList">
        <h3 className="Recipe-h3">Recipes:</h3>
        {recipes.map((r) => (
          <RecipeCard
            key={r.id}
            id={r.id}
            title={r.title}
            description={r.description}
            tag={r.tag}
            search={search}
          />
        ))}
      </div>
    </div>
  );
}

export default RecipesList;
