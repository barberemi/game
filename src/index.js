import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./animate.css";
import "./bootstrap.css";
import AppRoute from "./containers/AppRoute";

import Fight from './containers/views/Fight/Fight';
import Map from './containers/views/Map/Map';
import Exploration from './containers/views/Exploration/Exploration';
import Choice from './containers/views/Exploration/Choice';
import Login from './containers/views/Login/Login';
import Register from './containers/views/Login/Register';
import Creation from './containers/views/Character/Creation';

import FightLayout from "./containers/layouts/FightLayout";
import MapLayout from "./containers/layouts/MapLayout";
import LoginLayout from "./containers/layouts/LoginLayout";
import CharacterLayout from "./containers/layouts/CharacterLayout";
import ExplorationLayout from "./containers/layouts/ExplorationLayout";
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <AppRoute exact path="/fight" component={Fight} layout={FightLayout} />
      <AppRoute exact path="/maps" component={Map} layout={MapLayout} />
      <AppRoute exact path="/exploration" component={Exploration} layout={ExplorationLayout} />
      <AppRoute exact path="/choice" component={Choice} layout={ExplorationLayout} />

      <AppRoute exact path="/login" component={Login} layout={LoginLayout}/>
      <AppRoute exact path="/register" component={Register} layout={LoginLayout}/>
      <AppRoute exact path="/creation" component={Creation} layout={CharacterLayout} />
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
