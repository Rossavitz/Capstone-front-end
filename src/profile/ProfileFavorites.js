import React, { useState, useEffect, useContext } from "react";
import RecipeApi from "../api";
import UserContext from "../auth/UserContext";
import RecipeCard from "../recipes/RecipeCard";
import "./ProfileFavorites.css";

const UserFavoritesComponent = () => {
  const [favorites, setFavorites] = useState([]);
  const { currUser } = useContext(UserContext);

  //retrieve list of current user favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await RecipeApi.getFavorites(currUser.username);
        setFavorites(response);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [currUser.username]);

  return (
    <div className="favorites-list">
      <h1>{currUser.username} favorites</h1>
      {favorites.map(({ favorite_recipe_id, title, tag, description }) => (
        <RecipeCard
          key={favorite_recipe_id}
          id={favorite_recipe_id}
          title={title}
          description={description}
          tag={tag}
        />
      ))}
    </div>
  );
};

export default UserFavoritesComponent;
