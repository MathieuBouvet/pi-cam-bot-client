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
    onOffSwitch,
    cameraStream,
    mainButton,
    loadingIndicator,
    statusText,
  } = withNamedQueries(render(<App />));

  // camera is stopped
  expect(onOffSwitch()).not.toBeChecked();
  expect(cameraStream()).not.toBeInTheDocument();
  expect(mainButton()).not.toBeDisabled();
  expect(loadingIndicator()).not.toBeInTheDocument();
  expect(statusText("Demarrer la camera")).toBeInTheDocument();

  fireEvent.click(mainButton());

  //camera is starting
  expect(onOffSwitch()).toBeChecked();
  expect(cameraStream()).not.toBeInTheDocument();
  expect(mainButton()).toBeDisabled();
  expect(loadingIndicator()).toBeInTheDocument();
  expect(statusText("Demarrage de la camera en cours...")).toBeInTheDocument();

  await waitFor(() => expect(cameraStream()).toBeInTheDocument());

  // camera is ready
  expect(onOffSwitch()).toBeChecked();
  expect(mainButton()).toBeDisabled();
  expect(loadingIndicator()).toBeInTheDocument();
  expect(statusText("Demarrage de la camera en cours...")).toBeInTheDocument();

  fireEvent.load(cameraStream());

  // camera is loaded
  expect(onOffSwitch()).toBeChecked();
  expect(cameraStream()).toBeInTheDocument();
  expect(mainButton()).not.toBeInTheDocument();
  expect(statusText("loading-indicator")).not.toBeInTheDocument();

  fireEvent.click(onOffSwitch());

  // camera is stopping
  expect(onOffSwitch()).not.toBeChecked();
  expect(cameraStream()).not.toBeInTheDocument();
  expect(mainButton()).toBeDisabled();
  expect(loadingIndicator()).toBeInTheDocument();
  expect(statusText("Arret de la camera en cours...")).toBeInTheDocument();

  await waitFor(() =>
    expect(statusText("Demarrer la camera")).toBeInTheDocument()
  );
});

test("the camera starting phase is also triggered by on-off button", async () => {
  const {
    onOffSwitch,
    cameraStream,
    mainButton,
    loadingIndicator,
    statusText,
  } = withNamedQueries(render(<App />));

  fireEvent.click(onOffSwitch());
  expect(onOffSwitch()).toBeChecked();
  expect(cameraStream()).not.toBeInTheDocument();
  expect(mainButton()).toBeDisabled();
  expect(loadingIndicator()).toBeInTheDocument();
  expect(statusText("Demarrage de la camera en cours...")).toBeInTheDocument();

  await waitFor(() => expect(cameraStream()).toBeInTheDocument());
});
