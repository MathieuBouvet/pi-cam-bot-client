import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("the navbar is rendered", () => {
  const { queryByRole } = render(<App />);
  expect(queryByRole("navigation")).toBeInTheDocument();
});
