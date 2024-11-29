import React from "react";
import { render } from "@testing-library/react";
import RecipeList from "./RecipeList";

it("renders without crashing", function () {
  render(<RecipeList />);
});

it("matches snapshot with no jobs", function () {
  const { asFragment } = render(<RecipeList />);
  expect(asFragment()).toMatchSnapshot();
});
