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
  iframeLoading,
  onOffClickHandler,
  startClickHandler,
  loadIframeHandler,
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
      <div className="video-wrapper">
        <div className={"video-container"}>
          {started && (
            <iframe
              title="cam-bot"
              width="853"
              height="480"
              src="//www.youtube.com/embed/Q8TXgCzxEnw?rel=0"
              frameBorder="0"
              allowFullScreen
              onLoad={loadIframeHandler}
            ></iframe>
          )}
        </div>
        {(!started || iframeLoading) && (
          <div className="cam-stopped blue-grey lighten-4">
            <StartCamButton
              isLoading={iframeLoading}
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
  iframeLoading: PropTypes.bool.isRequired,
  onOffClickHandler: PropTypes.func.isRequired,
  startClickHandler: PropTypes.func.isRequired,
  loadIframeHandler: PropTypes.func.isRequired,
};

export default AppDisplay;
