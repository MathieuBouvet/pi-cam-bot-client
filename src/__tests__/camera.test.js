import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";
import { updateCamera } from "../helpers/backendRequests";

jest.mock("../helpers/backendRequests");
updateCamera.mockResolvedValue({ started: true });

const withNamedQueries = ({
  queryByRole,
  queryByTestId,
  queryAllByRole,
  queryByAltText,
  queryByText,
}) => ({
  onOffSwitch: () => queryAllByRole("checkbox")[0],
  cameraStream: () => queryByAltText("camera-stream"),
  mainButton: () => queryByRole("button"),
  loadingIndicator: () => queryByTestId("loading-indicator"),
  statusText: (text) => queryByText(text),
});

test("camera ui render correctly during start and stop phases", async () => {
  const {
    queryByRole,
    queryByTestId,
    queryAllByRole,
    queryByAltText,
    queryByText,
  } = render(<App />);
  const startButton = queryByRole("button");

  // camera is stopped
  expect(queryAllByRole("checkbox")[0]).not.toBeChecked();
  expect(queryByAltText("camera-stream")).not.toBeInTheDocument();
  expect(queryByRole("button")).not.toBeDisabled();
  expect(queryByTestId("loading-indicator")).not.toBeInTheDocument();
  expect(queryByText("Demarrer la camera")).toBeInTheDocument();

  fireEvent.click(startButton);

  //camera is starting
  expect(queryAllByRole("checkbox")[0]).toBeChecked();
  expect(queryByAltText("camera-stream")).not.toBeInTheDocument();
  expect(queryByRole("button")).toBeDisabled();
  expect(queryByTestId("loading-indicator")).toBeInTheDocument();
  expect(queryByText("Demarrage de la camera en cours...")).toBeInTheDocument();

  await waitFor(() =>
    expect(queryByAltText("camera-stream")).toBeInTheDocument()
  );
  // camera is ready
  expect(queryAllByRole("checkbox")[0]).toBeChecked();
  expect(queryByRole("button")).toBeDisabled();
  expect(queryByTestId("loading-indicator")).toBeInTheDocument();
  expect(queryByText("Demarrage de la camera en cours...")).toBeInTheDocument();

  fireEvent.load(queryByAltText("camera-stream"));

  // camera is loaded
  expect(queryAllByRole("checkbox")[0]).toBeChecked();
  expect(queryByAltText("camera-stream")).toBeInTheDocument();
  expect(queryByRole("button")).not.toBeInTheDocument();
  expect(queryByTestId("loading-indicator")).not.toBeInTheDocument();

  fireEvent.click(queryAllByRole("checkbox")[0]);

  // camera is stopping
  expect(queryAllByRole("checkbox")[0]).not.toBeChecked();
  expect(queryByAltText("camera-stream")).not.toBeInTheDocument();
  expect(queryByRole("button")).toBeDisabled();
  expect(queryByTestId("loading-indicator")).toBeInTheDocument();
  expect(queryByText("Arret de la camera en cours...")).toBeInTheDocument();

  await waitFor(() =>
    expect(queryByText("Demarrer la camera")).toBeInTheDocument()
  );
});

test("the camera starting phase is also triggered by on-off button", () => {
  const {
    queryAllByRole,
    queryByAltText,
    queryByRole,
    queryByTestId,
    queryByText,
  } = render(<App />);
  fireEvent.click(queryAllByRole("checkbox")[0]);
  expect(queryAllByRole("checkbox")[0]).toBeChecked();
  expect(queryByAltText("camera-stream")).not.toBeInTheDocument();
  expect(queryByRole("button")).toBeDisabled();
  expect(queryByTestId("loading-indicator")).toBeInTheDocument();
  expect(queryByText("Demarrage de la camera en cours...")).toBeInTheDocument();
});
