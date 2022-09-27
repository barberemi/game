import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import moment from 'moment'
import { Redirect, useLocation } from 'react-router-dom'

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const pathname = useLocation().pathname
  const time = moment(),
    beforeTime = moment('00:00:00', 'HH:mm:ss'),
    afterTime = moment('00:15:00', 'HH:mm:ss')

  if (time.isBetween(beforeTime, afterTime) && pathname !== '/maintenance') {
    return <Redirect to="/maintenance" />
  }

  if (!time.isBetween(beforeTime, afterTime) && pathname === '/maintenance') {
    return <Redirect to="/home" />
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  )
}

AppRoute.propTypes = {
  component: PropTypes.node.isRequired,
  layout: PropTypes.node.isRequired
}

export default AppRoute
