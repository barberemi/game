import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import SideBar from '../../Components/SideBar/SideBar'

const Background = styled.div`
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8) !important;
`

const BossLayout = ({ children }) => (
  <Background>
    <SideBar />
    {children}
  </Background>
)

BossLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default BossLayout
