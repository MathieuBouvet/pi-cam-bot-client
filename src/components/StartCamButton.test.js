import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StartCamButton from "./StartCamButton";

const clickHandler = jest.fn();

it("should display the text given as child", () => {
  const { getByText } = render(
    <StartCamButton startClickHandler={clickHandler}>test text</StartCamButton>
  );
  expect(getByText("test text")).toBeInTheDocument();
});
it("should fire the click handler when start button is clicked", () => {
  const { getByRole } = render(
    <StartCamButton startClickHandler={clickHandler} />
  );
  fireEvent.click(getByRole("button"));
  expect(clickHandler).toHaveBeenCalled();
});
it("should display a loading status when isLoading", () => {
  const { queryByTestId } = render(<StartCamButton isLoading={true} />);
  expect(queryByTestId("loading-indicator")).toBeInTheDocument();
});
it("should not display a loading status when not loading", () => {
  const { queryByTestId } = render(<StartCamButton isLoading={false} />);
  expect(queryByTestId("loading-indicator")).not.toBeInTheDocument();
});
