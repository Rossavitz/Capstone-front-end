import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import Login from "../auth/Login";
import SignupForm from "../auth/Signup";
import Profile from "../profile/Profile";
import ProtectedRoute from "./ProtectedRoutes";
import RecipesList from "../recipes/RecipeList";
import RecipeDetail from "../recipes/recipeDetail";
import AddRecipeForm from "../recipes/AddRecipeForm";
import UpdateRecipeForm from "../recipes/UpdateRecipeForm";

//routes list.  Protected routes ensure user is logged in to see specific routes.
function RoutesList({ signup, login }) {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<Login login={login} />} />
        <Route exact path="/signup" element={<SignupForm signup={signup} />} />
        <Route exact path="/recipes" element={<RecipesList />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/recipes/new" element={<AddRecipeForm />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/recipes/id/:id" element={<RecipeDetail />} />
          <Route
            exact
            path="/recipes/update/:id"
            element={<UpdateRecipeForm />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default RoutesList;
