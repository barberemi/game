import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Background = styled.div`
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8) !important;
`

const RewardLayout = ({ children }) => <Background>{children}</Background>

RewardLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default RewardLayout
