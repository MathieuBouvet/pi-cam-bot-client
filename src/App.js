import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "material-icons/iconfont/material-icons.css";
import { Navbar, Icon, Switch } from "react-materialize";

import "./App.css";

function App() {
  return (
    <div className="app">
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
    </div>
  );
}

export default App;
