import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

// background-image: url('https://mfiles.alphacoders.com/828/828646.jpg');
// background-image: url('${process.env.PUBLIC_URL + '/img/fight-neige.jpg'}');
const FightContainer = styled.div`
  background-image: url('${process.env.PUBLIC_URL + '/img/fight-neige.jpg'}');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100vh !important;
`

const FightLayout = ({ children }) => (
  <FightContainer>{children}</FightContainer>
)

FightLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default FightLayout
