import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

// background-image: url('https://mfiles.alphacoders.com/828/828646.jpg');
// background-image: url('${process.env.PUBLIC_URL + '/img/fight-neige.jpg'}');
// background-image: url('${process.env.PUBLIC_URL + '/img/fight-desert.jpg'}');
const FightContainer = styled.div`
  background-image: url('https://cdna.artstation.com/p/assets/images/images/004/345/358/large/nikita-bulatov-58.jpg?1482749515');
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
