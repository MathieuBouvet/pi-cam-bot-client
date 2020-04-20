import React from "react";
import { render } from "@testing-library/react";
import AppDisplay from "./AppDisplay";
import { status } from "../hooks/useCameraState";

const dispatch = jest.fn();

it("should display the navbar", () => {
  const { queryByRole } = render(
    <AppDisplay camera={status.ready} dispatchCameraAction={dispatch} />
  );
  expect(queryByRole("navigation")).toBeInTheDocument();
});

it("should render correctly when camera is stopped", () => {
  const {
    queryAllByRole,
    queryByAltText,
    queryByRole,
    queryByTestId,
    queryByText,
  } = render(
    <AppDisplay camera={status.stopped} dispatchCameraAction={dispatch} />
  );
  expect(queryAllByRole("checkbox")[0]).not.toBeChecked();
  expect(queryByAltText("camera-stream")).not.toBeInTheDocument();
  expect(queryByRole("button")).not.toBeDisabled();
  expect(queryByTestId("loading-indicator")).not.toBeInTheDocument();
  expect(queryByText("Demarrer la camera")).toBeInTheDocument();
});

it("should render correctly when camera is starting", () => {
  const {
    queryAllByRole,
    queryByAltText,
    queryByRole,
    queryByTestId,
    queryByText,
  } = render(
    <AppDisplay camera={status.starting} dispatchCameraAction={dispatch} />
  );
  expect(queryAllByRole("checkbox")[0]).toBeChecked();
  expect(queryByAltText("camera-stream")).not.toBeInTheDocument();
  expect(queryByRole("button")).toBeDisabled();
  expect(queryByTestId("loading-indicator")).toBeInTheDocument();
  expect(queryByText("Demarrage de la camera en cours...")).toBeInTheDocument();
});

it("should render correctly when camera is ready", () => {
  const {
    queryAllByRole,
    queryByAltText,
    queryByRole,
    queryByTestId,
    queryByText,
  } = render(
    <AppDisplay camera={status.ready} dispatchCameraAction={dispatch} />
  );
  expect(queryAllByRole("checkbox")[0]).toBeChecked();
  expect(queryByAltText("camera-stream")).toBeInTheDocument();
  expect(queryByRole("button")).toBeDisabled();
  expect(queryByTestId("loading-indicator")).toBeInTheDocument();
  expect(queryByText("Demarrage de la camera en cours...")).toBeInTheDocument();
});

it("should render correctly when camera is loaded", () => {
  const { queryAllByRole, queryByAltText, queryByRole, queryByTestId } = render(
    <AppDisplay camera={status.loaded} dispatchCameraAction={dispatch} />
  );
  expect(queryAllByRole("checkbox")[0]).toBeChecked();
  expect(queryByAltText("camera-stream")).toBeInTheDocument();
  expect(queryByRole("button")).not.toBeInTheDocument();
  expect(queryByTestId("loading-indicator")).not.toBeInTheDocument();
});

it("should render correctly when camera is stopping", () => {
  const {
    queryAllByRole,
    queryByAltText,
    queryByRole,
    queryByTestId,
    queryByText,
  } = render(
    <AppDisplay camera={status.stopping} dispatchCameraAction={dispatch} />
  );
  expect(queryAllByRole("checkbox")[0]).not.toBeChecked();
  expect(queryByAltText("camera-stream")).toBeInTheDocument();
  expect(queryByRole("button")).toBeDisabled();
  expect(queryByTestId("loading-indicator")).toBeInTheDocument();
  expect(queryByText("Arret de la camera en cours...")).toBeInTheDocument();
});
