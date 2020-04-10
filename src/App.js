import React, { useEffect } from "react";

import AppDisplay from "./components/AppDisplay";
import useKeyboardListeners from "./hooks/useKeyboardListeners";
import { updateCamera } from "./helpers/backendRequests";
import useCameraState from "./hooks/useCameraState";
import useArrowState from "./hooks/useArrowPressedState";

function App() {
  const [arrowPressed, dispatchArrowAction] = useArrowState();
  const [camera, dispatchCameraAction] = useCameraState();

  useKeyboardListeners(dispatchArrowAction);

  useEffect(() => {
    if (camera.starting) {
      (async () => {
        try {
          const response = await updateCamera({
            started: camera.starting,
          });
          await response.json();
          dispatchCameraAction({ type: "stream-ready" });
        } catch (err) {
          dispatchCameraAction({ type: "stream-ready" });
        }
      })();
    }
  }, [camera.starting, dispatchCameraAction]);

  useEffect(() => {
    if (camera.stopping) {
      (async () => {
        try {
          const response = await updateCamera({
            started: !camera.stopping,
          });
          await response.json();
          dispatchCameraAction({ type: "stop-cam" });
        } catch (err) {
          dispatchCameraAction({ type: "stop-cam" });
        }
      })();
    }
  }, [camera.stopping, dispatchCameraAction]);

  return (
    <AppDisplay
      {...camera}
      onOffClickHandler={() => dispatchCameraAction({ type: "toggle-cam" })}
      startClickHandler={() => dispatchCameraAction({ type: "start-cam" })}
      cameraStreamLoadHandler={() =>
        dispatchCameraAction({ type: "stream-loaded" })
      }
    />
  );
}

export default App;
