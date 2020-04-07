import React from "react";
import PropTypes from "prop-types";

import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-icons/iconfont/material-icons.css";
import { Navbar, Icon, Switch, Button } from "react-materialize";

import "./AppDisplay.css";

const AppDisplay = ({ started, onOffClickHandler, startClickHandler }) => (
  <div className="app teal lighten-5">
    <header>
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
          onChange={onOffClickHandler}
        />
      </Navbar>
    </header>
    <div className="content">
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
            ></iframe>
          )}
        </div>
        {!started && (
          <div className="cam-stopped grey">
            <div className="start-cam">
              <Button
                className="purple darken-4"
                floating
                large
                waves="light"
                onClick={startClickHandler}
              >
                <Icon>power_settings_new</Icon>
              </Button>
              <div className="start-cam-text" onClick={startClickHandler}>
                Demarrer le Robot
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

AppDisplay.propTypes = {
  started: PropTypes.bool.isRequired,
  onOffClickHandler: PropTypes.func.isRequired,
  startClickHandler: PropTypes.func.isRequired,
};

export default AppDisplay;
