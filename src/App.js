import React, { useEffect } from "react";

import AppDisplay from "./components/AppDisplay";
import useKeyboardListeners from "./hooks/useKeyboardListeners";
import { updateCamera, updateRobot } from "./helpers/backendRequests";
import useCameraState, { cameraStatusReader } from "./hooks/useCameraState";
import useArrowState from "./hooks/useArrowPressedState";

function App() {
  const [
    { ArrowUp: up, ArrowDown: down, ArrowLeft: left, ArrowRight: right },
    dispatchArrowAction,
  ] = useArrowState();
  const [camera, dispatchCameraAction] = useCameraState();
  const isCamera = cameraStatusReader(camera);
  const cameraStarting = isCamera("starting");
  const cameraStopping = isCamera("stopping");

  useKeyboardListeners(dispatchArrowAction);

  useEffect(() => {
    if (cameraStarting || cameraStopping) {
      (async () => {
        try {
          const response = await updateCamera({
            started: cameraStarting || !cameraStopping,
          });
          if (response.started) {
            dispatchCameraAction("stream-ready");
          } else {
            dispatchCameraAction("stop-cam");
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [cameraStarting, cameraStopping, dispatchCameraAction]);

  useEffect(() => {
    updateRobot({ up, down, left, right });
  }, [up, down, left, right]);

  return (
    <AppDisplay camera={camera} dispatchCameraAction={dispatchCameraAction} />
  );
}

export default App;
