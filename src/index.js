import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./animate.css";
import "./bootstrap.css";
import Fight from './containers/views/Fight/Fight';
import Map from './containers/views/Map/Map';
import Login from './containers/views/Login/Login';
import AppRoute from "./containers/AppRoute";
import FightLayout from "./containers/layouts/FightLayout";
import MapLayout from "./containers/layouts/MapLayout";
import LoginLayout from "./containers/layouts/LoginLayout";
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <AppRoute exact path="/fight" component={Fight} layout={FightLayout} />
      <AppRoute exact path="/map" component={Map} layout={MapLayout} />
      <AppRoute exact path="/login" component={Login} layout={LoginLayout}/>
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
