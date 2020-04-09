import React, { useReducer, useEffect } from "react";

import AppDisplay from "./components/AppDisplay";
import useKeyboardListeners from "./hooks/useKeyboardListeners";
import { updateCamera } from "./helpers/backendRequests";
import useCameraState from "./hooks/useCameraState";

const initArrowPressed = () => {
  return {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };
};

const reducer = (state, action) => {
  if (state[action.key] === undefined) {
    return { ...state };
  }
  switch (action.type) {
    case "keyDown":
      return { ...state, [action.key]: true };
    case "keyUp":
      return { ...state, [action.key]: false };
    default:
      throw new Error("Invalid action type for the reducer");
  }
};

function App() {
  const [arrowPressed, dispatch] = useReducer(reducer, null, initArrowPressed);
  const [camera, dispatchCameraAction] = useCameraState();

  useKeyboardListeners(dispatch);

  useEffect(() => {
    (async () => {
      await updateCamera({ started: camera.started });
    })();
  }, [camera.started]);

  return (
    <AppDisplay
      started={camera.started}
      onOffClickHandler={() => dispatchCameraAction({ type: "toggle-cam" })}
      startClickHandler={() => dispatchCameraAction({ type: "start-cam" })}
      cameraStreamLoadHandler={() =>
        dispatchCameraAction({ type: "stream-loaded" })
      }
      cameraStreamLoading={camera.streamLoading}
    />
  );
}

export default App;
