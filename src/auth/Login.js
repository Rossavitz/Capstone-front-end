import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ login }) {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
    setFormData(INITIAL_STATE);
    navigate("/recipes");
  };

  return (
    <div>
      <h2>Log In:</h2>
      <form onSubmit={handleSubmit}>
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
        <button id="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
