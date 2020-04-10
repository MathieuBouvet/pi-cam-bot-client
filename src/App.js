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
    (async () => {
      try {
        await updateCamera({ started: camera.started });
        dispatchCameraAction({ type: "stream-ready" });
      } catch (err) {}
    })();
  }, [camera.started, dispatchCameraAction]);

  return (
    <AppDisplay
      started={camera.started}
      onOffClickHandler={() => dispatchCameraAction({ type: "toggle-cam" })}
      startClickHandler={() => dispatchCameraAction({ type: "start-cam" })}
      cameraStreamLoadHandler={() =>
        dispatchCameraAction({ type: "stream-loaded" })
      }
      cameraStreamLoading={camera.streamLoading}
      streamReady={camera.streamReady}
    />
  );
}

export default App;
