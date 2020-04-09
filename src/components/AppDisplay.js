import React from "react";
import PropTypes from "prop-types";

import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-icons/iconfont/material-icons.css";
import { Navbar, Icon, Switch } from "react-materialize";

import StartCamButton from "./StartCamButton";

import "./AppDisplay.css";

const AppDisplay = ({
  started,
  cameraStreamLoading,
  onOffClickHandler,
  startClickHandler,
  cameraStreamLoadHandler,
}) => (
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
          checked={started}
          onChange={onOffClickHandler}
        />
      </Navbar>
    </header>
    <div className="content row">
      <div className="camera-stream-wrapper">
        {started && (
          <img
            className="camera-stream blue-grey lighten-4"
            alt="camera-stream"
            src="http://localhost:8080/?action=stream"
            onLoad={cameraStreamLoadHandler}
          ></img>
        )}
        {(!started || cameraStreamLoading) && (
          <div className="cam-stopped blue-grey lighten-4">
            <StartCamButton
              isLoading={cameraStreamLoading}
              startClickHandler={startClickHandler}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

AppDisplay.propTypes = {
  started: PropTypes.bool.isRequired,
  cameraStreamLoading: PropTypes.bool.isRequired,
  onOffClickHandler: PropTypes.func.isRequired,
  startClickHandler: PropTypes.func.isRequired,
  cameraStreamLoadHandler: PropTypes.func.isRequired,
};

export default AppDisplay;
