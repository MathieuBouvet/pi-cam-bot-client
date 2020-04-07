import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "react-materialize";

import "./StartCamButton.css";

const StartCamButton = ({ isLoading, startClickHandler }) => (
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
    {isLoading && <div className="loader"></div>}
  </div>
);

StartCamButton.prototype = {
  isLoading: PropTypes.bool.isRequired,
  startClickHandler: PropTypes.func.isRequired,
};

export default StartCamButton;
