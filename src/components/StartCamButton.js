import React from "react";
import PropTypes from "prop-types";
import { Button, Icon, Preloader } from "react-materialize";

import "./StartCamButton.css";

const StartCamButton = ({ isLoading, startClickHandler, children }) => (
  <div className="start-cam">
    <Button
      className="purple darken-4 start-cam-button"
      floating
      large
      waves="light"
      onClick={startClickHandler}
    >
      <Icon>power_settings_new</Icon>
    </Button>
    <div className="start-cam-text" onClick={startClickHandler}>
      {children}
    </div>
    {isLoading && (
      <div data-testid="loading-indicator" className="start-cam-loader-wrapper">
        <Preloader className="start-cam-loader" color="blue" size="small" />
      </div>
    )}
  </div>
);

StartCamButton.prototype = {
  isLoading: PropTypes.bool.isRequired,
  startClickHandler: PropTypes.func.isRequired,
  children: PropTypes.string,
};

export default StartCamButton;
