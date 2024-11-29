import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ signup }) => {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await signup(formData);
    setFormData(INITIAL_STATE);
    navigate("/");
  }

  return (
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
      <button id="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
