import React, { useState } from "react";

import AppDisplay from "./components/AppDisplay";
import useSwitch from "./hooks/switchHook";

function App() {
  const [started, toggle, start] = useSwitch(false);
  const [iframeLoading, setIframeLoading] = useState(false);
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
