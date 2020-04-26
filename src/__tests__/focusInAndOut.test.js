import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import { updateRobot } from "../helpers/backendRequests";

jest.mock("../helpers/backendRequests");
updateRobot.mockResolvedValue({ ok: true });

test("app focus lifecycle works as expected", async () => {
  const focusLostText = "Cliquez n'importe où pour reprendre le contôle";
  const { queryByText } = render(<App />);
  fireEvent.keyDown(document, { key: "ArrowUp" });
  updateRobot.mockClear();
  fireEvent.blur(window);
  expect(queryByText(focusLostText)).toBeInTheDocument();
  expect(updateRobot).toHaveBeenCalledWith({
    up: false,
    down: false,
    left: false,
    right: false,
  });
  fireEvent.focus(window);
  expect(queryByText(focusLostText)).not.toBeInTheDocument();
});
