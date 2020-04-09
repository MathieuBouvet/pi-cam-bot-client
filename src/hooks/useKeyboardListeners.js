import { useEffect } from "react";

const useKeyboardListeners = (dispatch) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!event.repeat) {
        dispatch({ type: "keyDown", key: event.key });
      }
    };
    const handleKeyUp = (event) => {
      dispatch({ type: "keyUp", key: event.key });
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [dispatch]);
};

export default useKeyboardListeners;
