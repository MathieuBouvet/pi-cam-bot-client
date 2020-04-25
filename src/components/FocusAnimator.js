import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppDisplay from "./AppDisplay";
import "./FocusAnimator.css";

const FocusAnimator = ({ camera }) => {
  const [clip, setClip] = useState(false);
  useEffect(() => {
    setTimeout(setClip, 0, true);
  }, []);
  return (
    <div className="focused-animator">
      <AppDisplay
        camera={camera}
        dispatchCameraAction={() => null}
        className={clip ? "clipped" : ""}
      />
    </div>
  );
};

FocusAnimator.protoTypes = {
  camera: PropTypes.symbol.isRequired,
};
export default FocusAnimator;
