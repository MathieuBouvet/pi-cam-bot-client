import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import { updateRobot } from "../helpers/backendRequests";

jest.mock("../helpers/backendRequests");
updateRobot.mockResolvedValue(true);

afterEach(() => {
  updateRobot.mockClear();
});
test("arrow keys are sent to the api", async () => {
  render(<App />);

  fireEvent.keyDown(document, { key: "ArrowUp" });
  expect(updateRobot).toHaveBeenCalledWith({
    up: true,
    down: false,
    left: false,
    right: false,
  });

  fireEvent.keyDown(document, { key: "ArrowDown" });
  expect(updateRobot).toHaveBeenCalledWith({
    up: true,
    down: true,
    left: false,
    right: false,
  });

  fireEvent.keyDown(document, { key: "ArrowLeft" });
  expect(updateRobot).toHaveBeenCalledWith({
    up: true,
    down: true,
    left: true,
    right: false,
  });

  fireEvent.keyDown(document, { key: "ArrowRight" });
  expect(updateRobot).toHaveBeenCalledWith({
    up: true,
    down: true,
    left: true,
    right: true,
  });

  fireEvent.keyUp(document, { key: "ArrowUp" });
  expect(updateRobot).toHaveBeenCalledWith({
    up: false,
    down: true,
    left: true,
    right: true,
  });

  fireEvent.keyUp(document, { key: "ArrowDown" });
  expect(updateRobot).toHaveBeenCalledWith({
    up: false,
    down: false,
    left: true,
    right: true,
  });

  fireEvent.keyUp(document, { key: "ArrowLeft" });
  expect(updateRobot).toHaveBeenCalledWith({
    up: false,
    down: false,
    left: false,
    right: true,
  });

  fireEvent.keyUp(document, { key: "ArrowRight" });
  expect(updateRobot).toHaveBeenCalledWith({
    up: false,
    down: false,
    left: false,
    right: false,
  });
});

test("arrow keys synchronize only when changed", () => {
  render(<App />);
  fireEvent.keyDown(document, { key: "ArrowUp" });
  fireEvent.keyDown(document, { key: "ArrowUp" });
  expect(updateRobot).toHaveBeenCalledTimes(2);
});
