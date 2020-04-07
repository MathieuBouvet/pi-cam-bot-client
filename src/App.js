import React from "react";

import AppDisplay from "./AppDisplay";
import useSwitch from "./switchHook";

function App() {
  const [started, toggle, start] = useSwitch(false);
  const handleOnOffClick = () => toggle();

  const handleStartClick = () => start();
  return (
    <AppDisplay
      started={started}
      onOffClickHandler={handleOnOffClick}
      startClickHandler={handleStartClick}
    />
  );
}

export default App;
