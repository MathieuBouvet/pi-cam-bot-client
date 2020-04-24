import { useReducer } from "react";

const initArrowPressed = () => {
  return {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };
};

const arrowPressedReducer = (state, action) => {
  if (state[action.key] === undefined && action.type !== "reset") {
    return { ...state };
  }
  switch (action.type) {
    case "keyDown":
      return { ...state, [action.key]: true };
    case "keyUp":
      return { ...state, [action.key]: false };
    case "reset":
      return initArrowPressed();
    default:
      throw new Error("Invalid action type for the reducer");
  }
};

const useArrowPressedReducer = () => {
  return useReducer(arrowPressedReducer, null, initArrowPressed);
};

export default useArrowPressedReducer;
