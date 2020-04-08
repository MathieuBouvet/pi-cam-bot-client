import React, { useState, useReducer, useEffect } from "react";

import AppDisplay from "./components/AppDisplay";
import useSwitch from "./hooks/switchHook";

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
  const handleKeyDown = (event) => {
    if (!event.repeat) {
      dispatch({ type: "keyDown", key: event.key });
    }
  };
  const handleKeyUp = (event) => {
    dispatch({ type: "keyUp", key: event.key });
  };
  const [started, toggle, start] = useSwitch(false);
  const [iframeLoading, setIframeLoading] = useState(false);

  const [arrowPressed, dispatch] = useReducer(reducer, null, initArrowPressed);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleOnOffClick = () => {
    toggle();
    setIframeLoading(!started);
  };
  const handleStartClick = () => {
    start();
    setIframeLoading(true);
  };
  const handleIframeLoaded = () => {
    setIframeLoading(false);
  };
  return (
    <AppDisplay
      started={started}
      onOffClickHandler={handleOnOffClick}
      startClickHandler={handleStartClick}
      loadIframeHandler={handleIframeLoaded}
      iframeLoading={iframeLoading}
    />
  );
}

export default App;
