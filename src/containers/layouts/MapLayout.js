import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import MapNavBar from '../../Components/NavBar/MapNavBar'
import SideBar from '../../Components/SideBar/SideBar'

const Background = styled.div`
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8) !important;
`

const MapLayout = ({ children }) => (
  <Background>
    <MapNavBar />
    <SideBar />
    {children}
  </Background>
)

MapLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default MapLayout
