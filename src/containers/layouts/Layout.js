import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import SideBar from '../../Components/SideBar/SideBar'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'

const Background = styled.div`
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8) !important;
`

const Layout = ({ children }) => {
  if (
    !Cookies.get('auth-token') ||
    jwtDecode(Cookies.get('auth-token')).exp < Date.now() / 1000
  ) {
    return <Redirect to="/login" />
  }

  return (
    <Background>
      <SideBar />
      {children}
    </Background>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
