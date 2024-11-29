import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class RecipeApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${RecipeApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Signup for site, returns token */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Get token for login from username, password.*/
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Get the current user. */
  static async getCurrUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Save user profile page. */
  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Get allRecipes (filtered by tag if not undefined) */
  static async getAllRecipes(tag) {
    let res = await this.request("recipes", { tag });
    return res.recipes;
  }

  /** Get recipe by ID */
  static async getRecipeById(id) {
    let res = await this.request(`recipes/id/${id}`);
    return res.recipe;
  }

  /** Get recipe by ID */
  static async updateRecipeById(id) {
    let res = await this.request(`recipes/update/${id}`);
    return res.recipes;
  }

  /** Get all recipes with specific tag */
  static async getRecipesByTag(tag) {
    let res = await this.request(`recipes/tag/${tag}`);
    return res.recipes;
  }

  /** Get all tags */
  static async getTags() {
    let res = await this.request(`recipes/tags`);
    return res.tags;
  }

  /** Get logged in user favorites */
  static async getFavorites(username) {
    let res = await this.request(`users/${username}/favorites`);
    return res.favorites;
  }

  // add recipe to user favorite
  static async addFavorite(username, recipe_id, data) {
    let res = await this.request(
      `users/${username}/${recipe_id}`,
      { data },
      "post"
    );
    return res;
  }

  //remove recipe from user favorites
  static async removeFavorite(username, recipe_id, data) {
    let res = await this.request(
      `users/${username}/${recipe_id}`,
      { data },
      "delete"
    );
    return res;
  }

  //get list of user faovrite recipes
  static async getIsRecipeFavorite(username, recipe_id) {
    let res = await this.request(`users/${username}/${recipe_id}`);
    return res;
  }

  //add a recipe, requires "data"
  static async addRecipe(data) {
    console.log("data", data);
    let res = await this.request(`recipes`, { data }, "post");
    console.log("response", res);
    return res;
  }

  //update a recipe, requires id and "data"
  static async updateRecipe(recipe_id, data) {
    let res = await this.request(`recipes/id/${recipe_id}`, data, "patch");
    return res.recipe;
  }

  //delete a recipe
  static async deleteRecipe(recipe_id, data) {
    let res = await this.request(`recipes/${recipe_id}`, data, "delete");
    return res.recipe;
  }

  //delete an ingredient from a recipe
  static async deleteIngredientFromRecipe(recipe_id, data) {
    let res = await this.request(
      `recipes/${recipe_id}/ingredient`,
      data,
      "delete"
    );
    return res;
  }
}

export default RecipeApi;
