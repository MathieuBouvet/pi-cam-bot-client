import { useReducer } from "react";

const cameraStateReducer = (state, action) => {
  switch (action.type) {
    case "start-cam":
      return { started: true, streamReady: false, streamLoading: true };
    case "toggle-cam":
      return {
        started: !state.started,
        streamReady: false,
        streamLoading: !state.started,
      };
    case "stream-loaded":
      return { ...state, streamLoading: false };
    case "stream-ready":
      return {
        ...state,
        streamReady: true,
      };
    default:
      throw new Error("Invalid action type for cameraStateReducer");
  }
};

const useCameraState = (initArg, initFunc) => {
  return useReducer(cameraStateReducer, {
    started: false,
    streamReady: false,
    streamLoading: false,
  });
};

export default useCameraState;
