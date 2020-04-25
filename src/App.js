import React, { useEffect } from "react";

import AppDisplay from "./components/AppDisplay";
import FocusAnimator from "./components/FocusAnimator";
import useKeyboardListeners from "./hooks/useKeyboardListeners";
import { updateCamera, updateRobot } from "./helpers/backendRequests";
import useCameraState, { cameraStatusReader } from "./hooks/useCameraState";
import useFocusAnimatorState, {
  focusAnmatorStateReader,
} from "./hooks/useFocusAnimatorState";
import useArrowState from "./hooks/useArrowPressedState";

function App() {
  const [
    { ArrowUp: up, ArrowDown: down, ArrowLeft: left, ArrowRight: right },
    dispatchArrowAction,
  ] = useArrowState();
  const [camera, dispatchCameraAction] = useCameraState();
  const [animator, dispatchAnimatorAction] = useFocusAnimatorState();

  const isCamera = cameraStatusReader(camera);
  const cameraStarting = isCamera("starting");
  const cameraStopping = isCamera("stopping");

  const isAnimator = focusAnmatorStateReader(animator);

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

  useEffect(() => {
    const onFocusOut = () => {
      dispatchArrowAction({ type: "reset" });
      dispatchAnimatorAction("start");
    };
    const onFocusIn = () => {
      dispatchAnimatorAction("unblur");
    };
    window.addEventListener("blur", onFocusOut);
    window.addEventListener("focus", onFocusIn);
    return () => {
      window.removeEventListener("blur", onFocusOut);
      window.removeEventListener("focus", onFocusIn);
    };
  }, [dispatchArrowAction, dispatchAnimatorAction]);

  return (
    <>
      <AppDisplay
        camera={camera}
        dispatchCameraAction={dispatchCameraAction}
        focused={isAnimator("stopped")}
      />
      {!isAnimator("stopped") && (
        <FocusAnimator
          camera={camera}
          animator={animator}
          dispatchAnimatorAction={dispatchAnimatorAction}
        />
      )}
    </>
  );
}

export default App;
