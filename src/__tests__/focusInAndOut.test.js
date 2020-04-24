import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import { updateRobot } from "../helpers/backendRequests";

jest.mock("../helpers/backendRequests");
updateRobot.mockResolvedValue({ ok: true });

test("app focus lifecycle works as expected", async () => {
  const focusLostText = "Controle du robot perdu";
  const { queryByText } = render(<App />);
  fireEvent.keyDown(document, { key: "ArrowUp" });
  updateRobot.mockClear();
  fireEvent.focusOut(document);
  expect(queryByText(focusLostText)).toBeInTheDocument();
  expect(updateRobot).toHaveBeenCalledWith({
    up: false,
    down: false,
    left: false,
    right: false,
  });
  fireEvent.focusIn(document);
  expect(queryByText(focusLostText)).not.toBeInTheDocument();
});
