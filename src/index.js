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
import MapExploration from './containers/views/Map/MapExploration'
import MapHome from './containers/views/Map/MapHome'
import Exploration from './containers/views/Exploration/Exploration'
import GuildExploration from './containers/views/Exploration/GuildExploration'
import Choice from './containers/views/Exploration/Choice'
import Login from './containers/views/Login/Login'
import Register from './containers/views/Login/Register'
import Error404 from './containers/views/Login/Error404'
import Maintenance from './containers/views/Login/Maintenance'
import Creation from './containers/views/Character/Creation'
import Character from './containers/views/Character/Character'
import Boss from './containers/views/Boss/Boss'
import Crafting from './containers/views/Crafting/Crafting'
import Reward from './containers/views/Reward/Reward'
import Guild from './containers/views/Guild/Guild'
import Chat from './containers/views/Chat/Chat'

import FightLayout from './containers/layouts/FightLayout'
import LoginLayout from './containers/layouts/LoginLayout'
import CreationLayout from './containers/layouts/CreationLayout'
import Layout from './containers/layouts/Layout'
import MaintenanceLayout from './containers/layouts/MaintenanceLayout'

import { ToastContainer } from 'react-toastify'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    {/* Needed to refresh when click on Monster arrow next/previous */}
    <Switch>
      <AppRoute exact path="/maps" component={MapExploration} layout={Layout} />
      <AppRoute exact path="/home" component={MapHome} layout={Layout} />
      <AppRoute
        exact
        path="/exploration"
        component={Exploration}
        layout={Layout}
      />
      <AppRoute exact path="/discussion" component={Chat} layout={Layout} />
      <AppRoute
        exact
        path="/guild_exploration"
        component={GuildExploration}
        layout={Layout}
      />
      <AppRoute
        exact
        path="/:typeExploration/:type/:idExploration"
        component={Choice}
        layout={Layout}
      />
      <AppRoute
        exact
        path="/fight/:idFight"
        component={Fight}
        layout={FightLayout}
      />
      <AppRoute
        exact
        path="/character/:idCharacter"
        component={Character}
        layout={Layout}
        key={Math.random()}
      />
      <AppRoute exact path="/character" component={Character} layout={Layout} />
      <AppRoute
        exact
        path="/creation"
        component={Creation}
        layout={CreationLayout}
      />
      <AppRoute exact path="/boss/:idBoss" component={Boss} layout={Layout} />
      <AppRoute exact path="/boss" component={Boss} layout={Layout} />
      <AppRoute
        exact
        path="/crafting/:idBoss"
        component={Crafting}
        layout={Layout}
      />
      <AppRoute exact path="/crafting" component={Crafting} layout={Layout} />
      <AppRoute
        exact
        path="/reward/:idFight"
        component={Reward}
        layout={Layout}
      />
      <AppRoute
        exact
        path="/guild/:idGuild"
        component={Guild}
        layout={Layout}
      />
      <AppRoute exact path="/guild" component={Guild} layout={Layout} />
      <AppRoute exact path="/login" component={Login} layout={LoginLayout} />

      <AppRoute exact path="/404" component={Error404} layout={LoginLayout} />
      <AppRoute
        exact
        path="/maintenance"
        component={Maintenance}
        layout={MaintenanceLayout}
      />
      <AppRoute
        exact
        path="/register"
        component={Register}
        layout={LoginLayout}
      />
      <Redirect exact from="/" to="/login" />
      <Redirect to="/404" />
    </Switch>
    <ToastContainer />
    <ReactTooltip />
    <TawkMessengerReact
      propertyId="633af0b054f06e12d8982eee"
      widgetId="1gef3oca6"
    />
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
