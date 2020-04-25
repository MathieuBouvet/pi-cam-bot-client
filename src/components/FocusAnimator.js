import React, { useEffect } from "react";
import { focusAnmatorStateReader } from "../hooks/useFocusAnimatorState";
import PropTypes from "prop-types";
import AppDisplay from "./AppDisplay";
import "./FocusAnimator.css";

const FocusAnimator = ({ camera, animator, dispatchAnimatorAction }) => {
  const isAnimator = focusAnmatorStateReader(animator);
  useEffect(() => {
    dispatchAnimatorAction("blur");
  }, [dispatchAnimatorAction]);

  const clipPath = (() => {
    if (isAnimator("blurring OR blurred")) {
      return { clipPath: "circle(0% at center)" };
    }
    return { clipPath: "circle(100% at center)" };
  })();
  return (
    <div className="focus-animator">
      <div
        className="app-wrapper"
        style={clipPath}
        onTransitionEnd={() => dispatchAnimatorAction("transition-ended")}
      >
        <AppDisplay
          camera={camera}
          dispatchCameraAction={() => null}
          focused={false}
        />
      </div>
    </div>
  );
};

FocusAnimator.protoTypes = {
  camera: PropTypes.symbol.isRequired,
  animator: PropTypes.symbol.isRequired,
  dispatchAnimatorAction: PropTypes.func.isRequired,
};
export default FocusAnimator;
