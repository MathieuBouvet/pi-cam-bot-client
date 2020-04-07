import React from "react";

import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-icons/iconfont/material-icons.css";
import { Navbar, Icon, Switch } from "react-materialize";

import "./AppDisplay.css";

const AppDisplay = (props) => (
  <div className="app teal lighten-5">
    <header>
      <Navbar
        alignLinks="right"
        brand={<span className="brand-label">Py Cam Bot</span>}
        menuIcon={<Icon>menu</Icon>}
        className="purple darken-4"
      >
        <Switch className="on-off-button" onLabel="on" offLabel="off" />
      </Navbar>
    </header>
    <div className="content">
      <div className="video-wrapper">
        <div className="video-container">
          <iframe
            title="cam-bot"
            width="853"
            height="480"
            src="//www.youtube.com/embed/Q8TXgCzxEnw?rel=0"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
);

export default AppDisplay;
