import React, { useState } from "react";
import RecipeApi from "../api";
import { useNavigate } from "react-router-dom";
import "./DeleteRecipe.css";

function DeleteComponent({ id }) {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  let data = "data";

  //api call to delete recipe
  async function handleDelete(id) {
    try {
      await RecipeApi.deleteRecipe(id, data);
    } catch (e) {
      console.error("Couldn't delete recipe", e);
    }
  }

  //confirmation handler for delete function
  const handleConfirm = () => {
    handleDelete(id);
    setShowConfirmation(false);
    navigate("/recipes");
  };

  return (
    <div>
      <button onClick={() => setShowConfirmation(true)}>Delete Recipe</button>

      {showConfirmation && (
        <div className="confirmation-dialogue">
          <p>Are you sure you want to delete this recipe?</p>
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={() => setShowConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default DeleteComponent;
