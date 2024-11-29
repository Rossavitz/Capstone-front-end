import React, { useState, useEffect, useContext } from "react";
import RecipeApi from "../api";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const { currUser } = useContext(UserContext);
  const [favorite, setFavorite] = useState([]);

  useEffect(
    function getRecipeDetails() {
      getRecipe(id);

      //fetch all user favorites, push to arr as Set to prevent duplicates
      async function fetchFavorites() {
        try {
          let arr = [];
          const response = await RecipeApi.getFavorites(currUser.username);

          response.map(({ favorite_recipe_id }) =>
            arr.push(favorite_recipe_id)
          );
          let favIds = [...new Set(arr)];

          setFavorite(favIds);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
      fetchFavorites();
    },
    [id, currUser.username]
  );

  //api call to get details by specific recipe id
  async function getRecipe(id) {
    try {
      let response = await RecipeApi.getRecipeById(id);
      setRecipe(response);
    } catch (e) {
      console.error("Error: Couldn't get recipe", e);
    }
  }

  //format ingredient list
  let ingredients = recipe.ingredient_list || "";
  let list = ingredients.split(",");

  //api call to add favorite
  async function addFavorite(username, recipe_id) {
    recipe_id = id;
    username = currUser.username;
    await RecipeApi.addFavorite(username, recipe_id);
  }

  //api call to remove favorite
  async function removeFavorite(username, recipe_id) {
    recipe_id = id;
    username = currUser.username;
    await RecipeApi.removeFavorite(username, recipe_id);
  }

  //handle toggle of favorite
  const handleFavoriteToggle = () => {
    if (favorite.includes(parseInt(id))) {
      setFavorite([]);
      removeFavorite();
    } else {
      setFavorite(id);
      addFavorite();
    }
  };

  //check favorite array to see if includes recipe id for ternary operator.
  return (
    <div>
      <button onClick={handleFavoriteToggle}>
        {favorite.includes(parseInt(id)) ? "Remove Favorite" : "Add Favorite"}
        <FaHeart color={favorite.includes(parseInt(id)) ? "red" : "gray"} />
      </button>
      <h3>{recipe.recipe_title}</h3>
      <p>{recipe.recipe_description}</p>
      <ul>
        {" "}
        Ingredients:
        {list.map((l, index) => (
          <li key={index}>{l}</li>
        ))}
      </ul>
      <p>{recipe.recipe_instructions}</p>
      {currUser ? (
        currUser.isAdmin ? (
          <div>
            <Link className="RecipeCard card" to={`/recipes/update/${id}`}>
              <button>Update Recipe</button>
            </Link>
          </div>
        ) : null
      ) : null}
    </div>
  );
}

export default RecipeDetail;
