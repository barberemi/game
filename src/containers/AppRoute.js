import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
)

AppRoute.propTypes = {
  component: PropTypes.node.isRequired,
  layout: PropTypes.node.isRequired
}

export default AppRoute
