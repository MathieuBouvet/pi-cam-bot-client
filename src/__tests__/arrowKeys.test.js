import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import { updateRobot } from "../helpers/backendRequests";

jest.mock("../helpers/backendRequests");
updateRobot.mockResolvedValue(true);

test("arrow keys are sent to the api", async () => {
  render(<App />);

  fireEvent.keyDown(document, { key: "ArrowUp" });
  expect(updateRobot).toHaveBeenCalledWith({
    ArrowUp: true,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  fireEvent.keyDown(document, { key: "ArrowDown" });
  expect(updateRobot).toHaveBeenCalledWith({
    ArrowUp: true,
    ArrowDown: true,
    ArrowLeft: false,
    ArrowRight: false,
  });

  fireEvent.keyDown(document, { key: "ArrowLeft" });
  expect(updateRobot).toHaveBeenCalledWith({
    ArrowUp: true,
    ArrowDown: true,
    ArrowLeft: true,
    ArrowRight: false,
  });

  fireEvent.keyDown(document, { key: "ArrowRight" });
  expect(updateRobot).toHaveBeenCalledWith({
    ArrowUp: true,
    ArrowDown: true,
    ArrowLeft: true,
    ArrowRight: true,
  });

  fireEvent.keyUp(document, { key: "ArrowUp" });
  expect(updateRobot).toHaveBeenCalledWith({
    ArrowUp: false,
    ArrowDown: true,
    ArrowLeft: true,
    ArrowRight: true,
  });

  fireEvent.keyUp(document, { key: "ArrowDown" });
  expect(updateRobot).toHaveBeenCalledWith({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: true,
    ArrowRight: true,
  });

  fireEvent.keyUp(document, { key: "ArrowLeft" });
  expect(updateRobot).toHaveBeenCalledWith({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: true,
  });

  fireEvent.keyUp(document, { key: "ArrowRight" });
  expect(updateRobot).toHaveBeenCalledWith({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });
});
