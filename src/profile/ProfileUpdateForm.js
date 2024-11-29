import React, { useState, useContext } from "react";
import RecipeApi from "../api";
import UserContext from "../auth/UserContext";
import { useNavigate } from "react-router-dom";

function ProfileUpdateForm() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const INITIAL_STATE = {
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    username: currUser.username,
    email: currUser.email,
    password: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    let newProfile = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updateUsername;

    try {
      updateUsername = await RecipeApi.saveProfile(username, newProfile);
    } catch (e) {
      throw new Error(e);
    }

    setFormData(INITIAL_STATE);
    setCurrUser(updateUsername);
    navigate("/");
  }

  return (
    <div>
      <h1>{currUser.username} profile!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="text"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <button id="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileUpdateForm;
