import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeApi from "../api";

const AddRecipeForm = () => {
  const [ingredients, setIngredients] = useState([
    {
      name: "",
      quantity: "",
      unit: "",
    },
  ]);

  const navigate = useNavigate();
  const INITIAL_STATE = {
    title: "",
    description: "",
    tag: "",
    instructions: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  //api call to add recipe w/ data
  async function addRecipe(data) {
    try {
      await RecipeApi.addRecipe(data);
    } catch (e) {
      console.error("Failed to add recipe", e);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const newRecipe = { details: formData, ingredients };
    console.log("newRec", newRecipe);
    await addRecipe(newRecipe);
    setFormData(INITIAL_STATE);
    setIngredients([{ name: "", quantity: 0, unit: "" }]);
    navigate("/recipes");
  }

  //helper to add additional ingredients
  const handleIngredientAdd = () => {
    setIngredients([...ingredients, { name: "", quantity: 0, unit: "" }]);
  };

  //handle ingredient remove
  const handleIngredientRemove = (index) => {
    const ingredientList = [...ingredients];
    ingredientList.splice(index, 1);
    setIngredients(ingredientList);
  };

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    const ingredientList = [...ingredients];
    ingredientList[index][name] = value;
    setIngredients(ingredientList);
  };

  //Set Tag options, prevents users from being creative with recipe tags
  const options = ["Poultry", "Beef", "Seafood", "Pork", "Vegetarian"];

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        type="text"
        name="title"
        required
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
        rows={10}
        cols={30}
        maxLength={100}
      />
      <label htmlFor="tag">Tags:</label>
      <select
        placeholder="Select tag"
        id="tag"
        name="tag"
        required
        value={formData.tag}
        onChange={handleChange}
      >
        {" "}
        <option value="" selected disabled hidden>
          Select Tag:
        </option>
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
      <div className="ingredients-form">
        <label htmlFor="ingredient">Ingredient:</label>
        {ingredients.map((singleIngredient, index) => (
          <div className="ingredients" key={index}>
            <div className="add-ingredient">
              <input
                id="ingredient"
                type="text"
                name="name"
                required
                placeholder="Ingredient"
                value={singleIngredient.name}
                onChange={(e) => handleIngredientChange(e, index)}
              />
              <label htmlFor="quantity">Quantity:</label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                required
                min="0"
                step=".25"
                placeholder="Quantity"
                value={singleIngredient.quantity}
                onChange={(e) => handleIngredientChange(e, index)}
              />
              <label htmlFor="unit">Unit:</label>
              <input
                id="unit"
                type="text"
                required
                name="unit"
                placeholder="Unit"
                value={singleIngredient.unit}
                onChange={(e) => handleIngredientChange(e, index)}
              />
              {ingredients.length - 1 === index && ingredients.length < 25 && (
                <button type="button" onClick={handleIngredientAdd}>
                  <span>Add Ingredient</span>
                </button>
              )}
            </div>
            <div className="remove-ingredient">
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleIngredientRemove(index)}
                >
                  <span>Remove Ingredient</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <label htmlFor="instructions">Instructions:</label>
      <textarea
        id="instructions"
        name="instructions"
        placeholder="Instructions"
        value={formData.instructions}
        onChange={handleChange}
        required
        rows={10}
        cols={30}
      />
      <button id="submit">Submit</button>
    </form>
  );
};

export default AddRecipeForm;
