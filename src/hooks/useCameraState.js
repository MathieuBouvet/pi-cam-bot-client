import { useReducer } from "react";
import stateReader from "../helpers/stateReader";

const status = {
  stopped: Symbol("stopped"),
  starting: Symbol("starting"),
  ready: Symbol("ready"),
  loaded: Symbol("loaded"),
  stopping: Symbol("stopping"),
};

const cameraStateReducer = (state, action) => {
  switch (action) {
    case "start-cam":
      return state === status.stopped ? status.starting : state;
    case "toggle-cam":
      if (state === status.stopped) {
        return status.starting;
      }
      if (state === status.ready || state === status.loaded) {
        return status.stopping;
      }
      return state;
    case "stream-loaded":
      if (state === status.ready) {
        return status.loaded;
      }
      return state;
    case "stream-ready":
      if (state === status.starting) {
        return status.ready;
      }
      return state;
    case "stop-cam":
      if (state === status.stopping) {
        return status.stopped;
      }
      return state;
    default:
      throw new Error("Invalid action type for cameraStateReducer");
  }
};

const cameraStatusReader = stateReader(status);

export default function useCameraState() {
  return useReducer(cameraStateReducer, status.stopped);
}
export { cameraStatusReader, status };
