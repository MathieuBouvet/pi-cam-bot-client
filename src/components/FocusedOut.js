import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppDisplay from "./AppDisplay";
import "./FocusedOut.css";

const FocusedOut = ({ cameraStatus }) => {
  const [clip, setClip] = useState(false);
  useEffect(() => {
    setTimeout(setClip, 0, true);
  }, []);
  return (
    <div className="focused-out">
      <AppDisplay
        camera={cameraStatus}
        dispatchCameraAction={() => null}
        focused={true}
        className={clip ? "clipped" : ""}
      />
    </div>
  );
};

FocusedOut.protoTypes = {
  cameraStatus: PropTypes.symbol.isRequired,
};
export default FocusedOut;
