import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import SideBar from '../../Components/SideBar/SideBar'

const Background = styled.div`
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8) !important;
`

const GuildLayout = ({ children }) => (
  <Background>
    <SideBar />
    {children}
  </Background>
)

GuildLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default GuildLayout
