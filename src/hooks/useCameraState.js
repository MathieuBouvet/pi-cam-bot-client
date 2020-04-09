import { useReducer } from "react";

const cameraStateReducer = (state, action) => {
  switch (action.type) {
    case "start-cam":
      return { started: true, streamLoading: true };
    case "toggle-cam":
      return {
        started: !state.started,
        streamLoading: !state.started,
      };
    case "stream-loaded":
      return { ...state, streamLoading: false };
    default:
      throw new Error("Invalid action type for cameraStateReducer");
  }
};

const useCameraState = (initArg, initFunc) => {
  return useReducer(cameraStateReducer, {
    started: false,
    streamLoading: false,
  });
};

export default useCameraState;
