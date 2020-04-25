import { useReducer } from "react";
import stateReader from "../helpers/stateReader";

const possibleStates = {
  stopped: Symbol("stopped"),
  started: Symbol("started"),
  blurring: Symbol("blurring"),
  blurred: Symbol("blurred"),
  unblurring: Symbol("unblurring"),
};

const focusAnimatorReducer = (state, action) => {
  switch (action) {
    case "start":
      if (state === possibleStates.stopped) {
        return possibleStates.started;
      }
      if (state === possibleStates.unblurring) {
        return possibleStates.blurring;
      }
      return state;
    case "blur":
      return state === possibleStates.started ? possibleStates.blurring : state;
    case "unblur":
      return state === possibleStates.blurred ||
        state === possibleStates.blurring
        ? possibleStates.unblurring
        : state;
    case "transition-ended":
      if (state === possibleStates.blurring) {
        return possibleStates.blurred;
      }
      if (state === possibleStates.unblurring) {
        return possibleStates.stopped;
      }
      return state;
    default:
      throw new Error(`unsupported action ${action} for focusAnimator reducer`);
  }
};

const focusAnmatorStateReader = stateReader(possibleStates);

export default () => useReducer(focusAnimatorReducer, possibleStates.stopped);
export { focusAnmatorStateReader, possibleStates };
