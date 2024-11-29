import React from "react";
import { render } from "@testing-library/react";
import RecipeCard from "./RecipeCard";
import { UserProvider } from "../testUtils";
import { BrowserRouter } from "react-router-dom";

it("matches snapshot", function () {
  let item = {
    title: "Test Title",
    description: "Test Description",
    tag: "Tag",
  };
  const { asFragment } = render(
    <BrowserRouter>
      <UserProvider>
        <RecipeCard item={item} />
      </UserProvider>
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
