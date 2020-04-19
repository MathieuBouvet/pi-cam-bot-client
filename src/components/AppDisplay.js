import React from "react";
import PropTypes from "prop-types";

import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-icons/iconfont/material-icons.css";
import { Navbar, Icon, Switch } from "react-materialize";

import StartCamButton from "./StartCamButton";
import { cameraStreamUrl } from "../helpers/backendRequests";
import { cameraStatusReader } from "../hooks/useCameraState";

import "./AppDisplay.css";

const AppDisplay = ({
  camera,
  onOffClickHandler,
  startClickHandler,
  cameraStreamLoadHandler,
}) => {
  const isCamera = cameraStatusReader(camera);
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
            onChange={onOffClickHandler}
          />
        </Navbar>
      </header>
      <div className="content row">
        <div className="camera-stream-wrapper">
          {(isCamera("ready") || isCamera("loaded")) && (
            <img
              className="camera-stream blue-grey lighten-4"
              alt="camera-stream"
              src={cameraStreamUrl}
              onLoad={cameraStreamLoadHandler}
            ></img>
          )}
          {!isCamera("loaded") && (
            <div className="cam-stopped blue-grey lighten-4">
              <StartCamButton
                isLoading={isCamera("starting") || isCamera("stopping")}
                startClickHandler={startClickHandler}
              >
                Demarrer la camera
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
  onOffClickHandler: PropTypes.func.isRequired,
  startClickHandler: PropTypes.func.isRequired,
  cameraStreamLoadHandler: PropTypes.func.isRequired,
};

export default AppDisplay;
