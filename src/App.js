import React, { useState, useReducer } from "react";

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
  if (!state[action.key]) {
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
  const [started, toggle, start] = useSwitch(false);
  const [iframeLoading, setIframeLoading] = useState(false);

  const [arrowPressed, dispatch] = useReducer(reducer, null, initArrowPressed);

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
