import React, { useEffect } from "react";

import AppDisplay from "./components/AppDisplay";
import useKeyboardListeners from "./hooks/useKeyboardListeners";
import { updateCamera } from "./helpers/backendRequests";
import useCameraState, { cameraStatusReader } from "./hooks/useCameraState";
import useArrowState from "./hooks/useArrowPressedState";

function App() {
  const [arrowPressed, dispatchArrowAction] = useArrowState();
  const [camera, dispatchCameraAction] = useCameraState();
  const isCamera = cameraStatusReader(camera);
  const cameraStarting = isCamera("starting");
  const cameraStopping = isCamera("stopping");

  useKeyboardListeners(dispatchArrowAction);

  useEffect(() => {
    if (cameraStarting) {
      (async () => {
        try {
          const response = await updateCamera({
            started: cameraStarting,
          });
          await response.json();
          dispatchCameraAction({ type: "stream-ready" });
        } catch (err) {
          dispatchCameraAction({ type: "stream-ready" });
        }
      })();
    }
  }, [cameraStarting, dispatchCameraAction]);

  useEffect(() => {
    if (cameraStopping) {
      (async () => {
        try {
          const response = await updateCamera({
            started: !cameraStopping,
          });
          await response.json();
          dispatchCameraAction({ type: "stop-cam" });
        } catch (err) {
          dispatchCameraAction({ type: "stop-cam" });
        }
      })();
    }
  }, [cameraStopping, dispatchCameraAction]);

  return (
    <AppDisplay
      camera={camera}
      onOffClickHandler={() => dispatchCameraAction({ type: "toggle-cam" })}
      startClickHandler={() => dispatchCameraAction({ type: "start-cam" })}
      cameraStreamLoadHandler={() =>
        dispatchCameraAction({ type: "stream-loaded" })
      }
    />
  );
}

export default App;
