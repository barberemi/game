import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Background = styled.div`
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100vh;
  background-image: url(${process.env.PUBLIC_URL +
  '/img/backgrounds/guild-attack-min.jpg'});
`

const MaintenanceLayout = ({ children }) => <Background>{children}</Background>

MaintenanceLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default MaintenanceLayout
