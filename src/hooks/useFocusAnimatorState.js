import { useReducer } from "react";
import stateReader from "../helpers/stateReader";

const possibleStates = {
  stopped: Symbol("stopped"),
  blurred: Symbol("blurred"),
  unblurring: Symbol("unblurring"),
};

const focusAnimatorReducer = (state, action) => {
  switch (action) {
    case "blur":
      return possibleStates.blurred;
    case "unblur":
      if (state === possibleStates.blurred) {
        return possibleStates.unblurring;
      }
      return state;
    case "transition-ended":
      if (state === possibleStates.unblurring) {
        return possibleStates.stopped;
      }
      return state;
    default:
      throw new Error(`unsupported action ${action} for focusAnimator reducer`);
  }
};

const focusAnmatorStateReader = stateReader(possibleStates);

export default function useFocusAnimatorState() {
  return useReducer(focusAnimatorReducer, possibleStates.stopped);
}
export { focusAnmatorStateReader, possibleStates };
