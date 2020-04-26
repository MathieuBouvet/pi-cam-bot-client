import React from "react";
import { focusAnmatorStateReader } from "../hooks/useFocusAnimatorState";
import PropTypes from "prop-types";
import AppDisplay from "./AppDisplay";
import "./FocusAnimator.css";

const FocusAnimator = ({ camera, animator, dispatchAnimatorAction }) => {
  const isAnimator = focusAnmatorStateReader(animator);

  const clipPath = (() => {
    if (isAnimator("blurred")) {
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
        <AppDisplay camera={camera} dispatchCameraAction={() => null} />
      </div>
      {!isAnimator("unblurring") && (
        <div className="focus-animator-text">
          Cliquez n'importe où pour reprendre le contôle
        </div>
      )}
    </div>
  );
};

FocusAnimator.protoTypes = {
  camera: PropTypes.symbol.isRequired,
  animator: PropTypes.symbol.isRequired,
  dispatchAnimatorAction: PropTypes.func.isRequired,
};
export default FocusAnimator;
