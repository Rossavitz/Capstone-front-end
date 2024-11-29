import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeApi from "../api";
import { useParams } from "react-router-dom";
import DeleteComponent from "./DeleteRecipe";

const UpdateRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [oldValues, setOldValues] = useState([{}]);
  const recipeIngredientsToRemove = [];
  const [ingredientList, setIngredientList] = useState([
    {
      quantity: "",
      unit: "",
      name: "",
    },
  ]);

  //on mount, get details on recipe by id
  useEffect(
    function getRecipeDetails() {
      async function getRecipe() {
        try {
          const recipes = await RecipeApi.updateRecipeById(id);
          if (recipes) {
            let allIngredients = recipes.map((r) => {
              const currentIngredients = {
                quantity: r.ingredient_quantity,
                unit: r.ingredient_unit,
                name: r.ingredient_name,
              };
              return currentIngredients;
            });

            setIngredientList(allIngredients);
          }
          //prefill form data w/ recipe details
          setFormData({
            title: recipes[0].title,
            description: recipes[0].description,
            tag: recipes[0].tag,
            instructions: recipes[0].instructions,
          });
        } catch (e) {
          console.error("Failed to get recipe", e);
        }
      }
      getRecipe();
    },
    [id]
  );

  //on mount, store "old values" of ingredient name, quantity, unit.
  useEffect(
    function getOldValues() {
      async function getOldRecipe() {
        try {
          const recipe = await RecipeApi.updateRecipeById(id);
          if (recipe) {
            let oldIngredients = recipe.map((r) => {
              const oldIngredient = {
                quantity: r.ingredient_quantity,
                unit: r.ingredient_unit,
                name: r.ingredient_name,
              };
              return oldIngredient;
            });
            setOldValues(oldIngredients);
          }
        } catch (e) {
          console.error("Failed to get recipe", e);
        }
      }
      getOldRecipe();
    },
    [id]
  );

  //api call to update recipe with data
  async function updateRecipe(data) {
    try {
      await RecipeApi.updateRecipe(id, data);
    } catch (e) {
      console.error("Failed to add recipe", e);
    }
  }

  //Stores "old values" and "new values". If the "old value" is not in the "new values" array, it is stored in a new array 'recipeIngredientsToRemove' which is sent to the backend to be removed.
  function checkOldVsNew() {
    try {
      let oldArr = [];
      let newArr = [];
      const oldNames = oldValues.map((n) => n.name);
      oldArr.push(oldNames);
      const newNames = ingredientList.map((i) => i.name);
      newArr.push(newNames);
      console.log(oldArr);
      oldArr[0].forEach((element) => {
        if (!newArr[0].includes(element)) {
          recipeIngredientsToRemove.push(element);
        }
      });
      return recipeIngredientsToRemove;
    } catch (e) {
      console.error("Failed to compared Old vs New", e);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  //submit handler.  Runs the checkOldVsNew to determine which ingredients need to be removed to be sent to the back end.
  async function handleSubmit(e) {
    e.preventDefault();
    checkOldVsNew();
    const newRecipe = {
      details: formData,
      ingredientList,
      recipeIngredientsToRemove,
    };
    await updateRecipe(newRecipe);
    navigate(`/recipes/id/${id}`);
  }

  //add ingredient helper for form
  const handleIngredientAdd = () => {
    setIngredientList([
      ...ingredientList,
      { name: "", quantity: "", unit: "" },
    ]);
  };

  //ingredient remove handler, removes from ingredient list.
  function handleIngredientRemove(index) {
    const ingredientsList = [...ingredientList];
    ingredientsList.splice(index, 1);
    setIngredientList(ingredientsList);
  }

  //"old" ingredient remove handler, removes from OldValues.
  function handleOldIngredientRemove(index) {
    const allOldIngredients = [...oldValues];
    allOldIngredients.splice(index, 1);
    setOldValues(allOldIngredients);
  }

  //On ingredient remove, make API call to remove ingredient from this recipe. Calls both ingredient handlers to update state.
  async function removeIngredientFromDB(id, data, index) {
    await RecipeApi.deleteIngredientFromRecipe(id, data);
    handleIngredientRemove(index);
    handleOldIngredientRemove(index);
  }

  //handle ingredient change
  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    const ingredientsList = [...ingredientList];
    ingredientsList[index][name] = value;
    setIngredientList(ingredientsList);
  };

  //Set Tag options, prevents users from being creative
  const options = ["Poultry", "Beef", "Seafood", "Pork", "Vegetarian"];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
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
        <label htmlFor="tag">Tag:</label>
        <select
          placeholder="Select tag"
          id="tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          required
        >
          {options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
        <div className="ingredients-form">
          <label htmlFor="ingredient">Ingredient:</label>
          {ingredientList.map((singleIngredient, index) => (
            <div className="ingredients" key={index}>
              <div className="add-ingredient">
                <input
                  id="ingredient"
                  type="text"
                  name="name"
                  placeholder="Ingredient"
                  value={singleIngredient.name}
                  required
                  onChange={(e) => handleIngredientChange(e, index)}
                />
                <label htmlFor="quantity">Quantity:</label>
                <input
                  id="quantity"
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  min="0"
                  step=".25"
                  required
                  value={singleIngredient.quantity}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
                <label htmlFor="unit">Unit:</label>
                <input
                  id="unit"
                  type="text"
                  name="unit"
                  placeholder="Unit"
                  required
                  value={singleIngredient.unit}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
                {ingredientList.length - 1 === index &&
                  ingredientList.length < 25 && (
                    <button type="button" onClick={handleIngredientAdd}>
                      <span>Add Ingredient</span>
                    </button>
                  )}
              </div>
              <div className="remove-ingredient">
                {ingredientList.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) =>
                      removeIngredientFromDB(
                        id,
                        { ...ingredientList, index },
                        index
                      )
                    }
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
          required
          value={formData.instructions}
          onChange={handleChange}
          rows={10}
          cols={30}
        />
        <button id="submit">Update</button>
      </form>
      <div>
        <br></br>
        <hr></hr>
        <h3>Delete this recipe!</h3>
        <DeleteComponent id={id} />
        <hr></hr>
      </div>
    </div>
  );
};

export default UpdateRecipeForm;
