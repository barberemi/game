import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './animate.css'
import './bootstrap.css'
import 'react-toastify/dist/ReactToastify.min.css'
import AppRoute from './containers/AppRoute'
import ReactTooltip from 'react-tooltip'

import Fight from './containers/views/Fight/Fight'
import Map from './containers/views/Map/Map'
import Exploration from './containers/views/Exploration/Exploration'
import Choice from './containers/views/Exploration/Choice'
import Login from './containers/views/Login/Login'
import Register from './containers/views/Login/Register'
import Creation from './containers/views/Character/Creation'
import Character from './containers/views/Character/Character'
import Boss from './containers/views/Boss/Boss'
import Crafting from './containers/views/Crafting/Crafting'
import Reward from './containers/views/Reward/Reward'
import Guild from './containers/views/Guild/Guild'

import FightLayout from './containers/layouts/FightLayout'
import LoginLayout from './containers/layouts/LoginLayout'
import CreationLayout from './containers/layouts/CreationLayout'
import Layout from './containers/layouts/Layout'

import { ToastContainer } from 'react-toastify'
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter forceRefresh={true}>
    <Switch>
      <AppRoute exact path="/maps" component={Map} layout={Layout} />
      <AppRoute
        exact
        path="/exploration"
        component={Exploration}
        layout={Layout}
      />
      <AppRoute
        exact
        path="/choice/:type/:explorationId"
        component={Choice}
        layout={Layout}
      />
      <AppRoute exact path="/fight" component={Fight} layout={FightLayout} />

      <AppRoute exact path="/character" component={Character} layout={Layout} />
      <AppRoute
        exact
        path="/character/:idcharacter"
        component={Character}
        layout={Layout}
      />
      <AppRoute
        exact
        path="/creation"
        component={Creation}
        layout={CreationLayout}
      />

      <AppRoute path="/boss/:idboss" component={Boss} layout={Layout} />
      <AppRoute path="/boss" component={Boss} layout={Layout} />

      <AppRoute exact path="/crafting" component={Crafting} layout={Layout} />
      <AppRoute
        exact
        path="/crafting/:idboss"
        component={Crafting}
        layout={Layout}
      />

      <AppRoute path="/reward" component={Reward} layout={Layout} />

      <AppRoute path="/guild" component={Guild} layout={Layout} />
      <AppRoute path="/guild/:idguild" component={Guild} layout={Layout} />

      <AppRoute exact path="/login" component={Login} layout={LoginLayout} />
      <AppRoute
        exact
        path="/register"
        component={Register}
        layout={LoginLayout}
      />

      <Redirect from="/" to="/login" />
    </Switch>
    <ToastContainer />
    <ReactTooltip />
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
