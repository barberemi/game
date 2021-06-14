import React from 'react'
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'

const FightLayout = ({ children }) => {
  if (
    !Cookies.get('auth-token') ||
    jwtDecode(Cookies.get('auth-token')).exp < Date.now() / 1000
  ) {
    return <Redirect to="/login" />
  }

  return <>{children}</>
}

FightLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default FightLayout
