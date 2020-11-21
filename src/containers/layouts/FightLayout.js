import React from 'react'
import styled from '@emotion/styled'

const FightContainer = styled.div`
  background-image: url('https://mfiles.alphacoders.com/828/828646.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100vh !important;
`

export default ({ children }) => {
  return <FightContainer>{children}</FightContainer>
}
