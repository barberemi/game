import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import SideBar from '../../Components/SideBar/SideBar'
import ExplorationNavBar from '../../Components/NavBar/ExplorationNavBar'

const Background = styled.div`
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8) !important;
`

const ExplorationLayout = ({ children }) => (
  <Background>
    <ExplorationNavBar />
    <SideBar />
    {children}
  </Background>
)

ExplorationLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default ExplorationLayout
