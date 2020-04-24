import React, { useRef } from "react";
import PropTypes from "prop-types";

import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-icons/iconfont/material-icons.css";
import { Navbar, Icon, Switch } from "react-materialize";

import StartCamButton from "./StartCamButton";
import { cameraStreamUrl } from "../helpers/backendRequests";
import { cameraStatusReader } from "../hooks/useCameraState";

import "./AppDisplay.css";

const adjustedStreamWrapperSize = ({ current: streamRef }) => {
  if (streamRef == null) {
    return null;
  }
  const fittingRatio = Math.min(
    (0.75 * window.innerWidth) / streamRef.naturalWidth,
    (0.75 * window.innerHeight) / streamRef.naturalHeight
  );
  return {
    width: streamRef.naturalWidth * fittingRatio || 0,
    height: streamRef.naturalHeight * fittingRatio || 0,
  };
};

const AppDisplay = ({ camera, dispatchCameraAction }) => {
  const isCamera = cameraStatusReader(camera);
  const cameraStreamRef = useRef(null);
  const statusText = (() => {
    if (isCamera("starting") || isCamera("ready")) {
      return "Demarrage de la camera en cours...";
    }
    if (isCamera("stopping")) {
      return "Arret de la camera en cours...";
    }
    return "Demarrer la camera";
  })();
  return (
    <div className="app teal lighten-5">
      <header className="row">
        <Navbar
          alignLinks="right"
          brand={<span className="brand-label">Py Cam Bot</span>}
          menuIcon={<Icon>menu</Icon>}
          className="purple darken-4"
        >
          <Switch
            className="on-off-button"
            onLabel="on"
            offLabel="off"
            checked={!isCamera("stopping") && !isCamera("stopped")}
            onChange={() => dispatchCameraAction("toggle-cam")}
          />
        </Navbar>
      </header>
      <div className="content row">
        <div
          className={`camera-stream-wrapper ${
            isCamera("loaded") ? "smoothed" : ""
          }`}
          style={adjustedStreamWrapperSize(cameraStreamRef)}
        >
          {(isCamera("ready") || isCamera("loaded")) && (
            <img
              className="camera-stream blue-grey lighten-4"
              alt="camera-stream"
              src={cameraStreamUrl}
              onLoad={() => dispatchCameraAction("stream-loaded")}
              ref={cameraStreamRef}
            ></img>
          )}
          {!isCamera("loaded") && (
            <div className="cam-stopped blue-grey lighten-4">
              <StartCamButton
                isLoading={
                  isCamera("starting") ||
                  isCamera("stopping") ||
                  isCamera("ready")
                }
                startClickHandler={() => dispatchCameraAction("start-cam")}
              >
                {statusText}
              </StartCamButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

AppDisplay.propTypes = {
  camera: PropTypes.symbol.isRequired,
  dispatchCameraAction: PropTypes.func.isRequired,
};

export default AppDisplay;
