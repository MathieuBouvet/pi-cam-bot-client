import { useState } from "react";

const useSwitch = (initialValue = false) => {
  const [switchValue, setSwitchValue] = useState(initialValue);
  const setTrue = () => setSwitchValue(true);
  const setFalse = () => setSwitchValue(false);
  const toggleSwitch = () => setSwitchValue(!switchValue);
  return [switchValue, toggleSwitch, setTrue, setFalse];
};

export default useSwitch;
